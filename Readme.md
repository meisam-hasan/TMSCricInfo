# TMSCricInfo

A React Native project.

## Dependency Setup

Clone the repo and install Node.js. Run the command `npm install`.

## API Setup

Get an API key from [CricketData.org](https://cricketdata.org/) by logging in or creating a new account. Rename `.env.test` to `.env` and set the API key.Also need an to expo.

## Push Notification

Create an app in Firebase, generate the access key and `google-services.json`, and download it. Place these in the root folder. Install EAS by following the instructions on [this page](https://docs.expo.dev/push-notifications/fcm-credentials/).

## Running the App

Run the command `npx expo start`. While the app is starting, the Expo push token will be logged in the console—save this token.

## Sending Push Notifications

You can send push notifications to users using the Expo push token from [this page](https://expo.dev/notifications). Push notifications require the app to run on a real device.

## App Build

Use the `eas build:configure` command to generate the `eas.json` file. After making the necessary modifications to this file, you can easily build the app for the Play Store or iOS.Run this command to build `eas build --profile preview`

## Technical Discussion

 **For live score updates, either a push or pull system can be used. A pulling system was used for live updates.

 **Direct FCM push notifications can be used, but by using the Expo push token, push notifications can be sent from any server using the POST method.

 **Expo was used because it simplifies many complexities with flexibility and makes the build process easy, though it may not update as quickly as React Native.
