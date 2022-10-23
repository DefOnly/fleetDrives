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
} from "@chakra-ui/react";
import { useState, useCallback } from "react";
// import TablesTableRow from "components/card/";
import { useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { FaUser, FaAsterisk, FaCheckCircle } from "react-icons/fa";
import { useRut } from "react-rut-formatter";
import axios from "axios";

const TableDrivers = ({ drivers }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [driversUpdate, setDriversUpdate] = useState(drivers);
  const { rut, updateRut, isValid } = useRut();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [rutError, setRutError] = useState(false);
  const [modalDriver, setModalDriver] = useState(false);
  const [modalUpdateDriver, setModalUpdateDriver] = useState(false);
  const endPoint = "http://localhost:8000/api";
  const initialValues = {
    rut: "",
    name: "",
    lastNameP: "",
    lastNameM: "",
    enterprise: "",
    car: "",
    code: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isErrorName = formValues.name === "";
  const isErrorLastNameP = formValues.lastNameP === "";
  const isErrorLastNameM = formValues.lastNameM === "";
  const isErrorEnterprise = formValues.enterprise === "";
  const isErrorCar = formValues.car === "";
  const isErrorCode = formValues.code === "";
  let countDrivers = 1;

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
      UpdateStateDrivers(resultDrivers);
    }
  };

  const UpdateStateDrivers = useCallback(
    (driversUpdate) => {
      setDriversUpdate(driversUpdate);
      setSuccess(true);
      setRutError(false);
      setError(false);
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
    },
    [onClose, updateRut]
  );

  const checkDuplicateRut = (users, rut) => {
    let response = users.filter(
      (user) => user.rut === rut || user.rutDriver === rut
    );
    return response;
  };

  const showModalAddDriver = () => {
    setModalDriver(true);
    setModalUpdateDriver(false);
    onOpen();
  };
  const modalEditDriver = () => {
    setModalUpdateDriver(true);
    setModalDriver(false);
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
                <FormControl mt={4} isInvalid={isErrorEnterprise}>
                  <FormLabel>Empresad de Contrato</FormLabel>
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
                    left="10.3rem"
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
                  <FormLabel>Dirección</FormLabel>
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
                    bottom="5.2rem"
                    left="4.4rem"
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
              <Flex>Opciones</Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {drivers.map((row) => {
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
                <Td>{countDrivers++}</Td>
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
                  <Button onClick={() => modalEditDriver()} variant="brand">
                    Editar
                  </Button>
                  <Button background="#E53E3E" color="white" hover="#e53e3e8c">
                    Eliminar Cuenta
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
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
              <FormControl>
                <FormLabel>Rut</FormLabel>
                <Input ref={initialRef} placeholder="Rut" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Nombres y Apellidos</FormLabel>
                <Input placeholder="Nombres y Apellidos" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Empresa de Contrato</FormLabel>
                <Input placeholder="" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Modelo de Auto</FormLabel>
                <Input placeholder="" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Patente</FormLabel>
                <Input placeholder="" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Correo (Opcional):</FormLabel>
                <Input placeholder="ejemplo@gmail.com" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Guardar cambios
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
