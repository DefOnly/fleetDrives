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
import { EmailIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { useRut } from "react-rut-formatter";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import AuthUser from "views/auth/signIn/AuthUser";

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
  const [modalAllow, setModalAllow] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [countDrivers, setCountDrivers] = useState(countDriver);
  const endPoint = "http://localhost:8000/api";
  const [alertErrorUpdate, setAlertErrorUpdate] = useState(false);
  const [alertSuccessUpdate, setAlertSuccessUpdate] = useState(false);
  let count = 1;
  const NAME_REGEX = /^[ a-zA-ZÀ-ú]+$/;
  const initialValues = {
    rut: "",
  };
  const initialValuesUpdate = {
    nameToUpdate: "",
    enterpriseToUpdate: "",
    carToUpdate: "",
    codeToUpdate: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formValuesUpdate, setFormValuesUpdate] = useState(initialValuesUpdate);
  const [pin1, setPin1] = useState([]);
  const [pin2, setPin2] = useState([]);
  const [pin3, setPin3] = useState([]);
  const [pin4, setPin4] = useState([]);
  const [pinGenerate, setPinGenerate] = useState([]);
  const { getUser } = AuthUser();
  const [idDriver, setIdDriver] = useState([]);
  const [successPin, setSuccessPin] = useState(false);
  const [errorPin, setErrorPin] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleInputChangeUpdate = (e) => {
    const { name, value } = e.target;
    setFormValuesUpdate({ ...formValuesUpdate, [name]: value });
  };

  const isErrorName_update = formValues.name === "";
  const isErrorEnterprise_update = formValues.enterprise === "";
  const isErrorCar_update = formValues.car === "";
  const isErrorCode_update = formValues.code === "";

  const handleAddDriver = async (values) => {
    Object.assign(values, { rut: formValues.rut });
    const getAllUsers = await axios.get(`${endPoint}/getAllUsers/`);
    let users = getAllUsers.data;
    let rut = values.rut;
    let duplicateRut = checkDuplicateRut(users, rut);
    console.log(values);
    if (duplicateRut.length > 0) {
      setRutError(true);
      setSuccess(false);
      setError(false);
      setShow(true);
    } else if (
      values.rut === "" ||
      values.name === "" ||
      values.lastNameP === "" ||
      values.lastNameM === "" ||
      values.enterprise === "" ||
      values.car === "" ||
      values.code === ""
    ) {
      setError(true);
      setSuccess(false);
      setRutError(false);
      setShow(true);
    } else {
      await axios.post(`${endPoint}/AddDriver/`, {
        rut: values.rut,
        nameDriver: values.name,
        lastNameP: values.lastNameP,
        lastNameM: values.lastNameM,
        enterprise: values.enterprise,
        car: values.car,
        code: values.code,
      });
      const responseDrivers = await axios.get(`${endPoint}/drivers/`);
      let resultDrivers = responseDrivers.data;
      let update = false;
      UpdateStateDrivers(resultDrivers, update);
    }
  };

  const handleUpdateDriver = async (values) => {
    const arrayValues = Object.values(values);
    let parameters = arrayValues.slice(0, 2);
    let splitName = arrayValues[3].split(" ");
    let firstNames;
    let lastPaternal;
    let lastMaternal;
    if (splitName.length === 3) {
      firstNames = splitName[0];
      lastPaternal = splitName[1];
      lastMaternal = splitName[2];
    } else {
      firstNames = splitName[0] + " " + splitName[1];
      lastPaternal = splitName[2];
      lastMaternal = splitName[3];
    }
    if (
      arrayValues[2] === "" ||
      arrayValues[3] === "" ||
      arrayValues[4] === "" ||
      arrayValues[5] === "" ||
      arrayValues[6] === ""
    ) {
      setAlertErrorUpdate(true);
      setAlertSuccessUpdate(false);
      setRutError(false);
      setShow(true);
    } else {
      await axios.put(`${endPoint}/UpdateInfoDriver/${parameters}`, {
        rutDriver: arrayValues[2],
        nameDriver: firstNames,
        lastNameP: lastPaternal,
        lastNameM: lastMaternal,
        enterprise: arrayValues[4],
        car: arrayValues[5],
        code: arrayValues[6],
        email: arrayValues[7],
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

  const InactiveDriver = async (idDriver) => {
    setIdDriver(idDriver);
    setModalDelete(true);
    setModalAllow(false);
    setModalDriver(false);
    setModalUpdateDriver(false);
    onOpen();
  };

  const ActiveDriver = async (idDriver) => {
    setIdDriver(idDriver);
    setModalAllow(true);
    setModalDelete(false);
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
    setModalAllow(false);
    setModalDelete(false);
    onOpen();
  };

  const validateName = (value) => {
    let name = NAME_REGEX.test(value);
    let error;
    if (!value) {
      error = "El nombre es requerido";
    } else if (!name) {
      error = "El nombre sólo debe contener letras";
    } else if (value.length <= 3) {
      error = "El nombre deben contener más de 3 caracteres";
    }
    return error;
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
  const validateLastNameP = (value) => {
    let name = NAME_REGEX.test(value);
    let error;
    if (!value) {
      error = "El apellido paterno es requerido";
    } else if (!name) {
      error = "El apellido paterno sólo debe contener letras";
    } else if (value.length <= 2) {
      error = "El apellido paterno deben contener más de 2 caracteres";
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
      error = "El apellido materno deben contener más de 2 caracteres";
    }
    return error;
  };
  const validateEnterprise = (value) => {
    let error;
    if (!value) {
      error = "La empresa de contrato es requerida";
    }
    return error;
  };
  const validateCar = (value) => {
    let error;
    if (!value) {
      error = "El modelo y marca del furgón es requerido";
    }
    return error;
  };
  const validateCode = (value) => {
    let error;
    if (!value) {
      error = "El número de patente es requerido";
    }
    return error;
  };

  const sendCodeVerification = async () => {
    const pinArray = [
      getRandomInt(10),
      getRandomInt(10),
      getRandomInt(10),
      getRandomInt(10),
    ];
    setPinGenerate(pinArray);
    await axios.post(`${endPoint}/sendCodeVerification/`, {
      pinArray: pinArray,
      user: getUser().id,
    });
  };

  const getRandomInt = (maxNumber) => {
    return Math.floor(Math.random() * maxNumber);
  };

  const checkCodeVerification = async (e, action) => {
    e.preventDefault();
    if (
      pinGenerate[0] === parseInt(pin1) &&
      pinGenerate[1] === parseInt(pin2) &&
      pinGenerate[2] === parseInt(pin3) &&
      pinGenerate[3] === parseInt(pin4)
    ) {
      if (action === false) {
        const response = await axios
          .put(`${endPoint}/updateStatusUser/`, {
            idUser: idDriver,
            action: 2,
          })
          .then(async (response) => {
            const responseDrivers = await axios.get(`${endPoint}/driversCheckStatus/`);
            let resultDrivers = responseDrivers.data;
            let update = true;
            UpdateStateDrivers(resultDrivers, update);
          });
        setMessageSuccess("¡Cuenta deshabilitada con éxito!");
      } else {
        const response = await axios
          .put(`${endPoint}/updateStatusUser/`, {
            idUser: idDriver,
            action: 3,
          })
          .then(async (response) => {
            const responseDrivers = await axios.get(`${endPoint}/driversCheckStatus/`);
            let resultDrivers = responseDrivers.data;
            let update = true;
            UpdateStateDrivers(resultDrivers, update);
          });
        setMessageSuccess("¡Cuenta habilitada con éxito!");
      }
      setSuccessPin(true);
      setErrorPin(false);
      setPinGenerate([]);
      setTimeout(() => {
        onClose();
        setSuccessPin(false);
      }, "2000");
    } else {
      setErrorPin(true);
      setSuccessPin(false);
      setTimeout(() => {
        setErrorPin(false);
      }, "2000");
    }
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
          <ModalContent>
            <ModalHeader>Registro Conductor</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Formik
                initialValues={{
                  name: "",
                  lastNameP: "",
                  lastNameM: "",
                  enterprise: "",
                  car: "",
                  code: "",
                  email: "",
                }}
                onSubmit={(values) => handleAddDriver(values)}
              >
                {(props) => (
                  <Form noValidate="novalidate">
                    <FormControl isInvalid={!isValid}>
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
                          <Input
                            {...field}
                            placeholder="Primer y segundo nombre"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lastNameP" validate={validateLastNameP}>
                      {({ field, form }) => (
                        <FormControl
                          mt={3}
                          isRequired
                          isInvalid={
                            form.errors.lastNameP && form.touched.lastNameP
                          }
                        >
                          <FormLabel>Apellido Paterno</FormLabel>
                          <Input {...field} />
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
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.lastNameM}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="enterprise" validate={validateEnterprise}>
                      {({ field, form }) => (
                        <FormControl
                          mt={3}
                          isRequired
                          isInvalid={
                            form.errors.enterprise && form.touched.enterprise
                          }
                        >
                          <FormLabel>Empresa de Contrato</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.enterprise}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="car" validate={validateCar}>
                      {({ field, form }) => (
                        <FormControl
                          mt={3}
                          isRequired
                          isInvalid={form.errors.car && form.touched.car}
                        >
                          <FormLabel>Marca y Modelo de Furgón</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>{form.errors.car}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="code" validate={validateCode}>
                      {({ field, form }) => (
                        <FormControl
                          mt={3}
                          isRequired
                          isInvalid={form.errors.code && form.touched.code}
                        >
                          <FormLabel>Número de Patente</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.code}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field }) => (
                        <FormControl mt={3}>
                          <FormLabel>Correo (Opcional):</FormLabel>
                          <Input type="email" {...field} />
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
                            Conductor Registrado!
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
          {listDrivers.length !== 0
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
                      {row.statusDriver === 1 ? (
                        <>
                          <Button
                            w="4rem"
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
                              onClick={() => InactiveDriver(row.id)}
                              as={LockIcon}
                              w={8}
                              h={8}
                              pos="relative"
                              ml="1rem"
                              top="0.3rem"
                              color="black.500"
                            />
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Button w="4rem" disabled variant="brand">
                            Editar
                          </Button>
                          <Tooltip
                            hasArrow
                            label="Habilitar cuenta"
                            bg="green.600"
                          >
                            <Icon
                              cursor="pointer"
                              onClick={() => ActiveDriver(row.id)}
                              as={UnlockIcon}
                              w={8}
                              h={8}
                              pos="relative"
                              ml="1rem"
                              top="0.3rem"
                              color="black.500"
                            />
                          </Tooltip>
                        </>
                      )}
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
                      {row.statusDriver === 1 ? (
                        <>
                          <Button
                            w="4rem"
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
                              onClick={() => InactiveDriver(row.id)}
                              as={LockIcon}
                              w={8}
                              h={8}
                              pos="relative"
                              ml="1rem"
                              top="0.3rem"
                              color="black.500"
                            />
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Button w="4rem" disabled variant="brand">
                            Editar
                          </Button>
                          <Tooltip
                            hasArrow
                            label="Habilitar cuenta"
                            bg="green.600"
                          >
                            <Icon
                              cursor="pointer"
                              onClick={() => ActiveDriver(row.id)}
                              as={UnlockIcon}
                              w={8}
                              h={8}
                              pos="relative"
                              ml="1rem"
                              top="0.3rem"
                              color="black.500"
                            />
                          </Tooltip>
                        </>
                      )}
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
          <ModalContent>
            <ModalHeader>Editar Conductor</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Formik
                initialValues={{
                  id: driverInfo[0].id,
                  idVan: driverInfo[0].van_id,
                  rutDriver: driverInfo[0].rutDriver,
                  name: driverInfo[0].nameDriver,
                  enterprise: driverInfo[0].enterprise,
                  car: driverInfo[0].brand_model,
                  code: driverInfo[0].unique_code,
                  email: driverInfo[0].email,
                }}
                onSubmit={(values) => handleUpdateDriver(values)}
              >
                {(props) => (
                  <Form noValidate="novalidate">
                    <Field name="rutDriver">
                      {({ field }) => (
                        <FormControl mt={3} isRequired>
                          <FormLabel>Rut</FormLabel>
                          <Input {...field} readOnly={true} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="name" validate={validateNameUpdate}>
                      {({ field, form }) => (
                        <FormControl
                          mt={3}
                          isRequired
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Nombres y Apellidos</FormLabel>
                          <Input {...field} placeholder="Nombres" />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="enterprise" validate={validateEnterprise}>
                      {({ field, form }) => (
                        <FormControl
                          mt={3}
                          isRequired
                          isInvalid={
                            form.errors.enterprise && form.touched.enterprise
                          }
                        >
                          <FormLabel>Empresa de Contrato</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.enterprise}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="car" validate={validateCar}>
                      {({ field, form }) => (
                        <FormControl
                          mt={3}
                          isRequired
                          isInvalid={form.errors.car && form.touched.car}
                        >
                          <FormLabel>Marca y Modelo de Furgón</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>{form.errors.car}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="code" validate={validateCode}>
                      {({ field, form }) => (
                        <FormControl
                          mt={3}
                          isRequired
                          isInvalid={form.errors.code && form.touched.code}
                        >
                          <FormLabel>Número de Patente</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.code}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field }) => (
                        <FormControl mt={3}>
                          <FormLabel>Correo (Opcional):</FormLabel>
                          <Input type="email" {...field} />
                        </FormControl>
                      )}
                    </Field>
                    {alertSuccessUpdate && (
                      <SlideFade startingHeight={1} in={show}>
                        <Box my={4}>
                          <Alert
                            status="success"
                            variant="solid"
                            borderRadius={4}
                          >
                            <AlertIcon />
                            Información Actualizada!
                          </Alert>
                        </Box>
                      </SlideFade>
                    )}
                    {alertErrorUpdate && (
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
                    <ModalFooter>
                      <Button
                        mt={4}
                        colorScheme="whatsapp"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Guardar Cambios
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
      {modalDelete ? (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <form onSubmit={(e) => checkCodeVerification(e, false)}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Deshabilitar cuenta
                </AlertDialogHeader>
                <AlertDialogBody>
                  Si está seguro de esta acción debe colocar el código de
                  validación de 4 dígitos.
                  <br></br>
                  <strong>
                    Nota: Esta acción también dejará sin conductor a los
                    estudiantes que tenía asignado éste.
                  </strong>
                  <br></br>
                  <br></br>
                  Enviar código vía SMS (mensaje de texto)
                  <IconButton
                    onClick={() => sendCodeVerification()}
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Send email"
                    icon={<EmailIcon />}
                  />
                </AlertDialogBody>
                <Center>
                  <HStack>
                    <PinInput type="alphanumeric">
                      <PinInputField
                        onChange={(e) => setPin1(e.target.value)}
                      />
                      <PinInputField
                        onChange={(e) => setPin2(e.target.value)}
                      />
                      <PinInputField
                        onChange={(e) => setPin3(e.target.value)}
                      />
                      <PinInputField
                        onChange={(e) => setPin4(e.target.value)}
                      />
                    </PinInput>
                  </HStack>
                </Center>
                <SlideFade startingHeight={1} in={successPin}>
                  <Box my={4}>
                    <Alert status="success" variant="solid" borderRadius={4}>
                      <AlertIcon />
                      {messageSuccess}
                    </Alert>
                  </Box>
                </SlideFade>
                <SlideFade startingHeight={1} in={errorPin}>
                  <Box my={4}>
                    <Alert status="error" variant="solid" borderRadius={4}>
                      <AlertIcon />
                      ¡El pin ingresado es incorrecto, intente nuevamente!
                    </Alert>
                  </Box>
                </SlideFade>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="submit" colorScheme="red" ml={3}>
                    Eliminar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </form>
        </AlertDialog>
      ) : modalAllow ? (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <form onSubmit={(e) => checkCodeVerification(e, true)}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Habilitar cuenta
                </AlertDialogHeader>
                <AlertDialogBody>
                  Si está seguro de esta acción debe colocar el código de
                  validación de 4 dígitos.
                  <br></br>
                  <strong>
                    Nota: Esta acción habilitará la cuenta del conductor.
                  </strong>
                  <br></br>
                  <br></br>
                  Enviar código vía SMS (mensaje de texto)
                  <IconButton
                    onClick={() => sendCodeVerification()}
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Send email"
                    icon={<EmailIcon />}
                  />
                </AlertDialogBody>
                <Center>
                  <HStack>
                    <PinInput type="alphanumeric">
                      <PinInputField
                        onChange={(e) => setPin1(e.target.value)}
                      />
                      <PinInputField
                        onChange={(e) => setPin2(e.target.value)}
                      />
                      <PinInputField
                        onChange={(e) => setPin3(e.target.value)}
                      />
                      <PinInputField
                        onChange={(e) => setPin4(e.target.value)}
                      />
                    </PinInput>
                  </HStack>
                </Center>
                <SlideFade startingHeight={1} in={successPin}>
                  <Box my={4}>
                    <Alert status="success" variant="solid" borderRadius={4}>
                      <AlertIcon />
                      {messageSuccess}
                    </Alert>
                  </Box>
                </SlideFade>
                <SlideFade startingHeight={1} in={errorPin}>
                  <Box my={4}>
                    <Alert status="error" variant="solid" borderRadius={4}>
                      <AlertIcon />
                      ¡El pin ingresado es incorrecto, intente nuevamente!
                    </Alert>
                  </Box>
                </SlideFade>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="submit" colorScheme="green" ml={3}>
                    Habilitar cuenta
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </form>
        </AlertDialog>
      ) : null}
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
