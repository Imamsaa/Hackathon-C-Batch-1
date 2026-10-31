/*! coi-serviceworker v0.1.7 - Guido Zuidhof and contributors, licensed under MIT */
/* CodeLab C++ offline app shell and runtime cache additions. */
const COMPILER_CACHE_NAME = "codelab-compiler-assets-v1";
const RUNTIME_CACHE_NAME = "codelab-runtime-assets-v23";
const APP_CACHE_NAME = "codelab-offline-shell-v23";
const COMPILER_CDN_PREFIX = "https://cdn.jsdelivr.net/npm/browsercc@0.1.1/dist/";
const FORMATTER_CDN_PREFIX = "https://cdn.jsdelivr.net/npm/@wasm-fmt/clang-format@23.1.0/";
const APP_FILES = ["index.html", "app.js", "compiler-worker.js", "coi-serviceworker.min.js", "materi.html", "materi.js"];
let coepCredentialless = false;

function withIsolationHeaders(response, crossOrigin = false) {
  if (!response || response.status === 0) return response;
  const headers = new Headers(response.headers);
  headers.set("Cross-Origin-Embedder-Policy", coepCredentialless ? "credentialless" : "require-corp");
  if (!coepCredentialless) headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  if (crossOrigin) headers.set("Access-Control-Allow-Origin", "*");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

if (typeof window === "undefined") {
  self.addEventListener("install", (event) => {
    event.waitUntil((async () => {
      await self.skipWaiting();
      const cache = await caches.open(APP_CACHE_NAME);
      const scope = self.registration.scope;
      await Promise.all(APP_FILES.map(async (file) => {
        const url = new URL(file, scope).href;
        try {
          const response = await fetch(url, { cache: "no-cache" });
          if (response.ok) await cache.put(url, response.clone());
        } catch (error) {
          console.warn("Could not pre-cache CodeLab app file:", file, error);
        }
      }));
    })());
  });

  self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

  self.addEventListener("message", (event) => {
    if (!event.data) return;
    if (event.data.type === "deregister") {
      self.registration.unregister()
        .then(() => self.clients.matchAll())
        .then((clients) => clients.forEach((client) => client.navigate(client.url)));
    } else if (event.data.type === "coepCredentialless") {
      coepCredentialless = event.data.value;
    } else if (event.data.type === "codelab-offline-status") {
      event.source?.postMessage({ type: "codelab-offline-status", controlled: true });
    }
  });

  self.addEventListener("fetch", (event) => {
    const request = event.request;
    if (request.method !== "GET") return;

    const url = new URL(request.url);
    const scopeUrl = new URL(self.registration.scope);
    const isInAppScope = url.origin === scopeUrl.origin && url.pathname.startsWith(scopeUrl.pathname);
    const isCompilerAsset = request.url.startsWith(COMPILER_CDN_PREFIX);
    const isFormatterAsset = request.url.startsWith(FORMATTER_CDN_PREFIX);
    const isEsmAsset = url.origin === "https://esm.sh";
    const isCacheableRuntime = isEsmAsset || isCompilerAsset || isFormatterAsset;
    if (!isInAppScope && !isCacheableRuntime) return;

    event.respondWith((async () => {
      const cacheName = isInAppScope ? APP_CACHE_NAME : RUNTIME_CACHE_NAME;
      const cache = await caches.open(cacheName);

      try {
        if (isCompilerAsset) {
          const compilerCache = await caches.open(COMPILER_CACHE_NAME);
          const savedCompilerAsset = await compilerCache.match(request.url);
          if (savedCompilerAsset) return withIsolationHeaders(savedCompilerAsset, true);
        }

        // App shell is network-first when online so updated index/app scripts cannot
        // get stuck behind an older cached HTML/JS bundle. Cached copies remain as fallback offline.
        const preferNetwork = isInAppScope;
        if (!preferNetwork) {
          const cached = await cache.match(request);
          if (cached) return withIsolationHeaders(cached, true);
        }

        const networkResponse = await fetch(request);
        if (networkResponse.ok && (networkResponse.type === "basic" || networkResponse.type === "cors")) {
          const prepared = withIsolationHeaders(networkResponse.clone(), !isInAppScope);
          try {
            await cache.put(request, prepared.clone());
            if (isInAppScope) {
              const baseUrl = new URL(request.url);
              baseUrl.search = "";
              if (baseUrl.href !== request.url) await cache.put(baseUrl.href, prepared.clone());
            }
          } catch (error) {
            console.warn("Could not cache CodeLab resource:", request.url, error);
          }
          return prepared;
        }

        if (!networkResponse.ok) {
          const cached = await cache.match(request, { ignoreSearch: isInAppScope });
          if (cached) return withIsolationHeaders(cached, !isInAppScope);
        }
        return withIsolationHeaders(networkResponse, !isInAppScope);
      } catch (error) {
        const cached = await cache.match(request, { ignoreSearch: isInAppScope });
        if (cached) return withIsolationHeaders(cached, !isInAppScope);

        if (isInAppScope && request.mode === "navigate") {
          const index = await cache.match(new URL("index.html", self.registration.scope).href);
          if (index) return withIsolationHeaders(index);
        }

        console.error("CodeLab offline cache miss:", request.url, error);
        return new Response(
          "Aset ini belum tersedia untuk mode offline. Sambungkan internet, lalu klik Siapkan CodeLab untuk Offline.",
          { status: 503, headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Resource-Policy": "cross-origin"
          }}
        );
      }
    })());
  });
} else {
  (() => {
    const reloadedBySelf = window.sessionStorage.getItem("coiReloadedBySelf");
    window.sessionStorage.removeItem("coiReloadedBySelf");
    const coepDegrading = reloadedBySelf == "coepdegrade";
    const coi = {
      shouldRegister: () => !reloadedBySelf,
      shouldDeregister: () => false,
      coepCredentialless: () => true,
      coepDegrade: () => true,
      doReload: () => window.location.reload(),
      quiet: false,
      ...window.coi
    };

    const n = navigator;
    const controlling = n.serviceWorker && n.serviceWorker.controller;
    if (controlling && !window.crossOriginIsolated) window.sessionStorage.setItem("coiCoepHasFailed", "true");
    const coepHasFailed = window.sessionStorage.getItem("coiCoepHasFailed");

    if (controlling) {
      const reloadToDegrade = coi.coepDegrade() && !(coepDegrading || window.crossOriginIsolated);
      n.serviceWorker.controller.postMessage({
        type: "coepCredentialless",
        value: (reloadToDegrade || (coepHasFailed && coi.coepDegrade())) ? false : coi.coepCredentialless()
      });
      if (reloadToDegrade) {
        !coi.quiet && console.log("Reloading page to degrade COEP.");
        window.sessionStorage.setItem("coiReloadedBySelf", "coepdegrade");
        coi.doReload();
      }
      if (coi.shouldDeregister()) n.serviceWorker.controller.postMessage({ type: "deregister" });
    }

    if (window.crossOriginIsolated !== false || !coi.shouldRegister()) return;
    if (!window.isSecureContext || !n.serviceWorker) {
      !coi.quiet && console.error("Service Worker requires a secure context and browser support.");
      return;
    }

    n.serviceWorker.register(window.document.currentScript.src).then((registration) => {
      !coi.quiet && console.log("CodeLab Service Worker registered", registration.scope);
      registration.addEventListener("updatefound", () => {
        !coi.quiet && console.log("Reloading page to activate updated Service Worker.");
        window.sessionStorage.setItem("coiReloadedBySelf", "updatefound");
        coi.doReload();
      });
      if (registration.active && !n.serviceWorker.controller) {
        !coi.quiet && console.log("Reloading page so the Service Worker can control it.");
        window.sessionStorage.setItem("coiReloadedBySelf", "notcontrolling");
        coi.doReload();
      }
    }, (error) => !coi.quiet && console.error("Service Worker registration failed:", error));
  })();
}
