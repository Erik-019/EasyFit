#  EasyFit - Beginner Friendly Fitness App

EasyFit is a simple and beginner-friendly mobile fitness application built using React Native and Expo.

The goal of this app is to help new gym users understand exercises, learn correct form, and build consistent workout habits.

---

##  Features

-  Clean Home Screen with gym background
-  Beginner Workout Section 
-  Browse exercises by Body Parts
-  Detailed Exercise Information:
  - Target Muscles
  - Step-by-step Instructions
  - Beginner Tips
  - Common Mistakes
-  YouTube tutorial button for each exercise

---

##  Navigation Flow

HomeScreen  
→ BeginnerWorkoutScreen  
→ ExerciseDetailScreen  

HomeScreen  
→ BodyPartsScreen  
→ ExerciseListScreen  
→ ExerciseDetailScreen  

---

##  Supported Body Parts

- Chest  
- Back  
- Legs  
- Arm  
- Abs  
- Shoulder  

---

##  Beginner Workout List

- Press Ups  
- Pike Push Up  
- Incline Push Up  
- Diamond Push Up  
- Decline Push Up  
- Bodyweight Tricep Dip  
- Glute Bridge  
- Mountain Climbers  
- Plank  
- Walking Lunges  

---

##  Tech Stack

- React Native (Expo)
- React Navigation (Stack Navigator)
- JavaScript (ES6)
- Functional Components + useState

---

## 📁 Project Structure
````md
My_EasyFit/
├── App.js
├── package.json
├── README.md
├── assets/
│ ├── gym.jpg
│ └── screenshots/
└── src/
├── core/constants/exercises.js
├── navigation/AppNavigator.js
└── features/
├── home/HomeScreen.js
├── beginnerExercises/BeginnerWorkoutScreen.js
├── bodyParts/BodyPartsScreen.js
├── exerciseList/ExerciseListScreen.js
└── exerciseDetail/ExerciseDetailScreen.js

````



## ▶️ How to Run the App

### 1️⃣ Install dependencies

```bash
npm install

````
### Start Expo server
```bash
npm expo start --tunnel

````
### Run on device

. Scan QR using Expo Go (Android)

. or use iOS simulator

## License

This project is for educational purposes only.



