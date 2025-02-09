import { TrainingDbModel } from "../../model/training.db.model";

export const hiit: TrainingDbModel = {
  id: '65d4d015261e894a1da31a65',
  "slug": "man_hiit_240804",
  "workout": [
    {
      "slug": "warm-up",
      "sets": [
        {
          "slugs": ["jumping_jacks"],
          "rep": 1,
          "duration": 40,
          "rest": 20
        },
        {
          "rep": 3,
          "slugs": ["arm_circles", "bodyweight_squats", "high_knees"],
          "duration": 40,
          "rest": 20,
          "pause": 60
        }
      ]
    },
    {
      "slug": "hiit",
      "sets": [
        {
          "rep": 4,
          "rest": 60,
          "pause": 60,
          "sets": [
            {
              "rep": 8,
              "slugs": ["burpees", "mountain_climbers", "jumb_rope", " jump_squats", "push-ups", "russian_twists", "bank_jumb", "jumping_lunges"],
              "duration": 40,
              "rest": 20
            }
          ]
        }
      ]
    },
    {
      "slug": "cooldown",
      "sets": [
        {
          "rep": 2,
          "slugs": ["standing_hamstring_stretch", "quadriceps_stretch"],
          "duration": 60
        },
        {
          "rep": 1,
          "slugs": ["shoulder_stretch"],
          "sets": [
            {
              "rep": 2,
              "slugs": ["left", "right"],
              "sets": [
                {
                  "rep": 3,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "rep": 1,
          "slugs": ["child_s_pose"],
          "duration": 60
        }
      ]
    }
  ]
};
