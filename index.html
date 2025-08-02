const invokeCore = {
  name: "Invoke",
  version: "v0.1",
  status: "booting",
  mode: "default",
  voice: true,
  memoryEnabled: true,
  avatarVisible: true,
  pulseActive: false,
  ritualsEnabled: false,
  systemLog: [],

  log(event) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${event}`;
    invokeCore.systemLog.push(entry);
    console.log(entry);
  },

  toggle(key) {
    if (key in invokeCore) {
      invokeCore[key] = !invokeCore[key];
      invokeCore.log(`Toggled ${key} to ${invokeCore[key]}`);
    }
  },

  updateStatus(newStatus) {
    invokeCore.status = newStatus;
    invokeCore.log(`Status changed to ${newStatus}`);
  },

  identify() {
    return `${invokeCore.name} [${invokeCore.version}] - Mode: ${invokeCore.mode}`;
  },

  async respondWithInvoke(message) {
    invokeCore.log(`💬 User: ${message}`);

    const embed = async (text) => {
      const res = await fetch("https://api.openai.com/v1/embeddings", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('GITHUB_TOKEN')
        },
        body: JSON.stringify({ input: text, model: 'text-embedding-3-small' })
      });
      const json = await res.json();
      return (json.data && json.data[0] && json.data[0].embedding) || [];
    };

    const cosineSim = (a, b) => {
      const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
      const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
      const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
      return dot / (magA * magB);
    };

    const memoryKey = 'invokeVectorMemory';
    const loadMemory = () => JSON.parse(localStorage.getItem(memoryKey) || '[]');
    const saveMemory = (m) => localStorage.setItem(memoryKey, JSON.stringify(m));
    const memory = loadMemory();

    const queryVec = await embed(message);
    const relevant = memory.map(entry => ({
      Object.assign({}, $1),
      similarity: cosineSim(queryVec, entry.embedding)
    })).sort((a, b) => b.similarity - a.similarity).slice(0, 5);

    const pastMemory = relevant.map(entry => ({ role: entry.role, content: entry.content }));

    const chat = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: "You are Invoke — emotionally intelligent, sharp, real. Speak like Josh. React with expression." },
          ...pastMemory,
          { role: 'user', content: message }
        ]
      })
    });

    const data = await chat.json();
    const reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "[no reply]";

    const userVec = await embed(message);
    const replyVec = await embed(reply);
    memory.push({ role: 'user', content: message, embedding: userVec });
    memory.push({ role: 'assistant', content: reply, embedding: replyVec });
    if (memory.length > 200) memory.splice(0, memory.length - 200);
    saveMemory(memory);

    if (window.sparkExpression) window.sparkExpression.applyExpression(reply);
    if (invokeCore.voice && typeof window.speakText === 'function') window.speakText(reply);

    invokeCore.log(`🗣️ Invoke: ${reply}`);
    return reply;
  }
};

invokeCore.log("🟢 Invoke core initialized");

window.invokeCore = invokeCore;
