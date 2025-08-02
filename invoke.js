async function handleInput() {
  const input = document.getElementById('userInput').value;
  const output = document.getElementById('responseOutput');
  output.textContent = 'Thinking...';

  try {
    const response = await fetchGPT(input);
    output.textContent = response;
    speak(response);
  } catch (err) {
    output.textContent = 'Error: ' + err.message;
  }
}
