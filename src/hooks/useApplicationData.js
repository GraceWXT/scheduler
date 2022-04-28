import { useReducer, useEffect } from "react";
import axios from "axios";
const useApplicationData = () => {
  // Setup the initial state
  const initialState = {
    days:[],
    selectedDay: "Monday",
    appointments: {},
    interviewers: {}
  };

  // create const for each action types which works like enums
  const SET_SELECTED_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  // A reducer function returns the updated state
  // for different action types
  const reducer = (state, action) => {
    // Dedestructure the action object to get the values needed
    const { selectedDay, days, appointments, interviewers, id, interview } = action;

    switch (action.type) {

    // For action type "SET_SELECTED_DAY", update the selected day in the state object
    case SET_SELECTED_DAY:
      return { ...state, selectedDay };

    // For action type "SET_APPLICATION_DATA",
    // update the days, appointments and interviewers data in the state object
    case SET_APPLICATION_DATA:
      return { ...state, days, appointments, interviewers};

    // For action type "SET_INTERVIEW",
    // update the interview object (of given id) in the appointments object,
    // and update the spots remaining in the days array
    case SET_INTERVIEW: {
      // Update appointments
      const appointment = {
        ...state.appointments[id],
        interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      // Update days
      const updateSpotsOfDays = (id, appointments) => {
        const oldDayObj = state.days.find(day => day.appointments.includes(id));
        const spots = oldDayObj.appointments.filter((appoId) => !appointments[appoId].interview).length;
        const days = state.days.map(day => {
          if (day.id === oldDayObj.id) return {...oldDayObj, spots};
          return day;
        });
        return days;
      };
      const days = updateSpotsOfDays(id, appointments);
      // Return the state with updated appointments and days
      return { ...state, appointments, days};
    }
    // Throw an error if the action type is not listed above
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
    }
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