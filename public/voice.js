// voice.js

let synth = window.speechSynthesis;
let selectedVoice = null;

function loadVoices() {
  const voices = synth.getVoices();
  selectedVoice = voices.find(voice => /en-US/i.test(voice.lang)) || voices[0];
}

if (typeof speechSynthesis !== "undefined") {
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

function speakText(text) {
  if (!synth || !text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  utterance.pitch = 1;
  utterance.rate = 1;
  synth.cancel();
  synth.speak(utterance);
}

window.speakText = speakText;
