// mic.js - handles voice input via SpeechRecognition
window.sparkMic = {
  start() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      const inputBox = document.getElementById("userInput");
      if (inputBox) {
        inputBox.value = transcript;
        if (typeof sendMessage === "function") sendMessage();
      }
    };

    recognition.onerror = function (event) {
      console.error("🎙️ Mic error:", event.error);
    };

    recognition.start();
  }
};
