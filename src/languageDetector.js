export const LANGUAGES = {
  PYTHON: 'python',
  JAVASCRIPT: 'javascript',
  JAVA: 'java',
  CPP: 'cpp',
  C: 'c',
  CSHARP: 'csharp',
  GO: 'go',
  RUST: 'rust',
  RUBY: 'ruby',
  PHP: 'php',
  TYPESCRIPT: 'typescript',
  SWIFT: 'swift',
  KOTLIN: 'kotlin',
  SCALA: 'scala',
  R: 'r',
  PERL: 'perl',
  LUA: 'lua',
  BASH: 'bash',
  HASKELL: 'haskell',
};

const LANGUAGE_VERSIONS = {
  [LANGUAGES.PYTHON]: '3.12.5',
  [LANGUAGES.JAVASCRIPT]: '22.08.0',
  [LANGUAGES.JAVA]: '17.0.6',
  [LANGUAGES.CPP]: '14.1.0',
  [LANGUAGES.C]: '14.1.0',
  [LANGUAGES.CSHARP]: '6.6.0',
  [LANGUAGES.GO]: '1.23.5',
  [LANGUAGES.RUST]: '1.85.0',
  [LANGUAGES.RUBY]: '2.7.0',
  [LANGUAGES.PHP]: '8.3.11',
  [LANGUAGES.TYPESCRIPT]: '5.6.2',
  [LANGUAGES.SWIFT]: '5.2.3',
  [LANGUAGES.KOTLIN]: '2.1.10',
  [LANGUAGES.SCALA]: '3.4.2',
  [LANGUAGES.R]: '4.0.0',
  [LANGUAGES.PERL]: '5.28.1',
  [LANGUAGES.LUA]: '5.3.5',
  [LANGUAGES.BASH]: '5.0.0',
  [LANGUAGES.HASKELL]: '8.8.1',
};

const API_LANGUAGE_NAMES = {
  [LANGUAGES.PYTHON]: 'python',
  [LANGUAGES.JAVASCRIPT]: 'javascript',
  [LANGUAGES.JAVA]: 'java',
  [LANGUAGES.CPP]: 'c++',
  [LANGUAGES.C]: 'c',
  [LANGUAGES.CSHARP]: 'csharp',
  [LANGUAGES.GO]: 'go',
  [LANGUAGES.RUST]: 'rust',
  [LANGUAGES.RUBY]: 'ruby',
  [LANGUAGES.PHP]: 'php',
  [LANGUAGES.TYPESCRIPT]: 'typescript',
  [LANGUAGES.SWIFT]: 'swift',
  [LANGUAGES.KOTLIN]: 'kotlin',
  [LANGUAGES.SCALA]: 'scala',
  [LANGUAGES.R]: 'r',
  [LANGUAGES.PERL]: 'perl',
  [LANGUAGES.LUA]: 'lua',
  [LANGUAGES.BASH]: 'bash',
  [LANGUAGES.HASKELL]: 'haskell',
};

function createLanguageResult(key, confidence, method) {
  return {
    key,
    name: API_LANGUAGE_NAMES[key] || key,
    version: LANGUAGE_VERSIONS[key] || '1.0.0',
    confidence,
    method
  };
}

export function detectLanguage(code, filename = '') {
  code = code.trim();

  const extensionMap = {
    'py': LANGUAGES.PYTHON,
    'js': LANGUAGES.JAVASCRIPT,
    'ts': LANGUAGES.TYPESCRIPT,
    'java': LANGUAGES.JAVA,
    'cpp': LANGUAGES.CPP,
    'cc': LANGUAGES.CPP,
    'cxx': LANGUAGES.CPP,
    'c': LANGUAGES.C,
    'cs': LANGUAGES.CSHARP,
    'go': LANGUAGES.GO,
    'rs': LANGUAGES.RUST,
    'rb': LANGUAGES.RUBY,
    'php': LANGUAGES.PHP,
    'swift': LANGUAGES.SWIFT,
    'kt': LANGUAGES.KOTLIN,
    'scala': LANGUAGES.SCALA,
    'r': LANGUAGES.R,
    'pl': LANGUAGES.PERL,
    'lua': LANGUAGES.LUA,
    'sh': LANGUAGES.BASH,
    'hs': LANGUAGES.HASKELL,
  };

  if (filename) {
    const ext = filename.split('.').pop().toLowerCase();
    if (extensionMap[ext]) {
      return createLanguageResult(extensionMap[ext], 100, 'extension');
    }
  }

  if (code.includes('def ') || (code.includes('import ') && code.includes(':')) || code.includes('print(')) {
    return createLanguageResult(LANGUAGES.PYTHON, 85, 'pattern');
  }
  if (code.includes('public class ') || code.includes('public static void main')) {
    return createLanguageResult(LANGUAGES.JAVA, 90, 'pattern');
  }
  if (code.includes('#include') || code.includes('std::') || code.includes('cout') || code.includes('cin')) {
    return createLanguageResult(LANGUAGES.CPP, 90, 'pattern');
  }
  if (code.includes('function ') || code.includes('const ') || code.includes('let ') || code.includes('=>')) {
    return createLanguageResult(LANGUAGES.JAVASCRIPT, 80, 'pattern');
  }
  if (code.includes('package main') || code.includes('func main()')) {
    return createLanguageResult(LANGUAGES.GO, 95, 'pattern');
  }
  if (code.includes('fn main()') || code.includes('use std::')) {
    return createLanguageResult(LANGUAGES.RUST, 95, 'pattern');
  }

  return createLanguageResult(LANGUAGES.PYTHON, 50, 'default');
}

export function getLanguageDisplayName(language) {
  const key = typeof language === 'object' ? language.key : language;
  const displayNames = {
    [LANGUAGES.PYTHON]: 'Python',
    [LANGUAGES.JAVASCRIPT]: 'JavaScript',
    [LANGUAGES.JAVA]: 'Java',
    [LANGUAGES.CPP]: 'C++',
    [LANGUAGES.C]: 'C',
    [LANGUAGES.CSHARP]: 'C#',
    [LANGUAGES.GO]: 'Go',
    [LANGUAGES.RUST]: 'Rust',
    [LANGUAGES.RUBY]: 'Ruby',
    [LANGUAGES.PHP]: 'PHP',
    [LANGUAGES.TYPESCRIPT]: 'TypeScript',
    [LANGUAGES.SWIFT]: 'Swift',
    [LANGUAGES.KOTLIN]: 'Kotlin',
    [LANGUAGES.SCALA]: 'Scala',
    [LANGUAGES.R]: 'R',
    [LANGUAGES.PERL]: 'Perl',
    [LANGUAGES.LUA]: 'Lua',
    [LANGUAGES.BASH]: 'Bash',
    [LANGUAGES.HASKELL]: 'Haskell',
  };
  return displayNames[key] || key;
}

export function getSupportedLanguages() {
  return Object.values(LANGUAGES);
}
