document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("filterToggle");
  const statusText = document.getElementById("statusText");
  const openOptions = document.getElementById("openOptions");

  // Load initial state
  chrome.storage.sync.get(
    {
      isEnabled: true,
    },
    function (items) {
      toggle.checked = items.isEnabled;
      updateStatusText(items.isEnabled);
    }
  );

  // Handle toggle changes
  toggle.addEventListener("change", function () {
    const isEnabled = toggle.checked;
    chrome.storage.sync.set(
      {
        isEnabled: isEnabled,
      },
      function () {
        updateStatusText(isEnabled);
        // Notify content script
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (tabs[0]) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: "toggleFilter",
                isEnabled: isEnabled,
              });
            }
          }
        );
      }
    );
  });

  // Open options page
  openOptions.addEventListener("click", function (e) {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });

  function updateStatusText(isEnabled) {
    statusText.textContent = isEnabled
      ? "Filter is Active"
      : "Filter is Disabled";
    statusText.style.color = isEnabled ? "#4CAF50" : "#f44336";
  }
});
