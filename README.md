# FrontEnd

### To run the app there are a number of dependancies required ###

Node JS is the javascript engine for executing the code. 
Android Studio or the EXPO Go mobile app. <br /> <br />
The code dependancies are installed using NPM.
<br />
* Android studio: https://developer.android.com/studio
* EXPO Go mobile app: https://expo.dev/client
* NPM: https://www.npmjs.com

### Running the app: ###

* Open the project directoiry in your terminal of choice.

* Run the following command to install all Node dependancies.

    `npm install`

* Run the following command to run the app.

    `npm run start`
    
* To view the app:

  * If you are using the Expo GO app to use the app, scan the QR code printed in the terminal. 

  * If you are using the Android studio emulator, open another terminal inside the project dicrectory and run the following command:
  
      `npm run android`
      
      
* If you are running the backend server locally you will need to change this line to your local endpoint: https://github.com/Advanced-Software-Engineering-Group-15/FrontEnd/blob/df12b88817215143f0cd31b3da39e89a0febb26a/constants.tsx#L1

## Linting

`npx eslint "./**" -o "./lint_results.html" --format html` - To lint the entire project and store in file as html

`npx eslint .\pages\CreateNewUsers.tsx` - To print all linting errors

`npx eslint --fix .\pages\CreateNewUsers.tsx` - To fix linting errors that are basic






