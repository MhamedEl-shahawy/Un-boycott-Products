// Initialize keywords array
const filterKeywords = [
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
];

// Load keywords from storage
function loadKeywords() {
  chrome.storage.sync.get(
    {
      filterKeywords: ["boycott", "boycotted products"],
    },
    (items) => {
      filterKeywords = items.filterKeywords;
      filterResults(); // Re-run filtering with new keywords
    }
  );
}

// Function to check if text contains filtered keywords
function containsFilteredKeywords(text) {
  return filterKeywords.some((keyword) =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );
}

// Function to remove elements containing filtered keywords
function filterResults() {
  // For Google Search
  const searchResults = document.querySelectorAll("div.g");
  searchResults.forEach((result) => {
    const resultText = result.textContent || "";
    if (containsFilteredKeywords(resultText)) {
      result.style.display = "none";
    }
  });

  // For Bing Search
  const bingResults = document.querySelectorAll(".b_algo");
  bingResults.forEach((result) => {
    const resultText = result.textContent || "";
    if (containsFilteredKeywords(resultText)) {
      result.style.display = "none";
    }
  });
}

// Load keywords when content script runs
loadKeywords();

// Listen for changes in storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.filterKeywords) {
    filterKeywords = changes.filterKeywords.newValue;
    filterResults();
  }
});

// Run filter when page content changes
const observer = new MutationObserver(filterResults);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
