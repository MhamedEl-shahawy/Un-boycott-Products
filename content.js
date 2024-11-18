// Search engine configurations
const searchEngines = {
  google: {
    hostname: "www.google.com",
    resultSelectors: ["div.g", "div.hlcw0c"],
  },
  bing: {
    hostname: "www.bing.com",
    resultSelectors: [".b_algo"],
  },
  yahoo: {
    hostname: "search.yahoo.com",
    resultSelectors: ["div.algo", ".sr"],
  },
  duckduckgo: {
    hostname: "duckduckgo.com",
    resultSelectors: [".result"],
  },
  baidu: {
    hostname: "www.baidu.com",
    resultSelectors: [".result", ".c-container"],
  },
};

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
      filterResults();
    }
  );
}

// Function to check if text contains filtered keywords
function containsFilteredKeywords(text) {
  return filterKeywords.some((keyword) =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );
}

// Get current search engine configuration
function getCurrentSearchEngine() {
  const hostname = window.location.hostname;
  return Object.values(searchEngines).find((engine) =>
    hostname.includes(engine.hostname)
  );
}

// Function to remove elements containing filtered keywords
function filterResults() {
  const currentEngine = getCurrentSearchEngine();
  if (!currentEngine) return;

  currentEngine.resultSelectors.forEach((selector) => {
    const searchResults = document.querySelectorAll(selector);
    searchResults.forEach((result) => {
      const resultText = result.textContent || "";
      if (containsFilteredKeywords(resultText)) {
        result.style.display = "none";
      }
    });
  });
}

// Initialize
loadKeywords();

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.filterKeywords) {
    filterKeywords = changes.filterKeywords.newValue;
    filterResults();
  }
});

// Observer for dynamic content
const observer = new MutationObserver(filterResults);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
