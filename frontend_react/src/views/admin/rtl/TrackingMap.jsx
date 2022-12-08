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
import { useContext, useRef, useLayoutEffect } from "react";
import { PlacesContext } from "contexts/places/PlacesContext";
import { MapContext } from "contexts/map/MapContext";
import { Spinner } from "@chakra-ui/react";
import { Map, Marker, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function TrackingMap() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [isLoading, setIsLoading] = useState(true);
  const { userLocation } = useContext(PlacesContext);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [ map, setMap ] = useState({});
  const [lng, setLng] = useState(-72.2102512582304);
  const [lat, setLat] = useState(-40.318831740868504);
  const [zoom, setZoom] = useState(16);
  const debounceRef = useRef();

  if (!navigator.geolocation) {
    alert("El navegador no tiene opción de geolocalización");
    throw new Error("El navegador no tiene opción de geolocalización");
  }

  useLayoutEffect(() => {
    setIsLoading(false);
    if (!isLoading) {
      const map = new Map({
        container: "mapDiv", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: zoom, // starting zoom
      });
      const collegeLocationPopUp = new Popup().setHTML(
        `<img src="https://www.diariofutrono.cl/files/62957cb21d73f_890x533.webp" width="500" height="600">
        <h4 style="text-align: center"><strong>Escuela Rural Riñinahue</strong></h4>`
      );
      const collegeMarker = new Marker({ color: "#422afb" })
        .setLngLat([lng, lat])
        .setPopup(collegeLocationPopUp)
        .addTo(map);
      setMap(map);
    }
  }, [lng, lat, zoom, userLocation, isLoading]);

  // if (userLocation === undefined) {
  //   setIsLoading(true);
  //   return <>{isLoading && <Spinner size="xl" />}</>;
  // }
  if (isLoading) {
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Spinner size="xl" />
      </Box>
    );
    }
     const locationOrigin = () => {
    // if (!isMapReady) throw new Error("Mapa no está listo");
    if (!userLocation) throw new Error("No está definida una ubicación");
    map?.flyTo({
      zoom: 16,
      center: userLocation,
    });
  };

  const onQueryChange = (event) => {
    
  };
 let dato = JSON.parse(localStorage.user);
 if (dato.status == "1") {
   return (
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
        <Input
          htmlSize={4}
          width="250px"
          position="fixed"
          top="9rem"
          left="20rem"
          backgroundColor="white"
          zIndex="999"
          placeholder="Lugares"
          onChange={onQueryChange}
        />
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
        );
    } else {
        return (
         <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            <Alert
                    status='error'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='150px'
                >
                    <AlertIcon boxSize='40px' mr={0} alignItems='center' />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        ACCESO RESTRINGIDO!
                       </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        Este modulo esta disponible solo para el usuario Administrador.
                     </AlertDescription>

                </Alert>

            </Box>
        );

    }
};

