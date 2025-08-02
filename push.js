const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const REPO = 'Elephantprime/invoke';

const BRANCH = 'main';
const API = `https://api.github.com/repos/${REPO}/contents`;

const files = [
  'index.html',
  'invoke.js',
  'gpt.js',
  'voice.js',
  'memory.js',
  'config.js',
  'vercel.json'
];

const encode = file => fs.readFileSync(file).toString('base64');

async function getSHA(file) {
  const res = await fetch(`${API}/${file}`, {
    headers: { Authorization: `token ${TOKEN}` }
  });
  const json = await res.json();
  return json?.sha || null;
}

async function push(file) {
  const content = encode(file);
  const sha = await getSHA(file);
  const res = await fetch(`${API}/${file}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'spark-uploader'
    },
    body: JSON.stringify({
      message: `Update ${file}`,
      content,
      branch: BRANCH,
      ...(sha && { sha })
    })
  });
  const json = await res.json();
  if (res.status >= 400) {
    console.error(`❌ ${file}: ${json.message}`);
  } else {
    console.log(`✅ ${file} pushed`);
  }
}

(async () => {
  for (const file of files) {
    if (fs.existsSync(file)) {
      await push(file);
    } else {
      console.warn(`⚠️ Missing: ${file}`);
    }
  }
})();
