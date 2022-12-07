// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  ChevronDownIcon,
  MenuList,
  MenuItem,
  Collapse,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalFooter,
  FormErrorMessage,
  SlideFade,
  Alert,
  AlertIcon,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
// Custom components
import Card from "components/card/Card.js";
import { MdArrowDownward } from "react-icons/md";
import { AddIcon } from "@chakra-ui/icons";
// Assets
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaCheckCircle, FaAsterisk } from "react-icons/fa";
import TableStudents from "./TableStudents";
import TableDrivers from "./TableDrivers";
import { useRut } from "react-rut-formatter";
import { Field, Form, Formik } from "formik";

export default function Students(props) {
  const { image, name, author, bidders, download, currentbid } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [students, setStudents] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [course, setCourse] = useState("");
  const [count, setCount] = useState(0);
  const [countDriver, setCountDriver] = useState(0);
  const endPoint = "http://localhost:8000/api";
  const [show, setShow] = useState(false);
  const [parvulo, setParvulo] = useState(false);
  const [basica, setBasica] = useState(false);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { rut, updateRut, isValid } = useRut();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [rutError, setRutError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [state, setState] = useState("");
  const initialValues = {
    rut: ""
  };
  const NAME_REGEX = /^[ a-zA-ZÀ-ú]+$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const [formValues, setFormValues] = useState(initialValues);
  const [warningDriver, setWarningDriver] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let count = 0;
    async function getAllDrivers() {
      const response = await axios.get(`${endPoint}/drivers/`);
      if (isMounted) {
        setState(response);
        let result = response.data;
        setDrivers(response.data);
        result.map((row) => count++);
        setCountDriver(count);
      }
    }
    getAllDrivers();
    return () => {
      isMounted = false;
    };
  }, []);

  const getAllStudents = async (param) => {
    const response = await axios.get(`${endPoint}/students/${param}/`);
    let countStudents = 0;
    setCourse(param);
    let arrayStudents = [];
    let arrayDrivers = [];
    let result = response.data;
    result.map((row) => {
      arrayStudents.push(row.name + " " + row.lastNameP + " " + row.lastNameM);
      arrayDrivers.push(
        row.nameDriver + " " + row.lastNameDP + " " + row.lastNameDM
      );
      return result;
    });
    const newArray = result.map(
      ({
        name,
        lastNameP,
        lastNameM,
        nameDriver,
        lastNameDP,
        lastNameDM,
        ...row
      }) => {
        return row;
      }
    );
    const namesStudents = newArray.map((value, index) => ({
      ...value,
      nameStudent: arrayStudents[index],
    }));
    const allNames = namesStudents.map((value, index) => ({
      ...value,
      nameDriver: arrayDrivers[index],
    }));
    setStudents(allNames);
    result.map((row) => countStudents++);
    setCount(countStudents);
    setIsShown(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Rut",
        accessor: "rut",
      },
      {
        Header: "Nombre y Apellido",
        accessor: "nameStudent",
      },
      {
        Header: "Conductor Asignado",
        accessor: "nameDriver",
      },
      {
        Header: "id_driver",
        accessor: "id_driver",
      },
      {
        Header: "Estado",
        accessor: "status",
      },
    ],
    []
  );

  const dataStudents = useMemo(() => [...students], [students]);

  const getListDrivers = async (event) => {
    const response = await axios.get(`${endPoint}/driversCheckStatus/`);
    let count = 0;
    setDrivers(response.data);
    let result = response.data;
    result.map((row) => count++);
    setCountDriver(count);
    setShow(!show);
  };

  const showParvulo = (event) => {
    setParvulo(true);
    onOpen();
  };

  const showBasica = (event) => {
    setBasica(true);
    onOpen();
  };

  const handleAddStudent = async (values) => {
    Object.assign(values, { rut: formValues.rut });
    const getAllUsers = await axios.get(`${endPoint}/getAllUsers/`);
    let users = getAllUsers.data;
    let rut = values.rut;
    let id_level = parseInt(values.id_level);
    let duplicateRut = checkDuplicateRut(users, rut);
    if (duplicateRut.length > 0) {
      setRutError(true);
      setSuccess(false);
      setError(false);
      setPhoneError(false);
      setShow(true);
    } else if (
      values.rut === "" ||
      values.name === "" ||
      values.lastNameP === "" ||
      values.lastNameM === "" ||
      values.zone === "" ||
      values.address === "" ||
      values.idDriver === "" ||
      values.nameAgent === "" ||
      values.phone === "" ||
      values.emailAgent === ""
    ) {
      setError(true);
      setSuccess(false);
      setRutError(false);
      setPhoneError(false);
      setShow(true);
    } else {
      if (course === "Prekinder" || course === "Kinder") {
        await axios.post(`${endPoint}/AddStudentParvulo/`, {
          rut: values.rut,
          name: values.name,
          lastNameP: values.lastNameP,
          lastNameM: values.lastNameM,
          zone: values.zone,
          address: values.address,
          province: values.province,
          gender: values.gender,
          email: values.email,
          idLevel: id_level,
          idDriver: parseInt(values.idDriver),
          nameAgent: values.nameAgent,
          phone: values.phone,
          emailAgent: values.emailAgent,
        });
        // getCoordinates();
      } else {
        await axios.post(`${endPoint}/AddStudentBasica/`, {
          rut: values.rut,
          name: values.name,
          lastNameP: values.lastNameP,
          lastNameM: values.lastNameM,
          zone: values.zone,
          address: values.address,
          province: values.province,
          gender: values.gender,
          email: values.email,
          idLevel: id_level,
          idDriver: parseInt(values.idDriver),
          nameAgent: values.nameAgent,
          phone: values.phone,
          emailAgent: values.emailAgent,
        });
      }
      getAllStudents(course);
      UpdateStateStudents(id_level);
    }
  };

  const getCoordinates =  () => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/epulaf.json?country=cl&proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiZGVmb25seSIsImEiOiJjbGE2N25kc3UwMHBlM29zMHFpbWFvaHAzIn0.6byxMcCQvzsHBdIITgSZlw`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
              }
              return response.json();
            })
            .then(result => {
              console.log(result.features[0].center);
            })
            .catch(err => console.log(err));
  }

  const checkDuplicateRut = (users, rut) => {
    let response = users.filter(
      (user) => user.rut === rut || user.rutDriver === rut
    );
    return response;
  };

  const UpdateStateStudents = useCallback(
    (id_level) => {
      setSuccess(true);
      setRutError(false);
      setPhoneError(false);
      setError(false);
      setShow(true);
      let idLevel = students[0].id_level;
      if (idLevel === id_level) {
        setCount(count + 1);
      }
      setTimeout(() => {
        onClose();
        setSuccess(false);
        updateRut("");
        setFormValues({
          name: "",
          lastNameP: "",
          lastNameM: "",
          zone: "",
          address: "",
          id_province: "",
          gender: "",
          id_level: "",
          nameAgent: "",
          phone: "",
          email_agent: "",
        });
      }, "2000");
    },
    [students, updateRut, count, onClose]
  );

  const validateName = (value) => {
    let name = NAME_REGEX.test(value);
    let error;
    if (!value) {
      error = "El nombre es requerido";
    } else if (!name) {
      error = "El nombre sólo debe contener letras";
    } else if (value.length <= 3) {
      error = "El nombre debe contener más de 3 caracteres";
    }
    return error;
  };
  const validateLastNameP = (value) => {
    let name = NAME_REGEX.test(value);
    let error;
    if (!value) {
      error = "El apellido paterno es requerido";
    } else if (!name) {
      error = "El apellido paterno sólo debe contener letras";
    } else if (value.length <= 2) {
      error = "El apellido paterno debe contener más de 2 caracteres";
    }
    return error;
  };
  const validateLastNameM = (value) => {
    let name = NAME_REGEX.test(value);
    let error;
    if (!value) {
      error = "El apellido materno es requerido";
    } else if (!name) {
      error = "El apellido materno sólo debe contener letras";
    } else if (value.length <= 2) {
      error = "El apeliido materno debe contener más de 2 caracteres";
    }
    return error;
  };
  const validateZone = (value) => {
    let error;
    if (!value) error = "El sector es requerido";
    return error;
  };
  const validateAddress = (value) => {
    let error;
    if (!value) error = "La dirección es requerida";
    return error;
  };
  const validateDriver = (value) => {
    let error;
    if (!value) {
      error = "";
      setWarningDriver(true);
    } else {
      setWarningDriver(false);
    }
    return error;
  };
  const validatePhone = (value) => {
    let error;
    let phoneNumber = (num) => Number(num);
    let phoneArray = Array.from(String(value), phoneNumber);
    if (!value) {
      error = "El teléfono del apoderado es requerido";
    } else if (phoneArray.length > 9 || phoneArray.length < 9) {
      error = "El teléfono debe contener 9 dígitos";
    }
    return error;
  };
  const validateEmailAgent = (value) => {
    let emailAgent = EMAIL_REGEX.test(value);
    let error;
    if (!value) {
      error = "El correo del apoderado es requerido";
    } else if (!emailAgent) {
      error =
        "El correo sólo puede contener letras, números, puntos, guiones y guión bajo";
    }
    return error;
  };

  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
          <Image
            src={image}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            borderRadius="20px"
          />
        </Box>
        {/* Agregar Estudiante Párvulo */}
        {parvulo && (
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Agregar Estudiante</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Formik
                  initialValues={{
                    name: "",
                    lastNameP: "",
                    lastNameM: "",
                    gender: "M",
                    zone: "",
                    address: "",
                    province: "1",
                    email: "",
                    id_level: "1",
                    idDriver: "",
                    nameAgent: "",
                    phone: "",
                    emailAgent: "",
                  }}
                  onSubmit={(values) => handleAddStudent(values)}
                >
                  {(props) => (
                    <Form noValidate="novalidate">
                      <FormControl mt={3} isInvalid={!isValid}>
                        <FormLabel>Rut</FormLabel>
                        <Input
                          type="text"
                          id="rut"
                          name="rut"
                          placeholder="Rut"
                          value={(formValues.rut = rut.formatted)}
                          onChange={(e) => updateRut(e.target.value)}
                        />
                        <Icon
                          as={FaAsterisk}
                          color="red"
                          w="0.7rem"
                          h="0.7rem"
                          pos="absolute"
                          bottom="3.5rem"
                          left="1.7rem"
                        />
                      </FormControl>
                      {!isValid ? (
                        <span style={{ color: "red" }}>¡Rut inválido!</span>
                      ) : (
                        <Icon
                          ml="23rem"
                          pos="relative"
                          bottom="2rem"
                          as={FaCheckCircle}
                          w="1.4rem"
                          h="1.4rem"
                          fontWeight="2000"
                          color="green"
                        />
                      )}
                      <Field name="name" validate={validateName}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel>Nombres</FormLabel>
                            <Input {...field} placeholder="Nombres" />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="lastNameP" validate={validateLastNameP}>
                        {({ field, form }) => (
                          <FormControl
                            mt={4}
                            isRequired
                            isInvalid={
                              form.errors.lastNameP && form.touched.lastNameP
                            }
                          >
                            <FormLabel>Apellido Paterno</FormLabel>
                            <Input {...field} placeholder="Apellido Paterno" />
                            <FormErrorMessage>
                              {form.errors.lastNameP}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="lastNameM" validate={validateLastNameM}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.lastNameM && form.touched.lastNameM
                            }
                          >
                            <FormLabel>Apellido Materno</FormLabel>
                            <Input {...field} placeholder="Apellido Materno" />
                            <FormErrorMessage>
                              {form.errors.lastNameM}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="gender">
                        {({ field }) => (
                          <FormControl mt={3}>
                            <FormLabel>Sexo</FormLabel>
                            <Select id="gender" {...field}>
                              <option value="M">Masculino</option>
                              <option value="F">Femenino</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="zone" validate={validateZone}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={form.errors.zone && form.touched.zone}
                          >
                            <FormLabel>Sector</FormLabel>
                            <Input {...field} />
                            <FormErrorMessage>
                              {form.errors.zone}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="address" validate={validateAddress}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.address && form.touched.address
                            }
                          >
                            <FormLabel>Dirección</FormLabel>
                            <Input {...field} />
                            <FormErrorMessage>
                              {form.errors.address}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="province">
                        {({ field }) => (
                          <FormControl mt={3}>
                            <FormLabel>Comuna</FormLabel>
                            <Select id="province" {...field}>
                              <option value="1">Lago Ranco</option>
                              <option value="2">Río Bueno</option>
                              <option value="3">Futrono</option>
                              <option value="4">Panguipulli</option>
                              <option value="5">La Unión</option>
                              <option value="6">Paillaco</option>
                              <option value="7">Los Lagos</option>
                              <option value="8">Corral</option>
                              <option value="9">Valdivia</option>
                              <option value="10">Máfil</option>
                              <option value="11">Mariquina</option>
                              <option value="12">Lanco</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="email">
                        {({ field }) => (
                          <FormControl mt={3}>
                            <FormLabel>Correo (Opcional):</FormLabel>
                            <Input
                              type="email"
                              {...field}
                              placeholder="ejemplo@gmail.com"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="id_level">
                        {({ field }) => (
                          <FormControl mt={3}>
                            <FormLabel>Nivel</FormLabel>
                            <Select id="id_level" {...field}>
                              <option value="1">Prekinder</option>
                              <option value="2">Kinder</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="idDriver" validate={validateDriver}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.idDriver && form.touched.idDriver
                            }
                          >
                            <FormLabel>Asignar Conductor</FormLabel>
                            <Select {...field} id="idDriver" variant="filled">
                              <option selected value={""}>
                                Seleccione un conductor
                              </option>
                              {drivers.map((driver) => (
                                <option
                                  onClick={onToggle}
                                  key={driver.id}
                                  value={driver.id}
                                >
                                  {driver.nameDriver +
                                    " " +
                                    driver.lastNameDP +
                                    " " +
                                    driver.lastNameDM}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.idDriver}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {warningDriver && (
                        <SlideFade startingHeight={1} in={isOpen}>
                          <Alert status="warning">
                            <AlertIcon />
                            Debe seleccionar un conductor al estudiante.
                          </Alert>
                        </SlideFade>
                      )}
                      <ModalHeader>Datos del Apoderado</ModalHeader>
                      <Field name="nameAgent" validate={validateName}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.nameAgent && form.touched.nameAgent
                            }
                          >
                            <FormLabel>Apoderado</FormLabel>
                            <Input {...field} />
                            <FormErrorMessage>
                              {form.errors.nameAgent}
                            </FormErrorMessage>
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
                              <InputLeftAddon children="+56" />
                              <Input type="number" {...field} />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.phone}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {phoneError && (
                        <SlideFade startingHeight={1} in={show}>
                          <Box my={4}>
                            <Alert
                              status="error"
                              variant="solid"
                              borderRadius={4}
                            >
                              <AlertIcon />
                              ¡El formato del teléfono es incorrecto!
                            </Alert>
                          </Box>
                        </SlideFade>
                      )}
                      <Field name="emailAgent" validate={validateEmailAgent}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.emailAgent && form.touched.emailAgent
                            }
                          >
                            <FormLabel>Correo</FormLabel>
                            <Input
                              type="email"
                              {...field}
                              placeholder="ejemplo@gmail.com"
                            />
                            <FormErrorMessage>
                              {form.errors.emailAgent}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {success && (
                        <SlideFade startingHeight={1} in={show}>
                          <Box my={4}>
                            <Alert
                              status="success"
                              variant="solid"
                              borderRadius={4}
                            >
                              <AlertIcon />
                              ¡Estudiante agregado!
                            </Alert>
                          </Box>
                        </SlideFade>
                      )}
                      {error && (
                        <SlideFade startingHeight={1} in={show}>
                          <Box my={4}>
                            <Alert
                              status="error"
                              variant="solid"
                              borderRadius={4}
                            >
                              <AlertIcon />
                              ¡Debe completar los campos requeridos!
                            </Alert>
                          </Box>
                        </SlideFade>
                      )}
                      {rutError && (
                        <SlideFade startingHeight={1} in={show}>
                          <Box my={4}>
                            <Alert
                              status="error"
                              variant="solid"
                              borderRadius={4}
                            >
                              <AlertIcon />
                              ¡El Rut ya se encuentra registrado!
                            </Alert>
                          </Box>
                        </SlideFade>
                      )}
                      <ModalFooter>
                        <Button
                          mt={4}
                          colorScheme="whatsapp"
                          isLoading={props.isSubmitting}
                          type="submit"
                        >
                          Agregar
                        </Button>
                        <Button ml={2} mt={4} onClick={onClose}>
                          Cancelar
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        {/* Agregar Estudiante Básica */}
        {basica && (
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Agregar Estudiante</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Formik
                  initialValues={{
                    name: "",
                    lastNameP: "",
                    lastNameM: "",
                    gender: "M",
                    zone: "",
                    address: "",
                    province: "1",
                    email: "",
                    id_level: "3",
                    idDriver: "",
                    nameAgent: "",
                    phone: "",
                    emailAgent: "",
                  }}
                  onSubmit={(values) => handleAddStudent(values)}
                >
                  {(props) => (
                    <Form noValidate="novalidate">
                      <FormControl mt={3} isInvalid={!isValid}>
                        <FormLabel>Rut</FormLabel>
                        <Input
                          type="text"
                          id="rut"
                          name="rut"
                          placeholder="Rut"
                          value={(formValues.rut = rut.formatted)}
                          onChange={(e) => updateRut(e.target.value)}
                        />
                        <Icon
                          as={FaAsterisk}
                          color="red"
                          w="0.7rem"
                          h="0.7rem"
                          pos="absolute"
                          bottom="3.5rem"
                          left="1.7rem"
                        />
                      </FormControl>
                      {!isValid ? (
                        <span style={{ color: "red" }}>¡Rut inválido!</span>
                      ) : (
                        <Icon
                          ml="23rem"
                          pos="relative"
                          bottom="2rem"
                          as={FaCheckCircle}
                          w="1.4rem"
                          h="1.4rem"
                          fontWeight="2000"
                          color="green"
                        />
                      )}
                      <Field name="name" validate={validateName}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel>Nombres</FormLabel>
                            <Input {...field} placeholder="Nombres" />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="lastNameP" validate={validateLastNameP}>
                        {({ field, form }) => (
                          <FormControl
                            mt={4}
                            isRequired
                            isInvalid={
                              form.errors.lastNameP && form.touched.lastNameP
                            }
                          >
                            <FormLabel>Apellido Paterno</FormLabel>
                            <Input {...field} placeholder="Apellido Paterno" />
                            <FormErrorMessage>
                              {form.errors.lastNameP}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="lastNameM" validate={validateLastNameM}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.lastNameM && form.touched.lastNameM
                            }
                          >
                            <FormLabel>Apellido Materno</FormLabel>
                            <Input {...field} placeholder="Apellido Materno" />
                            <FormErrorMessage>
                              {form.errors.lastNameM}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="gender">
                        {({ field }) => (
                          <FormControl mt={3}>
                            <FormLabel>Sexo</FormLabel>
                            <Select id="gender" {...field}>
                              <option value="M">Masculino</option>
                              <option value="F">Femenino</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="zone" validate={validateZone}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={form.errors.zone && form.touched.zone}
                          >
                            <FormLabel>Sector</FormLabel>
                            <Input {...field} />
                            <FormErrorMessage>
                              {form.errors.zone}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="address" validate={validateAddress}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.address && form.touched.address
                            }
                          >
                            <FormLabel>Dirección</FormLabel>
                            <Input {...field} />
                            <FormErrorMessage>
                              {form.errors.address}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="province">
                        {({ field }) => (
                          <FormControl mt={3}>
                            <FormLabel>Comuna</FormLabel>
                            <Select id="province" {...field}>
                              <option value="1">Lago Ranco</option>
                              <option value="2">Río Bueno</option>
                              <option value="3">Futrono</option>
                              <option value="4">Panguipulli</option>
                              <option value="5">La Unión</option>
                              <option value="6">Paillaco</option>
                              <option value="7">Los Lagos</option>
                              <option value="8">Corral</option>
                              <option value="9">Valdivia</option>
                              <option value="10">Máfil</option>
                              <option value="11">Mariquina</option>
                              <option value="12">Lanco</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="email">
                        {({ field }) => (
                          <FormControl mt={3}>
                            <FormLabel>Correo (Opcional):</FormLabel>
                            <Input
                              type="email"
                              {...field}
                              placeholder="ejemplo@gmail.com"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="id_level">
                        {({ field }) => (
                          <FormControl mt={3}>
                            <FormLabel>Nivel</FormLabel>
                            <Select id="id_level" {...field}>
                              <option value="3">Primero Básico</option>
                              <option value="4">Segundo Básico</option>
                              <option value="5">Tercero Básico</option>
                              <option value="6">Cuarto Básico</option>
                              <option value="7">Quinto Básico</option>
                              <option value="8">Sexto Básico</option>
                              <option value="9">Séptimo Básico</option>
                              <option value="10">Octavo Básico</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="idDriver" validate={validateDriver}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.idDriver && form.touched.idDriver
                            }
                          >
                            <FormLabel>Asignar Conductor</FormLabel>
                            <Select {...field} id="idDriver" variant="filled">
                              <option selected value={""}>
                                Seleccione un conductor
                              </option>
                              {drivers.map((driver) => (
                                <option
                                  onClick={onToggle}
                                  key={driver.id}
                                  value={driver.id}
                                >
                                  {driver.nameDriver +
                                    " " +
                                    driver.lastNameDP +
                                    " " +
                                    driver.lastNameDM}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      {warningDriver && (
                        <SlideFade startingHeight={1} in={isOpen}>
                          <Alert status="warning">
                            <AlertIcon />
                            Debe seleccionar un conductor al estudiante.
                          </Alert>
                        </SlideFade>
                      )}
                      <ModalHeader>Datos del Apoderado</ModalHeader>
                      <Field name="nameAgent" validate={validateName}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.nameAgent && form.touched.nameAgent
                            }
                          >
                            <FormLabel>Apoderado</FormLabel>
                            <Input {...field} />
                            <FormErrorMessage>
                              {form.errors.nameAgent}
                            </FormErrorMessage>
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
                              <InputLeftAddon children="+56" />
                              <Input type="number" {...field} />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.phone}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {phoneError && (
                        <SlideFade startingHeight={1} in={show}>
                          <Box my={4}>
                            <Alert
                              status="error"
                              variant="solid"
                              borderRadius={4}
                            >
                              <AlertIcon />
                              ¡El formato del teléfono es incorrecto!
                            </Alert>
                          </Box>
                        </SlideFade>
                      )}
                      <Field name="emailAgent" validate={validateEmailAgent}>
                        {({ field, form }) => (
                          <FormControl
                            mt={3}
                            isRequired
                            isInvalid={
                              form.errors.emailAgent && form.touched.emailAgent
                            }
                          >
                            <FormLabel>Correo</FormLabel>
                            <Input
                              type="email"
                              {...field}
                              placeholder="ejemplo@gmail.com"
                            />
                            <FormErrorMessage>
                              {form.errors.emailAgent}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {success && (
                        <SlideFade startingHeight={1} in={show}>
                          <Box my={4}>
                            <Alert
                              status="success"
                              variant="solid"
                              borderRadius={4}
                            >
                              <AlertIcon />
                              ¡Estudiante agregado!
                            </Alert>
                          </Box>
                        </SlideFade>
                      )}
                      {error && (
                        <SlideFade startingHeight={1} in={show}>
                          <Box my={4}>
                            <Alert
                              status="error"
                              variant="solid"
                              borderRadius={4}
                            >
                              <AlertIcon />
                              ¡Debe completar los campos requeridos!
                            </Alert>
                          </Box>
                        </SlideFade>
                      )}
                      {rutError && (
                        <SlideFade startingHeight={1} in={show}>
                          <Box my={4}>
                            <Alert
                              status="error"
                              variant="solid"
                              borderRadius={4}
                            >
                              <AlertIcon />
                              ¡El Rut ya se encuentra registrado!
                            </Alert>
                          </Box>
                        </SlideFade>
                      )}
                      <ModalFooter>
                        <Button
                          mt={4}
                          colorScheme="whatsapp"
                          isLoading={props.isSubmitting}
                          type="submit"
                        >
                          Agregar
                        </Button>
                        <Button ml={2} mt={4} onClick={onClose}>
                          Cancelar
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        {props.name === "PÁRVULO" && (
          <Flex flexDirection="column" justify="space-between" h="100%">
            <Flex
              justify="space-between"
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mb="auto"
            >
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  mb="5px"
                  fontWeight="bold"
                  me="14px"
                >
                  {name}
                </Text>
                <Text
                  color="secondaryGray.600"
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight="400"
                  me="14px"
                >
                  {author}
                </Text>
              </Flex>
              <AvatarGroup
                max={3}
                color={textColorBid}
                size="sm"
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}
                fontSize="12px"
              >
                {/* {bidders.map((avt, key) => (
                  <Avatar key={key} src={avt} />
                ))} */}
              </AvatarGroup>
            </Flex>
            <Flex
              align="start"
              justify="space-between"
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mt="25px"
            >
              <Text fontWeight="700" fontSize="1.1rem" color={textColorBid}>
                Cantidad Actual: {count}
              </Text>
              {/* <Link
                href={download}
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}
              > */}
              <Menu>
                <MenuButton
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  as={Button}
                  rightIcon={<MdArrowDownward fontSize="1.2rem" />}
                >
                  Ver estudiantes
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => getAllStudents("Prekinder")}>
                    Prekinder
                  </MenuItem>
                  <MenuItem onClick={() => getAllStudents("Kinder")}>
                    Kinder
                  </MenuItem>
                </MenuList>
              </Menu>
              {/* <Button
                  // onClick={handleClick}
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="70px"
                  px="24px"
                  py="5px"
                >
                  Ver estudiantes
                </Button> */}
              {/* </Link> */}
            </Flex>
            <br></br>
            {/* <Collapse startingHeight={1} in={show}>
              <TableStudents course={course} students={students} />
            </Collapse> */}
            {isShown && (
              <>
                <Button
                  onClick={(event) => showParvulo(event)}
                  background="#9AE6B4"
                  color="black"
                  hover="#9ae6b469"
                >
                  Agregar Estudiante
                  <AddIcon w={3.5} h={3.5} />
                </Button>
                <TableStudents
                  course={course}
                  dataStudents={dataStudents}
                  drivers={drivers}
                  columns={columns}
                />
              </>
            )}
          </Flex>
        )}
        {props.name === "BÁSICA" && (
          <Flex flexDirection="column" justify="space-between" h="100%">
            <Flex
              justify="space-between"
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mb="auto"
            >
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  mb="5px"
                  fontWeight="bold"
                  me="14px"
                >
                  {name}
                </Text>
                <Text
                  color="secondaryGray.600"
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight="400"
                  me="14px"
                >
                  {author}
                </Text>
              </Flex>
              <AvatarGroup
                max={3}
                color={textColorBid}
                size="sm"
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}
                fontSize="12px"
              >
                {/* {bidders.map((avt, key) => (
                  <Avatar key={key} src={avt} />
                ))} */}
              </AvatarGroup>
            </Flex>
            <Flex
              align="start"
              justify="space-between"
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mt="25px"
            >
              <Text fontWeight="700" fontSize="1.1rem" color={textColorBid}>
                Cantidad Actual: {count}
              </Text>
              {/* <Link
              href={download}
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}> */}
              {/* <Button
                onClick={getAllStudents}
                variant="darkBrand"
                color="white"
                fontSize="sm"
                fontWeight="500"
                borderRadius="70px"
                px="24px"
                py="5px"
              >
                Ver estudiantes
              </Button> */}
              <Menu>
                <MenuButton
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  as={Button}
                  rightIcon={<MdArrowDownward fontSize="1.2rem" />}
                >
                  Ver estudiantes
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => getAllStudents("Primero Básico")}>
                    Primero Básico
                  </MenuItem>
                  <MenuItem onClick={() => getAllStudents("Segundo Básico")}>
                    Segundo Básico
                  </MenuItem>
                  <MenuItem onClick={() => getAllStudents("Tercero Básico")}>
                    Tercero Básico
                  </MenuItem>
                  <MenuItem onClick={() => getAllStudents("Cuarto Básico")}>
                    Cuarto Básico
                  </MenuItem>
                  <MenuItem onClick={() => getAllStudents("Quinto Básico")}>
                    Quinto Básico
                  </MenuItem>
                  <MenuItem onClick={() => getAllStudents("Sexto Básico")}>
                    Sexto Básico
                  </MenuItem>
                  <MenuItem onClick={() => getAllStudents("Séptimo Básico")}>
                    Séptimo Básico
                  </MenuItem>
                  <MenuItem onClick={() => getAllStudents("Octavo Básico")}>
                    Octavo Básico
                  </MenuItem>
                </MenuList>
              </Menu>
              {/* </Link> */}
            </Flex>
            <br></br>
            {/* <Collapse startingHeight={1} in={show}>
              <TableStudents course={course} students={students} />
            </Collapse> */}
            {isShown && (
              <>
                <Button
                  onClick={(event) => showBasica(event)}
                  background="#9AE6B4"
                  color="black"
                  hover="#9ae6b469"
                >
                  Agregar Estudiante
                  <AddIcon w={3.5} h={3.5} />
                </Button>
                <TableStudents
                  course={course}
                  dataStudents={dataStudents}
                  drivers={drivers}
                  columns={columns}
                />
              </>
            )}
          </Flex>
        )}
        {props.name === "CONDUCTORES" && (
          <Flex flexDirection="column" justify="space-between" h="100%">
            <Flex
              justify="space-between"
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mb="auto"
            >
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  mb="5px"
                  fontWeight="bold"
                  me="14px"
                >
                  {name}
                </Text>
                <Text
                  color="secondaryGray.600"
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight="400"
                  me="14px"
                >
                  {author}
                </Text>
              </Flex>
              <AvatarGroup
                max={3}
                color={textColorBid}
                size="sm"
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}
                fontSize="12px"
              >
                {/* {bidders.map((avt, key) => (
                  <Avatar key={key} src={avt} />
                ))} */}
              </AvatarGroup>
            </Flex>
            <Flex
              align="start"
              justify="space-between"
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mt="25px"
            >
              <Text fontWeight="700" fontSize="1.1rem" color={textColorBid}>
                Cantidad Actual: {countDriver}
              </Text>
              {/* <Link
                href={download}
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}
              > */}
              <Button
                onClick={(event) => getListDrivers(event)}
                variant="darkBrand"
                color="white"
                fontSize="sm"
                fontWeight="500"
                borderRadius="70px"
                px="24px"
                py="5px"
                rightIcon={<MdArrowDownward fontSize="1.2rem" />}
              >
                Ver conductores
              </Button>
              {/* </Link> */}
            </Flex>
            {
              <Collapse startingHeight={1} in={show}>
                <TableDrivers drivers={drivers} countDriver={countDriver} />
              </Collapse>
            }
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
