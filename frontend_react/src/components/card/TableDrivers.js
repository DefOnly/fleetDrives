import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Progress,
  Text,
  Button,
  Icon,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalFooter,
  Modal,
  ModalOverlay,
  FormErrorMessage,
  SlideFade,
  Box,
  Alert,
  AlertIcon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  IconButton,
  Center,
  HStack,
  PinInput,
  PinInputField,
  AlertDialogFooter,
  Stack,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useCallback } from "react";
// import TablesTableRow from "components/card/";
import { useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { FaUser, FaAsterisk, FaCheckCircle } from "react-icons/fa";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useRut } from "react-rut-formatter";
import axios from "axios";

const TableDrivers = ({ drivers, countDriver }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [listDrivers, setListDrivers] = useState([]);
  const [driverInfo, setDriverInfo] = useState([]);
  const { rut, updateRut, isValid } = useRut();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [rutError, setRutError] = useState(false);
  const [modalDriver, setModalDriver] = useState(false);
  const [modalUpdateDriver, setModalUpdateDriver] = useState(false);
  const cancelRef = React.useRef();
  const [modalDelete, setModalDelete] = useState(false);
  const [countDrivers, setCountDrivers] = useState(countDriver);
  const endPoint = "http://localhost:8000/api";
  const [alertErrorUpdate, setAlertErrorUpdate] = useState(false);
  const [alertSuccessUpdate, setAlertSuccessUpdate] = useState(false);
  let count = 1;

  const initialValues = {
    rut: "",
    name: "",
    lastNameP: "",
    lastNameM: "",
    enterprise: "",
    car: "",
    code: "",
  };
  const initialValuesUpdate = {
    nameToUpdate: "",
    enterpriseToUpdate: "",
    carToUpdate: "",
    codeToUpdate: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formValuesUpdate, setFormValuesUpdate] = useState(initialValuesUpdate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleInputChangeUpdate = (e) => {
    const { name, value } = e.target;
    setFormValuesUpdate({ ...formValuesUpdate, [name]: value });
  };

  const isErrorName = formValues.name === "";
  const isErrorLastNameP = formValues.lastNameP === "";
  const isErrorLastNameM = formValues.lastNameM === "";
  const isErrorEnterprise = formValues.enterprise === "";
  const isErrorCar = formValues.car === "";
  const isErrorCode = formValues.code === "";

  const isErrorName_update = formValues.name === "";
  const isErrorEnterprise_update = formValues.enterprise === "";
  const isErrorCar_update = formValues.car === "";
  const isErrorCode_update = formValues.code === "";

  const handleAddDriver = async (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let resultArray = [];
    for (let [key, value] of formData.entries()) {
      resultArray.push(value);
    }
    const getAllUsers = await axios.get(`${endPoint}/getAllUsers/`);
    let responseUsers = getAllUsers.data;
    let rut = resultArray[0];
    let duplicateRut = checkDuplicateRut(responseUsers, rut);
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
      resultArray[6] === ""
    ) {
      setError(true);
      setSuccess(false);
      setRutError(false);
      setShow(true);
    } else {
      await axios.post(`${endPoint}/AddDriver/`, {
        rut: resultArray[0],
        nameDriver: resultArray[1],
        lastNameP: resultArray[2],
        lastNameM: resultArray[3],
        enterprise: resultArray[4],
        car: resultArray[5],
        code: resultArray[6],
      });
      const responseDrivers = await axios.get(`${endPoint}/drivers/`);
      let resultDrivers = responseDrivers.data;
      let update = false;
      UpdateStateDrivers(resultDrivers, update);
    }
  };

  const handleEditDriver = async (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let resultArray = [];
    for (let [key, value] of formData.entries()) {
      resultArray.push(value);
    }
    let parameters = resultArray.slice(0, 2);
    let splitName = resultArray[3].split(" ");
    let firstNames;
    let lastPaternal
    let lastMaternal
    if(splitName.length === 3){
      firstNames = splitName[0];
      lastPaternal = splitName[1];
      lastMaternal = splitName[2];
    } else {
      firstNames = splitName[0] + " " + splitName[1];
      lastPaternal = splitName[2];
      lastMaternal = splitName[3];
    }
    if (
      resultArray[2] === "" ||
      resultArray[3] === "" ||
      resultArray[4] === "" ||
      resultArray[5] === "" ||
      resultArray[6] === ""
    ) {
      setAlertErrorUpdate(true);
      setAlertSuccessUpdate(false);
      setRutError(false);
      setShow(true);
    } else {
      await axios.put(`${endPoint}/UpdateInfoDriver/${parameters}`, {
        rut: resultArray[2],
        nameDriver: firstNames,
        lastNameP: lastPaternal,
        lastNameM: lastMaternal,
        enterprise: resultArray[4],
        car: resultArray[5],
        code: resultArray[6],
        email: resultArray[7],
      });
      const responseDrivers = await axios.get(`${endPoint}/drivers/`);
      let resultDrivers = responseDrivers.data;
      let update = true;
      UpdateStateDrivers(resultDrivers, update);
    }
  };

  const UpdateStateDrivers = useCallback(
    (driversUpdate, update) => {
      setListDrivers(driversUpdate);
      if (update) {
        setAlertSuccessUpdate(true);
        setAlertErrorUpdate(false);
        setSuccess(false);
        setRutError(false);
        setError(false);
        setShow(true);
        setTimeout(() => {
          setTimeout(() => {
            onClose();
            setAlertSuccessUpdate(false);
          }, "2000");
        });
      } else {
        setCountDrivers(countDrivers + 1);
        setSuccess(true);
        setRutError(false);
        setError(false);
        setAlertErrorUpdate(false);
        setAlertSuccessUpdate(false);
        setShow(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          updateRut("");
          setFormValues({
            name: "",
            lastNameP: "",
            lastNameM: "",
            enterprise: "",
            car: "",
            code: "",
          });
        }, "2000");
      }
    },
    [countDrivers, onClose, updateRut]
  );

  const checkDuplicateRut = (users, rut) => {
    let response = users.filter(
      (user) => user.rut === rut || user.rutDriver === rut
    );
    return response;
  };

  const deleteDriver = async (idDriver) => {
    // const response = await axios.get(`${endPoint}/drivers/`);
    // setDrivers(response.data);
    // setCurrentDriver(idDriver);
    setModalDelete(true);
    setModalDriver(false);
    setModalUpdateDriver(false);
    onOpen();
  };

  const showModalAddDriver = () => {
    setModalDriver(true);
    setModalUpdateDriver(false);
    setModalDelete(false);
    onOpen();
  };
  const modalEditDriver = async (idDriver) => {
    const response = await axios.get(`${endPoint}/driverInfo/${idDriver}/`);
    let arrayDrivers = [];
    let result = response.data;
    result.map((row) => {
      arrayDrivers.push(
        row.nameDriver + " " + row.lastNameDP + " " + row.lastNameDM
      );
      return result;
    });
    const newArray = result.map(
      ({ nameDriver, lastNameDP, lastNameDM, ...row }) => {
        return row;
      }
    );
    const namesDrivers = newArray.map((value, index) => ({
      ...value,
      nameDriver: arrayDrivers[index],
    }));
    setDriverInfo(namesDrivers);
    setModalUpdateDriver(true);
    setModalDriver(false);
    setModalDelete(false);
    onOpen();
  };

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Button
        onClick={() => showModalAddDriver()}
        background="#9AE6B4"
        color="black"
        hover="#9ae6b469"
      >
        Registrar Conductor
      </Button>
      {/* Agregar Conductor */}
      {modalDriver && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <form onSubmit={handleAddDriver}>
            <ModalContent>
              <ModalHeader>Registro Conductor</ModalHeader>
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
                  <FormLabel>Nombres y Apellidos</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombres y Apellidos"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                  <Icon
                    as={FaAsterisk}
                    color="red"
                    w="0.7rem"
                    h="0.7rem"
                    pos="absolute"
                    bottom="5.1rem"
                    left="9.3rem"
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
                <FormControl mt={4} isInvalid={isErrorEnterprise}>
                  <FormLabel>Empresa de Contrato</FormLabel>
                  <Input
                    type="text"
                    id="enterprise"
                    name="enterprise"
                    placeholder=""
                    value={formValues.enterprise}
                    onChange={handleInputChange}
                  />
                  <Icon
                    as={FaAsterisk}
                    color="red"
                    w="0.7rem"
                    h="0.7rem"
                    pos="absolute"
                    bottom="5.1rem"
                    left="9.7rem"
                  />
                  {!isErrorEnterprise ? (
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
                      ¡La empresa es requerida!
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={4} isInvalid={isErrorCar}>
                  <FormLabel>Marca y Modelo de Auto</FormLabel>
                  <Input
                    type="text"
                    id="car"
                    name="car"
                    placeholder=""
                    value={formValues.car}
                    onChange={handleInputChange}
                  />
                  <Icon
                    as={FaAsterisk}
                    color="red"
                    w="0.7rem"
                    h="0.7rem"
                    pos="absolute"
                    bottom="5rem"
                    left="11rem"
                  />
                  {!isErrorCar ? (
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
                      ¡El modelo del auto es requerido!
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={4} isInvalid={isErrorCode}>
                  <FormLabel>Número de Patente</FormLabel>
                  <Input
                    type="text"
                    id="code"
                    name="code"
                    placeholder=""
                    value={formValues.code}
                    onChange={handleInputChange}
                  />
                  <Icon
                    as={FaAsterisk}
                    color="red"
                    w="0.7rem"
                    h="0.7rem"
                    pos="absolute"
                    bottom="5.2rem"
                    left="8.8rem"
                  />
                  {!isErrorCode ? (
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
                      ¡La patente es requerida!
                    </FormErrorMessage>
                  )}
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
              </ModalBody>
              {success && (
                <SlideFade startingHeight={1} in={show}>
                  <Box my={4}>
                    <Alert status="success" variant="solid" borderRadius={4}>
                      <AlertIcon />
                      Conductor Registrado!
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

      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Menu />
      </Flex>
      <Table variant="simple" color="gray.500" mb="24px">
        <Thead>
          <Tr>
            <Th>
              <Flex></Flex>
            </Th>
            <Th>
              <Flex fontSize="1.3rem">#</Flex>
            </Th>
            <Th>
              <Flex>Rut</Flex>
            </Th>
            <Th>
              <Flex>Nombre y Apellido</Flex>
            </Th>
            <Th>
              <Flex>Empresa de contrato</Flex>
            </Th>
            <Th>
              <Flex>Modelo de Auto</Flex>
            </Th>
            <Th>
              <Flex>Patente</Flex>
            </Th>
            <Th>
              <Flex>Cuenta</Flex>
            </Th>
            <Th>
              <Flex>Opciones</Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {listDrivers.length === !0
            ? listDrivers.map((row) => {
                return (
                  <Tr key={row.id}>
                    <Td>
                      <Icon
                        mt="8px"
                        as={FaUser}
                        w="1.5rem"
                        h="1.5rem"
                        fontWeight="2000"
                        color="black"
                      />
                    </Td>
                    <Td>{count++}</Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.rutDriver}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.nameDriver} {row.lastNameDP} {row.lastNameDM}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.enterprise}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.brand_model}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.unique_code}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      <Stack direction="row">
                        {row.statusDriver === 1 ? (
                          <Badge colorScheme="green">Habilitada</Badge>
                        ) : (
                          <Badge colorScheme="red">Deshabilitada</Badge>
                        )}
                      </Stack>
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      <Button
                        w="4rem"
                        onClick={() => modalEditDriver(row.id)}
                        variant="brand"
                      >
                        Editar
                      </Button>
                      <Button
                        p="1rem"
                        onClick={() => deleteDriver(row.id)}
                        background="#E53E3E"
                        color="white"
                        hover="#e53e3e8c"
                      >
                        Deshabilitar cuenta
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            : drivers.map((row) => {
                return (
                  <Tr key={row.id}>
                    <Td>
                      <Icon
                        mt="8px"
                        as={FaUser}
                        w="1.5rem"
                        h="1.5rem"
                        fontWeight="2000"
                        color="black"
                      />
                    </Td>
                    <Td>{count++}</Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.rutDriver}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.nameDriver} {row.lastNameDP} {row.lastNameDM}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.enterprise}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.brand_model}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {row.unique_code}
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      <Stack direction="row">
                        {row.statusDriver === 1 ? (
                          <Badge colorScheme="green">Habilitada</Badge>
                        ) : (
                          <Badge colorScheme="red">Deshabilitada</Badge>
                        )}
                      </Stack>
                    </Td>
                    <Td
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      <Button
                        onClick={() => modalEditDriver(row.id)}
                        variant="brand"
                      >
                        Editar
                      </Button>
                      <Tooltip
                        hasArrow
                        label="Deshabilitar cuenta"
                        bg="red.600"
                      >
                        <Icon
                          cursor="pointer"
                          onClick={() => deleteDriver(row.id)}
                          as={LockIcon}
                          w={8}
                          h={8}
                          pos="relative"
                          ml="1.4rem"
                          top="0.3rem"
                          color="black.500"
                        />
                      </Tooltip>
                      {/* <Button
                        p="1rem"
                        onClick={() => deleteDriver(row.id)}
                        background="#E53E3E"
                        color="white"
                        hover="#e53e3e8c"
                      >
                        Deshabilitar cuenta
                      </Button> */}
                    </Td>
                  </Tr>
                );
              })}
        </Tbody>
      </Table>
      {/* Editar Conductor */}
      {modalUpdateDriver && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <form onSubmit={handleEditDriver}>
            <ModalContent>
              <ModalHeader>Editar Conductor</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Rut</FormLabel>
                  <Input
                    id="id"
                    name="id"
                    type="hidden"
                    defaultValue={driverInfo[0].id}
                  />
                  <Input
                    id="id"
                    name="id"
                    type="hidden"
                    defaultValue={driverInfo[0].van_id}
                  />
                  <Input
                    type="text"
                    id="rut"
                    name="rut"
                    readOnly={true}
                    placeholder="Rut"
                    value={driverInfo[0].rutDriver}
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
                <FormControl mt={4} isValid={!isErrorName_update}>
                  <FormLabel>Nombres y Apellidos</FormLabel>
                  <Input
                    type="text"
                    id="nameToUpdate"
                    name="nameToUpdate"
                    placeholder="Nombres y Apellidos"
                    defaultValue={driverInfo[0].nameDriver}
                    onChange={handleInputChangeUpdate}
                  />
                  <Icon
                    as={FaAsterisk}
                    color="red"
                    w="0.7rem"
                    h="0.7rem"
                    pos="absolute"
                    bottom="5.2rem"
                    left="9.3rem"
                  />
                  {isErrorName_update ? (
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
                <FormControl mt={4} isInvalid={!isErrorEnterprise_update}>
                  <FormLabel>Empresa de Contrato</FormLabel>
                  <Input
                    type="text"
                    id="enterpriseToUpdate"
                    name="enterpriseToUpdate"
                    placeholder=""
                    defaultValue={driverInfo[0].enterprise}
                    onChange={handleInputChangeUpdate}
                  />
                  <Icon
                    as={FaAsterisk}
                    color="red"
                    w="0.7rem"
                    h="0.7rem"
                    pos="absolute"
                    bottom="5.1rem"
                    left="9.7rem"
                  />
                  {isErrorEnterprise_update ? (
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
                      ¡La empresa es requerida!
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={4} isInvalid={!isErrorCar_update}>
                  <FormLabel>Marca y Modelo de Auto</FormLabel>
                  <Input
                    type="text"
                    id="carToUpdate"
                    name="carToUpdate"
                    placeholder=""
                    defaultValue={driverInfo[0].brand_model}
                    onChange={handleInputChangeUpdate}
                  />
                  <Icon
                    as={FaAsterisk}
                    color="red"
                    w="0.7rem"
                    h="0.7rem"
                    pos="absolute"
                    bottom="5.2rem"
                    left="11rem"
                  />
                  {isErrorCar_update ? (
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
                      ¡El modelo del auto es requerido!
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={4} isInvalid={!isErrorCode_update}>
                  <FormLabel>Número de Patente</FormLabel>
                  <Input
                    type="text"
                    id="codeToUpdate"
                    name="codeToUpdate"
                    placeholder=""
                    defaultValue={driverInfo[0].unique_code}
                    onChange={handleInputChangeUpdate}
                  />
                  <Icon
                    as={FaAsterisk}
                    color="red"
                    w="0.7rem"
                    h="0.7rem"
                    pos="absolute"
                    bottom="5.2rem"
                    left="8.8rem"
                  />
                  {isErrorCode_update ? (
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
                      ¡La patente es requerida!
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Correo (Opcional):</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@gmail.com"
                    defaultValue={driverInfo[0].email}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </ModalBody>
              {alertSuccessUpdate && (
                <SlideFade startingHeight={1} in={show}>
                  <Box my={4}>
                    <Alert status="success" variant="solid" borderRadius={4}>
                      <AlertIcon />
                      Información Actualizada!
                    </Alert>
                  </Box>
                </SlideFade>
              )}
              {alertErrorUpdate && (
                <SlideFade startingHeight={1} in={show}>
                  <Box my={4}>
                    <Alert status="error" variant="solid" borderRadius={4}>
                      <AlertIcon />
                      ¡Debe completar los campos requeridos!
                    </Alert>
                  </Box>
                </SlideFade>
              )}
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Guardar cambios
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      )}
      {modalDelete && (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Deshabilitar cuenta
              </AlertDialogHeader>
              <AlertDialogBody>
                Si está seguro de esta acción debe colocar la clave de
                confirmación de 4 dígitos.
                <br></br>
                <strong>
                  Nota: Esta acción borrará todos los registros asociados al
                  conductor y es irreversible.
                </strong>
                <br></br>
                <br></br>
                Enviar clave vía correo
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Send email"
                  icon={<EmailIcon />}
                />
              </AlertDialogBody>
              <Center>
                <HStack>
                  <PinInput type="alphanumeric">
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Center>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={onClose} ml={3}>
                  Eliminar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Card>
  );
  // <Table variant="simple" color={textColor}>
  //   <Thead>
  //     <Tr my=".8rem" pl="0px" color="gray.400">
  //       <Th pl="0px" color="gray.400">
  //         Author
  //       </Th>
  //       <Th color="gray.400">Function</Th>
  //       <Th color="gray.400">Status</Th>
  //       <Th color="gray.400">Employed</Th>
  //       <Th></Th>
  //     </Tr>
  //   </Thead>
  //   <Tbody>
  //     {/* {students.map((row) => {
  //       return (
  //         // <TablesTableRow
  //         //   name={row.name}
  //         //   logo={row.logo}
  //         //   email={row.email}
  //           // subdomain={row.subdomain}
  //           // domain={row.domain}
  //           // status={row.status}
  //           // date={row.date}
  //         // />
  //       );
  //     })} */}
  //   </Tbody>
  // </Table>;
};

export default TableDrivers;
