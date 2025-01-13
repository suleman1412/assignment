
# Arbitrage Opportunities Scanner Frontend

This is the frontend application for displaying real-time arbitrage opportunities between Binance (CEX) and Jupiter (DEX). The UI connects to a WebSocket server to receive and display profitable trading opportunities dynamically.

## Features

- **Real-Time Updates**: Fetches live arbitrage opportunities from the WebSocket server and updates the UI instantly.
- **Dark Mode Support**: Toggle between light and dark themes for a customized user experience.
- **Dynamic Table**: Displays a scrollable table of arbitrage opportunities, including token symbols and profit percentages.
- **Responsive Design**: Optimized for all screen sizes.

## Prerequisites

- The backend WebSocket server must be running and accessible at `ws://localhost:8080`.
- [Node.js](https://nodejs.org/) and a package manager like `npm` or `yarn` should be installed.

## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/suleman1412/assignment
cd assignment
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Application
Start the development server:
```bash
npm run build && npm run preview
```

The app will run on `http://localhost:4173` by default.

## Component Overview

### **`Scanner` Component**
The main component of the application, responsible for:
1. Connecting to the WebSocket server.
2. Listening for messages containing arbitrage opportunities.
3. Rendering the opportunities in a table format.
4. Providing a dark mode toggle feature.

### **WebSocket Connection**
The WebSocket client connects to `ws://localhost:8080` and listens for messages in the following format:
```json
{
  "symbol": "SOL",
  "profit": 3.25
}
```

### **UI Design**
- **Header**: Includes the title and a theme toggle button.
- **Table**: Displays symbols and profit percentages, color-coded for positive (green) or negative (red) profits.
- **Footer**: Shows the total number of opportunities received.

## Customization

### Modify WebSocket URL
If your WebSocket server is running on a different URL, update it in the `Scanner` component:
```javascript
const ws = new WebSocket("ws://localhost:8080");
```

### Update Styling
The app uses Tailwind CSS for styling. Modify the class names directly in the JSX to customize the appearance.

### Theme Context
The `useTheme` context handles dark mode functionality. Customize it in `ThemeContext` as needed.

## Example Usage

### Real-Time Arbitrage Updates
Once the backend server is running, the frontend will:
1. Connect to the WebSocket server.
2. Continuously listen for and display arbitrage opportunities in the table.
3. Update the table dynamically as new data arrives.

### Toggle Dark Mode
Click the button in the top-right corner of the header to switch between light and dark themes.

## Future Enhancements

- Add sorting or filtering options for the table.
- Integrate a front-end state management library like Redux for scalability.
- Create a dashboard to visualize profit trends over time.
- Add error handling and notifications for server connectivity issues.
