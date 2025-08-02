// memery.js

export const memory = { history: [], mood: "neutral", fragments: {}, };

export function addHistory(role, content) { memory.history.push({ role, content, timestamp: Date.now() }); if (memory.history.length > 100) memory.history.shift(); }

export function getRecentMemory(limit = 10) { return memory.history.slice(-limit); }

export function saveMemory(key, value) { memory.fragments[key] = value; }

export function recallMemory(key) { return memory.fragments[key] || null; }

export function resetMemory() { memory.history = []; memory.fragments = {}; memory.mood = "neutral"; }

export function analyzeMood() { const last = memory.history[memory.history.length - 1]; if (!last) return memory.mood;

if (/angry|mad|pissed|wtf/i.test(last.content)) memory.mood = "frustrated"; else if (/happy|great|love|thanks/i.test(last.content)) memory.mood = "positive"; else memory.mood = "neutral";

return memory.mood; }

