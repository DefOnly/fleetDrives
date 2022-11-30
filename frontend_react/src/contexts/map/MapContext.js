import { createContext } from "react";
import { useReducer } from "react";
import { Map } from 'mapbox-gl';

export const MapContext = createContext({});

const INITIAL_STATE = {
    isMapReady: false,
    map: undefined
  };

const MapAction = {
setMap: "setMap",
payload: Map
};

const reducer = (state, action) => {
    switch (action.type) {
      case MapAction.setMap:
        return { ...state, isMapReady: true, map: action.payload };
      default:
        return state;
    }
  };

  export const MapProvider = ({ children }) => {
    const [MapState, dispatch] = useReducer(reducer, INITIAL_STATE);
    const setMap = () => {
      const map = MapAction.payload;
      // const collegeLocationPopUp = new Popup().setHTML(
      //   `<h4><strong>Escuela Rural Riñinahue</strong></h4>`
      // );
      // const collegeMarker = new Marker({ color: "#422afb" })
      //   .setLngLat(map.getCenter())
      //   .setPopup(collegeLocationPopUp)
      //   .addTo(map);
        dispatch({ type: MapAction.setMap, payload: map});
    }
    return (
      <MapContext.Provider
        value={{
          ...MapState,
          setMap
        }}
      >
        {children}
      </MapContext.Provider>
    );
  };
