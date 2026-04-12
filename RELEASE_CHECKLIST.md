# EasyFit Release Checklist

Run this before any web or mobile release.

## 1. Project Health

- [ ] Install dependencies: `npm install`
- [ ] Run Expo health check: `npm run check:expo`
- [ ] Run production audit: `npm run check:audit`
- [ ] Verify Firebase env keys: `npm run check:env`
- [ ] Build web bundle: `npm run check:web-build`
- [ ] Optional one-command check: `npm run check:all`

## 2. Firebase Readiness

- [ ] API key allows mobile requests (not restricted to HTTP referrers only)
- [ ] API restrictions include at least Identity Toolkit API and Cloud Firestore API
- [ ] Firestore rules reviewed and deployed: `firebase deploy --only firestore:rules`

## 3. App Configuration

- [ ] Confirm app identity in app.json (`name`, `slug`, android package)
- [ ] Confirm EAS project id and build profiles in eas.json
- [ ] Bump app version if making a release

## 4. Web Deploy

- [ ] Build web output: `npm run build:web`
- [ ] Deploy hosting: `npm run deploy:web`
- [ ] Open hosted URL and test login, navigation, and Firestore reads

## 5. Android Release Build (EAS)

- [ ] Login to EAS: `eas login`
- [ ] If project is in OneDrive, clear readonly attrs first: `npm run prepare:eas`
- [ ] Build preview/internal: `npm run eas:build:preview`
- [ ] Build production: `npm run eas:build:production`
- [ ] Test install on real device before publishing

## 6. Final Smoke Test

- [ ] Login works on Expo Go and release build
- [ ] Favorites add/remove works
- [ ] Exercise list/detail screens load correctly
- [ ] No runtime red screen or permission errors in app logs
