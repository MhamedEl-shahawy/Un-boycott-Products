// Load saved keywords when options page opens
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(
    {
      filterKeywords: [
        "Nestlé",
        "Nestle",
        "Nestle products",
        "Chick-fil-A",
        "Chick-fil-A products",
        "Nike",
        "Nike products",
        "Amazon",
        "Amazon products",
        "Walmart",
        "Walmart products",
        "Target",
        "Target products",
        "Coca-Cola",
        "Coca-Cola products",
        "Pepsi",
        "Pepsi products",
        "McDonald's",
        "McDonald's products",
        "Burger King",
        "Burger King products",
        "KFC",
        "KFC products",
        "British Petroleum",
        "British Petroleum products",
        "Exxon",
        "Exxon products",
        "Shell",
        "Shell products",
        "BP",
        "BP products",
        "P&G",
        "P&G products",
        "Procter & Gamble",
        "Procter & Gamble products",
        "Unilever",
        "Unilever products",
        "Colgate",
        "Colgate products",
        "Gillette",
        "Gillette products",
        "Johnson & Johnson",
        "Johnson & Johnson products",
        "Heineken",
        "Heineken products",
        "Heineken beer",
        "Heineken beers",
        "Heineken beer products",
      ],
    },
    (items) => {
      document.getElementById("keywords").value =
        items.filterKeywords.join("\n");
    }
  );
});

// Save keywords when save button is clicked
document.getElementById("save").addEventListener("click", () => {
  const keywords = document
    .getElementById("keywords")
    .value.split("\n")
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0);

  chrome.storage.sync.set(
    {
      filterKeywords: keywords,
    },
    () => {
      const status = document.getElementById("status");
      status.textContent = "Keywords saved successfully!";
      status.style.display = "block";
      status.className = "success";
      setTimeout(() => {
        status.style.display = "none";
      }, 2000);
    }
  );
});
