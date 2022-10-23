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
// Assets
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaCheckCircle, FaAsterisk } from "react-icons/fa";
import TableStudents from "./TableStudents";
import TableDrivers from "./TableDrivers";
import { useRut } from "react-rut-formatter";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { rut, updateRut, isValid } = useRut();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [rutError, setRutError] = useState(false);
  const [state, setState] = useState("");
  const initialValues = {
    rut: "",
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
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isErrorName = formValues.name === "";
  const isErrorLastNameP = formValues.lastNameP === "";
  const isErrorLastNameM = formValues.lastNameM === "";
  const isErrorZone = formValues.zone === "";
  const isErrorAddress = formValues.address === "";
  const isErrorNameAgent = formValues.nameAgent === "";
  const isErrorPhone = formValues.phone === "";
  const isErrorEmailAgent = formValues.email_agent === "";

  const getAllStudents = async (event, param) => {
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

  const getAllDrivers = async (event) => {
    const response = await axios.get(`${endPoint}/drivers/`);
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

  const handleAddStudent = async (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let resultArray = [];
    for (let [key, value] of formData.entries()) {
      resultArray.push(value);
    }
    const getAllUsers = await axios.get(`${endPoint}/getAllUsers/`);
    let users = getAllUsers.data;
    let rut = resultArray[0];
    let id_level = parseInt(resultArray[9]);
    let duplicateRut = checkDuplicateRut(users, rut);
    if (duplicateRut.length > 0) {
      setRutError(true);
      setSuccess(false);
      setError(false);
      setShow(true);
    } else if (
      resultArray[0] === "" ||
      resultArray[1] === "" ||
      resultArray[2] === "" ||
      resultArray[3] === "" ||
      resultArray[4] === "" ||
      resultArray[5] === "" ||
      resultArray[10] === "" ||
      resultArray[11] === "" ||
      resultArray[12] === ""
    ) {
      setError(true);
      setSuccess(false);
      setRutError(false);
      setShow(true);
    } else {
      if (course === "Prekinder" || course === "Kinder") {
        await axios.post(`${endPoint}/AddStudentParvulo/`, {
          rut: resultArray[0],
          name: resultArray[1],
          lastNameP: resultArray[2],
          lastNameM: resultArray[3],
          zone: resultArray[4],
          address: resultArray[5],
          province: parseInt(resultArray[6]),
          gender: resultArray[7],
          email: resultArray[8],
          idLevel: parseInt(resultArray[9]),
          nameAgent: resultArray[10],
          phone: resultArray[11],
          emailAgent: resultArray[12],
        });
      } else {
        await axios.post(`${endPoint}/AddStudentBasica/`, {
          rut: resultArray[0],
          name: resultArray[1],
          lastNameP: resultArray[2],
          lastNameM: resultArray[3],
          zone: resultArray[4],
          address: resultArray[5],
          province: parseInt(resultArray[6]),
          gender: resultArray[7],
          email: resultArray[8],
          idLevel: parseInt(resultArray[9]),
          nameAgent: resultArray[10],
          phone: resultArray[11],
          emailAgent: resultArray[12],
        });
        UpdateStateStudents(id_level);
      }
    }
  };

  const checkDuplicateRut = (users, rut) => {
    let response = users.filter(
      (user) => user.rut === rut || user.rutDriver === rut
    );
    return response;
  };

  const UpdateStateStudents = useCallback(
    (id_level) => {
      setStudents(dataStudents);
      setSuccess(true);
      setRutError(false);
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
    [students, dataStudents, updateRut, count, onClose]
  );

  // useEffect(() => {
  //   let isMounted = true;
  //   async function getAllDriversUpdate() {
  //     const response = await axios.get(`${endPoint}/driversCount/`);
  //     if (isMounted) {
  //       setState(response);
  //       setCountDriver(response);
  //     }
  //   }
  //   getAllDriversUpdate();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [countDriver]);

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
            <form onSubmit={handleAddStudent}>
              <ModalContent>
                <ModalHeader>Agregar Estudiante</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl isInvalid={!isValid}>
                    <FormLabel>Rut</FormLabel>
                    <Input
                      type="text"
                      id="rut"
                      name="rut"
                      // ref={initialRef}
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
                  <FormControl mt={4} isInvalid={isErrorName}>
                    <FormLabel>Nombres</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nombres"
                      value={formValues.name}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="4.3rem"
                    />
                    {!isErrorName ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El nombre es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorLastNameP}>
                    <FormLabel>Apellido Paterno</FormLabel>
                    <Input
                      type="text"
                      id="lastNameP"
                      name="lastNameP"
                      placeholder=""
                      value={formValues.lastNameP}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="7.4rem"
                    />
                    {!isErrorLastNameP ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El apellido paterno es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorLastNameM}>
                    <FormLabel>Apellido Materno</FormLabel>
                    <Input
                      type="text"
                      id="lastNameM"
                      name="lastNameM"
                      placeholder=""
                      value={formValues.lastNameM}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="7.7rem"
                    />
                    {!isErrorLastNameM ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El apellido materno es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorZone}>
                    <FormLabel>Sector</FormLabel>
                    <Input
                      type="text"
                      id="zone"
                      name="zone"
                      placeholder=""
                      value={formValues.zone}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="3rem"
                    />
                    {!isErrorZone ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El sector es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorAddress}>
                    <FormLabel>Dirección</FormLabel>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      placeholder=""
                      value={formValues.address}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="4.4rem"
                    />
                    {!isErrorAddress ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡La dirección es requerida!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Comuna</FormLabel>
                    <Select
                      id="comuna"
                      name="comuna"
                      onChange={handleInputChange}
                    >
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
                  <FormControl mt={4}>
                    <FormLabel>Sexo</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      onChange={handleInputChange}
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </Select>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Correo (Opcional):</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ejemplo@gmail.com"
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Nivel</FormLabel>
                    <Select
                      id="id_level"
                      name="id_level"
                      // placeholder="Seleccione nivel"
                      onChange={handleInputChange}
                    >
                      <option value="1">Prekinder</option>
                      <option value="2">Kinder</option>
                    </Select>
                  </FormControl>
                  <ModalHeader>Datos del Apoderado</ModalHeader>
                  <FormControl isInvalid={isErrorNameAgent}>
                    <FormLabel>Apoderado</FormLabel>
                    <Input
                      type="text"
                      id="nameAgent"
                      name="nameAgent"
                      placeholder="Nombre y Apellido"
                      value={formValues.nameAgent}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="5.2rem"
                    />
                    {!isErrorNameAgent ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El nombre del apoderado es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorPhone}>
                    <FormLabel>Teléfono</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="+56" />
                      <Input
                        type="number"
                        id="phone"
                        name="phone"
                        maxLength="9"
                        value={formValues.phone}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="4rem"
                    />
                    {!isErrorPhone ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El teléfono del apoderado es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorEmailAgent}>
                    <FormLabel>Correo</FormLabel>
                    <Input
                      type="email"
                      id="email_agent"
                      name="email_agent"
                      placeholder=""
                      value={formValues.email_agent}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="3.3rem"
                    />
                    {!isErrorEmailAgent ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El correo electrónico del apoderado es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </ModalBody>
                {success && (
                  <SlideFade startingHeight={1} in={show}>
                    <Box my={4}>
                      <Alert status="success" variant="solid" borderRadius={4}>
                        <AlertIcon />
                        ¡Estudiante agregado!
                      </Alert>
                    </Box>
                  </SlideFade>
                )}
                {error && (
                  <SlideFade startingHeight={1} in={show}>
                    <Box my={4}>
                      <Alert status="error" variant="solid" borderRadius={4}>
                        <AlertIcon />
                        ¡Debe completar los campos requeridos!
                      </Alert>
                    </Box>
                  </SlideFade>
                )}
                {rutError && (
                  <SlideFade startingHeight={1} in={show}>
                    <Box my={4}>
                      <Alert status="error" variant="solid" borderRadius={4}>
                        <AlertIcon />
                        ¡El Rut ya se encuentra registrado!
                      </Alert>
                    </Box>
                  </SlideFade>
                )}
                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    Agregar
                  </Button>
                  <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </form>
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
            <form onSubmit={handleAddStudent}>
              <ModalContent>
                <ModalHeader>Agregar Estudiante</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl isInvalid={!isValid}>
                    <FormLabel>Rut</FormLabel>
                    <Input
                      type="text"
                      id="rut"
                      name="rut"
                      // ref={initialRef}
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
                  <FormControl mt={4} isInvalid={isErrorName}>
                    <FormLabel>Nombres</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nombres"
                      value={formValues.name}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="4.3rem"
                    />
                    {!isErrorName ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El nombre es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorLastNameP}>
                    <FormLabel>Apellido Paterno</FormLabel>
                    <Input
                      type="text"
                      id="lastNameP"
                      name="lastNameP"
                      placeholder=""
                      value={formValues.lastNameP}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="7.4rem"
                    />
                    {!isErrorLastNameP ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El apellido paterno es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorLastNameM}>
                    <FormLabel>Apellido Materno</FormLabel>
                    <Input
                      type="text"
                      id="lastNameM"
                      name="lastNameM"
                      placeholder=""
                      value={formValues.lastNameM}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="7.7rem"
                    />
                    {!isErrorLastNameM ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El apellido materno es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorZone}>
                    <FormLabel>Sector</FormLabel>
                    <Input
                      type="text"
                      id="zone"
                      name="zone"
                      placeholder=""
                      value={formValues.zone}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="3rem"
                    />
                    {!isErrorZone ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El sector es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorAddress}>
                    <FormLabel>Dirección</FormLabel>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      placeholder=""
                      value={formValues.address}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="4.4rem"
                    />
                    {!isErrorAddress ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡La dirección es requerida!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Comuna</FormLabel>
                    <Select
                      id="comuna"
                      name="comuna"
                      onChange={handleInputChange}
                    >
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
                  <FormControl mt={4}>
                    <FormLabel>Sexo</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      onChange={handleInputChange}
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </Select>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Correo (Opcional):</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ejemplo@gmail.com"
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Nivel</FormLabel>
                    <Select
                      id="id_level"
                      name="id_level"
                      // placeholder="Seleccione nivel"
                      onChange={handleInputChange}
                    >
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
                  <ModalHeader>Datos del Apoderado</ModalHeader>
                  <FormControl isInvalid={isErrorNameAgent}>
                    <FormLabel>Apoderado</FormLabel>
                    <Input
                      type="text"
                      id="nameAgent"
                      name="nameAgent"
                      placeholder="Nombre y Apellido"
                      value={formValues.nameAgent}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="5.2rem"
                    />
                    {!isErrorNameAgent ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El nombre del apoderado es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorPhone}>
                    <FormLabel>Teléfono</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="+56" />
                      <Input
                        type="number"
                        id="phone"
                        name="phone"
                        maxLength="9"
                        value={formValues.phone}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="4rem"
                    />
                    {!isErrorPhone ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El teléfono del apoderado es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mt={4} isInvalid={isErrorEmailAgent}>
                    <FormLabel>Correo</FormLabel>
                    <Input
                      type="email"
                      id="email_agent"
                      name="email_agent"
                      placeholder=""
                      value={formValues.email_agent}
                      onChange={handleInputChange}
                    />
                    <Icon
                      as={FaAsterisk}
                      color="red"
                      w="0.7rem"
                      h="0.7rem"
                      pos="absolute"
                      bottom="5.2rem"
                      left="3.3rem"
                    />
                    {!isErrorEmailAgent ? (
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
                    ) : (
                      <FormErrorMessage>
                        ¡El correo electrónico del apoderado es requerido!
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </ModalBody>
                {success && (
                  <SlideFade startingHeight={1} in={show}>
                    <Box my={4}>
                      <Alert status="success" variant="solid" borderRadius={4}>
                        <AlertIcon />
                        ¡Estudiante agregado!
                      </Alert>
                    </Box>
                  </SlideFade>
                )}
                {error && (
                  <SlideFade startingHeight={1} in={show}>
                    <Box my={4}>
                      <Alert status="error" variant="solid" borderRadius={4}>
                        <AlertIcon />
                        ¡Debe completar los campos requeridos!
                      </Alert>
                    </Box>
                  </SlideFade>
                )}
                {rutError && (
                  <SlideFade startingHeight={1} in={show}>
                    <Box my={4}>
                      <Alert status="error" variant="solid" borderRadius={4}>
                        <AlertIcon />
                        ¡El Rut ya se encuentra registrado!
                      </Alert>
                    </Box>
                  </SlideFade>
                )}
                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    Agregar
                  </Button>
                  <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </form>
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
              <Button
                onClick={(event) => showParvulo(event)}
                background="#9AE6B4"
                color="black"
                hover="#9ae6b469"
              >
                Agregar Estudiante
              </Button>
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
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Prekinder")}
                  >
                    Prekinder
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Kinder")}
                  >
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
            {/* <Collapse startingHeight={1} in={show}>
              <TableStudents course={course} students={students} />
            </Collapse> */}
            {isShown && (
              <TableStudents
                course={course}
                dataStudents={dataStudents}
                columns={columns}
              />
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
              <Button
                onClick={(event) => showBasica(event)}
                background="#9AE6B4"
                color="black"
                hover="#9ae6b469"
              >
                Agregar Estudiante
              </Button>
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
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Primero Básico")}
                  >
                    Primero Básico
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Segundo Básico")}
                  >
                    Segundo Básico
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Tercero Básico")}
                  >
                    Tercero Básico
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Cuarto Básico")}
                  >
                    Cuarto Básico
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Quinto Básico")}
                  >
                    Quinto Básico
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Sexto Básico")}
                  >
                    Sexto Básico
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Séptimo Básico")}
                  >
                    Séptimo Básico
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => getAllStudents(event, "Octavo Básico")}
                  >
                    Octavo Básico
                  </MenuItem>
                </MenuList>
              </Menu>
              {/* </Link> */}
            </Flex>
            {/* <Collapse startingHeight={1} in={show}>
              <TableStudents course={course} students={students} />
            </Collapse> */}
            {isShown && (
              <TableStudents
                course={course}
                dataStudents={dataStudents}
                columns={columns}
              />
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
                onClick={(event) => getAllDrivers(event)}
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
                <TableDrivers drivers={drivers} />
              </Collapse>
            }
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
