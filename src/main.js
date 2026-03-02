import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { pythonCode, javaCode, cppCode } from './codeData.js';
import { initMatrix } from './matrix.js';
import { detectLanguage, getLanguageDisplayName, getSupportedLanguages, LANGUAGES } from './languageDetector.js';

let editors = {};
let outputHistory = '';
let sessionState = {
  language: null,
  challenge: null,
  challengeName: null,
  inputsNeeded: [],
  inputsCollected: [],
  step: 'menu'
};

const challengeData = {
  python: {
    1: { name: 'List of Flavors', inputs: ['how many combinations to show (1-10)'] },
    2: { name: 'List Numbers Command', inputs: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'] },
    3: { name: 'Looping the Array', inputs: ['number 1', 'number 2', 'number 3', 'number 4', 'number 5'] },
    4: { name: 'User Info Input', inputs: ['your name', 'your age', 'your birth year'] },
    5: { name: 'Missing Numbers', inputs: ['number 1 (0-100)', 'number 2', 'number 3', 'number 4', 'number 5'] },
    6: { name: 'DNA Sequence Analysis', inputs: [] },
    7: { name: 'The Calculator', inputs: ['first number', 'operation (ADD/SUB/MULT/DIV/EXP/SQRT)', 'second number (skip for SQRT)'] },
    8: { name: 'Divisibility by 7', inputs: ['start number', 'end number (max 500)'] },
    9: { name: 'Numbers & Letters Input', inputs: ['a sentence to analyze'] },
    10: { name: 'Circle Area (v1)', inputs: ['the radius'] },
    11: { name: 'Rock Paper Scissors', inputs: ['rock, paper, or scissors'] },
    12: { name: 'Circle Area (v2)', inputs: ['the radius'] },
    13: { name: 'Password Validator', inputs: ['a password to check'] },
    14: { name: 'Dictionary Demo', inputs: [] },
    15: { name: 'Sum Two Random Numbers', inputs: [] },
    16: { name: 'Temperature Conversion', inputs: ['temperature with scale (e.g. 100C)', 'convert to (F/C/K)'] },
    17: { name: 'Password Generator', inputs: ['include custom word? (yes/no)', 'custom word (if yes)', 'password length (8-30)'] },
    18: { name: 'Watch Program', inputs: ['mode (time/timer/stopwatch/reaction/back)', 'duration in seconds (for timer/stopwatch, max 60)'] },
    19: { name: 'List Multiplication', inputs: ['number 1', 'number 2', 'number 3', 'number 4', 'number 5'] },
    20: { name: 'Euclidean Algorithm (GCD)', inputs: ['first number', 'second number'] },
    21: { name: 'Question Marks Puzzle', inputs: ['a string to check (e.g. aa6???9)'] },
    22: { name: 'Prime Number Checker', inputs: ['a number to check'] },
    23: { name: 'Dark Outside?', inputs: ['hour (0-23)', 'timezone (Eastern/Central/Mountain/Pacific)'] },
    24: { name: 'Target Text Matching', inputs: ['target text (max 10 chars)'] },
    25: { name: 'Heads or Tails', inputs: ['heads or tails'] },
    26: { name: 'Quadratic Equation Solver', inputs: ['coefficient a', 'coefficient b', 'coefficient c'] },
    27: { name: 'Story Game: Top Secret', inputs: ['your codename (e.g. Agent, Johnny Bravo)', 'the passcode (hint: Encryption)', 'action when you find bomb (run/defuse)', 'wire color to cut (red/blue/green/yellow/orange)'] }
  },
  java: {
    1: { name: 'Weight Converter', inputs: ['amount to convert', 'from unit (lbs/kg/oz/g/st/mg)', 'to unit (lbs/kg/oz/g/st/mg)'] },
    2: { name: 'Driving Cost Calculator', inputs: ['distance (miles)', 'gallons used', 'price per gallon'] },
    3: { name: 'Rounding Demo', inputs: [] },
    4: { name: 'Heads or Tails', inputs: ['heads or tails'] },
    5: { name: 'Random Element', inputs: ['element 1', 'element 2', 'element 3', 'element 4', 'element 5'] },
    6: { name: 'Matrix Keywords', inputs: [] },
    7: { name: 'Connect Four', inputs: ['column (1-7)', 'column (1-7)', 'column (1-7)', 'column (1-7)', 'column (1-7)', 'column (1-7)', 'column (1-7)', 'column (1-7)'] },
    8: { name: 'Circle Overlap', inputs: ['circle 1 x', 'circle 1 y', 'circle 1 radius', 'circle 2 x', 'circle 2 y', 'circle 2 radius'] },
    9: { name: 'Pentagon Area', inputs: ['distance from center to vertex'] },
    10: { name: 'SSN Validator', inputs: ['social security number (XXX-XX-XXXX)'] },
    11: { name: 'Character Limit', inputs: ['text to check', 'character limit'] },
    12: { name: 'Tuition Calculator', inputs: ['starting tuition', 'annual increase (e.g. 0.05)', 'number of years'] },
    13: { name: 'Max Digit Occurrence', inputs: ['a number'] },
    14: { name: 'Array Summation', inputs: ['row 1 (comma-separated)', 'row 2 (comma-separated)'] },
    15: { name: 'Return Statement Demo', inputs: [] },
    16: { name: 'Factorial Calculator', inputs: ['a number (max 20)'] },
    17: { name: 'GPS Program', inputs: ['location A latitude', 'location A longitude', 'location B latitude', 'location B longitude'] }
  },
  cpp: {
    1: { name: 'Bike Race Calculator', inputs: ['your name', 'your distance (km)', 'your time (hours)'] },
    2: { name: 'Scamazon Tech Shop', hint: 'Products: [a]USB-C Hub $29.99 [b]Wireless Mouse $24.99 [c]Mechanical Keyboard $89.99 [d]4K Webcam $79.99 [e]Gaming Monitor $299.99 [f]Laptop Stand $39.99 [g]Ring Light $34.99 [h]Bluetooth Earbuds $49.99 [i]External SSD $109.99 [j]Portable Charger $29.99 [k]HDMI Cable $12.99 [l]USB Flash Drive $9.99 [m]Microphone $129.99 [n]Graphics Tablet $69.99 [o]Raspberry Pi Kit $74.99', inputs: ['product letter (a-o)', 'quantity (1-10)', 'your balance ($)', 'shipping cost ($)', 'tip percent (0-100)', 'tax percent (0-20)', 'checkout? (y/n)', 'payment (cash/card)'] },
    3: { name: 'Scientific Calculator', inputs: ['mode (basic/sqrt/trig/log/convert/factorial/constants/quadratic)', 'value 1', 'value 2 (operator for basic: +,-,*,/,^,%)', 'value 3 (if needed)'] }
  }
};

function scrollOutputToBottom() {
  const output = document.getElementById('output-display');
  if (output) {
    requestAnimationFrame(() => {
      output.scrollTop = output.scrollHeight;
    });
  }
}

function appendToHistory(text) {
  outputHistory += text;
  const output = document.getElementById('output-display');
  if (output) {
    output.textContent = outputHistory;
    scrollOutputToBottom();
  }
}

function clearLine() {
  appendToHistory('\n');
}

function triggerGlitch() {
  const container = document.querySelector('.main-container');
  if (container) {
    container.classList.add('glitch-effect');
    setTimeout(() => container.classList.remove('glitch-effect'), 200);
  }
}

function triggerShake(element) {
  if (element) {
    element.classList.add('shake-effect');
    setTimeout(() => element.classList.remove('shake-effect'), 300);
  }
}

function createSpark(x, y) {
  const spark = document.createElement('div');
  spark.className = 'spark';
  spark.style.left = x + 'px';
  spark.style.top = y + 'px';
  document.body.appendChild(spark);

  const angle = Math.random() * Math.PI * 2;
  const distance = 50 + Math.random() * 100;
  const endX = x + Math.cos(angle) * distance;
  const endY = y + Math.sin(angle) * distance;

  spark.animate([
    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
    { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
  ], {
    duration: 600 + Math.random() * 400,
    easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
  }).onfinish = () => spark.remove();
}

function createSparkBurst(element) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    setTimeout(() => createSpark(centerX, centerY), i * 30);
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/code-executor`;
const PISTON_API = 'https://emkc.org/api/v2/piston';

const embeddedLanguageMap = {
  'python': { name: 'python', version: '3.10.0' },
  'java': { name: 'java', version: '15.0.2' },
  'cpp': { name: 'c++', version: '10.2.0' },
  'c++': { name: 'c++', version: '10.2.0' },
};

let currentDetectedLanguage = null;

async function runCode(code, language, stdin = '') {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        code: code,
        language: language.name,
        stdin: stdin,
      })
    });

    if (!response.ok) {
      throw new Error(`Edge function error: ${response.status}`);
    }

    const text = await response.text();
    if (!text || text.trim() === '') {
      throw new Error('Empty response');
    }

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error('Invalid JSON response');
    }

    if (result.success) {
      return { success: true, output: result.output || '(no output)' };
    } else {
      return { success: false, output: result.error || 'Unknown error' };
    }
  } catch (error) {
    console.log('Edge function failed, using fallback:', error.message);
    return await runCodeFallback(code, language, stdin);
  }
}

async function runCodeFallback(code, language, stdin = '') {
  try {
    const response = await fetch(`${PISTON_API}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: language.name,
        version: language.version,
        files: [{ content: code }],
        stdin: stdin
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const text = await response.text();
    if (!text || text.trim() === '') {
      throw new Error('Empty response from Piston');
    }

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error('Invalid JSON from Piston');
    }

    if (result.run) {
      let output = '';
      if (result.run.stdout) output += result.run.stdout;
      if (result.run.stderr) output += '\nSTDERR:\n' + result.run.stderr;
      if (result.compile && result.compile.stderr) {
        output = 'COMPILE ERROR:\n' + result.compile.stderr + '\n' + output;
      }
      return { success: result.run.code === 0, output: output || '(no output)' };
    }
    return { success: false, output: 'Unexpected response from server' };
  } catch (error) {
    return { success: false, output: 'Execution failed: ' + error.message };
  }
}

function resetSessionState() {
  sessionState = {
    language: null,
    challenge: null,
    challengeName: null,
    inputsNeeded: [],
    inputsCollected: [],
    step: 'menu'
  };
}

function getNextPrompt() {
  if (sessionState.step === 'menu') {
    return 'Enter challenge/project number (or press enter for menu)';
  }
  if (sessionState.step === 'collecting' && sessionState.inputsNeeded.length > 0) {
    const inputIndex = sessionState.inputsCollected.length;
    const nextInput = sessionState.inputsNeeded[inputIndex];
    const inputNum = inputIndex + 1;
    const total = sessionState.inputsNeeded.length;
    return `Input ${inputNum}/${total}: Enter ${nextInput}`;
  }
  return 'Enter input';
}

function updateInputPlaceholder() {
  const input = document.getElementById('terminal-input');
  if (input) {
    input.placeholder = getNextPrompt();
  }
}

async function executeEmbeddedCode(langKey) {
  const executeBtn = document.getElementById('execute-btn');
  const status = document.getElementById('output-status');
  const outputEl = document.getElementById('output-display');

  executeBtn.disabled = true;
  showHexagonMonitor();

  let code = editors[langKey].state.doc.toString();
  let detectedLang = embeddedLanguageMap[langKey] || detectLanguage(code);

  sessionState.language = langKey;
  sessionState.step = 'menu';
  sessionState.challenge = null;
  sessionState.inputsCollected = [];

  appendToHistory('\n' + '='.repeat(50) + '\n');
  appendToHistory(`Executing ${detectedLang.name.toUpperCase()}...\n`);
  appendToHistory('='.repeat(50) + '\n\n');

  status.textContent = 'Running...';

  const result = await runCode(code, detectedLang, '');

  createSparkBurst(outputEl);

  appendToHistory(result.output + '\n');
  status.textContent = result.success ? 'Ready for input' : 'Error';

  updateInputPlaceholder();
  executeBtn.disabled = false;
}

async function handleUserInput() {
  const terminalInput = document.getElementById('terminal-input');
  const executeBtn = document.getElementById('execute-btn');
  const status = document.getElementById('output-status');
  const outputEl = document.getElementById('output-display');

  const inputValue = terminalInput.value.trim();
  terminalInput.value = '';

  triggerGlitch();
  triggerShake(document.querySelector('.terminal-input-container'));

  const activeTab = document.querySelector('.tab.active').dataset.tab;

  if (activeTab === 'custom') {
    if (!inputValue) return;
    appendToHistory(`\n> ${inputValue}\n\n`);
    executeBtn.disabled = true;
    showHexagonMonitor();

    const code = editors.custom.state.doc.toString();
    const filename = document.getElementById('current-filename')?.textContent || '';
    const detected = detectLanguage(code, filename);
    currentDetectedLanguage = detected;

    status.textContent = 'Executing...';
    const result = await runCode(code, detected, inputValue);

    createSparkBurst(outputEl);
    if (result.provider) {
      appendToHistory(`[Executed via ${result.provider}]\n\n`);
    }
    appendToHistory(result.output + '\n');
    status.textContent = result.success ? 'Complete' : 'Error';

    executeBtn.disabled = false;
    return;
  }

  const langKey = activeTab;
  const code = editors[langKey].state.doc.toString();
  const detectedLang = embeddedLanguageMap[langKey] || detectLanguage(code);

  if (!inputValue) {
    appendToHistory(`\n[Returning to menu...]\n\n`);
    executeBtn.disabled = true;
    status.textContent = 'Loading menu...';

    const result = await runCode(code, detectedLang, '');

    createSparkBurst(outputEl);
    appendToHistory(result.output + '\n');
    status.textContent = 'Ready for input';

    sessionState.step = 'menu';
    sessionState.challenge = null;
    sessionState.inputsCollected = [];
    updateInputPlaceholder();
    executeBtn.disabled = false;
    return;
  }

  appendToHistory(`\n> ${inputValue}\n\n`);

  if (sessionState.step === 'menu') {
    const challengeNum = parseInt(inputValue);
    if (isNaN(challengeNum)) {
      appendToHistory('Please enter a valid number.\n');
      return;
    }

    const challengeInfo = challengeData[langKey]?.[challengeNum];
    if (!challengeInfo) {
      appendToHistory(`Invalid choice: ${challengeNum}\n`);
      return;
    }

    sessionState.challenge = challengeNum;
    sessionState.challengeName = challengeInfo.name;
    sessionState.inputsNeeded = challengeInfo.inputs;
    sessionState.inputsCollected = [];

    if (challengeInfo.inputs.length === 0) {
      executeBtn.disabled = true;
      status.textContent = 'Running...';

      const result = await runCode(code, detectedLang, String(challengeNum));

      createSparkBurst(outputEl);
      appendToHistory(result.output + '\n');
      status.textContent = 'Ready';

      sessionState.step = 'menu';
      updateInputPlaceholder();
      executeBtn.disabled = false;
    } else {
      sessionState.step = 'collecting';
      appendToHistory(`--- Challenge ${challengeNum}: ${challengeInfo.name} ---\n`);
      if (challengeInfo.hint) {
        appendToHistory(`${challengeInfo.hint}\n\n`);
      }
      appendToHistory(`This challenge needs ${challengeInfo.inputs.length} input(s):\n`);
      challengeInfo.inputs.forEach((inp, i) => {
        appendToHistory(`  ${i + 1}. ${inp}\n`);
      });
      appendToHistory(`\n`);
      updateInputPlaceholder();
    }
  } else if (sessionState.step === 'collecting') {
    sessionState.inputsCollected.push(inputValue);

    const remaining = sessionState.inputsNeeded.length - sessionState.inputsCollected.length;
    if (remaining > 0) {
      appendToHistory(`Got it! ${remaining} more input(s) needed.\n`);
    }

    if (sessionState.inputsCollected.length >= sessionState.inputsNeeded.length) {
      executeBtn.disabled = true;
      status.textContent = 'Running...';

      const allInputs = [sessionState.challenge, ...sessionState.inputsCollected].join('\n');
      const result = await runCode(code, detectedLang, allInputs);

      createSparkBurst(outputEl);
      appendToHistory(result.output + '\n');
      status.textContent = 'Ready';

      sessionState.step = 'menu';
      sessionState.challenge = null;
      sessionState.challengeName = null;
      sessionState.inputsCollected = [];
      updateInputPlaceholder();
      executeBtn.disabled = false;
    } else {
      updateInputPlaceholder();
    }
  }
}

function createEditor(parent, code, language, readOnly = true) {
  const langExtension = {
    python: python(),
    java: java(),
    cpp: cpp(),
    javascript: javascript()
  }[language] || python();

  const customTheme = EditorView.theme({
    '&': { height: '450px' },
    '.cm-scroller': { overflow: 'auto' },
    '.cm-content': {
      caretColor: '#0f0',
      fontFamily: "'Courier New', monospace"
    },
    '.cm-cursor': { borderLeftColor: '#0f0' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
      backgroundColor: 'rgba(0, 255, 0, 0.3)'
    },
    '.cm-activeLine': { backgroundColor: 'rgba(0, 255, 0, 0.1)' },
    '.cm-activeLineGutter': { backgroundColor: 'rgba(0, 255, 0, 0.15)' }
  }, { dark: false });

  const state = EditorState.create({
    doc: code,
    extensions: [
      basicSetup,
      langExtension,
      oneDark,
      EditorView.editable.of(!readOnly),
      customTheme
    ]
  });

  const view = new EditorView({
    state,
    parent
  });

  return view;
}

function showHexagonMonitor() {
  const hexagon = document.getElementById('hexagon-monitor');
  hexagon.classList.add('active');
}

function hideHexagonMonitor() {
  const hexagon = document.getElementById('hexagon-monitor');
  hexagon.classList.remove('active');
}

async function executeCode() {
  const executeBtn = document.getElementById('execute-btn');
  const activeTab = document.querySelector('.tab.active').dataset.tab;

  triggerShake(executeBtn);

  if (['python', 'java', 'cpp'].includes(activeTab)) {
    await executeEmbeddedCode(activeTab);
  } else if (activeTab === 'custom') {
    executeBtn.disabled = true;
    showHexagonMonitor();

    const code = editors.custom.state.doc.toString();
    const filename = document.getElementById('current-filename')?.textContent || '';
    const detected = detectLanguage(code, filename);
    currentDetectedLanguage = detected;

    const status = document.getElementById('output-status');
    const outputEl = document.getElementById('output-display');
    const displayName = getLanguageDisplayName(detected.key);

    appendToHistory('\n' + '='.repeat(50) + '\n');
    appendToHistory(`Executing ${displayName} (${detected.confidence}% confidence)...\n`);
    appendToHistory(`Provider: Multi-API Smart Router\n`);
    appendToHistory('='.repeat(50) + '\n\n');

    status.textContent = 'Running...';

    const result = await runCode(code, detected, '');

    createSparkBurst(outputEl);

    if (result.provider) {
      appendToHistory(`[Executed via ${result.provider}]\n\n`);
    }
    appendToHistory(result.output + '\n');
    status.textContent = result.success ? 'Complete' : 'Error';

    executeBtn.disabled = false;
  }
}

function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  document.querySelectorAll('.code-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
  const selectedPanel = document.getElementById(`${tabName}-panel`);

  if (selectedTab && selectedPanel) {
    selectedTab.classList.add('active');
    selectedPanel.classList.add('active');
  }

  resetSessionState();
  updateInputPlaceholder();
  hideHexagonMonitor();
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const filenameDisplay = document.getElementById('current-filename');
  if (filenameDisplay) {
    filenameDisplay.textContent = file.name;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;

    if (editors.custom) {
      const transaction = editors.custom.state.update({
        changes: { from: 0, to: editors.custom.state.doc.length, insert: content }
      });
      editors.custom.dispatch(transaction);
    }

    const detected = detectLanguage(content, file.name);
    currentDetectedLanguage = detected;

    const langDisplay = document.getElementById('detected-language');
    if (langDisplay) {
      const displayName = getLanguageDisplayName(detected.key);
      const confidenceClass = detected.confidence >= 90 ? 'high' : detected.confidence >= 70 ? 'medium' : 'low';
      langDisplay.innerHTML = `<span class="lang-badge ${confidenceClass}">${displayName}</span> <span class="confidence">(${detected.confidence}% confidence via ${detected.method})</span>`;
    }

    updateCustomEditorHighlighting(detected.key);
  };

  reader.readAsText(file);
}

function updateCustomEditorHighlighting(langKey) {
  const langExtension = {
    'python': python(),
    'java': java(),
    'cpp': cpp(),
    'c++': cpp(),
    'c': cpp(),
    'javascript': javascript(),
    'typescript': javascript(),
  }[langKey] || javascript();
}

function handleCodeChange() {
  if (!editors.custom) return;

  const code = editors.custom.state.doc.toString();
  const filename = document.getElementById('current-filename')?.textContent || '';

  const detected = detectLanguage(code, filename);
  currentDetectedLanguage = detected;

  const langDisplay = document.getElementById('detected-language');
  if (langDisplay) {
    const displayName = getLanguageDisplayName(detected.key);
    const confidenceClass = detected.confidence >= 90 ? 'high' : detected.confidence >= 70 ? 'medium' : 'low';
    langDisplay.innerHTML = `<span class="lang-badge ${confidenceClass}">${displayName}</span> <span class="confidence">(${detected.confidence}%)</span>`;
  }
}

function addCodeInteractivity() {
  document.querySelectorAll('.cm-editor').forEach(editor => {
    editor.addEventListener('click', () => {
      editor.style.boxShadow = '0 0 40px rgba(0, 255, 0, 0.6), inset 0 0 20px rgba(0, 255, 0, 0.1)';
      setTimeout(() => {
        editor.style.boxShadow = '';
      }, 300);
    });
  });
}

function initializeApp() {
  initMatrix();

  editors.python = createEditor(
    document.getElementById('python-editor'),
    pythonCode,
    'python',
    true
  );

  editors.java = createEditor(
    document.getElementById('java-editor'),
    javaCode,
    'java',
    true
  );

  editors.cpp = createEditor(
    document.getElementById('cpp-editor'),
    cppCode,
    'cpp',
    true
  );

  editors.custom = createEditor(
    document.getElementById('custom-editor'),
    '# Write or upload your code here!\n# Supported: Python, JavaScript, Java, C++, and 40+ more!\n\nprint("Hello, World!")',
    'python',
    false
  );

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      triggerShake(tab);
      switchTab(tab.dataset.tab);
    });
  });

  document.getElementById('execute-btn').addEventListener('click', executeCode);

  document.getElementById('upload-btn').addEventListener('click', () => {
    triggerShake(document.getElementById('upload-btn'));
    document.getElementById('file-input').click();
  });

  document.getElementById('file-input').addEventListener('change', handleFileUpload);

  document.getElementById('close-hexagon').addEventListener('click', hideHexagonMonitor);

  document.getElementById('clear-output-btn').addEventListener('click', () => {
    outputHistory = '';
    const outputEl = document.getElementById('output-display');
    outputEl.textContent = 'Ready to execute code...';
    document.getElementById('output-status').textContent = 'Standby';
    document.getElementById('terminal-input').value = '';
    sessionState = {
      language: null,
      challenge: null,
      challengeName: null,
      inputsNeeded: [],
      inputsCollected: [],
      step: 'menu'
    };
  });

  document.getElementById('info-btn').addEventListener('click', () => {
    triggerShake(document.getElementById('info-btn'));
    document.getElementById('info-popup').classList.add('active');
  });

  document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('info-popup').classList.remove('active');
  });

  document.getElementById('info-popup').addEventListener('click', (e) => {
    if (e.target === document.getElementById('info-popup')) {
      document.getElementById('info-popup').classList.remove('active');
    }
  });

  document.getElementById('close-terminal').addEventListener('click', () => {
    triggerShake(document.getElementById('close-terminal'));
    const terminal = document.getElementById('triangle-terminal');
    const overlay = document.getElementById('terminal-off-overlay');
    terminal.classList.add('off');
    hideHexagonMonitor();
    setTimeout(() => {
      overlay.classList.add('active');
    }, 500);
  });

  document.getElementById('power-on-btn').addEventListener('click', () => {
    triggerShake(document.getElementById('power-on-btn'));
    const terminal = document.getElementById('triangle-terminal');
    const overlay = document.getElementById('terminal-off-overlay');
    overlay.classList.remove('active');
    setTimeout(() => {
      terminal.classList.remove('off');
    }, 100);
  });

  document.getElementById('footer-toggle').addEventListener('click', () => {
    triggerShake(document.getElementById('footer-toggle'));
    const footer = document.getElementById('footer');
    footer.classList.toggle('collapsed');
  });

  document.getElementById('send-input-btn').addEventListener('click', () => {
    triggerShake(document.getElementById('send-input-btn'));
    handleUserInput();
  });

  document.getElementById('terminal-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });

  updateInputPlaceholder();
  setTimeout(addCodeInteractivity, 500);

  console.log('%c CODING TERMINAL COLLECTIVE', 'color: #0ff; font-size: 20px; font-weight: bold;');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
