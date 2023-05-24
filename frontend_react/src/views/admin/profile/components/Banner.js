// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  Button,
  Collapse,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  FormErrorMessage,
  RadioGroup,
  Stack,
  Radio,
  ScaleFade,
  SlideFade,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { useState, useEffect } from "react";
import AuthUser from "views/auth/signIn/AuthUser";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { set } from "react-hook-form";

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  const { getUser, setToken, getToken } = AuthUser();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const endPoint = "http://localhost:8000/api";
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState([]);
  const [valueRadio, setValueRadio] = useState("2");
  const [modalUpdateProfile, setModalUpdateProfile] = useState(false);
  const NAME_REGEX = /^[ a-zA-ZÀ-ú]+$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const handleUpdateProfile = async (values) => {
    let nameSplit = values.name.split(" ");
    let names = nameSplit[0] + " " + nameSplit[1];
    let lastNameP = nameSplit[2];
    let lastNameM = nameSplit[3];
    if (getUser().id_profile === 1) {
      if (valueRadio === "1" && getUser().id_profile === 1) {
        const response = await axios.put(
          `${endPoint}/UpdateDataProfileAdmin/${getUser().id}`,
          {
            name: names,
            lastNameP:
              nameSplit.length === 5
                ? nameSplit[2] + " " + nameSplit[3]
                : lastNameP,
            lastNameM: nameSplit.length === 5 ? nameSplit[4] : lastNameM,
            email: values.email,
            phone: values.phone,
            password: values.password,
            case: 1,
          }
        );
        changeDataLocalStorage(response.data[0], getToken());
      } else if (valueRadio === "2" && getUser().id_profile === 1) {
        const response = await axios.put(
          `${endPoint}/UpdateDataProfileAdmin/${getUser().id}`,
          {
            name: names,
            lastNameP:
              nameSplit.length === 5
                ? nameSplit[2] + " " + nameSplit[3]
                : lastNameP,
            lastNameM: nameSplit.length === 5 ? nameSplit[4] : lastNameM,
            email: values.email,
            phone: values.phone,
          }
        );
        changeDataLocalStorage(response.data[0], getToken());
      }
      setModalUpdateProfile(true);
      setTimeout(() => {
        onClose();
        setModalUpdateProfile(false);
      }, "2000");
    } else {
      if (typeof getUser().id_profile === "undefined" && valueRadio === "1") {
        const response = await axios.put(
          `${endPoint}/UpdateDataProfileDriver/${getUser().id}`,
          {
            name: names,
            lastNameP:
              nameSplit.length === 5
                ? nameSplit[2] + " " + nameSplit[3]
                : lastNameP,
            lastNameM: nameSplit.length === 5 ? nameSplit[4] : lastNameM,
            email: values.email,
            phone: values.phone,
            password: values.password,
            case: 1,
          }
        );
        changeDataLocalStorage(response.data[0], getToken());
      } else if (
        typeof getUser().id_profile === "undefined" &&
        valueRadio === "2"
      ) {
        const response = await axios.put(
          `${endPoint}/UpdateDataProfileDriver/${getUser().rutDriver}`,
          {
            name: names,
            lastNameP:
              nameSplit.length === 5
                ? nameSplit[2] + " " + nameSplit[3]
                : lastNameP,
            lastNameM: nameSplit.length === 5 ? nameSplit[4] : lastNameM,
            email: values.email,
            phone: values.phone,
          }
        );
        changeDataLocalStorage(response.data[0], getToken());
      }
      setModalUpdateProfile(true);
      setTimeout(() => {
        onClose();
        setModalUpdateProfile(false);
      }, "2000");
    }
  };

  const changeDataLocalStorage = (response, token) => {
    let changeDataUser = true;
    setToken(response, token, changeDataUser);
  };

  const validateNameUpdate = (value) => {
    let name = NAME_REGEX.test(value);
    let error;
    if (!value) {
      error = "El nombre y apellido es requerido";
    } else if (!name) {
      error = "El nombre y apellido sólo debe contener letras";
    } else if (value.length <= 10) {
      error = "El nombre y apellido debe contener más de 10 caracteres";
    }
    return error;
  };

  const validateEmail = (value) => {
    let emailAgent = EMAIL_REGEX.test(value);
    let error;
    if (!value) {
      error = "El correo es requerido";
    } else if (!emailAgent) {
      error =
        "El correo sólo puede contener letras, números, puntos, guiones y guión bajo";
    }
    return error;
  };

  const validatePhone = (value) => {
    let error;
    let phoneNumber = (num) => Number(num);
    let phoneArray = Array.from(String(value), phoneNumber);
    if (!value) {
      error = "El teléfono es requerido";
    } else if (phoneArray.length > 9 || phoneArray.length < 9) {
      error = "El teléfono debe contener 9 dígitos";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    let password = (num) => Number(num);
    let arrayPassword = Array.from(String(value), password);
    if (!value) {
      error = "La nueva contraseña es requerida";
    } else if (arrayPassword.length < 8) {
      error = "La contraseña debe tener como mínimo 8 caracteres";
    }
    return error;
  };

  // useEffect(() => {
  //   let isMounted = true;
  //   async function updateDataProfile() {
  //     if (getUser().rut) {
  //       const response = await axios.get(
  //         `${endPoint}/updateDataProfileAdmin/${getUser().id}/`
  //       );
  //       if (isMounted) {
  //         setUser(response.data);
  //       }
  //     } else {
  //       const response = await axios.get(
  //         `${endPoint}/updateDataProfileDriver/${getUser().id}/`
  //       );
  //       if (isMounted) {
  //         setUser(response.data);
  //       }
  //     }
  //   }
  //   updateDataProfile();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <Card mb={{ base: "0px", lg: "20px" }} align="center">
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src="https://bit.ly/broken-link"
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {job}
      </Text>
      <Flex w="max-content" mx="auto" mt="26px">
        <Flex mx="auto" me="60px" align="center" direction="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {posts}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            {getUser().id_profile === 1 ? getUser().rut : getUser().rutDriver}
          </Text>
        </Flex>
        <Flex mx="auto" me="60px" align="center" direction="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            Email
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            {getUser().id_profile === 1 ? getUser().email : getUser().email}
          </Text>
        </Flex>
        <Flex mx="auto" align="center" direction="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {following}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            +56 {getUser().id_profile === 1 ? getUser().phone : getUser().phone}
          </Text>
        </Flex>
      </Flex>
      <Button onClick={onToggle} colorScheme="messenger">
        Actualizar datos
      </Button>
      <br></br>
      {modalUpdateProfile && (
        <SlideFade in={isOpen} offsetY="20px">
          <Alert status="success" variant="solid">
            <AlertIcon />
            ¡Información Actualizada con éxito!
          </Alert>
        </SlideFade>
      )}
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="gray.700"
          rounded="md"
          shadow="md"
        >
          <Formik
            initialValues={{
              name: getUser().name
                ? getUser().name +
                  " " +
                  getUser().lastNameP +
                  " " +
                  getUser().lastNameM
                : getUser().nameDriver +
                  " " +
                  getUser().lastNameDP +
                  " " +
                  getUser().lastNameDM,
              email:
                getUser().id_profile === 1 ? getUser().email : getUser().email,
              phone:
                getUser().id_profile === 1 ? getUser().phone : getUser().phone,
              password: "",
            }}
            onSubmit={(values) => handleUpdateProfile(values)}
          >
            {(props) => (
              <Form noValidate="novalidate">
                <FormControl>
                  <FormLabel>Rut</FormLabel>
                  <Input
                    disabled
                    style={{ color: "white" }}
                    value={
                      getUser().id_profile === 1
                        ? getUser().rut
                        : getUser().rutDriver
                    }
                    borderRadius="16px"
                  />
                </FormControl>
                <Field name="name" validate={validateNameUpdate}>
                  {({ field, form }) => (
                    <FormControl
                      id="first-name"
                      mt={3}
                      isRequired
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>Nombres y Apellidos</FormLabel>
                      <Input
                        {...field}
                        style={{ color: "white" }}
                        borderRadius="16px"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      mt={3}
                      isRequired
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        {...field}
                        style={{ color: "white" }}
                        borderRadius="16px"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="phone" validate={validatePhone}>
                  {({ field, form }) => (
                    <FormControl
                      mt={3}
                      isRequired
                      isInvalid={form.errors.phone && form.touched.phone}
                    >
                      <FormLabel>Teléfono</FormLabel>
                      <InputGroup>
                        <InputLeftAddon color="black" children="+56" />
                        <Input
                          type="number"
                          {...field}
                          style={{ color: "white" }}
                          borderRadius="16px"
                        />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <br></br>
                <FormLabel as="legend">¿Desea actualizar contraseña?</FormLabel>
                <RadioGroup onChange={setValueRadio} value={valueRadio}>
                  <Stack direction="row">
                    <Radio onClick={onToggle} value="1">
                      Si
                    </Radio>
                    <Radio value="2">No</Radio>
                  </Stack>
                </RadioGroup>
                {valueRadio === "1" ? (
                  <>
                    <ScaleFade initialScale={0.9} in={isOpen}>
                      <Field name="password" validate={validatePassword}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.password && form.touched.password
                            }
                          >
                            <FormLabel>Nueva contraseña</FormLabel>
                            <InputGroup size="md">
                              <Input
                                {...field}
                                value={user.password}
                                style={{ color: "white" }}
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                              />
                              <InputRightElement width="4.5rem">
                                <Button
                                  style={{ color: "black" }}
                                  h="1.75rem"
                                  size="sm"
                                  onClick={handleClick}
                                >
                                  {show ? "Ocultar" : "Mostrar"}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </ScaleFade>
                  </>
                ) : null}
                <Button
                  mt={4}
                  colorScheme="whatsapp"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Guardar cambios
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Collapse>
    </Card>
  );
}
