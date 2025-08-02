from docx import Document
import os

# Create a Word document with the code content from the 3 - Voice file
doc = Document()
doc.add_heading('3 - Voice (voice.js)', level=1)

code_content = """
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

export function speak(text) {
  if (!synth || !text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  utterance.pitch = 1;
  utterance.rate = 1;
  synth.cancel();
  synth.speak(utterance);
}
"""

doc.add_paragraph(code_content)

# Save the document
file_path = "/mnt/data/3 - Voice (voice.js).docx"
doc.save(file_path)

file_path
