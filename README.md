# 🌟 Daily Horoscope App

A simple and beautiful astrology app that fetches daily horoscopes using the Aztro API. Built with Node.js, Express, and vanilla JavaScript.

## 📋 Features

- ✨ Beautiful, responsive design with gradient backgrounds
- 🔮 Daily horoscope for all 12 zodiac signs
- 🎨 Additional details: mood, lucky color, lucky number, lucky time, and compatibility
- 📱 Mobile-friendly interface
- ⚡ Fast and lightweight
- 🛡️ Error handling and loading states

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Step 1: Install Dependencies
Navigate to the project directory and install the required packages:

```bash
npm install
```

This will install:
- `express` - Web framework for Node.js
- `axios` - HTTP client for making API requests
- `cors` - Enable cross-origin requests
- `nodemon` - Development tool for auto-restarting the server

### Step 2: Start the Server

#### For Development (with auto-restart):
```bash
npm run dev
```

#### For Production:
```bash
npm start
```

### Step 3: Open Your Browser
Open your web browser and go to:
```
http://localhost:3001
```

## 📁 Project Structure

```
astrology-app/
├── public/
│   ├── index.html      # Main HTML page
│   ├── styles.css      # CSS styling
│   └── script.js       # Frontend JavaScript
├── server.js           # Express server with API routes
├── package.json        # Project configuration and dependencies
└── README.md          # This file
```

## 🔧 How It Works

### Backend (server.js)
- **Express Server**: Serves static files and handles API routes
- **API Endpoint**: `/api/horoscope/:sign` - fetches horoscope for a specific zodiac sign
- **Aztro API Integration**: Makes requests to the external Aztro API
- **Error Handling**: Proper error responses for invalid requests

### Frontend
- **HTML**: Clean, semantic structure with form and result containers
- **CSS**: Beautiful gradient design with responsive layout
- **JavaScript**: Handles form submission, API calls, and dynamic content updates

### API Flow
1. User selects zodiac sign from dropdown
2. Frontend sends request to `/api/horoscope/{sign}`
3. Backend forwards request to Aztro API
4. Backend processes and returns formatted response
5. Frontend displays horoscope result with styling

## 🎯 Usage

1. **Select Your Sign**: Choose your zodiac sign from the dropdown menu
2. **Get Horoscope**: Click the "Get My Horoscope ✨" button
3. **View Results**: Your daily horoscope appears with additional details like:
   - Daily horoscope description
   - Current mood
   - Lucky color
   - Lucky number
   - Lucky time
   - Compatible zodiac sign

## 🛠️ Troubleshooting

### Common Issues

**Port Already in Use**
If you get an error about port 3000 being in use:
```bash
# Kill any process using port 3000
npx kill-port 3000
# Then restart the server
npm start
```

**API Not Working**
- Check your internet connection
- The Aztro API might be temporarily down
- Check the console for error messages

**Dependencies Issues**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

## 🔍 Testing the API

You can test the API endpoints directly:

```bash
# Get horoscope for Aries
curl http://localhost:3001/api/horoscope/aries

# Get list of all zodiac signs
curl http://localhost:3001/api/signs
```

## 📝 Code Comments

The code is extensively commented to help you understand:
- **Server.js**: How Express server works, API routing, and external API integration
- **Script.js**: DOM manipulation, event handling, and async/await patterns
- **Styles.css**: CSS Grid, Flexbox, animations, and responsive design

## 🌟 Development Workflow

This project uses the following branch structure:
- `main` - Stable production-ready code
- `develop` - Active development branch for new features

## 🎨 Customization Ideas

Feel free to modify and customize:
- Change the color scheme in `styles.css`
- Add more zodiac information
- Implement caching for better performance
- Add user preferences storage
- Create different themes

---

**Happy coding and may the stars align for you! ✨**