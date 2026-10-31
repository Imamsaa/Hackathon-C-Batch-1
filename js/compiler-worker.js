import { compile } from "https://cdn.jsdelivr.net/npm/browsercc@0.1.1/dist/index.js";
import { WASI, File, OpenFile, ConsoleStdout } from "https://esm.sh/@bjorn3/browser_wasi_shim@0.4.2";

self.onmessage = async (event) => {
  const { source, standard = "c++20" } = event.data || {};
  let compileOutput = "";
  try {
    self.postMessage({ type: "status", message: "Memuat Clang WebAssembly…" });
    const result = await compile({
      source,
      fileName: "main.cpp",
      flags: ["-O0", "-Wall", "-Wextra", "-std=" + standard, "-fdiagnostics-color=never", "-fno-exceptions"]
    });
    compileOutput = result.compileOutput || "";
    if (!result.module) {
      self.postMessage({ type: "result", ok: false, compileOutput: compileOutput || "Kompilasi gagal.", tests: [] });
      return;
    }

    const tests = [];
    const markers = source.match(/__CASE__\|/g);
    const total = markers ? markers.length : 0;
    for (let id = 1; id <= total; id++) {
      self.postMessage({ type: "test-case-start", index: id - 1, total });
      const stdout = [];
      const stderr = [];
      const outDecoder = new TextDecoder("utf-8");
      const errDecoder = new TextDecoder("utf-8");
      const wasi = new WASI([], [], [
        new OpenFile(new File(new TextEncoder().encode(""))),
        new ConsoleStdout(bytes => stdout.push(outDecoder.decode(bytes, { stream: true }))),
        new ConsoleStdout(bytes => stderr.push(errDecoder.decode(bytes, { stream: true })))
      ]);
      let runtimeError = "";
      try {
        const instance = await WebAssembly.instantiate(result.module, { wasi_snapshot_preview1: wasi.wasiImport });
        wasi.start(instance);
      } catch (error) {
        runtimeError = error?.message || String(error);
      }
      stdout.push(outDecoder.decode());
      stderr.push(errDecoder.decode());
      const output = stdout.join("");
      const marker = output.split(/\r?\n/).find(line => line.startsWith("__CASE__|" + id + "|")) || "";
      tests.push({
        index: id - 1,
        passed: marker.endsWith("|PASS") && !runtimeError,
        runtimeError,
        stderr: stderr.join(""),
        output
      });
    }

    self.postMessage({ type: "challenge-result", ok: true, compileOutput, tests });
  } catch (error) {
    self.postMessage({ type: "result", ok: false, compileOutput, tests: [], error: error?.stack || error?.message || String(error) });
  }
};
