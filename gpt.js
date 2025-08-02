// 10 - gpt.js

async function fetchGPT(prompt) { const response = await fetch('/api/gpt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });

if (!response.ok) throw new Error('GPT API error');

const data = await response.json(); return data.reply; }

