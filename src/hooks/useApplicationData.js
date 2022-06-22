import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_SELECTED_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

const useApplicationData = () => {
  // Setup the initial state
  const initialState = {
    days:[],
    selectedDay: "Monday",
    appointments: {},
    interviewers: {}
  };



  // use reducer to manage the state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch the days, appointments and interviewers data
  // and dispatch the SET_APPLICATION_DATA action to update state
  // Happens only once when the <Application> is first rendered
  useEffect(() => {

    const daysPromise = axios.get("/api/days");
    const appointmentsPromise = axios.get("/api/appointments");
    const interviewersPromise = axios.get("/api/interviewers");

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
      .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data,
        });
      });

  }, []);

  // Three functions to be returned and passed to other components
  // as event handlers where set state is needed

  // Set the selected day when it's changed
  const setSelectedDay = selectedDay => dispatch({ type: SET_SELECTED_DAY, selectedDay });

  // Makes a request to the database API and update the state
  // when a new or edited interview is saved
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => dispatch({type:SET_INTERVIEW, id, interview}));
  };

  // Makes a request to the database API and update the state
  // when an interview is deleted
  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({type:SET_INTERVIEW, id, interview: null}));
  };

  useEffect(() => {
    // Use websocket to make persistent connection with the API server
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.addEventListener("open", () => {
      webSocket.send("ping");
    });

    // Listen for all SET_INTERVIEW actions and set state accordingly
    // so that a user can see any other users' update without refreshing the page
    webSocket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "SET_INTERVIEW") {
        dispatch({
          type: SET_INTERVIEW,
          id: message.id,
          interview: message.interview
        });
      }
    });

    // Return a cleanup function to close the websocket connection when the app is closed
    const cleanup = () => webSocket.close();

    return cleanup;
  }, []);

  return {
    state,
    setSelectedDay,
    bookInterview,
    deleteInterview
  };
};

export default useApplicationData;
