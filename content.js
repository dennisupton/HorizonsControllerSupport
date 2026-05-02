const BUTTON_MAP = [
  { button: 0, key: "Enter" },        // A/Cross
  { button: 1, key: "x" },        // B/Circle
  { button: 12, key: "ArrowUp" }, // D-pad up
  { button: 13, key: "ArrowDown" },
  { button: 14, key: "ArrowLeft" },
  { button: 15, key: "ArrowRight" },
];

const held = new Set();

function fireKey(type, key) {
  const target = document.activeElement || document;
  target.dispatchEvent(new KeyboardEvent(type, {
    key,
    code: key,
    bubbles: true,
    cancelable: true,
  }));
}

function showAlert(message) {
  const alert = document.createElement("div");
  alert.textContent = message;
  Object.assign(alert.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    zIndex: "999999",
    background: "#1a1a2e",
  }
  requestAnimationFrame(poll);
}

// Gamepad API needs a connection event first
window.addEventListener("gamepadconnected", () => {
  console.log("Controller connected, starting poll");
  poll();
});