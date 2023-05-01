const containsNumbers = (string) => {
  return /\d/.test(string);
}

export const BUTTONS = [
  { id: 1, content: "`", dopContent: "~", type: "alt" },
  { id: 2, content: "1", dopContent: "!", type: "number" },
  { id: 3, content: "2", dopContent: "@", type: "number" },
  { id: 4, content: "3", dopContent: "#", type: "number" },
  { id: 5, content: "4", dopContent: "$", type: "number" },
  { id: 6, content: "5", dopContent: "%", type: "number" },
  { id: 7, content: "6", dopContent: "^", type: "number" },
  { id: 8, content: "7", dopContent: "&", type: "number" },
  { id: 9, content: "8", dopContent: "*", type: "number" },
  { id: 10, content: "9", dopContent: "(", type: "number" },
  { id: 11, content: "0", dopContent: ")", type: "number" },
  { id: 12, content: "-", dopContent: "_", type: "number" },
  { id: 13, content: "=", dopContent: "+", type: "number" },
  { id: 14, content: "Backspace", dopContent: "", type: "backspace" },
  { id: 15, content: "Tab", dopContent: "", type: "tab" },
  { id: 16, content: "Q", dopContent: "", type: "number" },
  { id: 17, content: "W", dopContent: "", type: "number" },
  { id: 18, content: "E", dopContent: "", type: "number" },
  { id: 19, content: "R", dopContent: "", type: "number" },
  { id: 20, content: "T", dopContent: "", type: "number" },
  { id: 21, content: "Y", dopContent: "", type: "number" },
  { id: 22, content: "U", dopContent: "", type: "number" },
  { id: 23, content: "I", dopContent: "", type: "number" },
  { id: 24, content: "O", dopContent: "", type: "number" },
  { id: 25, content: "P", dopContent: "", type: "number" },
  { id: 26, content: "[", dopContent: "", type: "number" },
  { id: 27, content: "]", dopContent: "", type: "number" },
  { id: 28, content: "\\", dopContent: "/", type: "number" },
  { id: 29, content: "DEL", dopContent: "", type: "del" },
  { id: 30, content: "Caps Lock", dopContent: "", type: "backspace" },
  { id: 31, content: "A", dopContent: "", type: "number" },
  { id: 32, content: "S", dopContent: "", type: "number" },
  { id: 33, content: "D", dopContent: "", type: "number" },
  { id: 34, content: "F", dopContent: "", type: "number" },
  { id: 35, content: "G", dopContent: "", type: "number" },
  { id: 36, content: "H", dopContent: "", type: "number" },
  { id: 37, content: "J", dopContent: "", type: "number" },
  { id: 38, content: "K", dopContent: "", type: "number" },
  { id: 39, content: "L", dopContent: "", type: "number" },
  { id: 40, content: ";", dopContent: "", type: "number" },
  { id: 41, content: "'", dopContent: "", type: "number" },
  { id: 42, content: "ENTER", dopContent: "", type: "enter" },
  { id: 43, content: "Shift", dopContent: "", type: "backspace" },
  { id: 41, content: "\\", dopContent: "", type: "number" },
  { id: 42, content: "Z", dopContent: "", type: "number" },
  { id: 43, content: "X", dopContent: "", type: "number" },
  { id: 44, content: "C", dopContent: "", type: "number" },
  { id: 45, content: "V", dopContent: "", type: "number" },
  { id: 46, content: "B", dopContent: "", type: "number" },
  { id: 47, content: "N", dopContent: "", type: "number" },
  { id: 48, content: "M", dopContent: "", type: "number" },
  { id: 49, content: ".", dopContent: "", type: "number" },
  { id: 50, content: ",", dopContent: "", type: "number" },
  { id: 51, content: "/", dopContent: "", type: "number" },
  { id: 52, content: "↑", dopContent: "", type: "alt" },
  { id: 53, content: "Shift", dopContent: "", type: "alt" },
  { id: 54, content: "Ctrl", dopContent: "", type: "ctrl" },
  { id: 55, content: "Win", dopContent: "", type: "alt" },
  { id: 56, content: "Alt", dopContent: "", type: "alt" },
  { id: 57, content: "", dopContent: "", type: "space" },
  { id: 58, content: "Alt", dopContent: "", type: "alt" },
  { id: 59, content: "Ctrl", dopContent: "", type: "ctrl" },
  { id: 60, content: "←", dopContent: "", type: "alt" },
  { id: 61, content: "↓", dopContent: "", type: "alt" },
  { id: 62, content: "→", dopContent: "", type: "alt" },
];

const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

const textarea = document.createElement("textarea");
textarea.classList.add("text");
container.appendChild(textarea);

const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
container.appendChild(keyboard);

const insertButtons = (array) => {
  array.forEach(({ id, type, content, dopContent }) => {
    keyboard.insertAdjacentHTML(
      "beforeend",
      `<button id=${id} class=${type}><p class="content">${dopContent}</p>${content}</button>`
    );
  });
};

insertButtons(BUTTONS);

const buttons = [...document.getElementsByTagName("button")];

buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.target.classList.add('active')

    setTimeout(() => {
      event.target.classList.remove('active')
    }, 200);

    switch (event.target.innerText) {
      case "Backspace": {
        textarea.value = textarea.value.slice(0, -1);
        break;
      }
      default: {
        if (!containsNumbers(event.target.innerText)) {
          textarea.value += event.target.innerText
        } else {
          textarea.value += event.target.innerText.slice(1)
        }
      }
      case "Enter": {
        textarea.value = textarea.value + "\n";
        break;
      }
      case "Tab": {
        textarea.value = textarea.value + "  ";
        break;
      }
      case "Delete": {
        textarea.value = textarea.value.slice(textarea.value.length, textarea.value.length - 1);
        break;
      }
    }
  });
});

document.addEventListener('keydown', (event) => {
  let key;
  let button;

  if (!containsNumbers(event.key)) {
    key = event.key.toUpperCase()
    button = buttons.find(btn => btn.textContent === key);
  } else if ((!containsNumbers(event.key)) && (event.key.length > 1)) {
    key = event.key;
    button = buttons.find(btn => btn.textContent.slice(1) === key);
  } else {
    key = event.key
    button = buttons.find(btn => btn.textContent.slice(1) === key);
  }

  if (button) {
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active')
    }, 200);
  }

  switch (event.key) {
    case "Backspace": {
      textarea.value = textarea.value.slice(0, -1);
      break;
    }
    default: {
      textarea.value += event.key
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
      textarea.value = textarea.value.slice(textarea.value.length, textarea.value.length - 1);
      break;
    }
  }
}
);

