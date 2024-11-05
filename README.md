## Getting Started

First, run the development server:
```bash
npm i
```

```bash
npm run dev
```

## A/B testing logic

This app has 3 different routes

/timer - Page with timer logic (Test Group A)
/without-timer - Page with timer logic (Test Group B)
/ - Index route where growthbook will decide which Test (page) to show

Each browser new session initialisation app will create and store unique user id in LocalStorage
This user id will be used to determine to which A/B Test Group user will be attached

## App deployed to Netlify
https://ab-timer.netlify.app/