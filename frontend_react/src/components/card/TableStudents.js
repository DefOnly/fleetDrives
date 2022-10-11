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
  FormHelperText,
  useToast,
  SlideFade,
  Box,
  Alert,
  AlertIcon,
  Stack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  HStack,
  PinInput,
  PinInputField,
  Center,
} from "@chakra-ui/react";
// import TablesTableRow from "components/card/";
import { useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { FaUserGraduate, FaCheck } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ToastUpdate from "./ToastUpdate";

const TableStudents = ({ students, course }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const cancelRef = React.useRef();
  const endPoint = "http://localhost:8000/api";
  const [studentInfo, setStudentInfo] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [currentDriver, setCurrentDriver] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [modalDriver, setModalDriver] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let count = 1;
  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);

  const [inputRut, setInputRut] = useState("");
  const handleInputChangeRut = (e) => setInputRut(e.target.value);
  const isErrorRut = inputRut === "";

  const [inputName, setInputName] = useState("");
  const handleInputChangeName = (e) => setInputName(e.target.value);
  const isErrorName = inputName === "";

  const [inputLastNameP, setInputLastNameP] = useState("");
  const handleInputChangeLastNameP = (e) => setInputLastNameP(e.target.value);
  const isErrorLastNameP = inputLastNameP === "";

  const [inputLastNameM, setInputLastNameM] = useState("");
  const handleInputChangeLastNameM = (e) => setInputLastNameM(e.target.value);
  const isErrorLastNameM = inputLastNameM === "";

  const [inputZone, setInputZone] = useState("");
  const handleInputZone = (e) => setInputZone(e.target.value);
  const isErrorZone = inputZone === "";

  const [inputAddress, setInputAddress] = useState("");
  const handleInputChangeAddress = (e) => setInputAddress(e.target.value);
  const isErrorAddress = inputAddress === "";

  const [inputNameAgent, setInputNameAgent] = useState("");
  const handleInputChangeNameAgent = (e) => setInputNameAgent(e.target.value);
  const isErrorNameAgent = inputNameAgent === "";

  const [inputPhone, setInputPhone] = useState("");
  const handleInputChangePhone = (e) => setInputPhone(e.target.value);
  const isErrorPhone = inputPhone === "";

  const [inputEmailAgent, setInputEmailAgent] = useState("");
  const handleInputChangeEmailAgent = (e) => setInputEmailAgent(e.target.value);
  const isErrorEmailAgent = inputEmailAgent === "";

  // useEffect(() => {
  //   return () => setSuccess(false);
  // }, [success])

  const getInfoStudent = async (event, param) => {
    const response = await axios.get(`${endPoint}/studentInfo/${param}/`);
    setSuccess(false);
    setShow(false);
    setStudentInfo(response.data);
    setIsShown(true);
    setModalDriver(false);
    setModalDelete(false);
    setInput(response.data);
    onOpen();
  };

  const getAllDrivers = async (event, idDriver) => {
    const response = await axios.get(`${endPoint}/drivers/`);
    setDrivers(response.data);
    setCurrentDriver(idDriver);
    setModalDriver(true);
    setIsShown(false);
    setModalDelete(false);
    onOpen();
  };

  const deleteStudent = async (event, idStudent) => {
    // const response = await axios.get(`${endPoint}/drivers/`);
    // setDrivers(response.data);
    // setCurrentDriver(idDriver);
    setModalDelete(true);
    setIsShown(false);
    setModalDriver(false);
    onOpen();
  };

  const handleEdit = async (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let resultArray = [];
    for (let [key, value] of formData.entries()) {
      resultArray.push(value);
    }
    const response = await axios
      .put(`${endPoint}/updateStudent/${resultArray[0]}`, {
        rut: resultArray[1],
        name: resultArray[2],
        lastNameP: resultArray[3],
        lastNameM: resultArray[4],
        zone: resultArray[5],
        address: resultArray[6],
        province: resultArray[7],
        gender: resultArray[8],
        email: resultArray[9],
        idLevel: resultArray[10],
        idAgent: resultArray[11],
        nameAgent: resultArray[12],
        phone: resultArray[13],
        emailAgent: resultArray[14],
      })
      .then((response) => {
        // onClose();
        setSuccess(true);
        setShow(true);
      });
  };

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {course}
        </Text>
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
              <Flex>Conductor Asignado</Flex>
            </Th>
            <Th>
              <Flex>Opciones</Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((row) => {
            return (
              <Tr key={row.id}>
                <Td>
                  <Icon
                    mt="8px"
                    as={FaUserGraduate}
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
                  {row.rut}
                </Td>
                <Td
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor="transparent"
                >
                  {row.name} {row.lastNameP} {row.lastNameM}
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
                  <Button
                    onClick={(event) => getInfoStudent(event, row.rut)}
                    variant="brand"
                  >
                    Editar
                  </Button>
                  {row.nameDriver === "No tiene furgón asignado" ? (
                    <Button
                      background="#9AE6B4"
                      color="white"
                      hover="#9ae6b469"
                      onClick={(event) => getAllDrivers(event, 6)}
                      variant="brand"
                    >
                      Asignar conductor
                    </Button>
                  ) : (
                    <Button
                      background="#9AE6B4"
                      color="white"
                      hover="#9ae6b469"
                      onClick={(event) => getAllDrivers(event, row.id_driver)}
                      variant="brand"
                    >
                      Reasignar conductor
                    </Button>
                  )}
                  <Button
                    background="#E53E3E"
                    color="white"
                    hover="#e53e3e8c"
                    onClick={(event) => deleteStudent(event, row.id)}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* Editar Estudiante */}
      {isShown && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <form onSubmit={handleEdit}>
            <ModalContent>
              <ModalHeader>Editar Estudiante</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isInvalid={isErrorRut}>
                  <FormLabel>Rut</FormLabel>
                  <Input
                    id="id"
                    name="id"
                    type="hidden"
                    defaultValue={studentInfo[0].id}
                  />
                  <Input
                    type="text"
                    id="rut"
                    name="rut"
                    // ref={initialRef}
                    defaultValue={studentInfo[0].rut}
                    placeholder="Rut"
                    onChange={handleInputChangeRut}
                  />
                  {!isErrorRut ? (
                    <Icon
                      ml="23.5rem"
                      pos="relative"
                      bottom="1.9rem"
                      as={FaCheck}
                      w="1rem"
                      h="1rem"
                      fontWeight="2000"
                      color="green"
                    />
                  ) : (
                    <FormErrorMessage>¡El Rut es requerido!</FormErrorMessage>
                  )}
                  {/* {isError && <FormErrorMessage></FormErrorMessage>} */}
                </FormControl>
                <FormControl mt={4} isInvalid={isErrorName}>
                  <FormLabel>Nombres</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombres"
                    defaultValue={studentInfo[0].name}
                    onChange={handleInputChangeName}
                  />
                  {!isErrorName ? (
                    <Icon
                      ml="23.5rem"
                      pos="relative"
                      bottom="1.9rem"
                      as={FaCheck}
                      w="1rem"
                      h="1rem"
                      fontWeight="2000"
                      color="green"
                    />
                  ) : (
                    <FormErrorMessage>
                      ¡Los nombres son requeridos!
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
                    defaultValue={studentInfo[0].lastNameP}
                    onChange={handleInputChangeLastNameP}
                  />
                  {!isErrorLastNameP ? (
                    <Icon
                      ml="23.5rem"
                      pos="relative"
                      bottom="1.9rem"
                      as={FaCheck}
                      w="1rem"
                      h="1rem"
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
                    defaultValue={studentInfo[0].lastNameM}
                    onChange={handleInputChangeLastNameM}
                  />
                  {!isErrorLastNameM ? (
                    <Icon
                      ml="23.5rem"
                      pos="relative"
                      bottom="1.9rem"
                      as={FaCheck}
                      w="1rem"
                      h="1rem"
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
                    id="sector"
                    name="sector"
                    placeholder=""
                    defaultValue={studentInfo[0].zone}
                    onChange={handleInputZone}
                  />
                  {!isErrorZone ? (
                    <Icon
                      ml="23.5rem"
                      pos="relative"
                      bottom="1.9rem"
                      as={FaCheck}
                      w="1rem"
                      h="1rem"
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
                    defaultValue={studentInfo[0].address}
                    onChange={handleInputChangeAddress}
                  />
                  {!isErrorAddress ? (
                    <Icon
                      ml="23.5rem"
                      pos="relative"
                      bottom="1.9rem"
                      as={FaCheck}
                      w="1rem"
                      h="1rem"
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
                    {studentInfo[0].id_province === 1 ? (
                      <option selected value="1">
                        Lago Ranco
                      </option>
                    ) : (
                      <option value="1">Lago Ranco</option>
                    )}

                    {studentInfo[0].id_province === 2 ? (
                      <option selected value="2">
                        Río Bueno
                      </option>
                    ) : (
                      <option value="2">Río Bueno</option>
                    )}

                    {studentInfo[0].id_province === 3 ? (
                      <option selected value="3">
                        Futrono
                      </option>
                    ) : (
                      <option value="3">Futrono</option>
                    )}

                    {studentInfo[0].id_province === 4 ? (
                      <option selected value="4">
                        Panguipulli
                      </option>
                    ) : (
                      <option value="4">Panguipulli</option>
                    )}

                    {studentInfo[0].id_province === 5 ? (
                      <option selected value="5">
                        La Unión
                      </option>
                    ) : (
                      <option value="5">La Unión</option>
                    )}

                    {studentInfo[0].id_province === 6 ? (
                      <option selected value="6">
                        Paillaco
                      </option>
                    ) : (
                      <option value="6">Paillaco</option>
                    )}

                    {studentInfo[0].id_province === 7 ? (
                      <option selected value="7">
                        Los Lagos
                      </option>
                    ) : (
                      <option value="7">Los Lagos</option>
                    )}

                    {studentInfo[0].id_province === 8 ? (
                      <option selected value="8">
                        Corral
                      </option>
                    ) : (
                      <option value="8">Corral</option>
                    )}

                    {studentInfo[0].id_province === 9 ? (
                      <option selected value="9">
                        Valdivia
                      </option>
                    ) : (
                      <option value="9">Valdivia</option>
                    )}

                    {studentInfo[0].id_province === 10 ? (
                      <option selected value="10">
                        Máfil
                      </option>
                    ) : (
                      <option value="10">Máfil</option>
                    )}

                    {studentInfo[0].id_province === 11 ? (
                      <option selected value="11">
                        Mariquina
                      </option>
                    ) : (
                      <option value="11">Mariquina</option>
                    )}

                    {studentInfo[0].id_province === 12 ? (
                      <option selected value="12">
                        Lanco
                      </option>
                    ) : (
                      <option value="12">Lanco</option>
                    )}
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Sexo</FormLabel>
                  {studentInfo[0].gender === "M" && (
                    <Select
                      id="gender"
                      name="gender"
                      onChange={handleInputChange}
                    >
                      <option selected value="M">
                        Masculino
                      </option>
                      <option value="F">Femenino</option>
                    </Select>
                  )}
                  {studentInfo[0].gender === "F" && (
                    <Select
                      id="gender"
                      name="gender"
                      onChange={handleInputChange}
                    >
                      <option value="M">Masculino</option>
                      <option selected value="F">
                        Femenino
                      </option>
                    </Select>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Correo (Opcional):</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@gmail.com"
                    defaultValue={studentInfo[0].email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Nivel</FormLabel>
                  <Select
                    id="level"
                    name="level"
                    placeholder="Seleccione nivel"
                    onChange={handleInputChange}
                  >
                    {studentInfo[0].id_level === 1 ? (
                      <option selected value="1">
                        Prekinder
                      </option>
                    ) : (
                      <option value="1">Prekinder</option>
                    )}

                    {studentInfo[0].id_level === 2 ? (
                      <option selected value="2">
                        Kinder
                      </option>
                    ) : (
                      <option value="2">Kinder</option>
                    )}

                    {studentInfo[0].id_level === 3 ? (
                      <option selected value="3">
                        Primero Básico
                      </option>
                    ) : (
                      <option value="3">Primero Básico</option>
                    )}

                    {studentInfo[0].id_level === 4 ? (
                      <option selected value="4">
                        Segundo Básico
                      </option>
                    ) : (
                      <option value="4">Segundo Básico</option>
                    )}

                    {studentInfo[0].id_level === 5 ? (
                      <option selected value="5">
                        Tercero Básico
                      </option>
                    ) : (
                      <option value="5">Tercero Básico</option>
                    )}

                    {studentInfo[0].id_level === 6 ? (
                      <option selected value="6">
                        Cuarto Básico
                      </option>
                    ) : (
                      <option value="6">Cuarto Básico</option>
                    )}

                    {studentInfo[0].id_level === 7 ? (
                      <option selected value="7">
                        Quinto Básico
                      </option>
                    ) : (
                      <option value="7">Quinto Básico</option>
                    )}

                    {studentInfo[0].id_level === 8 ? (
                      <option selected value="8">
                        Sexto Básico
                      </option>
                    ) : (
                      <option value="8">Sexto Básico</option>
                    )}

                    {studentInfo[0].id_level === 9 ? (
                      <option selected value="9">
                        Séptimo Básico
                      </option>
                    ) : (
                      <option value="9">Séptimo Básico</option>
                    )}

                    {studentInfo[0].id_level === 10 ? (
                      <option selected value="10">
                        Octavo Básico
                      </option>
                    ) : (
                      <option value="10">Octavo Básico</option>
                    )}
                  </Select>
                </FormControl>
                <ModalHeader>Datos del Apoderado</ModalHeader>
                <FormControl isInvalid={isErrorNameAgent}>
                  <FormLabel>Apoderado</FormLabel>
                  <Input
                    id="idAgent"
                    name="idAgent"
                    type="hidden"
                    defaultValue={studentInfo[0].id_agent}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    id="name_agent"
                    name="name_agent"
                    defaultValue={studentInfo[0].nameAgent}
                    onChange={handleInputChangeNameAgent}
                  />
                  {!isErrorNameAgent ? (
                    <Icon
                      ml="23.5rem"
                      pos="relative"
                      bottom="1.9rem"
                      as={FaCheck}
                      w="1rem"
                      h="1rem"
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
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    defaultValue={studentInfo[0].phone}
                    onChange={handleInputChangePhone}
                  />
                  {!isErrorPhone ? (
                    <Icon
                      ml="23.5rem"
                      pos="relative"
                      bottom="1.9rem"
                      as={FaCheck}
                      w="1rem"
                      h="1rem"
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
                    defaultValue={studentInfo[0].email_agent}
                    onChange={handleInputChangeEmailAgent}
                  />
                  {!isErrorEmailAgent ? (
                    <Icon
                      ml="23.5rem"
                      pos="relative"
                      bottom="1.9rem"
                      as={FaCheck}
                      w="1rem"
                      h="1rem"
                      fontWeight="2000"
                      color="green"
                    />
                  ) : (
                    <FormErrorMessage>
                      ¡El correo del apoderado es requerido!
                    </FormErrorMessage>
                  )}
                </FormControl>
              </ModalBody>
              {success && (
                <SlideFade startingHeight={1} in={show}>
                  <Box my={4}>
                    <Alert status="success" variant="solid" borderRadius={4}>
                      <AlertIcon />
                      ¡Información actualizada!
                    </Alert>
                  </Box>
                </SlideFade>
              )}
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Guardar cambios
                </Button>
                <Button onClick={onClose}>Cerrar</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      )}
      {/* Modal asignar conductor */}
      {modalDriver && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            {currentDriver === 6 ? (
              <ModalHeader>Asignar conductor</ModalHeader>
            ) : (
              <ModalHeader>Reasignar conductor</ModalHeader>
            )}
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Stack spacing={3}>
                  <Select variant="filled">
                    {drivers.map((driver) =>
                      currentDriver === driver.id ? (
                        <option selected key={driver.id} value="">
                          {driver.nameDriver +
                            " " +
                            driver.lastNameDP +
                            " " +
                            driver.lastNameDM}
                        </option>
                      ) : (
                        <option key={driver.id} value="">
                          {driver.nameDriver +
                            " " +
                            driver.lastNameDP +
                            " " +
                            driver.lastNameDM}
                        </option>
                      )
                    )}
                  </Select>
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Guardar cambios
              </Button>
              <Button onClick={onClose}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {/* Modal eliminar estudiante */}
      {modalDelete && (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Eliminar Estudiante
              </AlertDialogHeader>

              <AlertDialogBody>
                Si está seguro de esta acción debe colocar la clave de
                confirmación de 4 dígitos.
                <br></br> 
                <strong>Nota: Esta acción borrará todos los registros
                asociados al estudiante y es irreversible.</strong> 
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

export default TableStudents;
