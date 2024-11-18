// List of keywords to filter
const filterKeywords = [
  "boycott",
  "boycotted products",
  // Add more keywords as needed
];

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

// Run filter when page loads
filterResults();

// Run filter when page content changes (for dynamic loading)
const observer = new MutationObserver(filterResults);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
