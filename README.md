<div align="center">
  <img src="assets/icons/icon128.png" alt="FPB Icon" width="128" height="128"/>

# Filter Products Boycott (FPB)

A Chrome browser extension that automatically filters out search results containing specific keywords related to boycott products. The extension works on Google, yahoo , Bing , DuckDuckGo and Baidu search engines and updates results in real-time.

</div>

## Features

- 🚫 Filters boycotted products and brands
- 🎯 Removes Google Ads and sponsored content
- 🔍 Real-time filtering of search results
- 📊 Shows filtering statistics
- ⚡ Fast and lightweight
- 🔄 Handles dynamic content loading

## Installation

1. Clone or download this repository to your local machine
2. Open Google Chrome browser
3. Navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top-right corner
5. Click "Load unpacked"
6. Select the folder containing the extension files

## Usage

1. After installation, the extension will automatically start working
2. Visit Google or Bing search
3. Perform any search
4. Results containing filtered keywords will be hidden automatically

## Troubleshooting

- If the extension isn't working, ensure it's enabled in `chrome://extensions/`
- After making changes to the code:
  1. Save all modified files
  2. Go to `chrome://extensions/`
  3. Click the refresh icon on the extension
  4. Reload your search page

1. **Prerequisites**

   ```bash
   # Required tools
   - Node.js (latest LTS)
   - Chrome browser
   - Text editor
   ```

2. **Project Structure**

   ```
   search-filter/
   ├── manifest.json     # Extension config
   ├── content/
   │   ├── content.js    # Main filtering logic
   │
   ├── popup/
   │   ├── popup.html    # Extension popup
   │   └── popup.js      # Popup logic
   ├── options/
   │   ├── options.html  # Settings page
   │   └── options.js    # Settings logic
   └── assets/
       └── icons/        # Extension icons
   ```

3. **Local Development**

   ```bash
   # Clone repository
   git clone https://github.com/MhamedEl-shahawy/Un-boycott-Products.git
   cd Un-boycott-Products


   # Install dependencies
   npm install

   # Watch for changes (optional)
   npm run watch
   ```

4. **Testing**
   ```bash
   # Manual testing
   1. Make code changes
   2. Go to chrome://extensions
   3. Click refresh icon on extension
   4. Test on Google Search
   ```

## Updating

1. **Manual Update**

   - Download latest version
   - Remove existing extension
   - Follow installation steps
   - Reconfigure settings

2. **Automatic Updates**
   - Chrome Web Store version updates automatically
   - Local version requires manual update

## Backup & Restore

1. **Export Settings**

   - Go to Options
   - Click "Export Settings"
   - Save JSON file

2. **Import Settings**
   - Go to Options
   - Click "Import Settings"
   - Select saved JSON file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Author

[Mohamed Elshahawy](https://github.com/MhamedEl-shahawy)

## Version

1.3.0

## Support

For support, please open an issue in the repository:

1. Check [Issues](https://github.com/MhamedEl-shahawy/Un-boycott-Products/issues)
2. Create new issue with:
   - Chrome version
   - Extension version
   - Steps to reproduce
   - Error messages
