# Grundfos Quiz
A security quiz for Grundfos

## Demo
https://tehwave.github.io/grundfos-quiz/

## Instructions

These instructions are for adding a new language. For this guide, I will use 'deutsch' as an example. Please note that 'deutsch' is case sensitive.

1. Duplicate the files in the '/files' folder, and rename them to include 'deutsch' instead of 'dansk'. Translate the content inside, but be careful not to mess with the structure.

2. Open the 'app.js' file in the '/js' folder. Edit the 'locales' to include your translated content–remember to keep the same structure–and add 'deutsch' to the 'languagesAvailable' array.

3. Open the 'index.html' file in the root folder. Edit the Languages section to include your Language selection by duplicating the 'english' section and replacing the 'english' specific content to your 'deustch' equivalent.

## Notes

The web application does not work optimally locally due to the Fetch API. You must run e.g. XAMPP for it to work in a local environment.

## Credits

- [Peter Christian Jørgensen](https://github.com/tehwave)
- [All Contributors](../../contributors)
