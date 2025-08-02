const memory = [];

function addHistory(input, response) {
  memory.push({ input, response });
  if (memory.length > 50) memory.shift();
}

function getHistory() {
  return memory;
}
