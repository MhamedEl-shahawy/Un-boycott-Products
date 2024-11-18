const fs = require("fs");
const { createCanvas } = require("canvas");

// Generate icons in different sizes
[16, 48, 128].forEach((size) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Draw a simple icon (blue circle with "SF" text)
  ctx.fillStyle = "#2196F3";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Add text
  ctx.fillStyle = "white";
  ctx.font = `bold ${size / 3}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SF", size / 2, size / 2);

  // Save the icon
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`icons/icon${size}.png`, buffer);
});
