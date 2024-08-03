import { TrainingDbModel } from "../../model/training.db.model";

export const hiit: TrainingDbModel = {
  id: '65d4d015261e894a1da31a65',
  "label": "HIIT Training",
  "workout": [
    {
      "label": "warm-up",
      "sets": [
        {
          "series": ["Jumping Jacks"],
          "rep": 1,
          "duration": 40,
          "rest": 20,
        },
        {
          "rep": 3,
          "series": ['Arm Circles', 'Bodyweight Squats', 'High Knees'],
          "duration": 40,
          "rest": 20,
          "pause": 60,
        }
      ]
    },
    {
      "label": "HIIT",
      "sets": [
        {
          "rep": 4,
          "rest": 60,
          "pause": 60,
          "sets": [
            {
              "rep": 8,
              "series": ['Burpees', 'Mountain Climbers', 'Jumb rope', ' Jump Squats', 'Push-Ups', 'Russian Twists', 'Bank jumb', 'Jumping Lunges'],
              "duration": 40,
              "rest": 20
            }
          ]
        }
      ]
    },
    {
      "label": "cooldown",
      "sets": [
        {
          "rep": 2,
          "series": ['Standing Hamstring Stretch', 'Quadriceps Stretch'],
          "duration": 60,
        },
        {
          "rep": 1,
          "series": ['Shoulder Stretch'],
          "sets": [
            {
              "rep": 2,
              "series": ['Left', 'Right'],
              "sets": [
                {
                  "rep": 3,
                  "duration": 10,
                }
              ]
            }
          ]
        },
        {
          "rep": 1,
          "series": ["Child's Pose"],
          "duration": 60,
        }
      ]
    }
  ]
};
