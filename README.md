# Getting Started

> **Note**: Make sure you have a running localhost server open from [Rocket Server](https://github.com/zahir535/express-rocket). Make sure the localhost is running on port 8080.

> **Note**: Make sure you update the firebase config in server repo [Rocket Server](https://github.com/zahir535/express-rocket) with a valid firebase client secrets (App for Web).

## Step 1: Open React Native App in a simulator

First, you will need run this command to run node_modules & the pods. This will initialize node modules & pods directory to open IOS simulator.

### For iOS

```bash
yarn clean:modules && yarn clean:ios && yarn clean:android

# then run
yarn ios

# or
yarn ios:13  # if you have iphone 13 simulator
```

### For Android

```bash
yarn clean:modules && yarn clean:ios && yarn clean:android

yarn android
```

## Step 2: App initialize & ready to use

Supposedly, the metro will started & app is initialized. You need to calculate PI values first before the calculated PI values & the calculated Circumference values will be shown in the first page

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
