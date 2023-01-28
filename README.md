
# Weather App

A responsive weather website that gives the weather of your current location on load and allows you to search for the weather of a specific place using the search option.

## Features
- Displays time, name of place, a short weather description, temperature in Celsius, minimum and maximum temperature, sunrise and sunset timing
- Provides a 5-day weather forecast, including the above parameters for each day
- Uses the OpenWeather API and OpenCage API to determine your location

## Getting Started

1. Clone the repository: `git clone https://github.com/MohitGupta12/weather-app.git`
2. Install dependencies: `npm install` or `yarn install`
3. Create a new OpenWeather API key from https://openweathermap.org/api
4. Create a new OpenCage API key from https://opencagedata.com/api
5. Create a `.env` file in the root directory and add the following:
    ```
    REACT_APP_WEATHER_API_KEY=[your OpenWeather API key]
    REACT_APP_GEOCODE_API_KEY=[your OpenCage API key]
    ```
6. Start the development server: `npm start` or `yarn start`

## Built With

- [Javascript](https://www.javascript.com/)
- [OpenWeather API](https://openweathermap.org/api)
- [OpenCage API](https://opencagedata.com/api)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

