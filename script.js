const msg = new SpeechSynthesisUtterance();
let voices = [];
const dropDownMenu = document.querySelector('[name="options"]');
const inputs = document.querySelectorAll('input, textarea');
const stopButton = document.querySelector('#stop');
const speakButton = document.querySelector('#speak');
msg.text = document.querySelector('textarea').value;

function popularVoices() {
  voices = this.getVoices();
  dropDownMenu.innerHTML = voices
    .map((voice) => {
      return `
    <option value="${voice.name}">${voice.name}, ${voice.lang} </option>`;
    })
    .join('');
}

function setVoice(e) {
  msg.voice = voices.find((voice) => voice.name === e.target.value);
  toggle();
}

function setOption() {
  msg[this.name] = this.value;
  toggle();
}

function toggle(startOver = true) {
  // console.log(this);
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}
speechSynthesis.addEventListener('voiceschanged', popularVoices);
dropDownMenu.addEventListener('change', setVoice);
inputs.forEach((input) => input.addEventListener('change', setOption));
stopButton.addEventListener('click', () => toggle(false));
speakButton.addEventListener('click', toggle);
