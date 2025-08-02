/* jshint esversion: 8 */
/* global CONFIG, loadConfig, fetchGPT, speak */

async function handleInput() {
  if (!CONFIG.OPENAI_KEY) await loadConfig();

  const input = document.getElementById("userInput").value;
  const output = document.getElementById("output");

  output.innerHTML += `<div><b>You:</b> ${input}</div>`;

  const response = await fetchGPT(input);

  output.innerHTML += `<div><b>INVOKE:</b> ${response}</div>`;
  speak(response);

  document.getElementById("userInput").value = "";
}
