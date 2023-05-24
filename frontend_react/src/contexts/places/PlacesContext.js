import { createContext } from "react";
import { useState, useReducer, useEffect } from "react";
import { io } from "socket.io-client";
import {getUserLocation} from "helpers/getUserLocation";

export const PlacesContext = createContext({});

const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined,
};

const PlacesAction = {
  setUserLocation: "setUserLocation",
  payload: [-72.2102512582304, -40.318831740868504] 
};

const reducer = (state, action) => {
  switch (action.type) {
    case PlacesAction.setUserLocation:
      return { ...state, isLoading: false, userLocation: action.payload };
    default:
      return state;
  }
};

export const PlacesProvider = ({ children }) => {
  const [placesState, dispatch] = useReducer(reducer, INITIAL_STATE);
  // const [user, setUser] = useState(0);
  const [socket, setSocket] = useState(null);
  let dato = localStorage.user !== undefined ? JSON.parse(localStorage.user) : 0;
  let user = dato?.id;
  useEffect(() => {
    const map = PlacesAction.payload;
    // getUserLocation().then(lngLat => dispatch({ type: PlacesAction.setUserLocation, payload: PlacesAction.payload = lngLat }))
    dispatch({ type: PlacesAction.setUserLocation, payload: map})
  }, []);

  useEffect(() => {
    // setUser(userId);
    setSocket(io("http://localhost:4000")); 
    // console.log(socket);
  }, [])
  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user])
  console.log(socket);
  return (
    <PlacesContext.Provider
      value={{
        ...placesState,
        socket,
        user
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
