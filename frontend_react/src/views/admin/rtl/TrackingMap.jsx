/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Text,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  AlertDescription,
  useColorModeValue,
  Button,
  Input,
  Badge,
  Divider,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { useContext, useRef, useLayoutEffect, useEffect } from "react";
import { PlacesContext } from "contexts/places/PlacesContext";
import { MapContext } from "contexts/map/MapContext";
import { Spinner } from "@chakra-ui/react";
import { LngLatBounds, Map, Marker, Popup, AnySourceData } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

export default function TrackingMap() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [isLoading, setIsLoading] = useState(true);
  const { userLocation } = useContext(PlacesContext);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const endPoint = "http://localhost:8000/api";
  const [map, setMap] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [viewProvince, setViewProvinces] = useState([]);
  const [zoom, setZoom] = useState(16);
  const [pointProvince, setPointProvince] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [background, setBackground] = useState("");
  const [kms, setKms] = useState([]);
  const [minutes, setMinutes] = useState([]);

  if (!navigator.geolocation) {
    alert("El navegador no tiene opción de geolocalización");
    throw new Error("El navegador no tiene opción de geolocalización");
  }
  let dato = JSON.parse(localStorage.user);
  useLayoutEffect(() => {
    if (dato.status === 1) {
      let isMounted = true;
      async function getAllProvinces() {
        const response = await axios.get(`${endPoint}/getAllProvinces/`);
        if (isMounted) {
          setProvinces(response.data);
        }
      }
      setIsLoading(false);
      if (!isLoading) {
        const map = new Map({
          container: "mapDiv", // container ID
          style: "mapbox://styles/mapbox/streets-v12", // style URL
          center: !pointProvince ? userLocation : viewProvince, // starting position [lng, lat]
          zoom: zoom, // starting zoom
        });
        const collegeLocationPopUp = new Popup().setHTML(
          `<img src="https://www.diariofutrono.cl/files/62957cb21d73f_890x533.webp" width="500" height="600">
          <h4 style="text-align: center"><strong>Escuela Rural Riñinahue</strong></h4>`
        );
        const collegeMarker = new Marker({ color: "#422afb" })
          .setLngLat(userLocation)
          .setPopup(collegeLocationPopUp)
          .addTo(map);
        const markerProvinces = provinces.map((provinces) => {
          const newMarker = new Marker({ color: "#422afb" })
            .setLngLat([provinces.longitude, provinces.latitude])
            .addTo(map);
          return newMarker;
        });
        setMap(map);
      }
      getAllProvinces();
      return () => {
        isMounted = false;
      };
    }
  }, [zoom, userLocation, isLoading]);

  const directionsApi = axios.create({
    baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
    params: {
      alternatives: false,
      geometries: "geojson",
      overview: "simplified",
      steps: false,
      language: "es",
      access_token:
        "pk.eyJ1IjoiZGVmb25seSIsImEiOiJjbGE2N25kc3UwMHBlM29zMHFpbWFvaHAzIn0.6byxMcCQvzsHBdIITgSZlw",
    },
  });

  // useEffect(() => {

  //   getAllProvinces();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // if (userLocation === undefined) {
  //   setIsLoading(true);
  //   return <>{isLoading && <Spinner size="xl" />}</>;
  // }
  // if (isLoading) {
  //   return (
  //     <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
  //       <Spinner size="xl" />
  //     </Box>
  //   );
  //   }
  const locationOrigin = () => {
    // if (!isMapReady) throw new Error("Mapa no está listo");
    if (!userLocation) throw new Error("No está definida una ubicación");
    map?.flyTo({
      zoom: 16,
      center: userLocation,
    });
  };

  const locationProvince = async (provinceId, arrayLngLat) => {
    const responseDirectionsApi = await directionsApi.get(
      `/${userLocation.join(",")};${arrayLngLat.join(",")}`
    );
    console.log(responseDirectionsApi);
    const { distance, duration, geometry } =
      responseDirectionsApi.data.routes[0];
    const { coordinates: coords } = geometry;
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;
    const minutes = Math.floor(duration / 60);
    setKms(kms);
    setMinutes(minutes);
    const bounds = new LngLatBounds();
    for (const coord of coords) {
      bounds.extend(coord);
    }
    map.fitBounds(bounds, {
      padding: 100,
    });
    const sourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };
    if (map.getLayer("RouteString")) {
      map.removeLayer("RouteString");
      map.removeSource("RouteString");
    }
    map.addSource("RouteString", sourceData);
    map.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#0bc5ea",
        "line-width": 3,
      },
    });
    setActiveId(provinceId);
    setBackground("#e9e3ff");
    setPointProvince(true);
    setViewProvinces(arrayLngLat);
    // map?.flyTo({
    //   zoom: 14,
    //   center: arrayLngLat,
    // });
  };

  const onQueryChange = (event) => {};

  if (dato.status === 1) {
    return (
      <>
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <div
            id="mapDiv"
            style={{
              height: "70vh",
              right: "0",
              position: "fixed",
              bottom: "10rem",
              width: "83vw",
            }}
          >
            {/* <Input
          htmlSize={4}
          width="250px"
          position="fixed"
          top="9rem"
          left="20rem"
          backgroundColor="white"
          zIndex="999"
          placeholder="Lugares"
          onChange={onQueryChange}
        /> */}
            <Box
              maxW="sm"
              backgroundColor="white"
              borderWidth="1px"
              borderRadius="lg"
              overflowY="scroll"
              width="250px"
              height="600px"
              position="fixed"
              top="9rem"
              left="20rem"
              zIndex="999"
            >
              {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}
              {provinces.map((provinces) => (
                <Box
                  key={provinces.id}
                  p="3"
                  style={{
                    backgroundColor:
                      activeId === provinces.id ? background : null,
                  }}
                >
                  <Divider />
                  <Box display="flex" alignItems="baseline" mt={2}>
                    <Box fontSize="0.9rem" fontWeight="bold" px="2">
                      Comuna:
                    </Box>
                    <Badge
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                      borderRadius="full"
                    >
                      {provinces.nameProvince}
                    </Badge>
                  </Box>
                  {kms.length !== 0 && activeId === provinces.id ? (
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      Kilómetros: {kms}, Tiempo: {minutes} minutos
                    </Box>
                  ) : null}
                  <Box display="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      <Button
                        onClick={() =>
                          locationProvince(provinces.id, [
                            parseFloat(provinces.longitude),
                            parseFloat(provinces.latitude),
                          ])
                        }
                        mt="0.3rem"
                        fontSize="0.9rem"
                        p={1.5}
                        variant="brand"
                      >
                        Ubicación
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </div>
          <Button
            onClick={locationOrigin}
            style={{
              position: "fixed",
              top: "140px",
              right: "20px",
              // zIndex: "1",
              color: "white",
            }}
            colorScheme="cyan"
          >
            Escuela Rural Riñinahue
          </Button>
        </Box>
      </>
    );
  } else {
    return (
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="150px"
        >
          <AlertIcon boxSize="40px" mr={0} alignItems="center" />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            ACCESO RESTRINGIDO!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Este modulo esta disponible solo para el usuario Administrador.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }
}
