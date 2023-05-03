import { BUTTONS_EN, BUTTONS_RU } from "../db/languages.js";
import { containsNumbers } from "../utils/containsNumbers.js";

const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

const textarea = document.createElement("textarea");
textarea.classList.add("text");
container.appendChild(textarea);

const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
container.appendChild(keyboard);

localStorage.setItem('isEnglish', JSON.stringify(true));

const insertButtons = (array) => {
  array.forEach(({ id, type, content, dopContent }) => {
    keyboard.insertAdjacentHTML(
      "beforeend", `
      <button id=${id} class=${type}><p class="content">${dopContent}</p>${content}</button>`
    );
  });

  localStorage.setItem('isCapsLock', JSON.stringify(false));
};

let isEnglish = JSON.parse(localStorage.getItem("isEnglish"));

insertButtons(isEnglish ? BUTTONS_EN : BUTTONS_RU);

let buttons = [...document.getElementsByTagName("button")];
let isCapsLock = JSON.parse(localStorage.getItem("isCapsLock"));

const runOnKeys = (func, ...codes) => {
  let pressed = new Set();

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();
    func();
  });

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
}

runOnKeys(
  () => {
    isEnglish = JSON.parse(localStorage.getItem('isEnglish'))
    localStorage.setItem('isEnglish', JSON.stringify(!isEnglish));

    keyboard.innerHTML = '';
    isEnglish = JSON.parse(localStorage.getItem('isEnglish'))

    insertButtons(isEnglish ? BUTTONS_EN : BUTTONS_RU);

    buttons = [...document.getElementsByTagName("button")];
    setClicks(buttons)

  },
  "ShiftLeft",
  "AltLeft"
);


function setClicks(buttons) {
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.target.classList.add("active");

      setTimeout(() => {
        event.target.classList.remove("active");
      }, 200);

      switch (event.target.innerText) {
        case "Backspace": {
          textarea.value = textarea.value.slice(0, -1);
          break;
        }
        case "Tab": {
          textarea.value = textarea.value + "  ";
          break;
        }
        case "Enter": {
          textarea.value = textarea.value + "\n";
          break;
        }
        case "Delete": {
          textarea.value.length = textarea.value.slice(
            textarea.value.length,
            textarea.value.length - 1
          );
          break;
        }
        case "CapsLock": {
          event.target.classList.add("capsLock");
          const capsLockBtn = document.querySelector('.capsLock');
          localStorage.setItem('isCapsLock', JSON.stringify(!isCapsLock))
          isCapsLock = JSON.parse(localStorage.getItem('isCapsLock'));

          capsLockBtn.addEventListener('click', () => {
            localStorage.setItem('isCapsLock', JSON.stringify(!isCapsLock))
          })
          break;
        }
        default: {
          isCapsLock = JSON.parse(localStorage.getItem('isCapsLock'));

          if (!containsNumbers(event.target.innerText)) {
            if (isCapsLock) {
              textarea.value += event.target.innerText.toUpperCase();
            } else {
              textarea.value += event.target.innerText.toLowerCase();
            }
          } else {
            if (isCapsLock) {
              textarea.value += event.target.innerText.slice(1).toUpperCase();
            } else {
              textarea.value += event.target.innerText.slice(1).toLowerCase();
            }
          }
        }
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    let key;
    let button;

    if (!containsNumbers(event.key)) {
      key = event.key.toUpperCase();
      button = buttons.find((btn) => btn.textContent === key);
    } else {
      key = event.key;
      button = buttons.find((btn) => btn.textContent.slice(1) === key);
    }

    if (button) {
      button.classList.add("active");
      setTimeout(() => {
        button.classList.remove("active");
      }, 200);
    }

    switch (event.key) {
      case "Backspace": {
        textarea.value = textarea.value.slice(0, -1);
        break;
      }
      case "Tab": {
        textarea.value = textarea.value + "  ";
        break;
      }
      case "Enter": {
        textarea.value = textarea.value + "\n";
        break;
      }
      case "Delete": {
        textarea.value.length = textarea.value.slice(
          textarea.value.length,
          textarea.value.length - 1
        );
        break;
      }
      case "CapsLock": {
        key = event.key.toUpperCase();
        break;
      }
      case "Shift": {
        break;
      }
      case "Alt": {
        break;
      }
      default: {
        textarea.value += event.key;
        break;
      }
    }
  }
  );
}

setClicks(buttons)