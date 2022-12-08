import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispath } = useWorkoutsContext();
  // destructure and rename but only inside this file

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    // dispatch logour action
    dispatch({ type: "LOGOUT" });
    workoutsDispath({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
