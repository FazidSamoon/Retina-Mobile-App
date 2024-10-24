export const getExercises = (myInfo: any) => {
  let exercises = [];

  if (myInfo?.retinopathy === "No") {
    exercises.push("Pacing");

    const age = parseInt(myInfo?.age, 10);

    if (age < 40) {
      exercises.push("Jogging", "Gym");

      if (myInfo?.bloodPressure === "Low") {
        if (myInfo?.heartProblems === "No") {
          exercises.push("Cycling", "Swimming");
        } else if (myInfo?.heartProblems === "Yes") {
          exercises.push("Yoga", "Stretching");
        }
      } else if (myInfo?.bloodPressure === "Normal") {
        if (myInfo?.heartProblems === "No") {
          exercises.push("Running", "Cycling", "Swimming");
        } else if (myInfo?.heartProblems === "Yes") {
          exercises.push("Walking", "Yoga");
        }
      } else if (myInfo?.bloodPressure === "High") {
        if (myInfo?.heartProblems === "No") {
          exercises.push("Walking", "Yoga", "Swimming");
        } else if (myInfo?.heartProblems === "Yes") {
          exercises.push("Walking");
        }
      }
    } else {
      exercises.push(" Walking", "Yoga");
      if (
        myInfo?.bloodPressure === "Low" ||
        myInfo?.bloodPressure === "Normal"
      ) {
        exercises.push("Swimming", "Gym");
      } else if (myInfo?.bloodPressure === "High") {
        exercises.push("Walking");
      }
    }
  } else {
    exercises.push("Treadmill");
  }

  return exercises;
};
