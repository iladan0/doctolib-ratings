# ⭐ doctolib-ratings

This Chrome extension displays Google Maps ratings directly next to doctors' names on the Doctolib website, saving you the hassle of checking their ratings in a separate tab.

## Features

-   Shows Google Maps ratings (stars, rating score, and number of reviews) next to each doctor's name on Doctolib listings.
-   Displays "No rating found" if a doctor has no Google Maps rating.
-   Provides a user-friendly popup for enabling/disabling the extension and setting the Google Maps API key.
-   Respects user settings and persists them across browser sessions.

## How to Use

### 1. Get a Google Maps API Key

   -   Go to the [Google Cloud Console](https://console.cloud.google.com/).
   -   Create a new project or select an existing one.
   -   Enable the "Places API".
   -   Create credentials (API key).
   -   Copy the generated API key.

### 2. Install the Extension

  -  Clone this repository: `git clone <your-repository-url>`
   -   Open Chrome.
   -   Go to `chrome://extensions/`.
   -   Enable "Developer mode" in the top-right corner.
   -   Click "Load unpacked".
   -   Select the directory containing this repository.

### 3. Configure the Extension

  - Click on the extension icon
  - Paste the Google Maps API key into the input.
  - Enable or disable the extension according to your preference
  - Click save.
### 4. Enjoy!

- Visit Doctolib, and you'll see the Google Maps ratings appearing automatically.
![doctolib-screenshot](https://github.com/user-attachments/assets/bc09485c-2f95-4d27-974a-03c3d1a672b3)


## Code Structure

The project consists of the following files:

-   **`manifest.json`:** Contains the metadata of the extension.
-   **`content.js`:** Injects ratings into the Doctolib website.
-   **`background.js`:** Fetches rating data from Google Maps API.
-   **`popup.html`:** Defines the HTML structure for the settings popup.
-   **`popup.js`:**  Handles interactions and storage for the popup.

## Contributing

Feel free to fork this repository and submit pull requests with any improvements or bug fixes.

## License

This project is open-source.

## Notes

-  The extension respects your settings and works on all Doctolib pages.
-  Make sure your Google Maps API key is not restricted or it will not work

## Contact

For any questions or feedback, feel free to submit an issue or send me a message on LinkedIn.
