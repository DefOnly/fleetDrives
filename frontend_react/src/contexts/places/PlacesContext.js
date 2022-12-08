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

  useEffect(() => {
    const map = PlacesAction.payload;
    // getUserLocation().then(lngLat => dispatch({ type: PlacesAction.setUserLocation, payload: PlacesAction.payload = lngLat }))
    dispatch({ type: PlacesAction.setUserLocation, payload: map})
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
