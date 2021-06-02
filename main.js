let text = document.querySelector("#textarea");
let rate = document.querySelector("#rate");
let rateValue = document.querySelector("#rateValue");
let pitch = document.querySelector("#pitch");
let pitchValue = document.querySelector("#pitchValue");
let selection = document.querySelector("#select");
let body = document.querySelector("body");

var synth = window.speechSynthesis;
var voices = [];

const display = () => {
  voices = synth.getVoices();
  voices.forEach((voice) => {
    var option = document.createElement("option");
    if (voice.name === "Google UK English Male") {
      option.setAttribute("selected", "selected");
    }
    option.textContent = voice.name + "(" + voice.lang + ")";
    option.setAttribute("data-name", voice.name);
    option.setAttribute("data-lang", voice.lang);
    selection.appendChild(option);
  });
};

display();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = display;
}

const speak = () => {
  if (text.value !== "") {
    body.style.background = "#141414 url(https://media.giphy.com/media/ToMjGpJctqrZgKzX0wE/giphy.gif)";
    body.style.backgroundSize = "100% 100%";
    var speaker = new SpeechSynthesisUtterance(text.value);
    var selectedOption = selection.selectedOptions[0].getAttribute("data-name");
    voices.forEach((voice) => {
      if (voice.name === selectedOption) {
        speaker.voice = voice;
      }
    });
    speaker.pitch = pitch.value;
    speaker.rate = rate.value;
    synth.speak(speaker);
    speaker.onend = () => {
      body.style.background = "black";
    }
    text.blur();
  }
};

rate.addEventListener("change", () => {
  rateValue.innerText = rate.value;
});
pitch.addEventListener("change", () => {
  pitchValue.innerText = pitch.value;
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
});
