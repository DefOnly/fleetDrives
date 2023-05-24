// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  AvatarBadge,
  Tooltip,
  List,
  ListItem,
  ListIcon,
  Stack,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import { MdNotificationsNone, MdInfoOutline } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import routes from "routes.js";
import { ThemeEditor } from "./ThemeEditor";
import AuthUser from "views/auth/signIn/AuthUser";
import { FaUserCircle, FaRoute } from "react-icons/fa";
import { HiBell } from "react-icons/hi";
import { RiUserSharedFill } from "react-icons/ri";
import axios from "axios";
import { MdCheckCircle } from "react-icons/md";
import { io } from "socket.io-client";
import "./counterNotifications.css";
import { PlacesContext } from "contexts/places/PlacesContext";

export default function HeaderLinks(props) {
  const { socket } = useContext(PlacesContext);
  const { token, getUser, logout } = AuthUser();
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  const { secondary, scrolled } = props;
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
  const endPoint = "http://localhost:8000/api";
  const [driverTravel, setDriverTravel] = useState([]);
  const [driverSession, setDriverSession] = useState([]);
  const [notifications, setNotifications] = useState([]);
  let dato = JSON.parse(localStorage.user);
  const driverSessionFilter = driverSession.filter(
    (driver) => driver.status_travel === "1"
  );
  const driverTravelForNavBar = driverTravel.filter(
    (driver) => driver.status_notification === "Enviado"
  );
  // let userId = dato.id;
  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);
  console.log(notifications);
  useEffect(() => {
    let isMounted = true;
    const getDriverTravelForNavBar = async () => {
      try {
        const { data: response } = await axios.get(
          `${endPoint}/travelsNotifications/`
        );
        if (isMounted) {
          setDriverTravel(response);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getDriverTravelForNavBar();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const getDriverTravelSession = async () => {
      try {
        // let dato = JSON.parse(localStorage.user);
        const { data: response } = await axios.get(
          `${endPoint}/travelsNotificationsDriver/${dato.id}`
        );
        if (isMounted) {
          setDriverSession(response);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getDriverTravelSession();
    return () => {
      isMounted = false;
    };
  }, []);
  const removeNotifications = async () => {
    await axios.put(`${endPoint}/removeNotifications/`);
    getDriverTravelUpdate();
  };

  const getDriverTravelUpdate = async () => {
    const { data: response } = await axios.get(
      `${endPoint}/travelsNotifications/`
    );
    setDriverTravel(response);
  };

  // let dato = JSON.parse(localStorage.user);
  if (dato.status === 1) {
    return (
      <Flex
        w={{ sm: "100%", md: "auto" }}
        alignItems="center"
        flexDirection="row"
        bg={menuBg}
        flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
        p="10px"
        borderRadius="30px"
        boxShadow={shadow}
      >
        {/* <SearchBar
          mb={secondary ? { base: "10px", md: "unset" } : "unset"}
          me='10px'
          borderRadius='30px'
        /> */}
        <Flex
          bg={ethBg}
          display={secondary ? "flex" : "none"}
          borderRadius="30px"
          ms="auto"
          p="6px"
          align="center"
          me="6px"
        >
          <Flex
            align="center"
            justify="center"
            bg={ethBox}
            h="29px"
            w="29px"
            borderRadius="30px"
            me="7px"
          >
            <Icon color={ethColor} w="18px" h="18px" as={RiUserSharedFill} />
          </Flex>
          <Text
            w="max-content"
            color={ethColor}
            fontSize="sm"
            fontWeight="700"
            me="6px"
          >
            Estudiantes y Conductores
            {/* <Text as='span' display={{ base: "none", md: "unset" }}>
              {" "}
              ETH
            </Text> */}
          </Text>
        </Flex>
        <SidebarResponsive routes={routes} />
        <Menu>
          <MenuButton p="0px">
            {driverTravelForNavBar.length !== 0 ||
            driverTravelForNavBar.length === 0 ||
            driverTravelForNavBar[0].status_travel !== "1" ? (
              <>
                <AvatarBadge
                  style={{ position: "sticky", top: "3.1rem", left: "47.7rem" }}
                  borderRadius="10px"
                  borderColor="white"
                  bg="red.500"
                  boxSize="0.8em"
                />
                <div className="counter">{driverTravelForNavBar.length}</div>
              </>
            ) : null}
            {/* <Tooltip
                    label="El conductor ha completado el viaje, puede generar una nueva solicitud"
                    aria-label="A tooltip"
                  >
                  </Tooltip> */}
            <Icon
              mt="6px"
              as={HiBell}
              // color={navbarIcon}
              w="30px"
              h="30px"
              me="10px"
            />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p="20px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
            overflow="scroll"
            height="40rem"
            mt="22px"
            me={{ base: "30px", md: "unset" }}
            minW={{ base: "unset", md: "400px", xl: "450px" }}
            maxW={{ base: "360px", md: "unset" }}
          >
            <Flex jusitfy="space-between" w="100%" mb="20px">
              <Text fontSize="md" fontWeight="600" color={textColor}>
                Notificationes
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <MenuItem
                _hover={{ bg: "none" }}
                _focus={{ bg: "none" }}
                px="0"
                borderRadius="8px"
                mb="10px"
              ></MenuItem>
              {driverTravelForNavBar.map((driver) =>
                driver.status_travel === "3" ? (
                  <>
                    <List spacing={3} key={driver.id}>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        <strong>
                          {driver.status_travel === "3"
                            ? "Viaje Completado por " +
                              driver.nameDriver +
                              " " +
                              driver.lastNameDM +
                              " " +
                              driver.lastNameDP
                            : null}
                        </strong>
                        <Text pt="2" fontSize="sm">
                          Fecha:{" "}
                          {driver.date_travel.split("-").reverse().join("/")}{" "}
                          <br></br>
                          Hora:{" "}
                          {driver.hour_travel !== undefined
                            ? driver.hour_travel
                            : ""}{" "}
                          <br></br>
                          Tipo:{" "}
                          {driver.type_travel === "1"
                            ? "Ida (Escuela Rural Básica Riñinahue)"
                            : "Vuelta (direcciones de estudiantes)"}
                        </Text>
                      </ListItem>
                      <br></br>
                    </List>
                  </>
                ) : driver.status_travel === "2" ? (
                  <>
                    <List spacing={3} key={driver.id}>
                      <ListItem>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        <strong>
                          {driver.status_travel === "2"
                            ? "Viaje Aceptado por " +
                              driver.nameDriver +
                              " " +
                              driver.lastNameDM +
                              " " +
                              driver.lastNameDP
                            : null}
                        </strong>
                        <Text pt="2" fontSize="sm">
                          Fecha:{" "}
                          {driver.date_travel.split("-").reverse().join("/")}{" "}
                          <br></br>
                          Hora:{" "}
                          {driver.hour_travel !== undefined
                            ? driver.hour_travel
                            : ""}{" "}
                          <br></br>
                          Tipo:{" "}
                          {driver.type_travel === "1"
                            ? "Ida (Escuela Rural Básica Riñinahue)"
                            : "Vuelta (direcciones de estudiantes)"}
                        </Text>
                      </ListItem>
                      <br></br>
                    </List>
                  </>
                ) : (
                  <>
                    <List spacing={3} key={driver.id}>
                      <ListItem>No tiene notificaciones pendientes</ListItem>
                      <br></br>
                    </List>
                  </>
                )
              )}
              {driverTravelForNavBar.length === 0 ? (
                <>
                  <List spacing={3}>
                    <ListItem>No tiene notificaciones pendientes</ListItem>
                    <br></br>
                  </List>
                </>
              ) : (
                <>
                  <Stack spacing={4} direction="row" align="center">
                    <Button
                      colorScheme="teal"
                      size="xs"
                      onClick={() => removeNotifications()}
                    >
                      Borrar notificaciones
                    </Button>
                  </Stack>
                </>
              )}
            </Flex>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton p="0px">
            <Icon
              mt="8px"
              as={FaUserCircle}
              w="2rem"
              h="2rem"
              fontWeight="2000"
              color="black"
            />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p="0px"
            mt="10px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
            zIndex="999"
          >
            <Flex w="100%" mb="0px">
              <Text
                ps="20px"
                pt="16px"
                pb="10px"
                w="100%"
                borderBottom="1px solid"
                borderColor={borderColor}
                fontSize="sm"
                fontWeight="700"
                color={textColor}
              >
                👋&nbsp;{" "}
                {getUser().name ? getUser().name : getUser().nameDriver}
              </Text>
            </Flex>
            <Flex flexDirection="column" p="10px">
              <MenuItem
                _hover={{ bg: "none" }}
                _focus={{ bg: "none" }}
                color="red.400"
                borderRadius="8px"
                px="14px"
              >
                <span role="button" fontSize="sm" onClick={logoutUser}>
                  Cerrar Sesión
                </span>
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    );
  } else {
    return (
      <Flex
        w={{ sm: "100%", md: "auto" }}
        alignItems="center"
        flexDirection="row"
        bg={menuBg}
        flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
        p="10px"
        borderRadius="30px"
        boxShadow={shadow}
      >
        {/* <SearchBar
      mb={secondary ? { base: "10px", md: "unset" } : "unset"}
      me='10px'
      borderRadius='30px'
    /> */}
        <Flex
          bg={ethBg}
          display={secondary ? "flex" : "none"}
          borderRadius="30px"
          ms="auto"
          p="6px"
          align="center"
          me="6px"
        >
          <Flex
            align="center"
            justify="center"
            bg={ethBox}
            h="29px"
            w="29px"
            borderRadius="30px"
            me="7px"
          >
            <Icon color={ethColor} w="18px" h="18px" as={RiUserSharedFill} />
          </Flex>
          <Text
            w="max-content"
            color={ethColor}
            fontSize="sm"
            fontWeight="700"
            me="6px"
          >
            Estudiantes y Conductores
            {/* <Text as='span' display={{ base: "none", md: "unset" }}>
          {" "}
          ETH
        </Text> */}
          </Text>
        </Flex>
        <SidebarResponsive routes={routes} />
        <Menu>
          <MenuButton p="0px">
            {driverSessionFilter.length === 0 ||
            driverSessionFilter.length !== 0 ||
            driverSession[0].status_travel === "1" ? (
              <>
                <AvatarBadge
                  style={{ position: "sticky", top: "3rem", left: "47.7rem" }}
                  borderRadius="10px"
                  borderColor="white"
                  bg="red.500"
                  boxSize="1em"
                />
                <div className="counter">{driverSessionFilter.length}</div>
              </>
            ) : null}
            {/* <Tooltip
                label="El conductor ha completado el viaje, puede generar una nueva solicitud"
                aria-label="A tooltip"
              >
              </Tooltip> */}
            <Icon
              mt="6px"
              as={HiBell}
              // color={navbarIcon}
              w="30px"
              h="30px"
              me="10px"
            />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p="20px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
            mt="22px"
            me={{ base: "30px", md: "unset" }}
            minW={{ base: "unset", md: "400px", xl: "450px" }}
            maxW={{ base: "360px", md: "unset" }}
          >
            <Flex jusitfy="space-between" w="100%" mb="20px">
              <Text fontSize="md" fontWeight="600" color={textColor}>
                Notificationes
              </Text>{" "}
              <br></br>
            </Flex>
            <Text fontSize="xs" color={textColor}>
              <strong>(Puede visualizarlas en "Planificación")</strong>
            </Text>
            <Flex flexDirection="column">
              <MenuItem
                _hover={{ bg: "none" }}
                _focus={{ bg: "none" }}
                px="0"
                borderRadius="8px"
                mb="10px"
              ></MenuItem>
              {driverSessionFilter.map((driver) =>
                driver.status_travel === "1" ? (
                  <>
                    <List spacing={3} key={driver.id}>
                      <ListItem>
                        <ListIcon as={FaRoute} color="green.500" />
                        <strong>
                          {driver.status_travel === "1"
                            ? "Tiene una solicitud de viaje"
                            : null}
                        </strong>
                        <Text pt="2" fontSize="sm">
                          Datos del viaje: Fecha:{" "}
                          {driver.date_travel.split("-").reverse().join("/")}{" "}
                          <br></br>
                          Hora:{" "}
                          {driver.hour_travel !== undefined
                            ? driver.hour_travel
                            : ""}{" "}
                          <br></br>
                          Tipo:{" "}
                          {driver.type_travel === "1"
                            ? "Ida (Escuela Rural Básica Riñinahue)"
                            : "Vuelta (direcciones de estudiantes)"}
                        </Text>
                      </ListItem>
                      <br></br>
                    </List>
                  </>
                ) : (
                  <>
                    <List spacing={3} key={driver.id}>
                      <ListItem>No tiene notificaciones de viajes</ListItem>
                      <br></br>
                    </List>
                  </>
                )
              )}
            </Flex>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton p="0px">
            <Icon
              mt="8px"
              as={FaUserCircle}
              w="2rem"
              h="2rem"
              fontWeight="2000"
              color="black"
            />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p="0px"
            mt="10px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
            zIndex="999"
          >
            <Flex w="100%" mb="0px">
              <Text
                ps="20px"
                pt="16px"
                pb="10px"
                w="100%"
                borderBottom="1px solid"
                borderColor={borderColor}
                fontSize="sm"
                fontWeight="700"
                color={textColor}
              >
                👋&nbsp;{" "}
                {getUser().name ? getUser().name : getUser().nameDriver}
              </Text>
            </Flex>
            <Flex flexDirection="column" p="10px">
              <MenuItem
                _hover={{ bg: "none" }}
                _focus={{ bg: "none" }}
                color="red.400"
                borderRadius="8px"
                px="14px"
              >
                <span role="button" fontSize="sm" onClick={logoutUser}>
                  Cerrar Sesión
                </span>
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    );
  }
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
