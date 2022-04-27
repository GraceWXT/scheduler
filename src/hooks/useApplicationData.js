import { useReducer, useEffect } from "react";
import axios from "axios";
const useApplicationData = () => {
  const initialState = {
    days:[],
    selectedDay: "Monday",
    appointments: {},
    interviewers: {}
  };

  const SET_SELECTED_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducer = (state, action) => {
    const { selectedDay, days, appointments, interviewers, id, interview } = action;
    switch (action.type) {
    case SET_SELECTED_DAY:
      return { ...state, selectedDay };
    case SET_APPLICATION_DATA:
      return { ...state, days, appointments, interviewers};
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[id],
        interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const updateSpotsOfDays = (id, appointments) => {
        const oldDayObj = state.days.find(day => day.appointments.includes(id));
        const spots = oldDayObj.appointments.filter((appoId) => !appointments[appoId].interview).length;
        const days = state.days.map(day => {
          if (day.id === id) return {...oldDayObj, spots};
          return day;
        });
        return days;
      };
      const days = updateSpotsOfDays(id, appointments);
      return { ...state, appointments, days};
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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

  const setSelectedDay = selectedDay => dispatch({ type: SET_SELECTED_DAY, selectedDay });

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => dispatch({type:SET_INTERVIEW, id, interview}));
  };

  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({type:SET_INTERVIEW, id, interview: null}));
  };

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.addEventListener("open", () => {
      webSocket.send("ping");
    });

    webSocket.addEventListener("message", (event) => {
      console.log('Message Received: ', event.data);
    });

    const cleanup = () => WebSocket.close();

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