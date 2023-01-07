# User Mobile Application

The great User Mobile Application is built using [React.js](https://reactjs.org/) library, [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/). The UI library we are using is [React Native Paper](https://reactnativepaper.com/).

## Github

Link: [https://github.com/dusted-my/expo-mobile](https://github.com/dusted-my/expo-mobile)

## Get Started

### Prerequisite

- [Node.js](https://nodejs.org/) version 8.0 or higher

#### For Windows, Linux and Mac

It is highly suggested if you have Android Studio installed to run the project in an Emulator. Mac is optional to install since MacOS can use XCode

- [Android Studio](https://developer.android.com/studio)
- [Android Emulator](https://developer.android.com/studio/run/managing-avds)

#### For Mac

This is only available for Mac users.

- [XCode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- [Simulator](https://docs.experitest.com/display/TC/AS+-+Connecting+An+iOS+Emulator)

### Cloning Project

From the GitHub repository, you can download the project as zip folder and unzip it in your desired directory.

Similarly, you can clone the project into your device by running the following command in your desired directory:

```bash
git clone https://github.com/dusted-my/expo-mobile.git
```

### Opening Project

Open the project in your favorite IDE or code editor. If you are using VS Code, you can try the following commands for faster execution:

```bash
 Move your current directory into 'expo-mobile'
cd expo-mobile

 Using VS Code's shortcut 'code' to open up the project.
 The dot '.' means current directory
code .
```

### Running Project

When you have successfully opened the project in your favorite IDE or code editor. You can start to install the packages required and serving it.

To install the required packages, you need to run:

```bash
npm install
```

or using [yarn](https://yarnpkg.com/)

```bash
yarn
```

Now, you can run the mobile application in [http://localhost:3000](http://localhost:3000) by running

```bash
npm run dev
```

or using [yarn](https://yarnpkg.com/)

```bash
yarn dev
```

You should see a QR Code if the project is running successfully, then go ahead and install Expo Go mobile application in your mobile device to play with the project! You can install Expo mobile application through:

- [Google Play Store Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)
- [App Store Expo Go](https://apps.apple.com/us/app/expo-go/id982107779)

### Run on Android Emulator

Similarly, you can run the project directly on your Android Emulator by typing:

```bash
npm run android
 or using yarn
yarn android
```

### Run on iOS Simulator

Similarly, you can run the project directly on your iOS Simulator by typing:

```bash
npm run ios
 or using yarn
yarn ios
```
