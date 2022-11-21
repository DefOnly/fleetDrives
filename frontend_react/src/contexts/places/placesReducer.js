import { INITIAL_STATE } from "./PlacesContext";
import { useReducer } from "react";

const PlacesAction = {
  type: "setUserLocation",
};

const reducer = (state, action) => {
  switch (action.type) {
    case PlacesAction.setUserLocation:
      return { ...state, idLoading: false, userLocation: action.payload };
    default:
      return state;
  }
};
export const PlacesReducer = () => {
  const [placeState, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {userLocation} = placeState;
  dispatch({type: PlacesAction.setUserLocation, payload: userLocation});
};
