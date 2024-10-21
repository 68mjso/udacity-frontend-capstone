# Trip Planner

Welcome to the Trip Planner project! The app allows users to plan a trip by entering a location and a travel date, providing weather forecasts and other relevant information for the trip destination.

## Features

1. Location Input: Users can input a city or destination.
2. Date Selection: Users select the travel date, and the app provides weather forecasts for that date.
3. Weather Forecast: Get the weather forecast based on the provided location and date.
4. Dynamic Images: The app shows images of the destination using external APIs.
5. Responsive Design: The app is responsive and works on various screen sizes.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/68mjso/udacity-frontend-capstone
cd udacity-frontend-capstone
```

2. Install dependencies:

```bash
npm install
```

## Usage

Build Development

```bash
npm run build-dev
```

Build Production

```bash
npm run build-prod
```

## Environment Setup Instructions

### API Keys
This project requires several API keys to work properly. You will need to create a .env file in the root of the project to store your API keys. These services are used to gather weather data, location images, and other information:

1. Geonames API (for location search)
2. Weatherbit API (for weather forecasts)
3. Pixabay API (for destination images)

### Sample .env file:
```bash
GEONAMES_USERNAME=your_geonames_username
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key
```

## APIs Used
- Geonames API: Used to fetch geographical information based on the user's input location.
- Weatherbit API: Provides the weather forecast for the selected destination and travel date.
- Pixabay API: Supplies images of the destination to give the user a visual preview of their trip location.

## Technologies Used

1. JavaScript
2. SCSS
3. HTML
4. Jest for testing
5. Webpack for bundling
