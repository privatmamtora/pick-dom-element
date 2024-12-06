import { ElementPicker } from "pick-dom-element";

let picker;

async function selectElement() {
  return new Promise((resolve) => {
    picker = new ElementPicker({
      style: {
        background: "rgba(153, 235, 255, 0.5)",
        borderColor: "yellow"
      },
    });
    picker.start({
      onClick: (el) => {
        console.log('Click');
        resolve(el);
        picker.stop();
      },
      onCancel: () => {
        console.log('Cancel');
        resolve();
      },
      onStop: () => {
        console.log('Stop');
        resolve();
      }
    })
  });
}

async function main2() {
  const start = async () => {
    const el = await selectElement();
    console.log("Done", el);

  };
  const startButton = document.getElementById("getElement");
  startButton.addEventListener("click", start);
}

function main() {
  const status = document.getElementById("status");
  const startButton = document.getElementById("start");
  const onlyEmphasisCheckbox = document.getElementById("only-emphasis");
  const onlyParagraphsCheckbox = document.getElementById("only-paragraphs");

  const setElement = (el) => {
    const tags = [];
    while (el.parentNode) {
      tags.push(el.tagName);
      el = el.parentNode;
    }
    status.innerText = tags
      .reverse()
      .map((t) => t.toLowerCase())
      .join(" > ");
  };

  const picker = new ElementPicker({
    style: {
      background: "rgba(153, 235, 255, 0.5)",
      borderColor: "yellow"
    },
  });
  let onlyEmphasis = onlyEmphasisCheckbox.checked;
  onlyEmphasisCheckbox.onchange = (ev) => {
    onlyEmphasis = ev.target.checked;
  }
  let onlyParagraphs = onlyParagraphsCheckbox.checked;
  onlyParagraphsCheckbox.onchange = (ev) => {
    onlyParagraphs = ev.target.checked;
  }
  const start = () => {
    startButton.disabled = true;
    picker.start({
      onHover: setElement,
      onClick: () => {
        picker.stop();
        startButton.disabled = false;
      },
      onCancel: () => {
        startButton.disabled = false;
      },
      elementFilter: (el) => {
        if (onlyEmphasis) {
          return ['I', 'B'].includes(el.tagName);
        }
        else if (onlyParagraphs) {
          const paragraph = el.closest("p, h1")
          return paragraph ?? false
        }
        return true;
      }
    });
  };

  startButton.addEventListener("click", start);
}

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("DOMContentLoaded", main2);
