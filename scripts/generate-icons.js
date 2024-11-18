const sharp = require("sharp");

const sizes = [
  // Small icons with simplified design
  {
    size: 16,
    source: "icon-small.svg",
    options: {
      fit: "contain",
      background: { r: 255, g: 0, b: 0, alpha: 1 },
    },
  },
  {
    size: 32,
    source: "icon-small.svg",
    options: {
      fit: "contain",
      background: { r: 255, g: 0, b: 0, alpha: 1 },
    },
  },
  // Larger icons with full design
  {
    size: 48,
    source: "icon.svg",
    options: {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  },
  {
    size: 128,
    source: "icon.svg",
    options: {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  },
];

async function generateIcons() {
  for (const { size, source, options } of sizes) {
    await sharp(`assets/icons/${source}`)
      .resize(size, size, options)
      .png({ quality: 100 })
      .toFile(`assets/icons/icon${size}.png`);
  }
}

generateIcons();
