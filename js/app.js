import { EditorView, basicSetup } from 'https://esm.sh/codemirror@6.0.1';
import { cpp } from 'https://esm.sh/@codemirror/lang-cpp@6.0.2';
import { oneDark } from 'https://esm.sh/@codemirror/theme-one-dark@6.1.2';
// Load the compiler only when a participant runs code. If one CDN is down,
// try the secondary CDN without preventing the challenge UI from starting.
const EMCEPTION_CDN_CANDIDATES = [
  'https://esm.sh/@gameguild/emception-browser@4.5.2?bundle',
  'https://cdn.jsdelivr.net/npm/@gameguild/emception-browser@4.5.2/+esm'
];

const SESSION_SECONDS = 90 * 60;
const STORAGE_KEY = 'codearena-cpp-progress-v1';
const START_KEY = 'codearena-cpp-start-v1';

const challenges = [
  {
    id: 'sum-two', title: 'Penjumlahan Sederhana', category: 'Dasar', difficulty: 'Easy', xp: 100, time: '10 min',
    signature: 'int solve(int a, int b)',
    description: 'Diberikan dua bilangan bulat <code>a</code> dan <code>b</code>. Buat fungsi yang mengembalikan hasil penjumlahan kedua bilangan tersebut. Perhatikan bahwa bilangan dapat bernilai negatif maupun nol.',
    starter: 'int solve(int a, int b) {\n    // TODO: kembalikan hasil penjumlahan a dan b\n    return 0;\n}',
    examples: [{input:'a = 2, b = 3',output:'5'},{input:'a = -4, b = 9',output:'5'}],
    constraints: ['-1.000.000 ≤ a, b ≤ 1.000.000','Gunakan tipe data int.'],
    hint: 'Operator + dapat langsung digunakan untuk menjumlahkan dua bilangan. Pastikan nilai yang dikembalikan berasal dari a dan b.',
    tests: [
      {label:'Contoh 1',expr:'solve(2, 3) == 5'}, {label:'Contoh 2',expr:'solve(-4, 9) == 5'},
      {label:'Bilangan negatif',expr:'solve(-12, -8) == -20',hidden:true}, {label:'Nilai nol',expr:'solve(0, 0) == 0',hidden:true},
      {label:'Batas nilai',expr:'solve(1000000, -999999) == 1',hidden:true}
    ]
  },
  {
    id: 'even-odd', title: 'Ganjil atau Genap', category: 'Dasar', difficulty: 'Easy', xp: 100, time: '10 min',
    signature: 'bool isEven(int n)',
    description: 'Buat fungsi <code>isEven</code> yang mengembalikan <code>true</code> jika sebuah bilangan termasuk genap, dan <code>false</code> jika ganjil. Bilangan negatif juga harus ditangani dengan benar.',
    starter: 'bool isEven(int n) {\n    // TODO: periksa apakah n merupakan bilangan genap\n    return false;\n}',
    examples: [{input:'n = 8',output:'true'},{input:'n = 13',output:'false'}],
    constraints: ['-1.000.000 ≤ n ≤ 1.000.000','Fungsi harus mengembalikan nilai boolean.'],
    hint: 'Gunakan operator modulus (%) untuk memeriksa sisa pembagian sebuah bilangan dengan 2.',
    tests: [
      {label:'Bilangan genap',expr:'isEven(8) == true'}, {label:'Bilangan ganjil',expr:'isEven(13) == false'},
      {label:'Bilangan nol',expr:'isEven(0) == true',hidden:true}, {label:'Genap negatif',expr:'isEven(-12) == true',hidden:true},
      {label:'Ganjil negatif',expr:'isEven(-7) == false',hidden:true}
    ]
  },
  {
    id: 'max-array', title: 'Nilai Terbesar Array', category: 'Array', difficulty: 'Easy', xp: 120, time: '15 min',
    signature: 'int findMax(vector<int> nums)',
    description: 'Diberikan sebuah array bilangan bulat. Temukan dan kembalikan nilai yang paling besar. Array dijamin memiliki setidaknya satu elemen.',
    starter: 'int findMax(vector<int> nums) {\n    // TODO: cari dan kembalikan nilai terbesar\n    return 0;\n}',
    examples: [{input:'nums = [3, 9, 2, 7]',output:'9'},{input:'nums = [-8, -2, -5]',output:'-2'}],
    constraints: ['1 ≤ nums.size() ≤ 10.000','-1.000.000 ≤ nums[i] ≤ 1.000.000'],
    hint: 'Simpan elemen pertama sebagai nilai terbesar sementara. Telusuri elemen berikutnya dan perbarui nilai tersebut saat menemukan angka yang lebih besar.',
    tests: [
      {label:'Contoh array',expr:'findMax(vector<int>{3, 9, 2, 7}) == 9'}, {label:'Semua negatif',expr:'findMax(vector<int>{-8, -2, -5}) == -2'},
      {label:'Satu elemen',expr:'findMax(vector<int>{42}) == 42',hidden:true}, {label:'Nilai duplikat',expr:'findMax(vector<int>{5, 5, 1, 5}) == 5',hidden:true},
      {label:'Array panjang',expr:'findMax(vector<int>{-4, 0, 16, 3, 9, 12}) == 16',hidden:true}
    ]
  },
  {
    id: 'palindrome', title: 'Deteksi Palindrome', category: 'String', difficulty: 'Easy', xp: 130, time: '15 min',
    signature: 'bool isPalindrome(string text)',
    description: 'Sebuah kata disebut palindrome jika dibaca dari kiri ke kanan maupun kanan ke kiri menghasilkan kata yang sama. Buat fungsi yang memeriksa apakah <code>text</code> merupakan palindrome. Anggap semua huruf menggunakan huruf kecil dan tidak mengandung spasi.',
    starter: 'bool isPalindrome(string text) {\n    // TODO: periksa apakah text adalah palindrome\n    return false;\n}',
    examples: [{input:'text = "katak"',output:'true'},{input:'text = "komputer"',output:'false'}],
    constraints: ['0 ≤ text.length() ≤ 10.000','String hanya berisi huruf a-z.'],
    hint: 'Bandingkan karakter paling kiri dengan karakter paling kanan. Bergeraklah menuju tengah sambil memastikan setiap pasangan karakter sama.',
    tests: [
      {label:'Palindrome genap',expr:'isPalindrome("level") == true'}, {label:'Bukan palindrome',expr:'isPalindrome("komputer") == false'},
      {label:'Palindrom pendek',expr:'isPalindrome("a") == true',hidden:true}, {label:'String kosong',expr:'isPalindrome("") == true',hidden:true},
      {label:'Palindrom panjang',expr:'isPalindrome("kasurrusak") == true',hidden:true}
    ]
  },
  {
    id: 'count-vowels', title: 'Hitung Huruf Vokal', category: 'String', difficulty: 'Easy', xp: 130, time: '15 min',
    signature: 'int countVowels(string text)',
    description: 'Buat fungsi untuk menghitung jumlah huruf vokal dalam sebuah string. Huruf vokal yang dihitung adalah <code>a</code>, <code>i</code>, <code>u</code>, <code>e</code>, dan <code>o</code>. Semua input menggunakan huruf kecil.',
    starter: 'int countVowels(string text) {\n    // TODO: hitung jumlah huruf vokal\n    return 0;\n}',
    examples: [{input:'text = "informatika"',output:'5'},{input:'text = "skripsi"',output:'2'}],
    constraints: ['0 ≤ text.length() ≤ 100.000','String hanya berisi huruf a-z.'],
    hint: 'Telusuri setiap karakter menggunakan perulangan. Untuk setiap karakter, periksa apakah karakter tersebut termasuk salah satu dari lima huruf vokal.',
    tests: [
      {label:'Contoh informatika',expr:'countVowels("informatika") == 5'}, {label:'Contoh skripsi',expr:'countVowels("skripsi") == 2'},
      {label:'Tanpa vokal',expr:'countVowels("rhythm") == 0',hidden:true}, {label:'Semua vokal',expr:'countVowels("aeiou") == 5',hidden:true},
      {label:'String kosong',expr:'countVowels("") == 0',hidden:true}
    ]
  },
  {
    id: 'factorial', title: 'Faktorial dengan Loop', category: 'Dasar', difficulty: 'Medium', xp: 180, time: '20 min',
    signature: 'long long factorial(int n)',
    description: 'Faktorial dari <code>n</code> adalah hasil perkalian semua bilangan bulat positif dari 1 sampai n. Secara khusus, <code>0! = 1</code>. Buat fungsi yang menghitung faktorial menggunakan perulangan, bukan rekursi.',
    starter: 'long long factorial(int n) {\n    // TODO: hitung n! menggunakan looping\n    return 1;\n}',
    examples: [{input:'n = 5',output:'120'},{input:'n = 0',output:'1'}],
    constraints: ['0 ≤ n ≤ 20','Gunakan tipe data long long.'],
    hint: 'Mulai dari hasil 1. Kalikan hasil dengan setiap bilangan dari 1 hingga n menggunakan for atau while.',
    tests: [
      {label:'Faktorial 5',expr:'factorial(5) == 120LL'}, {label:'Faktorial 0',expr:'factorial(0) == 1LL'},
      {label:'Faktorial 1',expr:'factorial(1) == 1LL',hidden:true}, {label:'Faktorial 8',expr:'factorial(8) == 40320LL',hidden:true},
      {label:'Batas maksimum',expr:'factorial(20) == 2432902008176640000LL',hidden:true}
    ]
  },
  {
    id: 'fizzbuzz', title: 'FizzBuzz Challenge', category: 'Array', difficulty: 'Medium', xp: 200, time: '25 min',
    signature: 'vector<string> fizzBuzz(int n)',
    description: 'Kembalikan deretan string dari angka 1 sampai n dengan aturan berikut: kelipatan 3 menjadi <code>"Fizz"</code>, kelipatan 5 menjadi <code>"Buzz"</code>, dan kelipatan keduanya menjadi <code>"FizzBuzz"</code>. Angka lainnya dikembalikan sebagai string angka tersebut.',
    starter: 'vector<string> fizzBuzz(int n) {\n    vector<string> result;\n    // TODO: isi result sesuai aturan FizzBuzz\n    return result;\n}',
    examples: [{input:'n = 5',output:'["1", "2", "Fizz", "4", "Buzz"]'},{input:'n = 15',output:'... "FizzBuzz"]'}],
    constraints: ['1 ≤ n ≤ 10.000','Urutan hasil harus dimulai dari 1.'],
    hint: 'Periksa kelipatan 3 dan 5 secara bersamaan terlebih dahulu. Setelah itu periksa kelipatan 3, kelipatan 5, lalu kasus angka biasa.',
    tests: [
      {label:'Sampai 5',expr:'fizzBuzz(5) == vector<string>{"1", "2", "Fizz", "4", "Buzz"}'},
      {label:'Sampai 15',expr:'fizzBuzz(15).back() == "FizzBuzz" && fizzBuzz(15)[14] == "FizzBuzz"'},
      {label:'Kelipatan 3',expr:'fizzBuzz(3) == vector<string>{"1", "2", "Fizz"}',hidden:true},
      {label:'Kelipatan 5',expr:'fizzBuzz(10)[9] == "Buzz"',hidden:true},
      {label:'Pola 15 angka',expr:'fizzBuzz(15).size() == 15 && fizzBuzz(15)[2] == "Fizz" && fizzBuzz(15)[4] == "Buzz"',hidden:true}
    ]
  },
  {
    id: 'two-sum', title: 'Two Sum', category: 'Array', difficulty: 'Medium', xp: 250, time: '30 min',
    signature: 'vector<int> twoSum(vector<int> nums, int target)',
    description: 'Diberikan array <code>nums</code> dan sebuah <code>target</code>. Kembalikan dua indeks berbeda yang nilai elemennya jika dijumlahkan sama dengan target. Dijamin terdapat tepat satu pasangan jawaban. Urutan indeks tidak harus diurutkan.',
    starter: 'vector<int> twoSum(vector<int> nums, int target) {\n    // TODO: temukan dua indeks dengan jumlah == target\n    return {};\n}',
    examples: [{input:'nums = [2, 7, 11, 15], target = 9',output:'[0, 1]'},{input:'nums = [3, 2, 4], target = 6',output:'[1, 2]'}],
    constraints: ['2 ≤ nums.size() ≤ 10.000','-1.000.000 ≤ nums[i], target ≤ 1.000.000','Setiap indeks hanya boleh digunakan satu kali.'],
    hint: 'Mulai dari pendekatan dua perulangan: pilih satu elemen, lalu cari pasangan di posisi setelahnya. Setelah berhasil, kamu bisa mencoba optimasi menggunakan unordered_map.',
    tests: [
      {label:'Contoh pertama',expr:'twoSum(vector<int>{2, 7, 11, 15}, 9) == vector<int>{0, 1}'},
      {label:'Contoh kedua',expr:'twoSum(vector<int>{3, 2, 4}, 6) == vector<int>{1, 2}'},
      {label:'Bilangan negatif',expr:'twoSum(vector<int>{-3, 4, 3, 90}, 0) == vector<int>{0, 2}',hidden:true},
      {label:'Angka duplikat',expr:'twoSum(vector<int>{3, 3}, 6) == vector<int>{0, 1}',hidden:true},
      {label:'Target negatif',expr:'twoSum(vector<int>{-5, -2, -8, 1}, -7) == vector<int>{0, 1}',hidden:true}
    ]
  }
];

const $ = (selector) => document.querySelector(selector);
const state = loadProgress();
let activeChallenge = challenges.find(c => c.id === state.lastTaskId) || challenges[0];
let activeFilter = 'all';
let editor = null;
let compiler = null;
let compileBusy = false;
let lastResult = null;
let timerInterval = null;
let activeConsoleTab = 'output';

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { solved: Array.isArray(saved.solved) ? saved.solved : [], drafts: saved.drafts || {}, bookmarks: saved.bookmarks || [], attempts: saved.attempts || 0, xp: saved.xp || 0, lastTaskId: saved.lastTaskId || null };
  } catch { return { solved: [], drafts: {}, bookmarks: [], attempts: 0, xp: 0, lastTaskId: null }; }
}
function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function toast(message, kind = '') {
  const el = document.createElement('div'); el.className = `toast ${kind}`; el.textContent = message; $('#toastRegion').append(el); setTimeout(() => el.remove(), 3400);
}
function setConsole(tab) {
  activeConsoleTab = tab;
  document.querySelectorAll('[data-console-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.consoleTab === tab));
  $('#outputView').classList.toggle('hidden', tab !== 'output');
  $('#testsView').classList.toggle('hidden', tab !== 'tests');
}
function updateProgress() {
  const count = state.solved.length; const percent = Math.round(count / challenges.length * 100);
  $('#solvedCount').textContent = count; $('#xpTotal').textContent = state.xp; $('#progressPercent').textContent = `${percent}%`; $('#progressBar').style.width = `${percent}%`;
  $('#progressPercent').title = `${state.xp} XP terkumpul`;
}
function renderChallengeList() {
  const query = $('#searchInput').value.trim().toLowerCase();
  const visible = challenges.filter(ch => (activeFilter === 'all' || ch.category === activeFilter) && `${ch.title} ${ch.category}`.toLowerCase().includes(query));
  $('#challengeList').innerHTML = visible.map(ch => `
    <button class="challenge-item ${ch.id === activeChallenge.id ? 'active' : ''}" data-challenge="${ch.id}">
      <span class="challenge-number">${String(challenges.indexOf(ch)+1).padStart(2,'0')}</span>
      <span class="challenge-name">${escapeHTML(ch.title)}</span>
      <span class="challenge-xp">${ch.xp}</span>
      <span class="challenge-check">${state.solved.includes(ch.id) ? '✓' : ''}</span>
    </button>`).join('') || '<div class="empty-console"><div><strong>Challenge tidak ditemukan</strong><p>Coba kata kunci lain.</p></div></div>';
  $('#challengeCount').textContent = String(visible.length).padStart(2,'0');
  document.querySelectorAll('[data-challenge]').forEach(btn => btn.addEventListener('click', () => selectChallenge(btn.dataset.challenge)));
}
function renderChallenge() {
  const ch = activeChallenge;
  $('#problemNumber').textContent = String(challenges.indexOf(ch)+1).padStart(2,'0');
  $('#problemTitle').textContent = ch.title;
  $('#problemDifficulty').textContent = ch.difficulty.toUpperCase();
  $('#problemDifficulty').className = `difficulty ${ch.difficulty.toLowerCase()}`;
  $('#problemXP').textContent = ch.xp;
  $('#problemTime').textContent = ch.time;
  $('#problemDescription').innerHTML = ch.description;
  $('#functionSignature').textContent = ch.signature;
  $('#examples').innerHTML = ch.examples.map((ex,i) => `<div class="example-card"><div class="example-label">EXAMPLE ${i+1}</div><div class="example-io"><div class="io-cell"><small>INPUT</small><code>${escapeHTML(ex.input)}</code></div><div class="io-cell"><small>OUTPUT</small><code>${escapeHTML(ex.output)}</code></div></div></div>`).join('');
  $('#constraintsList').innerHTML = ch.constraints.map(item => `<li>${escapeHTML(item)}</li>`).join('');
  $('#hintText').textContent = ch.hint;
  const solved = state.solved.includes(ch.id);
  $('#solvedBadge').classList.toggle('hidden', !solved);
  $('#bookmarkBtn').classList.toggle('bookmarked', state.bookmarks.includes(ch.id));
  $('#bookmarkBtn').textContent = state.bookmarks.includes(ch.id) ? '◆' : '◇';
  const draft = state.drafts[ch.id] || ch.starter;
  if (editor) editor.dispatch({changes:{from:0,to:editor.state.doc.length,insert:draft}});
  else $('#codeFallback').value = draft;
  $('#lineCount').textContent = '1';
  renderChallengeList(); updateProgress();
  clearConsole();
}
function selectChallenge(id) {
  const next = challenges.find(ch => ch.id === id); if (!next) return;
  if (editor) state.drafts[activeChallenge.id] = editor.state.doc.toString();
  activeChallenge = next; state.lastTaskId = id; saveProgress(); renderChallenge();
  document.querySelectorAll('[data-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === 'description'));
  $('#descriptionTab').classList.remove('hidden'); $('#hintsTab').classList.add('hidden');
}
function getCode() { return editor ? editor.state.doc.toString() : $('#codeFallback').value; }
function setCode(text) { if (editor) editor.dispatch({changes:{from:0,to:editor.state.doc.length,insert:text}}); else $('#codeFallback').value=text; }
function persistDraft() { state.drafts[activeChallenge.id] = getCode(); state.lastTaskId=activeChallenge.id; saveProgress(); $('#editorStatus').textContent='All changes saved'; }
function initEditor() {
  try {
    editor = new EditorView({
      doc: state.drafts[activeChallenge.id] || activeChallenge.starter,
      extensions: [basicSetup, cpp(), oneDark, EditorView.lineWrapping, EditorView.theme({
        '&': {height:'100%',backgroundColor:'#0b121c',color:'#d7e3ee',fontSize:'12px'},
        '.cm-scroller': {fontFamily:"'DM Mono', monospace",lineHeight:'1.7',overflow:'auto'},
        '.cm-gutters': {backgroundColor:'#0b121c',borderRight:'1px solid #1c2a3b',color:'#53667c'},
        '.cm-activeLine': {backgroundColor:'rgba(114,153,128,.08)'}
      }), EditorView.updateListener.of(update => {
        if (update.docChanged) { persistDraft(); $('#lineCount').textContent = String(update.state.doc.lines); }
      })],
      parent: $('#editorHost')
    });
    $('#codeFallback').remove();
  } catch (error) {
    console.warn('CodeMirror unavailable; falling back to textarea.', error);
    $('#editorStatus').textContent = 'Fallback editor';
    $('#codeFallback').addEventListener('input', () => { persistDraft(); $('#lineCount').textContent = String($('#codeFallback').value.split('\n').length); });
  }
}
function clearConsole() {
  $('#outputView').innerHTML = '<div class="empty-console"><span class="terminal-glyph">›_</span><div><strong>Output terminal</strong><p>Jalankan kode untuk melihat hasil kompilasi dan output program.</p></div></div>';
  $('#testsView').innerHTML = '<div class="empty-console"><span class="terminal-glyph">✓</span><div><strong>Belum ada hasil test</strong><p>Tekan Run Code atau Submit untuk mulai menguji solusi.</p></div></div>';
  $('#testResultCount').textContent = '—'; $('#runDuration').textContent=''; lastResult=null;
}
function showOutput(text, kind='') {
  $('#outputView').innerHTML = `<pre class="console-output ${kind}">${escapeHTML(text)}</pre>`;
  setConsole('output');
}
function makeJudgeSource(code, testCases) {
  const calls = testCases.map((test, index) => `    testCase(${index+1}, (${test.expr}));`).join('\n');
  return `#include <bits/stdc++.h>\nusing namespace std;\n\n${code}\n\nint main() {\n    int passed = 0;\n    auto testCase = [&](int id, bool ok) {\n        cout << "__CASE__|" << id << "|" << (ok ? "PASS" : "FAIL") << "\\n";\n        if (ok) ++passed;\n    };\n${calls}\n    cout << "__SUMMARY__|" << passed << "|${testCases.length}" << "\\n";\n    return 0;\n}\n`;
}
function parseJudgeOutput(stdout, tests) {
  const cases=[]; let passed=0; let total=tests.length;
  for (const line of String(stdout || '').split(/\r?\n/)) {
    const match=line.match(/^__CASE__\|(\d+)\|(PASS|FAIL)$/);
    if (match) { const index=Number(match[1])-1; cases.push({index,status:match[2]}); if(match[2]==='PASS')passed++; }
    const summary=line.match(/^__SUMMARY__\|(\d+)\|(\d+)$/);
    if(summary){passed=Number(summary[1]);total=Number(summary[2]);}
  }
  const extra=String(stdout || '').split(/\r?\n/).filter(line=>!line.startsWith('__CASE__|')&&!line.startsWith('__SUMMARY__|')&&line.trim()).join('\n');
  return {cases,passed,total,extra};
}
function renderTestResults(result, tests, mode) {
  const allPassed = result.passed === result.total && result.total > 0;
  $('#testResultCount').textContent = `${result.passed}/${result.total}`;
  $('#testsView').innerHTML = `
    <div class="result-summary ${allPassed?'pass':'fail'}"><div class="result-score">${result.passed}/${result.total}</div><div><strong>${allPassed?'Semua test berhasil':'Masih ada test yang gagal'}</strong><br><small>${mode==='submit'?'SUBMISSION TEST':'SAMPLE TEST'} · ${result.total} TEST CASE</small></div></div>
    ${tests.map((test,i)=>{const item=result.cases.find(c=>c.index===i);const ok=item?.status==='PASS';return `<div class="test-row"><div class="case-left"><span class="case-status ${ok?'pass':'fail'}">${ok?'✓':'×'}</span><span>${escapeHTML(test.hidden?'Hidden test':test.label)}</span></div><small>${ok?'PASSED':'FAILED'}</small></div>`;}).join('')}
    ${result.extra?`<pre class="console-output muted" style="margin-top:10px">${escapeHTML(result.extra)}</pre>`:''}`;
  setConsole('tests');
  return allPassed;
}
function showLoading(title, message) { $('#loadingTitle').textContent=title; $('#loadingMessage').textContent=message; $('#loadingProgress').style.width='12%'; $('#loadingOverlay').classList.remove('hidden'); }
function updateLoading(title,message,percent) { $('#loadingTitle').textContent=title; $('#loadingMessage').textContent=message; $('#loadingProgress').style.width=`${percent}%`; }
function hideLoading() { $('#loadingOverlay').classList.add('hidden'); }
async function getCompiler() {
  if (compiler) return compiler;
  showLoading('Menyiapkan compiler...', 'Menyiapkan lingkungan WebAssembly untuk C++.');
  try {
    updateLoading('Memeriksa keamanan browser...', 'Menunggu Cross-Origin Isolation dari service worker GitHub Pages.', 24);
    // The self-hosted COI service worker is loaded by index.html and controls
    // this page after its first registration/reload.
    const isolationDeadline = Date.now() + 5000;
    while (!crossOriginIsolated && Date.now() < isolationDeadline) {
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    if (!crossOriginIsolated) {
      throw new Error('Cross-Origin Isolation belum aktif. Pastikan file coi-serviceworker.js termuat, buka situs melalui HTTPS, lalu refresh halaman.');
    }

    updateLoading('Memuat modul compiler...', 'Menghubungkan runtime C++ WebAssembly.', 42);
    const failures = [];
    for (const url of EMCEPTION_CDN_CANDIDATES) {
      try {
        const module = await import(url);
        if (typeof module.createEmception !== 'function') {
          throw new Error('createEmception tidak ditemukan pada modul CDN.');
        }
        updateLoading('Memuat toolchain C++...', 'Clang dan library standar sedang dimuat ke browser.', 58);
        compiler = await module.createEmception({tty:'none'});
        break;
      } catch (error) {
        failures.push(`${url}: ${error?.message || error}`);
        console.warn('Compiler CDN gagal dimuat:', url, error);
      }
    }
    if (!compiler) {
      throw new Error(`Gagal memuat compiler dari seluruh CDN:\\n${failures.join('\\n')}\\nPeriksa koneksi internet atau coba beberapa saat lagi.`);
    }
    if (compiler?.on) compiler.on('progress', event => {
      const phase=event?.phase || 'Memuat runtime';
      const message=event?.message || phase;
      const percent=event?.total ? Math.min(92,50+Math.round((event.current/event.total)*40)) : 65;
      updateLoading('Memuat toolchain C++...', message, percent);
    });
    updateLoading('Compiler siap', 'Lingkungan C++ berhasil disiapkan.', 100);
    return compiler;
  } catch(error) {
    compiler=null;
    throw error;
  } finally {
    setTimeout(hideLoading, 280);
  }
}
function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(`${label} melebihi batas waktu ${Math.round(ms/1000)} detik.`)),ms);});
  return Promise.race([promise,timeout]).finally(()=>clearTimeout(timer));
}
async function runChallenge(mode) {
  if (compileBusy) return;
  const code=getCode();
  if (!code.trim()) { toast('Editor masih kosong. Tulis solusi terlebih dahulu.','bad'); return; }
  if (/\bint\s+main\s*\(/.test(code) || /\bauto\s+main\s*\(/.test(code)) { toast('Jangan tulis main(). Cukup implementasikan function signature pada soal.','bad'); return; }
  compileBusy=true; $('#runBtn').disabled=true; $('#submitBtn').disabled=true;
  $('#runBtn').innerHTML='<span>◌</span> Compiling...'; $('#submitBtn').textContent='Checking...';
  const tests=mode==='submit'?activeChallenge.tests:activeChallenge.tests.filter(t=>!t.hidden);
  const started=performance.now(); state.attempts++; saveProgress();
  try {
    startTimer();
    const api=await getCompiler();
    hideLoading();
    showOutput('> Menyiapkan source code...\n> Mengompilasi dengan Clang C++20...','muted');
    await api.workspace.writeFile('/home/user/default/main.cpp',makeJudgeSource(code,tests));
    const compileResult=await withTimeout(api.run('clang',['-std=c++20','-O2','/home/user/default/main.cpp','-o','/home/user/default/arena-program']),90000,'Kompilasi');
    if (compileResult.exitCode!==0) {
      const errorText=compileResult.stderr || compileResult.stdout || 'Compiler mengembalikan error tanpa detail.';
      showOutput(`COMPILATION ERROR\n\n${errorText}`,'error');
      $('#testResultCount').textContent='CE'; toast('Periksa kembali kode C++ kamu.','bad'); return;
    }
    showOutput('> Compile berhasil.\n> Menjalankan test case...','muted');
    const runResult=await withTimeout(api.run('/home/user/default/arena-program',[]),7000,'Eksekusi program');
    if (runResult.exitCode!==0) {
      const errorText=runResult.stderr || `Program berhenti dengan exit code ${runResult.exitCode}.`;
      showOutput(`RUNTIME ERROR\n\n${errorText}`,'error'); $('#testResultCount').textContent='RE'; toast('Program mengalami runtime error.','bad'); return;
    }
    const result=parseJudgeOutput(runResult.stdout,tests);
    if (result.cases.length!==tests.length) throw new Error('Output test harness tidak lengkap. Pastikan kode solusi tidak mengubah alur main() milik sistem.');
    const allPassed=renderTestResults(result,tests,mode);
    const duration=Math.round(performance.now()-started);
    $('#runDuration').textContent=`${duration} ms`;
    if (mode==='submit' && allPassed) {
      const isNew=!state.solved.includes(activeChallenge.id);
      if (isNew) { state.solved.push(activeChallenge.id); state.xp+=activeChallenge.xp; saveProgress(); updateProgress(); renderChallengeList(); $('#solvedBadge').classList.remove('hidden'); }
      toast(isNew?`Accepted! +${activeChallenge.xp} XP`:'Accepted! Challenge sudah pernah diselesaikan.', 'good');
    } else if (allPassed) toast('Sample test berhasil. Saatnya Submit untuk hidden test.','good');
    else toast('Belum lolos semua test. Periksa kembali logika program.','bad');
  } catch(error) {
    console.error(error);
    const message=error?.message || String(error);
    showOutput(`EXECUTION ERROR\n\n${message}\n\nPastikan browser mendukung WebAssembly dan service worker tidak diblokir.`,'error');
    $('#testResultCount').textContent='ERR';
    if (/melebihi batas waktu/.test(message)) { try{compiler?.dispose?.();}catch{} compiler=null; }
    toast('Eksekusi gagal. Detail tersedia di Output.','bad');
  } finally {
    compileBusy=false; $('#runBtn').disabled=false; $('#submitBtn').disabled=false;
    $('#runBtn').innerHTML='<span>▶</span> Run Code'; $('#submitBtn').innerHTML='<span>✓</span> Submit <span class="submit-arrow">↗</span>';
    persistDraft();
  }
}
function startTimer() {
  let startedAt=Number(localStorage.getItem(START_KEY));
  if (!startedAt) { startedAt=Date.now(); localStorage.setItem(START_KEY,String(startedAt)); }
  if (timerInterval) return;
  $('#startTimerBtn').textContent='Sesi Aktif'; $('#startTimerBtn').disabled=true;
  const tick=()=>{
    const remaining=Math.max(0,SESSION_SECONDS-Math.floor((Date.now()-startedAt)/1000));
    const mins=String(Math.floor(remaining/60)).padStart(2,'0'); const secs=String(remaining%60).padStart(2,'0');
    $('#timerDisplay').textContent=`${mins}:${secs}`;
    if(remaining===0){clearInterval(timerInterval);timerInterval=null;$('#timerDisplay').style.color='var(--red)';toast('Waktu sesi hackathon telah habis.');}
  };
  tick(); timerInterval=setInterval(tick,1000);
}
function bindEvents() {
  document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    activeFilter=btn.dataset.filter; document.querySelectorAll('[data-filter]').forEach(item=>item.classList.toggle('active',item===btn)); renderChallengeList();
  }));
  $('#searchInput').addEventListener('input',renderChallengeList);
  $('#searchInput').addEventListener('keydown',event=>{if(event.key==='Escape'){$('#searchInput').value='';renderChallengeList();}});
  document.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    const tab=btn.dataset.tab; document.querySelectorAll('[data-tab]').forEach(item=>item.classList.toggle('active',item===btn));
    $('#descriptionTab').classList.toggle('hidden',tab!=='description'); $('#hintsTab').classList.toggle('hidden',tab!=='hints');
  }));
  document.querySelectorAll('[data-console-tab]').forEach(btn=>btn.addEventListener('click',()=>setConsole(btn.dataset.consoleTab)));
  $('#runBtn').addEventListener('click',()=>runChallenge('run'));
  $('#submitBtn').addEventListener('click',()=>runChallenge('submit'));
  $('#startTimerBtn').addEventListener('click',startTimer);
  $('#resetCodeBtn').addEventListener('click',()=>{setCode(activeChallenge.starter);persistDraft();toast('Kode dikembalikan ke template awal.');});
  $('#downloadCodeBtn').addEventListener('click',()=>{
    const blob=new Blob([getCode()],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${activeChallenge.id}.cpp`;a.click();URL.revokeObjectURL(url);toast('File C++ berhasil disiapkan untuk diunduh.','good');
  });
  $('#copySignatureBtn').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(activeChallenge.signature);toast('Function signature disalin.','good');}catch{toast('Clipboard tidak tersedia di browser ini.','bad');}});
  $('#bookmarkBtn').addEventListener('click',()=>{
    const index=state.bookmarks.indexOf(activeChallenge.id);if(index>=0)state.bookmarks.splice(index,1);else state.bookmarks.push(activeChallenge.id);saveProgress();renderChallenge();
  });
  $('#clearOutputBtn').addEventListener('click',clearConsole);
  document.addEventListener('keydown',event=>{
    if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();runChallenge('run');}
    if(event.key==='/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !document.activeElement.closest('.cm-content')){event.preventDefault();$('#searchInput').focus();}
  });
}

function init() {
  initEditor(); bindEvents(); renderChallenge();
  if(Number(localStorage.getItem(START_KEY))) startTimer();
}
init();
