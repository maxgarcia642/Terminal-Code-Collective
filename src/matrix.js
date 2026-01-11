export function initMatrix() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const codeKeywords = [
    'if', 'else', 'for', 'while', 'return', 'function', 'var', 'let', 'const',
    'class', 'import', 'export', 'print', 'def', 'int', 'void', 'public',
    'private', 'static', 'new', 'true', 'false', 'null', 'this', 'try',
    'catch', 'throw', 'async', 'await', 'break', 'continue', 'switch', 'case',
    '++', '--', '==', '!=', '<=', '>=', '&&', '||', '=>', '->', '::',
    'npm', 'git', 'push', 'pull', 'sudo', 'chmod', 'mkdir', 'echo', 'grep',
    'python', 'java', 'node', 'gcc', 'make', 'run', 'build', 'test', 'debug'
  ];

  const symbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*<>{}[]();:+-=/_|\\~^';

  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  const horizontalKeywords = [];
  const maxHorizontalKeywords = 8;

  const popupKeywords = [];
  const maxPopupKeywords = 5;

  function getRandomChar() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function getRandomGreen() {
    const r = Math.random();
    if (r > 0.92) return '#ffffff';
    if (r > 0.85) return '#00ffff';
    if (r > 0.78) return '#00ff88';
    if (r > 0.65) return '#88ff88';
    if (r > 0.45) return '#44ff44';
    return '#00ff00';
  }

  function spawnHorizontalKeyword() {
    if (horizontalKeywords.length >= maxHorizontalKeywords) return;

    const keyword = codeKeywords[Math.floor(Math.random() * codeKeywords.length)];
    const y = Math.random() * (canvas.height - 100) + 50;
    const startX = -keyword.length * fontSize;
    const speed = 1 + Math.random() * 2;

    const colorRand = Math.random();
    let color;
    if (colorRand > 0.85) color = '#00ffff';
    else if (colorRand > 0.7) color = '#88ffaa';
    else if (colorRand > 0.5) color = '#44ff88';
    else color = '#00ff00';

    horizontalKeywords.push({
      text: keyword,
      x: startX,
      y: y,
      speed: speed,
      color: color,
      alpha: 1,
      fadeStart: canvas.width * (0.6 + Math.random() * 0.3)
    });
  }

  function spawnPopupKeyword() {
    if (popupKeywords.length >= maxPopupKeywords) return;

    const keyword = codeKeywords[Math.floor(Math.random() * codeKeywords.length)];
    const x = Math.random() * (canvas.width - 150) + 50;
    const y = Math.random() * (canvas.height - 100) + 50;

    const colorRand = Math.random();
    let color;
    if (colorRand > 0.8) color = '#00ffff';
    else if (colorRand > 0.6) color = '#88ffaa';
    else if (colorRand > 0.4) color = '#66ff66';
    else color = '#00ff00';

    popupKeywords.push({
      text: keyword,
      x: x,
      y: y,
      color: color,
      alpha: 0,
      phase: 'in',
      life: 0,
      maxLife: 60 + Math.random() * 40
    });
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      ctx.fillStyle = getRandomGreen();
      const text = getRandomChar();
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    if (Math.random() < 0.03) {
      spawnHorizontalKeyword();
    }

    for (let i = horizontalKeywords.length - 1; i >= 0; i--) {
      const kw = horizontalKeywords[i];

      if (kw.x > kw.fadeStart) {
        kw.alpha -= 0.02;
      }

      if (kw.alpha <= 0 || kw.x > canvas.width + 100) {
        horizontalKeywords.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = kw.alpha;
      ctx.fillStyle = kw.color;
      ctx.font = `bold ${fontSize + 2}px monospace`;

      ctx.shadowColor = kw.color;
      ctx.shadowBlur = 10;

      ctx.fillText(kw.text, kw.x, kw.y);
      ctx.restore();

      kw.x += kw.speed;
    }

    if (Math.random() < 0.02) {
      spawnPopupKeyword();
    }

    for (let i = popupKeywords.length - 1; i >= 0; i--) {
      const pk = popupKeywords[i];

      pk.life++;

      if (pk.phase === 'in') {
        pk.alpha += 0.15;
        if (pk.alpha >= 1) {
          pk.alpha = 1;
          pk.phase = 'hold';
        }
      } else if (pk.phase === 'hold') {
        if (pk.life > pk.maxLife * 0.6) {
          pk.phase = 'out';
        }
      } else if (pk.phase === 'out') {
        pk.alpha -= 0.04;
      }

      if (pk.alpha <= 0 || pk.life > pk.maxLife) {
        popupKeywords.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = pk.alpha;
      ctx.fillStyle = pk.color;
      ctx.font = `bold ${fontSize + 4}px monospace`;

      ctx.shadowColor = pk.color;
      ctx.shadowBlur = 15 + pk.alpha * 10;

      ctx.fillText(pk.text, pk.x, pk.y);
      ctx.restore();
    }
  }

  setInterval(draw, 33);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
