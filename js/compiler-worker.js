import { compile } from "https://cdn.jsdelivr.net/npm/browsercc@0.1.1/dist/index.js";
import { WASI, File, OpenFile, ConsoleStdout } from "https://esm.sh/@bjorn3/browser_wasi_shim@0.4.2";

self.onmessage = async (event) => {
  const { source, standard = "c++20" } = event.data || {};
  let compileOutput = "";
  let stdoutText = "";
  let stderrText = "";

  try {
    self.postMessage({ type: "status", message: "Memuat Clang WebAssembly…" });
    const result = await compile({
      source,
      fileName: "main.cpp",
      flags: [
        "-O0",
        "-Wall",
        "-Wextra",
        "-std=" + standard,
        "-fdiagnostics-color=never",
        "-fno-exceptions"
      ]
    });

    compileOutput = result.compileOutput || "";
    if (!result.module) {
      self.postMessage({
        type: "result",
        ok: false,
        compileOutput: compileOutput || "Kompilasi gagal. Tidak ada modul WebAssembly yang dihasilkan.",
        tests: []
      });
      return;
    }

    self.postMessage({ type: "status", message: "Kode berhasil dikompilasi. Menjalankan test case…" });

    const stdoutParts = [];
    const stderrParts = [];
    const stdoutDecoder = new TextDecoder("utf-8");
    const stderrDecoder = new TextDecoder("utf-8");
    const wasi = new WASI([], [], [
      new OpenFile(new File(new TextEncoder().encode(""))),
      new ConsoleStdout(bytes => stdoutParts.push(stdoutDecoder.decode(bytes, { stream: true }))),
      new ConsoleStdout(bytes => stderrParts.push(stderrDecoder.decode(bytes, { stream: true })))
    ]);

    let runtimeError = "";
    try {
      const instance = await WebAssembly.instantiate(result.module, {
        wasi_snapshot_preview1: wasi.wasiImport
      });
      wasi.start(instance);
    } catch (error) {
      runtimeError = error?.message || String(error);
    }

    stdoutParts.push(stdoutDecoder.decode());
    stderrParts.push(stderrDecoder.decode());
    stdoutText = stdoutParts.join("");
    stderrText = stderrParts.join("");

    if (runtimeError) {
      self.postMessage({
        type: "challenge-result",
        ok: false,
        compileOutput,
        stdout: stdoutText,
        stderr: stderrText,
        runtimeError
      });
      return;
    }

    self.postMessage({
      type: "challenge-result",
      ok: true,
      compileOutput,
      stdout: stdoutText,
      stderr: stderrText,
      runtimeError: ""
    });
  } catch (error) {
    self.postMessage({
      type: "result",
      ok: false,
      compileOutput,
      stdout: stdoutText,
      stderr: stderrText,
      error: error?.stack || error?.message || String(error),
      tests: []
    });
  }
};
