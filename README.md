<div align="center">

<img src="public/brand-mark.svg" alt="Mausam logo" width="72" />

# Mausam — Weather across India

**One calm dashboard for India-wide forecasts, official IMD alerts, air-quality estimates and trip planning.**

[**Live demo →**](https://krishnamagrawal05.github.io/MAUSAM/)

</div>

---

## Overview

**Mausam** (मौसम, "weather") is a web app that brings everything you need to know about the weather in India into a single, easy-to-read page. Search any Indian city or PIN code, or use your current location, and get current conditions, hourly and five-day forecasts, air-quality estimates, official weather warnings, and tools to compare cities and plan trips.

The interface is available in **10 languages** and can be installed on your device like an app.

## Features

| Feature | What it does |
| --- | --- |
| **Search** | Find any Indian city or PIN code, or tap *Use my location*. |
| **Current conditions** | Temperature, feels-like, humidity, wind (at 10 m), pressure, visibility and UV index. |
| **Hour-by-hour forecast** | Scrollable hourly forecast for your selected city, shown in IST. |
| **Five-day forecast** | Daily highs, lows and conditions. |
| **Weather trends** | 24-hour temperature and rain-chance charts. |
| **IMD weather alerts** | Official warnings from the India Meteorological Department, with source links. |
| **Air-quality outlook** | PM2.5 / PM10-based model estimate with a 0–400+ scale. |
| **India weather map** | Model-based map layers for rain, clouds and wind, with a forecast-time control. |
| **Monsoon patterns** | An illustrative, interactive view of wind, clouds and rain across India (with a pause-motion option). |
| **Explore India** | Browse weather across India's many microclimates. |
| **Saved cities** | Save favourite cities, stored locally on your device. |
| **Compare cities** | Compare current conditions and five-day highs/lows for up to three locations. |
| **Trip planner** | Pick a start, destination and travel day to compare weather over the next five days. |
| **Multilingual** | English, हिन्दी, বাংলা, తెలుగు, मराठी, தமிழ், ಕನ್ನಡ, മലയാളം, ગુજરાતી, ਪੰਜਾਬੀ. |
| **Installable (PWA-style)** | Add it to your home screen from the *Install* button. |

## Data sources

- **[Open-Meteo](https://open-meteo.com/en/docs)** — weather forecasts and air-quality model data
- **[IMD (India Meteorological Department)](https://mausam.imd.gov.in/responsive/subDivisionWiseWarningGIS.php)** — official weather warnings
- **[GeoNames](https://www.geonames.org/)** — place and location search

## Important notes and limitations

- The **India weather map** shows interpolated model guidance. It is **not** live radar, satellite imagery or observed rainfall.
- The **air-quality figure** is a coarse estimate from PM2.5/PM10 only. It is **not** a CPCB station reading, a complete Indian AQI, or medical advice.
- The **Monsoon patterns** visual is illustrative.
- The **trip planner** covers the next five days only and is planning guidance; forecasts can change.
- For severe weather, always **follow guidance from local authorities** and official IMD bulletins.
- Saved cities are stored **on your device only**.

## Getting started

### Use it online

Just open **https://krishnamagrawal05.github.io/MAUSAM/**

### Run it locally

```bash
# 1. Clone the repository
git clone https://github.com/krishnamagrawal05/MAUSAM.git
cd MAUSAM

# 2. Serve the folder with any static server, for example:
npx serve .
# or
python3 -m http.server 8000
```

Then open the local address shown in your terminal (e.g. `http://localhost:8000`).

> If the project uses a build step (e.g. Vite/npm), replace the commands above with `npm install` and `npm run dev`.

## Project structure

```
MAUSAM/
├── index.html
├── public/
│   ├── brand-mark.svg      # logo
│   └── hero-weather.mp4    # hero background video
└── ...
```

> Update this tree to match your actual repository layout.

## Deployment

The site is hosted on **GitHub Pages**. Pushing to the configured branch publishes the latest version at the live URL above.

## Licensing and attribution

- The free Open-Meteo forecast API is for **non-commercial use**; commercial use requires a licence from Open-Meteo.
- Weather warnings are © their respective publisher, the India Meteorological Department.
- Place data is provided by GeoNames.

Add your own project licence here (e.g. MIT) and a `LICENSE` file.

## Contributing

Suggestions and pull requests are welcome.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-idea`)
3. Commit your changes
4. Open a pull request

## Author

Made by **Krishna Agrawal** — [@krishnamagrawal05](https://github.com/krishnamagrawal05)

---

<div align="center">
<sub>Bharat, under the open sky. 🌦️</sub>
</div>
