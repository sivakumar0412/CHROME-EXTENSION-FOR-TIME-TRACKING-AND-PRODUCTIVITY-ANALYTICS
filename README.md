# Productivity Tracker Chrome Extension

A comprehensive Chrome extension for tracking time spent on websites and analyzing productivity patterns.

## Features

- **Automatic Time Tracking**: Seamlessly tracks time spent on every website
- **Smart Classification**: Automatically categorizes websites as productive, unproductive, or neutral
- **Detailed Analytics**: Comprehensive dashboard with charts, graphs, and productivity scores
- **Weekly Reports**: Get insights and recommendations to improve productivity
- **Privacy First**: Data stored locally with optional cloud sync
- **Customizable Categories**: Add your own productive/unproductive website classifications

## Installation

### For Development

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the project
4. Open Chrome and go to `chrome://extensions/`
5. Enable "Developer mode"
6. Click "Load unpacked" and select the `public` folder

### For Production

1. Download the extension from the Chrome Web Store (coming soon)
2. Click "Add to Chrome"
3. Start browsing - tracking begins automatically!

## Usage

### Extension Popup
- Click the extension icon to see today's productivity summary
- View time spent on different websites
- See your productivity score

### Dashboard
- Access the full dashboard at `http://localhost:3000/dashboard`
- View detailed analytics and charts
- Get weekly productivity reports
- Analyze trends over time

### Settings
- Right-click the extension icon and select "Options"
- Add custom productive/unproductive websites
- Configure tracking preferences

## Architecture

### Chrome Extension Components
- **manifest.json**: Extension configuration
- **background.js**: Service worker for time tracking
- **content.js**: Content script for activity detection
- **popup.html/js**: Extension popup interface
- **options.html/js**: Settings page

### Web Application
- **Next.js**: React framework for the dashboard
- **API Routes**: Backend endpoints for data storage
- **Tailwind CSS**: Styling framework
- **Recharts**: Charts and data visualization

## API Endpoints

- `POST /api/tracking`: Save tracking data
- `GET /api/tracking`: Retrieve tracking data

## Data Structure

\`\`\`javascript
{
  "2024-01-15": {
    "github.com": {
      "timeSpent": 7200000, // milliseconds
      "category": "productive",
      "visits": 15
    }
  }
}
\`\`\`

## Privacy & Security

- All data is stored locally in Chrome's storage API
- Optional cloud sync for cross-device access
- No personal information is collected
- Website URLs are converted to domains only

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
