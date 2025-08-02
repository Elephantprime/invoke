const CONFIG = {
  OPENAI_KEY: process.env.OPENAI_KEY
};

async function loadConfig() {
  if (!CONFIG.OPENAI_KEY) {
    // fallback or dynamic fetch here if needed
    console.warn('Missing OpenAI Key');
  }
}
