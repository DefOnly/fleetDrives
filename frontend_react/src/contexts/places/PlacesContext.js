import { createContext } from "react";
import { useReducer, useEffect } from "react";
import {getUserLocation} from "helpers/getUserLocation";

export const PlacesContext = createContext({});

const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined,
};

const PlacesAction = {
  setUserLocation: "setUserLocation",
  payload: [-40.318720534573906, -72.21028681882603]
};

const reducer = (state, action) => {
  switch (action.type) {
    case PlacesAction.setUserLocation:
      return { ...state, idLoading: false, userLocation: action.payload };
    default:
      return state;
  }
};

export const PlacesProvider = ({ children }) => {
  const [placesState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    // getUserLocation().then(lngLat => dispatch({ type: PlacesAction.setUserLocation, payload: PlacesAction.payload = lngLat }))
    dispatch({ type: PlacesAction.setUserLocation, payload: PlacesAction.payload})
  }, []);

  return (
    <PlacesContext.Provider
      value={{
        ...placesState,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
