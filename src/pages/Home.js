import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import WorkoutCardDetails from "../components/WorkoutsCardDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("https://workoutbuddybackend-6qqe.onrender.com/api/workouts/", {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);
  // dependencies!

  return (
    <div className="home">
      <WorkoutForm />
      <div className="workout">
        {workouts &&
          workouts.map((workouts) => {
            return <WorkoutCardDetails key={workouts._id} workout={workouts} />;
          })}
      </div>
    </div>
  );
};

export default Home;

// workouts.map check there
