# Mausam — Weather across India

A client-side weather dashboard for India. It includes country-wide city search, current conditions and forecasts, a draggable 3D-style globe, an illustrative India forecast map, PM-based air-quality estimates, IMD alert links, saved-city comparisons, charts, a trip planner, ten-language controls and an installable offline shell.

## Contents and requirements

This is a static site: no build step, server, package install or API key is needed. Keep the folder structure intact: `index.html` is at the repository root, with the app scripts and styles in `src/`, and the video, icons and PWA manifest in `public/`. The local asset paths and service worker are relative to the site root, so project sites hosted under `/OWNER/REPOSITORY/` work too.

To test locally, extract the archive and run `python3 -m http.server 8000` in the extracted folder, then open `http://localhost:8000`. Browser geolocation and service-worker features need HTTPS or `localhost`.

## Publish with GitHub Pages

1. Download and **extract** `Mausam-India-GitHub-Pages.zip` on your computer. Do not upload the ZIP itself; upload its contents while keeping `src/` and `public/` as folders.
2. Create a new repository on GitHub. On GitHub Free, Pages publishing requires a **public** repository. If you want to keep the repository private, check whether your GitHub plan supports Pages from private repositories.
3. In the repository, choose **Add file → Upload files**, then drag in the extracted files and folders. Keep `index.html` in the repository root. Commit the upload to `main`.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select branch **main** and folder **/(root)**, and click **Save**.
5. Check the **Actions** tab for the Pages deployment. A project site normally appears at `https://OWNER.github.io/REPOSITORY/`; a user site in a repository named `OWNER.github.io` appears at `https://OWNER.github.io/`. GitHub notes a first publish can take several minutes.

GitHub Pages sites are public on the internet, including sites published from a private repository on plans that allow that setup. Do not put secrets or private data in the site. This app uses public browser-side data services and contains no API keys.

## Data notes

Weather and air-quality model data are from Open-Meteo; the current free API is for non-commercial use. Obtain a suitable licence before commercial use. The AQI number is a PM2.5/PM10-based estimate, not a full CPCB station reading or medical advice. The map visualizes forecast-model guidance, not live radar. Severe-weather warnings link to the official IMD feed and portal. Location permission is requested only after a visitor chooses **Use my location**.

## GitHub references

- [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Configure a branch publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
