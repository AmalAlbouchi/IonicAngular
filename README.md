# IonicAngular

This is a mobile app using Ionic Angular + Camunda Rest Api

# Setup

Install the needed dependencies

```bash
npm install
```

# Run the app

Run the app at localhost:8100

```bash
ionic serve
```
There are 3 types of users :  
- admin (login: agent, pass:bpm)  
- teacher (login: enseignant, pass:bpm)  
- student (login: etudiant, pass:bpm)

# Generate Android Project

Run these lines to generate an android project (you can change android by  if needed)

```bash
ionic integrations enable capacitor
npm install @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
ionic capacitor add android
ionic capacitor build android
```

And each time you want to rebuild your android app, run this

```bash
ionic capacitor sync android
```
