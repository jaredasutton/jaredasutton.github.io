export const createCanvas = (options) => {
  const canvas = document.createElement("canvas");
  canvas.width = options.width;
  canvas.height = options.height;
  document.body.appendChild(canvas);

  const clearButton = document.createElement("button");
  clearButton.id = "clear";
  clearButton.textContent = "Clear";
  document.body.appendChild(clearButton);

  const ctx = canvas.getContext("2d");
  
  // Mapping from the pointerId to the current finger position
  const ongoingTouches = new Map();
  const colors = ["red", "green", "blue"];
  
  function handleStart(event) {
    const touch = {
      pageX: event.pageX,
      pageY: event.pageY,
      color: colors[ongoingTouches.size % colors.length],
    };
    ongoingTouches.set(event.pointerId, touch);
  
    ctx.beginPath();
    ctx.arc(touch.pageX, touch.pageY, 4, 0, 2 * Math.PI, false);
    ctx.fillStyle = touch.color;
    ctx.fill();
  }
  
  canvas.addEventListener("pointerdown", handleStart, false);
  
  function handleEnd(event) {
    const touch = ongoingTouches.get(event.pointerId);
  
    if (!touch) {
      console.error(`End: Could not find touch ${event.pointerId}`);
      return;
    }
  
    ctx.lineWidth = 4;
    ctx.fillStyle = touch.color;
    ctx.beginPath();
    ctx.moveTo(touch.pageX, touch.pageY);
    ctx.lineTo(event.pageX, event.pageY);
    ctx.fillRect(event.pageX - 4, event.pageY - 4, 8, 8);
    ongoingTouches.delete(event.pointerId);
  }
  
  canvas.addEventListener("pointerup", handleEnd, false);
  
  function handleCancel(event) {
    const touch = ongoingTouches.get(event.pointerId);
  
    if (!touch) {
      console.error(`Cancel: Could not find touch ${event.pointerId}`);
      return;
    }
  
    ongoingTouches.delete(event.pointerId);
  }
  
  canvas.addEventListener("pointercancel", handleCancel, false);
  
  function handleMove(event) {
    const touch = ongoingTouches.get(event.pointerId);
  
    // Event was not started
    if (!touch) {
      return;
    }
  
    ctx.beginPath();
    ctx.moveTo(touch.pageX, touch.pageY);
    ctx.lineTo(event.pageX, event.pageY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = touch.color;
    ctx.stroke();
  
    const newTouch = {
      pageX: event.pageX,
      pageY: event.pageY,
      color: touch.color,
    };
  
    ongoingTouches.set(event.pointerId, newTouch);
  }
  
  canvas.addEventListener("pointermove", handleMove, false);
  
  clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
};
