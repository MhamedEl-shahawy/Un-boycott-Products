(function () {
  // Configuration
  const CONFIG = {
    timeout: 5000, // 5 seconds maximum loading time
    keywords: [
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
      "Heineken beer brands",
      "heineken experience",
    ],
    selectors: {
      shopping: [
        'div[data-fp="Products"]',
        ".commercial-unit-desktop-top",
        ".commercial-unit-desktop-rhs",
        ".pla-unit",
        ".sh-dlr__list-result",
        ".mnr-c.pla-unit",
      ],
      organic: ["div.g", "div.hlcw0c", ".rc", ".yuRUbf", ".MjjYud"],
    },
  };

  // Create and inject the blocker immediately
  const blocker = document.createElement("div");
  blocker.id = "search-filter-blocker";
  blocker.innerHTML = `
        <style>
            #search-filter-blocker {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(255, 255, 255, 0.98) !important;
                z-index: 2147483647 !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                font-family: Arial, sans-serif !important;
            }
            .spinner {
                border: 3px solid #f1f1f1 !important;
                border-top: 3px solid #4285f4 !important;
                border-radius: 50% !important;
                width: 30px !important;
                height: 30px !important;
                animation: spin 1s linear infinite !important;
            }
            .message {
                color: #666 !important;
                font-size: 16px !important;
                margin-top: 15px !important;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
        <div class="spinner"></div>
        <div class="message" id="filter-message">Filtering content...</div>
    `;

  // Add blocker to page
  document.documentElement.appendChild(blocker);

  // Function to remove blocker
  function removeBlocker() {
    const blocker = document.getElementById("search-filter-blocker");
    if (blocker) {
      blocker.style.opacity = "0";
      blocker.style.transition = "opacity 0.3s ease";
      setTimeout(() => blocker.remove(), 300);
    }
  }

  // Function to update message
  function updateMessage(text) {
    const message = document.getElementById("filter-message");
    if (message) {
      message.textContent = text;
    }
  }

  // Main filter function
  async function filterContent() {
    try {
      // Check if search results exist
      const hasResults = document.querySelector(
        "div.g, div.hlcw0c, .commercial-unit-desktop-top"
      );

      if (!hasResults) {
        updateMessage("Waiting for search results...");
        setTimeout(removeBlocker, 1000);
        return;
      }

      updateMessage("Filtering content...");
      let filtered = 0;

      // Filter content
      for (const [section, selectorList] of Object.entries(CONFIG.selectors)) {
        for (const selector of selectorList) {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element) => {
            if (shouldHide(element)) {
              element.style.display = "none";
              filtered++;
            }
          });
        }
      }

      updateMessage(`Filtered ${filtered} items`);
      setTimeout(removeBlocker, 500);
    } catch (error) {
      console.error("Filtering error:", error);
      updateMessage("Error occurred while filtering");
      setTimeout(removeBlocker, 1000);
    }
  }

  // Check if element should be hidden
  function shouldHide(element) {
    try {
      const text = element.textContent.toLowerCase();
      return CONFIG.keywords.some((keyword) =>
        text.includes(keyword.toLowerCase())
      );
    } catch (error) {
      console.error("Error in shouldHide:", error);
      return false;
    }
  }

  // Set timeout to remove blocker
  setTimeout(() => {
    if (document.getElementById("search-filter-blocker")) {
      updateMessage("Taking longer than expected...");
      setTimeout(removeBlocker, 1000);
    }
  }, CONFIG.timeout);

  // Initialize MutationObserver
  function initializeObserver() {
    try {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              // Element node
              if (shouldHide(node)) {
                node.style.display = "none";
              }
            }
          });
        });
      });

      // Wait for body to be available
      const startObserver = () => {
        if (document.body) {
          observer.observe(document.body, {
            childList: true,
            subtree: true,
          });
        } else {
          // If body is not available, retry after a short delay
          setTimeout(startObserver, 50);
        }
      };

      startObserver();
    } catch (error) {
      console.error("Observer initialization error:", error);
    }
  }

  // Start filtering and observer
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      filterContent();
      initializeObserver();
    });
  } else {
    filterContent();
    initializeObserver();
  }
})();
