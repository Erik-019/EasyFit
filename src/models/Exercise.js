/**
 * Exercise data model
 *
 * Shape of an exercise object returned from the API (or mock data).
 * Using plain objects — no class needed for a read-only app.
 */

/**
 * @typedef {Object} Exercise
 * @property {string}   id          - Unique identifier
 * @property {string}   name        - Exercise name
 * @property {string}   bodyPart    - Target body part (e.g. "Chest", "Legs")
 * @property {string}   difficulty  - "Beginner" | "Intermediate" | "Advanced"
 * @property {string}   description - Short description of the exercise
 * @property {string}   videoUrl    - External video tutorial link
 * @property {string}   image       - Illustration/thumbnail URL
 * @property {string[]} tips        - List of form tips
 * @property {number}   sets        - Recommended sets
 * @property {string}   reps        - Recommended reps (e.g. "8-12")
 */

export const BODY_PARTS = [
  { id: 'chest', label: 'Chest', icon: 'fitness-center' },
  { id: 'back', label: 'Back', icon: 'fitness-center' },
  { id: 'legs', label: 'Legs', icon: 'fitness-center' },
  { id: 'shoulders', label: 'Shoulders', icon: 'fitness-center' },
  { id: 'arms', label: 'Arms', icon: 'fitness-center' },
  { id: 'core', label: 'Core', icon: 'fitness-center' },
];
