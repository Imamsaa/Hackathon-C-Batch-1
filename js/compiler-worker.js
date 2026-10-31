import { compile } from "https://cdn.jsdelivr.net/npm/browsercc@0.1.1/dist/index.js";
import { WASI, File, OpenFile, ConsoleStdout } from "https://esm.sh/@bjorn3/browser_wasi_shim@0.4.2";

self.onmessage = async (event) => {
  const { source, testCases = [], standard = "c++20" } = event.data || {};
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
      self.postMessage({
        type: "result",
        ok: false,
        compileOutput: compileOutput || "Kompilasi gagal. Tidak ada modul WebAssembly yang dihasilkan.",
        tests: []
      });
      return;
    }

    const normalizeOutput = value => String(value ?? "")
      .replace(/\r\n/g, "\n")
      .trim()
      .replace(/[ \t]+/g, " ");
    const testResults = [];

    for (let index = 0; index < testCases.length; index++) {
      const testCase = testCases[index];
      self.postMessage({
        type: "test-case-start",
        index,
        total: testCases.length,
        message: "Menjalankan test case " + (index + 1) + " dari " + testCases.length + "…"
      });

      const encoder = new TextEncoder();
      const inputText = testCase.input && !testCase.input.endsWith("\n")
        ? testCase.input + "\n"
        : (testCase.input || "");
      const stdoutParts = [];
      const stderrParts = [];
      const stdoutDecoder = new TextDecoder("utf-8");
      const stderrDecoder = new TextDecoder("utf-8");
      const fds = [
        new OpenFile(new File(encoder.encode(inputText))),
        new ConsoleStdout(bytes => stdoutParts.push(stdoutDecoder.decode(bytes, { stream: true }))),
        new ConsoleStdout(bytes => stderrParts.push(stderrDecoder.decode(bytes, { stream: true })))
      ];
      const wasi = new WASI([], [], fds);
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
      const actual = stdoutParts.join("");
      const stderr = stderrParts.join("");
      const expected = String(testCase.expected ?? "");
      const passed = !runtimeError && normalizeOutput(actual) === normalizeOutput(expected);

      testResults.push({
        index,
        label: testCase.label,
        hidden: testCase.hidden === true,
        input: testCase.input || "",
        expected,
        actual,
        stderr,
        runtimeError,
        passed
      });
    }

    self.postMessage({ type: "challenge-result", ok: true, compileOutput, tests: testResults });
  } catch (error) {
    self.postMessage({
      type: "result",
      ok: false,
      compileOutput,
      tests: [],
      error: error?.stack || error?.message || String(error)
    });
  }
};
