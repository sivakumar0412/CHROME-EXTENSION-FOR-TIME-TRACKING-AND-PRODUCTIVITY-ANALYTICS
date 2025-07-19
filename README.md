*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: D SIVA KUMAR

*INTERN ID*: CT06DH1140

*DOMAIN*: Full Stack Web Development

*DURATION*: 6 WEEEKS

*MENTOR*:NEELA SANTOSH



# 🚀 Productivity Tracker Chrome Extension

A comprehensive Chrome extension for tracking time spent on websites and analyzing productivity patterns with beautiful animations and detailed analytics.

![Productivity Tracker](https://img.shields.io/badge/Chrome-Extension-blue?style=for-the-badge&logo=google-chrome)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality
- **Automatic Time Tracking**: Seamlessly tracks time spent on every website
- **Smart Classification**: Automatically categorizes websites as productive, unproductive, or neutral
- **Real-time Analytics**: Live productivity scoring and time distribution
- **Activity Detection**: Monitors user activity to ensure accurate tracking
- **Cross-tab Tracking**: Tracks time across multiple browser tabs and windows

### 📊 Analytics Dashboard
- **Interactive Charts**: Beautiful pie charts and bar graphs with animations
- **Productivity Score**: Real-time calculation based on productive vs total time
- **Website Rankings**: Most visited sites with detailed time breakdowns
- **Weekly Reports**: Comprehensive insights and personalized recommendations
- **Time Distribution**: Visual breakdown of productive, unproductive, and neutral time

### 🎨 User Experience
- **Smooth Animations**: Polished UI with entrance animations and micro-interactions
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark/Light Mode**: Automatic theme detection and smooth transitions
- **Customizable Categories**: Add your own productive/unproductive website classifications

### 🔒 Privacy & Security
- **Local Storage**: Data stored securely in Chrome's local storage
- **No Personal Data**: Only domain names are tracked, not full URLs
- **Optional Cloud Sync**: Choose to sync data across devices
- **Privacy First**: No tracking of personal information or browsing history

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Recharts** - Responsive chart library
- **Lucide React** - Beautiful icon library

### Chrome Extension
- **Manifest V3** - Latest Chrome extension standard
- **Service Workers** - Background time tracking
- **Content Scripts** - Activity detection
- **Chrome Storage API** - Local data persistence

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **TypeScript** - Type-safe backend development

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Google Chrome browser
- VS Code (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/productivity-tracker.git
   cd productivity-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install shadcn/ui components**
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add card button badge tabs progress chart
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Load Chrome extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `public` folder from your project

6. **Start tracking!**
   - The extension will automatically start tracking your browsing
   - Click the extension icon to see your stats
   - Visit `http://localhost:3000/dashboard` for detailed analytics

## 📁 Project Structure

```
productivity-tracker/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 api/
│   │   └── 📁 tracking/
│   │       └── route.ts       # API endpoints
│   ├── 📁 dashboard/
│   │   └── page.tsx          # Analytics dashboard
│   ├── globals.css           # Global styles & animations
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── 📁 public/                # Chrome Extension files
│   ├── manifest.json         # Extension configuration
│   ├── background.js         # Service worker
│   ├── content.js           # Content script
│   ├── popup.html           # Extension popup
│   ├── popup.js             # Popup functionality
│   ├── options.html         # Settings page
│   └── options.js           # Settings functionality
├── 📁 components/            # React components
│   └── 📁 ui/               # shadcn/ui components
├── 📁 lib/                  # Utility functions
├── package.json
└── README.md
```

## 🎮 Usage

### Extension Popup
- **Quick Stats**: View today's productivity summary
- **Top Websites**: See most visited sites with time spent
- **Productivity Score**: Real-time productivity percentage
- **Dashboard Access**: One-click access to detailed analytics

### Analytics Dashboard
- **Overview Tab**: Charts and visual analytics
- **Websites Tab**: Detailed breakdown of all tracked websites
- **Reports Tab**: Weekly insights and recommendations

### Settings & Customization
- **Right-click extension icon** → Options
- **Add Custom Categories**: Define your own productive/unproductive sites
- **Configure Tracking**: Adjust tracking preferences

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Extension Development
npm run extension:build    # Build extension files
npm run extension:reload   # Reload extension in Chrome
```

### Development Workflow

1. **Web Development**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

2. **Extension Development**
   ```bash
   # Make changes to files in public/
   # Reload extension in chrome://extensions/
   ```

3. **Testing**
   - Test web app at `http://localhost:3000`
   - Test extension popup by clicking icon
   - Test dashboard integration

### VS Code Setup

**Recommended Extensions:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint

**Settings (`.vscode/settings.json`):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\$$([^)]*)\$$", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## 📊 Data Structure

### Tracking Data Format
```typescript
interface TrackingData {
  [date: string]: {
    [domain: string]: {
      timeSpent: number;        // milliseconds
      category: 'productive' | 'unproductive' | 'neutral';
      visits: number;
    }
  }
}
```

### Example Data
```json
{
  "2024-01-15": {
    "github.com": {
      "timeSpent": 7200000,
      "category": "productive",
      "visits": 15
    },
    "youtube.com": {
      "timeSpent": 3600000,
      "category": "unproductive", 
      "visits": 8
    }
  }
}
```

## 🎨 Animations & UI

### Animation Features
- **Entrance Animations**: Smooth slide-in effects for all components
- **Count-up Effects**: Animated statistics with easing functions
- **Hover Interactions**: Lift effects and smooth transitions
- **Loading States**: Beautiful shimmer and spinner animations
- **Chart Animations**: Delayed rendering with smooth transitions
- **Micro-interactions**: Button presses, form inputs, and feedback

### Custom Animation Classes
```css
.animate-slideInUp     /* Slide in from bottom */
.animate-slideInLeft   /* Slide in from left */
.animate-countUp       /* Count-up number animation */
.animate-glow          /* Glowing effect */
.animate-float         /* Floating motion */
.hover-lift            /* Hover lift effect */
```

## 🔒 Privacy Policy

### Data Collection
- **Website Domains**: Only domain names (e.g., "github.com") are stored
- **Time Spent**: Duration of active time on each domain
- **Visit Counts**: Number of visits to each domain
- **Categories**: User-defined or automatic categorization

### Data Storage
- **Local Storage**: All data stored in Chrome's local storage API
- **No Cloud Storage**: Data never leaves your device by default
- **No Personal Info**: No URLs, page content, or personal data collected

### Data Usage
- **Analytics Only**: Data used solely for productivity analytics
- **No Sharing**: Data never shared with third parties
- **User Control**: Full control over data deletion and export

## 🚀 Deployment

### Chrome Web Store

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Create extension package**
   - Zip the `public` folder contents
   - Ensure manifest.json is in the root

3. **Submit to Chrome Web Store**
   - Visit [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Upload your zip file
   - Fill out store listing details
   - Submit for review

### Web Dashboard Deployment

**Vercel (Recommended):**
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

**Other Platforms:**
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

## 🐛 Troubleshooting

### Common Issues

**Extension not loading:**
\`\`\`bash
# Check manifest.json is in public folder
# Verify all required files are present
# Check Chrome Developer Console for errors
\`\`\`

**Styles not working:**
``` bash
# Restart development server
npm run dev
# Clear browser cache
```

**TypeScript errors:**
\`\`\`bash
# Install missing types
npm install @types/chrome
# Restart TypeScript server in VS Code
\`\`\`

**Charts not rendering:**
\`\`\`bash
# Ensure recharts is installed
npm install recharts
# Check browser console for errors
\`\`\`

### Getting Help
- 📖 [Documentation](https://github.com/yourusername/productivity-tracker/wiki)
- 🐛 [Issue Tracker](https://github.com/yourusername/productivity-tracker/issues)
- 💬 [Discussions](https://github.com/yourusername/productivity-tracker/discussions)
- 📧 Email: support@productivitytracker.com

## 📈 Roadmap

### Version 2.0
- [ ] Team productivity tracking
- [ ] Advanced analytics with ML insights
- [ ] Website blocking functionality
- [ ] Mobile companion app
- [ ] Integration with calendar apps

### Version 2.1
- [ ] AI-powered productivity recommendations
- [ ] Custom productivity goals
- [ ] Time tracking for specific projects
- [ ] Export data to CSV/PDF
- [ ] Dark mode improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible components
- [Recharts](https://recharts.org/) - A composable charting library
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit

## 📞 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

**Made with ❤️ by SIVA KUMAR**

*Track your time, boost your productivity!* 🚀


## OUTPUT:
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/5de33a98-4ca9-4fc7-a2cd-567110ea8d6d" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/d9af5a07-ffe2-46af-8ff3-110ffc4334cf" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/e6a59588-716f-4684-93f8-ad89a49d8234" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/bdf169f2-edce-46bd-8e97-fc5415c624e8" />
