# DNS Wizard - Beamline Device Naming System

A React application that guides users through questions about beamlines and devices to generate appropriate DNS names for NSLS-II beamline machines.

## Features

- **Interactive Wizard Interface**: Step-by-step guidance for selecting beamline and device type
- **Automatic DNS Generation**: Generates DNS names following NSLS-II naming conventions
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Copy to Clipboard**: Easy copying of generated DNS names
- **Name Breakdown**: Detailed explanation of how the DNS name is constructed

## DNS Naming Convention

The application follows the NSLS-II naming convention:
- **Prefix**: `xf` (standard prefix for beamline machines)
- **Beamline ID**: Extracted from the selected beamline (e.g., "9-ID" → "9")
- **Device Type**: Abbreviated device name (e.g., "detector" → "det")
- **Domain**: `.nsls2.bnl.gov` (default domain)

**Example**: For beamline "9-ID" and device "detector" → `xf09id1-det.nsls2.bnl.gov`

## Available Beamlines

- 1-ID through 9-ID

## Available Device Types

- **Detector** → `det`
- **Monitor** → `mon`
- **Camera** → `cam`
- **Motor** → `mot`
- **Sensor** → `sens`
- **Controller** → `ctrl`
- **Data Acquisition** → `daq`
- **Other** → `dev`

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd dns-wizard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Follow the wizard steps to generate your DNS name

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `build` directory.

## Usage

1. **Select Beamline**: Choose the beamline where your device will be integrated
2. **Select Device Type**: Choose the type of device you're integrating
3. **Get DNS Name**: View your generated DNS name with a detailed breakdown
4. **Copy & Use**: Copy the DNS name to your clipboard for use in your configuration

## Project Structure

```
dns-wizard/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   ├── index.js        # Application entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Technologies Used

- **React 18**: Modern React with hooks
- **CSS3**: Modern styling with gradients and animations
- **HTML5**: Semantic markup
- **JavaScript ES6+**: Modern JavaScript features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
