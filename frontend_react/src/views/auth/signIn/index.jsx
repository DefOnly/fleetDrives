/* eslint-disable */
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

import React from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  ModalFooter,
  Modal,
  ModalOverlay,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useColorMode,
  IconButton,
  CircularProgress,
  Alert,
  AlertIcon,
    AlertTitle,
  CloseButton,
  AlertDescription,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/bus_escolar.jpg";
import { FaBus } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import AuthUser from "./AuthUser";
import { useState, useEffect } from "react";
import routes from "routes";
import { Redirect, Route, Switch } from "react-router-dom";
import MainDashboard from "views/admin/default";
import { useRut } from "react-rut-formatter";

function SignIn(props) {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isShown, setIsShown] = useState(false);

  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const { getUser } = AuthUser();
  const handleClick = () => setShow(!show);
  const [showInputRut, setShowInputRut] = useState(false);
  const [showButtonAdmin, setshowButtonAdmin] = useState(true);
  const [showButtonDriver, setshowButtonDriver] = useState(false);
  const { rut, updateRut, isValid } = useRut();
  const initialValues = { rut: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const showRutDriver = () => {
        setShowInputRut(!showInputRut)
        setshowButtonAdmin(false)
        setshowButtonDriver(true)
  };
    const showEmailAdmin = () => {
        setShowInputRut(false)
        setshowButtonAdmin(true)
        setshowButtonDriver(false)
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (formValues.rut !== "") {
                const response = await http.post("/loginrut", {
                    rutDriver: rut,
                    password: password,
                });
                if (response.data.user.rutDriver !== "" && response.data.user.statusDriver == "1") {
                    setSuccess("¡Sesión iniciada!");
                    setIsLoading(false);
                    setToken(response.data.user, response.data.access_token);
                }
                else {
                    setError("CUENTA DESHABILITADA¡ ");
                    setIsLoading(false);
                     }  
            } if (formValues.rut == "") {
                const response = await http.post("/login", {
                    email: email,
                    password: password,
                });
                if (response.data.user.email !== "") {
                    setSuccess("¡Sesión iniciada!");
                    setIsLoading(false);
                    setToken(response.data.user, response.data.access_token);
                }
            }
        } catch (err) {
            setError("Credenciales incorrectas");
            setIsLoading(false);
        }
    };
  if (window.location.pathname == "/" && getUser()){
    return (
      <Redirect
        from="/"
        to="/admin/default"
        component={MainDashboard}
      />
    );
  } else {
      return (
      <DefaultAuth illustrationBackground={illustration} image={illustration}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          alignItems="start"
          justifyContent="center"
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection="column"
              >
          <Box me="auto">
            <Icon as={FaBus} fontSize="3rem" />
            <Heading color={textColor} fontSize="36px" mb="10px">
              fleetDrives
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              Ingresar
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
          >
            <Flex align="center" mb="25px">
              <HSeparator />
              <HSeparator />
                      </Flex>           
            <form onSubmit={handleSubmit}>
              {error && (
                <Box my={4}>
                  <Alert status="error" borderRadius={4}>
                    <AlertIcon />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </Box>
              )}
              {success && (
                <Box my={4}>
                  <Alert status="success" borderRadius={4}>
                    <AlertIcon />
                    {success}
                  </Alert>
                </Box>
              )}
              <FormControl isRequired>
                            {showInputRut ? (
                                <> <FormLabel
                                    display="flex"
                                    ms="4px"
                                    fontSize="sm"
                                    fontWeight="500"
                                    color={textColor}
                                    mb="8px"
                                >
                                    Rut<Text color={brandStars}>*</Text>
                                  </FormLabel>
                                    <Input
                                        value={(formValues.rut = rut.formatted)}
                                        onChange={(e) => updateRut(e.target.value)}
                                        isRequired={true}
                                        variant="auth"
                                        fontSize="sm"
                                        ms={{ base: "0px", md: "0px" }}
                                        type="text"
                                        placeholder="12.345.678-9"
                                        mb="24px"
                                        fontWeight="500"
                                        size="lg"
                                    />
                                </>
                            ) :
                                (
                                    <> <FormLabel
                                        display="flex"
                                        ms="4px"
                                        fontSize="sm"
                                        fontWeight="500"
                                        color={textColor}
                                        mb="8px"
                                    >
                                        Email<Text color={brandStars}>*</Text>
                                    </FormLabel>
                                        <Input
                                            onChange={(e) => setEmail(e.currentTarget.value)}
                                            isRequired={true}
                                            variant="auth"
                                            fontSize="sm"
                                            ms={{ base: "0px", md: "0px" }}
                                            type="email"
                                            placeholder="mail@fleetdrives.com"
                                            mb="24px"
                                            fontWeight="500"
                                            size="lg"
                                        />
                                    </>
                                )}
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    isRequired={true}
                    fontSize="sm"
                    placeholder="********"
                    mb="24px"
                    size="lg"
                    type={show ? "text" : "password"}
                    variant="auth"
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="center">
                    <Checkbox
                      id="remember-login"
                      colorScheme="brandScheme"
                      me="10px"
                    />
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      fontWeight="normal"
                      color={textColor}
                      fontSize="sm"
                    >
                    Mantenerme logueado
                    </FormLabel>
                  </FormControl>
                  <NavLink to="/auth/forgot-password">
                    <Text
                      color={textColorBrand}
                      fontSize="sm"
                      w="124px"
                      fontWeight="500"
                    >
                    ¿Olvidaste contraseña?
                    </Text>
                  </NavLink>
                              </Flex>
                <Button
                  type="submit"
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  {isLoading ? (
                    <CircularProgress isIndeterminate size="24px" color="teal" />
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </FormControl>
            </form>
                    <>
                        {showButtonAdmin &&

                            <Button
                                onClick={showRutDriver}
                                fontSize="sm"
                                variant="brand"
                                fontWeight="500"
                                w="100%"
                                h="50"
                                mb="24px"
                            >
                                Iniciar Sesión como Conductor
                       </Button>
                        }
                    </>
                    <>
                        {showButtonDriver &&
                            <Button
                                onClick={showEmailAdmin}
                                fontSize="sm"
                                variant="brand"
                                fontWeight="500"
                                w="100%"
                                h="50"
                                mb="24px"
                            >
                                Iniciar Sesión como Administrador
                      </Button>
                        }
                    </>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                            ¿Aún no estas registrado?
                <NavLink to="/auth/sign-up">
                  <Text
                    color={textColorBrand}
                    as="span"
                    ms="5px"
                    fontWeight="500"
                  >
                                    Crear una cuenta
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </DefaultAuth>
    );
  }
}

export default SignIn;
