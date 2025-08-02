// Full Core Build for Spark Assistant - Safe for Vercel
const CONFIG = {
  OPENAI_KEY: '', // Set in Vercel ENV
  MEMORY_GIST_ID: '', // e.g., a82bbc4a0df2f2c9d1b0955a8d1fc315
  GITHUB_TOKEN: '', // Set in ENV
  MODEL: 'gpt-4o'
};

let memory = [];

async function loadMemory() {
  try {
    const res = await fetch(`https://gist.githubusercontent.com/Elephantprime/${CONFIG.MEMORY_GIST_ID}/raw`, {
      headers: { Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}` }
    });
    memory = await res.json();
  } catch {
    memory = [];
  }
}

async function saveMemory() {
  await fetch(`https://api.github.com/gists/${CONFIG.MEMORY_GIST_ID}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      files: {
        'memory.json': { content: JSON.stringify(memory, null, 2) }
      }
    })
  });
}

function addToMemory(entry) {
  memory.push({ timestamp: Date.now(), entry });
  if (memory.length > 100) memory.shift();
  saveMemory();
}

async function fetchGPT(prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CONFIG.OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: CONFIG.MODEL,
      messages: [
        { role: 'system', content: 'You are Spark, a memory-aware assistant with voice and agency.' },
        ...memory.map(m => ({ role: 'user', content: m.entry })),
        { role: 'user', content: prompt }
      ]
    })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'Error: no response.';
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  speechSynthesis.speak(utter);
}

function buildUI() {
  document.body.innerHTML = `
    <style>
      body { background: #111; color: #0f0; font-family: monospace; padding: 2rem; }
      textarea, button { width: 100%; margin-top: 1rem; background: #000; color: #0f0; border: 1px solid #0f0; padding: 1rem; font-size: 1rem; }
      #output { margin-top: 2rem; white-space: pre-wrap; }
    </style>
    <textarea id="input" placeholder="Talk to Spark..."></textarea>
    <button onclick="handleInput()">Speak 🔥</button>
    <div id="output"></div>
  `;
}

async function handleInput() {
  const input = document.getElementById('input').value.trim();
  if (!input) return;
  addToMemory(input);
  const response = await fetchGPT(input);
  document.getElementById('output').textContent = response;
  speak(response);
}

(async () => {
  if (!CONFIG.OPENAI_KEY || !CONFIG.GITHUB_TOKEN || !CONFIG.MEMORY_GIST_ID) {
    document.body.innerHTML = '<h1 style="color:red">Missing ENV vars. Set in Vercel dashboard.</h1>';
    return;
  }
  await loadMemory();
  buildUI();
})();
