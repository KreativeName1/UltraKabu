# UltraKabu Browser Extension
A Browser extension that makes Digikabu.de better. This is a Fork of [@Random-user420](https://github.com/Random-user420/bestKabu)

## Usage
#### Chrome:
  1. Download Source Code
  1. Enable Developer Mode
  2. Import unpacked extension

#### Firefox
Currently not working on Firefox

## Login by Extension

### With Encryption:
1. Open the extension on the digikabu.de website.
2. Enable Login by Extension
3. Enter your username, password, and an encryption key (Note: using a key longer than your credentials is unnecessary).
4. Check the "Enable Password Protection" option.
5. Click the "Save Login" button.
   
**Note:** If no username or password is entered, the existing credentials won't be overwritten.

**To log in:** 
- Open the extension, enter your encryption key, and click "Login."

### Without Encryption:
1. Open the extension on the digikabu.de website.
2. Enable Login by Extension
3. Enter your username and password.
4. Click the "Save Login" button.
   
**Note:** If no username or password is entered, the existing credentials won't be overwritten.

## Current features:
- Dark mode toggle
- Login by Extension to make login faster
- Custom highlighting
- Time remaining until the next lesson
- Full color customization of themes and lessons
- Import/Export of settings
- Buttons/Links that can be customized

## Preview
![Schedule](https://github.com/user-attachments/assets/b11e871a-b80a-4a25-9d0d-d7c601955fad)
![Main](https://github.com/user-attachments/assets/5f391d9b-5e2e-4015-8bb8-249141005938)
![Settings](https://github.com/user-attachments/assets/3b55450b-60b0-45f0-ba58-b5dda9b7d2b2)




# Contribution Guide

## Intro

If you want to contribute, you are free to do so. If you have any questions, you are free to do so. If you have found issues oder want to suggest features, you can submit that in GitHub.

## General

For anything, create a pull request with the naming scheme (featue/…  |  fix/…   | refactor/…) and if avalible the reference to the issue, and we test it, or change some things and then merge it into main. For git commit messages please follow this guide: https://www.conventionalcommits.org/en/v1.0.0/. And the commit git e-mail should be the same as your GitHub e-mail. For further questions, please contact us.

### Note
The Makefile is for packaging and only works on Linux. Just ignore it if you're not experienced.

#### Firefox

    $ make pack-fire

#### Chromium

    $ make pack-chr
