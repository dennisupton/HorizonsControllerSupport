const BUTTON_MAP = [
  { button: 0, key: "Enter" },        // A/Cross
  { button: 1, key: "Escape" },        // B/Circle
  { button: 12, key: "ArrowUp" }, //D PAD
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
    color: "#fff",
    padding: "10px 16px", //this css is ai cause i cba to write css
    borderRadius: "8px",
    fontFamily: "sans-serif",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "opacity 0.4s ease",
    opacity: "1",
  });

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.opacity = "0";
    setTimeout(() => alert.remove(), 400);
  }, 3000);
}

function poll() {
  const gamepads = navigator.getGamepads();
  for (const gp of gamepads) {
    if (!gp) continue;
    for (const { button, key } of BUTTON_MAP) {
      const pressed = gp.buttons[button]?.pressed;
      if (pressed && !held.has(button)) {
        held.add(button);
        fireKey("keydown", key);
      } else if (!pressed && held.has(button)) {
        held.delete(button);
        fireKey("keyup", key);
      }
    }
  }
  requestAnimationFrame(poll);
}

window.addEventListener("gamepadconnected", () => {
  showAlert(`Controller connected`);
  poll();
});