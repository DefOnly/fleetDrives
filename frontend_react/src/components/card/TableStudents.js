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
  Tooltip,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputLeftAddon,
  InputGroup,
  Badge,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
// import TablesTableRow from "components/card/";
import { useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { FaUserGraduate, FaCheckCircle, FaAsterisk } from "react-icons/fa";
import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useAsyncDebounce,
} from "react-table";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import AuthUser from "views/auth/signIn/AuthUser";

const TableStudents = ({ dataStudents, drivers, course, columns }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const cancelRef = React.useRef();
  const endPoint = "http://localhost:8000/api";
  const [studentInfo, setStudentInfo] = useState([]);
  const [studentId, setStudentID] = useState([]);
  const [showStudents, setShowStudents] = useState([]);
  // const [drivers, setDrivers] = useState([]);
  const [currentDriver, setCurrentDriver] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  // const [modalDriver, setModalDriver] = useState(false);
  const [modalAllow, setModalAllow] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let countStudents = 1;
  const [pin1, setPin1] = useState([]);
  const [pin2, setPin2] = useState([]);
  const [pin3, setPin3] = useState([]);
  const [pin4, setPin4] = useState([]);
  const [pinGenerate, setPinGenerate] = useState([]);
  const { getUser } = AuthUser();
  const [successPin, setSuccessPin] = useState(false);
  const [errorPin, setErrorPin] = useState(false);
  const [idStudent, setIdStudent] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [codeSended, setCodeSended] = useState(false);
  // const [input, setInput] = useState("");
  // const handleInputChange = (e) => setInput(e.target.value);

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
    idDriver: "",
    id_agent: "",
    nameAgent: "",
    phone: "",
    email_agent: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [changeDriver, setChangeDriver] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();
  const [state, setState] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [warningDriver, setWarningDriver] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isErrorRut = formValues.rut === "";
  const isErrorName = formValues.name === "";
  const isErrorLastNameP = formValues.lastNameP === "";
  const isErrorLastNameM = formValues.lastNameM === "";
  const isErrorZone = formValues.zone === "";
  const isErrorAddress = formValues.address === "";
  const isErrorNameAgent = formValues.nameAgent === "";
  const isErrorPhone = formValues.phone === "";
  const isErrorEmailAgent = formValues.email_agent === "";

  const getInfoStudent = async (event, param) => {
    const response = await axios.get(`${endPoint}/studentInfo/${param}/`);
    setSuccess(false);
    setShow(false);
    setStudentInfo(response.data);
    setCurrentDriver(response.data[0].id_driver);
    setIsShown(true);
    setModalAllow(false);
    setModalDelete(false);
    setFormValues(response.data);
    onOpen();
  };

  // const getAllDrivers = async () => {
  //   const response =
  //     // setStudentID(idStudent);
  //     setDrivers(response.data);
  //   // setCurrentDriver(idDriver);
  //   // setModalDriver(true);
  //   // setIsShown(false);
  //   // setModalDelete(false);
  //   // onOpen();
  // };

  // useEffect(() => {
  //   let isMounted = true;
  //   async function getAllDrivers() {
  //     const response = await axios.get(`${endPoint}/drivers/`);
  //     if (isMounted) {
  //       setState(response);
  //       setDrivers(response.data);
  //     }
  //   }
  //   getAllDrivers();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // useEffect(() => {
  //   getAllDrivers();
  //   // return () => {
  //   //   second
  //   // }
  // }, [drivers])

  const AllowStudent = (idStudent) => {
    setIdStudent(idStudent);
    setModalAllow(true);
    setModalDelete(false);
    setCodeSended(false);
    setIsShown(false);
    onOpen();
  };

  const deleteStudent = (idStudent) => {
    setIdStudent(idStudent);
    setModalDelete(true);
    setModalAllow(false);
    setCodeSended(false);
    setIsShown(false);
    onOpen();
  };

  const handleEdit = async (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let resultArray = [];
    for (let [key, value] of formData.entries()) {
      resultArray.push(value);
    }
    let phone = resultArray[14];
    if (phone.length > 9 || phone.length < 9) {
      setPhoneError(true);
      setError(false);
      setSuccess(false);
      setShow(true);
    } else if (
      resultArray[1] !== "" &&
      resultArray[2] !== "" &&
      resultArray[3] !== "" &&
      resultArray[4] !== "" &&
      resultArray[5] !== "" &&
      resultArray[6] !== "" &&
      resultArray[12] !== "" &&
      resultArray[11] !== "0" &&
      resultArray[13] !== "" &&
      resultArray[14] !== "" &&
      resultArray[15] !== ""
    ) {
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
          idDriver: resultArray[11],
          idAgent: resultArray[12],
          nameAgent: resultArray[13],
          phone: resultArray[14],
          emailAgent: resultArray[15],
        })
        .then(async (response) => {
          const showUpdateStudents = await axios.get(
            `${endPoint}/students/${course}/`
          );
          let students = showUpdateStudents.data;
          UpdateStateStudents(students);
        });
    } else {
      setError(true);
      setSuccess(false);
      setPhoneError(false);
      setShow(true);
    }
  };

  const handleChangeDriver = async (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let resultArray = [];
    for (let [key, value] of formData.entries()) {
      resultArray.push(value);
    }
    await axios.put(`${endPoint}/changeDriver/`, {
      idStudent: resultArray[0],
      idDriver: resultArray[1],
    });
    // const showUpdateStudents = await axios.get(
    //   `${endPoint}/students/${course}/`
    // );
    // let students = showUpdateStudents.data;
    // UpdateStateStudents(students, id_level);
  };

  const UpdateStateStudents = useCallback(
    (students) => {
      let arrayStudents = [];
      let arrayDrivers = [];
      let result = students;
      result.map((row) => {
        arrayStudents.push(
          row.name + " " + row.lastNameM + " " + row.lastNameM
        );
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
      setShowStudents(allNames);
      setSuccess(true);
      setPhoneError(false);
      setError(false);
      setShow(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, "2000");
    },
    [onClose]
  );

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        Header: "Estado",
        Cell: ({ row }) => (
          <>
            <Stack direction="row">
              {row.values.status === 1 ? (
                <Badge colorScheme="green">Activo</Badge>
              ) : (
                <div
                  style={{
                    float: "left",
                    display: "grid",
                    gap: "0.5rem",
                    justifyItems: "center",
                    width: "10rem",
                  }}
                >
                  <Badge colorScheme="red">Inactivo</Badge>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => AllowStudent(row.values.id)}
                  >
                    Habilitar estudiante
                  </Button>
                </div>
              )}
            </Stack>
          </>
        ),
      },
      {
        id: "options",
        Header: "Opciones",
        Cell: ({ row }) => (
          <>
            {row.values.status === 1 ? (
              <>
                <Button
                  onClick={(event) => getInfoStudent(event, row.values.id)}
                  variant="brand"
                >
                  Editar
                </Button>
                <Button
                  background="#E53E3E"
                  color="white"
                  hover="#e53e3e8c"
                  onClick={() => deleteStudent(row.values.id)}
                >
                  Eliminar
                </Button>
              </>
            ) : (
              <>
                <Button disabled variant="brand">
                  Editar
                </Button>
                <Button
                  background="#E53E3E"
                  color="white"
                  hover="#e53e3e8c"
                  disabled
                >
                  Eliminar
                </Button>
              </>
            )}
          </>
        ),
      },
    ]);
  };

  const initialState = { hiddenColumns: ["id_driver", "status"] };

  const tableInstance = useTable(
    {
      columns: columns,
      data: showStudents.length === 0 ? dataStudents : showStudents,
      initialState: initialState,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy,
    usePagination
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const { isOpen: isVisible } = useDisclosure({ defaultIsOpen: false });

  const sendCodeVerification = async () => {
    setCodeSended(true);
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
            idUser: idStudent,
            action: 0,
          })
          .then(async (response) => {
            const showUpdateStudents = await axios.get(
              `${endPoint}/students/${course}/`
            );
            let students = showUpdateStudents.data;
            UpdateStateStudents(students);
          });
        setMessageSuccess("¡Estudiante Eliminado!");
      } else {
        const response = await axios
          .put(`${endPoint}/updateStatusUser/`, {
            idUser: idStudent,
            action: 1,
          })
          .then(async (response) => {
            const showUpdateStudents = await axios.get(
              `${endPoint}/students/${course}/`
            );
            let students = showUpdateStudents.data;
            UpdateStateStudents(students);
          });
        setMessageSuccess("¡Estudiante Habilitado!");
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
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {course}
        </Text>
        {/* <Menu /> */}
      </Flex>
      {/* <Table variant="simple" color="gray.500" mb="24px">
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
                    onClick={(event) => getInfoStudent(event, row.id)}
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
      </Table> */}
      <Box>
        <p>Buscar:</p>
        <Input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} registros...`}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Search database"
          icon={<SearchIcon />}
          p="relative"
          ml="-2.7rem"
          mb="0.1rem"
          w="1rem"
          h="2.3rem"
        />
      </Box>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <>
                <Icon
                  mt="8px"
                  as={FaUserGraduate}
                  w="1.5rem"
                  h="1.5rem"
                  fontWeight="2000"
                  color="black"
                />
                <Tr key={row.values.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="Primera Página">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Página Anterior">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Página{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{" "}
            de{" "}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">Ir a la página:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize} estudiantes
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Siguiente Página">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Última Página">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
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
                    readOnly={true}
                    // ref={initialRef}
                    defaultValue={studentInfo[0].rut}
                    placeholder="Rut"
                    onChange={handleInputChange}
                  />
                  <Icon
                    as={FaAsterisk}
                    color="red"
                    w="0.7rem"
                    h="0.7rem"
                    pos="absolute"
                    bottom="5.2rem"
                    left="1.7rem"
                  />
                  {!isErrorRut ? (
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
                    <FormErrorMessage>¡El rut es requerido!</FormErrorMessage>
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
                    defaultValue={studentInfo[0].lastNameP}
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
                    defaultValue={studentInfo[0].lastNameM}
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
                    defaultValue={studentInfo[0].zone}
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
                    defaultValue={studentInfo[0].address}
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
                    variant="filled"
                    id="comuna"
                    name="comuna"
                    onChange={handleInputChange}
                  >
                    {studentInfo[0].id_province === 1 ? (
                      <option selected value={1}>
                        Lago Ranco
                      </option>
                    ) : (
                      <option value={1}>Lago Ranco</option>
                    )}

                    {studentInfo[0].id_province === 2 ? (
                      <option selected value={2}>
                        Río Bueno
                      </option>
                    ) : (
                      <option value={2}>Río Bueno</option>
                    )}

                    {studentInfo[0].id_province === 3 ? (
                      <option selected value={3}>
                        Futrono
                      </option>
                    ) : (
                      <option value={3}>Futrono</option>
                    )}

                    {studentInfo[0].id_province === 4 ? (
                      <option selected value={4}>
                        Panguipulli
                      </option>
                    ) : (
                      <option value={4}>Panguipulli</option>
                    )}

                    {studentInfo[0].id_province === 5 ? (
                      <option selected value={5}>
                        La Unión
                      </option>
                    ) : (
                      <option value={5}>La Unión</option>
                    )}

                    {studentInfo[0].id_province === 6 ? (
                      <option selected value={6}>
                        Paillaco
                      </option>
                    ) : (
                      <option value={6}>Paillaco</option>
                    )}

                    {studentInfo[0].id_province === 7 ? (
                      <option selected value={7}>
                        Los Lagos
                      </option>
                    ) : (
                      <option value={7}>Los Lagos</option>
                    )}

                    {studentInfo[0].id_province === 8 ? (
                      <option selected value={8}>
                        Corral
                      </option>
                    ) : (
                      <option value={8}>Corral</option>
                    )}

                    {studentInfo[0].id_province === 9 ? (
                      <option selected value={9}>
                        Valdivia
                      </option>
                    ) : (
                      <option value={9}>Valdivia</option>
                    )}

                    {studentInfo[0].id_province === 10 ? (
                      <option selected value={10}>
                        Máfil
                      </option>
                    ) : (
                      <option value={10}>Máfil</option>
                    )}

                    {studentInfo[0].id_province === 11 ? (
                      <option selected value={11}>
                        Mariquina
                      </option>
                    ) : (
                      <option value={11}>Mariquina</option>
                    )}

                    {studentInfo[0].id_province === 12 ? (
                      <option selected value={12}>
                        Lanco
                      </option>
                    ) : (
                      <option value={12}>Lanco</option>
                    )}
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Sexo</FormLabel>
                  {studentInfo[0].gender === "M" && (
                    <Select
                      variant="filled"
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
                      variant="filled"
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
                    defaultValue={(formValues.email = studentInfo[0].email)}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Nivel</FormLabel>
                  <Select
                    variant="filled"
                    id="level"
                    name="level"
                    // placeholder="Seleccione nivel"
                    onChange={handleInputChange}
                  >
                    {studentInfo[0].id_level === 1 ? (
                      <option selected value={1}>
                        Prekinder
                      </option>
                    ) : (
                      <option value={1}>Prekinder</option>
                    )}

                    {studentInfo[0].id_level === 2 ? (
                      <option selected value={2}>
                        Kinder
                      </option>
                    ) : (
                      <option value={2}>Kinder</option>
                    )}

                    {studentInfo[0].id_level === 3 ? (
                      <option selected value={3}>
                        Primero Básico
                      </option>
                    ) : (
                      <option value={3}>Primero Básico</option>
                    )}

                    {studentInfo[0].id_level === 4 ? (
                      <option selected value={4}>
                        Segundo Básico
                      </option>
                    ) : (
                      <option value={4}>Segundo Básico</option>
                    )}

                    {studentInfo[0].id_level === 5 ? (
                      <option selected value={5}>
                        Tercero Básico
                      </option>
                    ) : (
                      <option value={5}>Tercero Básico</option>
                    )}

                    {studentInfo[0].id_level === 6 ? (
                      <option selected value={6}>
                        Cuarto Básico
                      </option>
                    ) : (
                      <option value={6}>Cuarto Básico</option>
                    )}

                    {studentInfo[0].id_level === 7 ? (
                      <option selected value={7}>
                        Quinto Básico
                      </option>
                    ) : (
                      <option value={7}>Quinto Básico</option>
                    )}

                    {studentInfo[0].id_level === 8 ? (
                      <option selected value={8}>
                        Sexto Básico
                      </option>
                    ) : (
                      <option value={8}>Sexto Básico</option>
                    )}

                    {studentInfo[0].id_level === 9 ? (
                      <option selected value={9}>
                        Séptimo Básico
                      </option>
                    ) : (
                      <option value={9}>Séptimo Básico</option>
                    )}
                    {studentInfo[0].id_level === 10 ? (
                      <option selected value={10}>
                        Octavo Básico
                      </option>
                    ) : (
                      <option value={10}>Octavo Básico</option>
                    )}
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Conductor Asignado</FormLabel>
                  {currentDriver === 6 ? (
                    <>
                      <Icon
                        as={FaAsterisk}
                        color="red"
                        w="0.7rem"
                        h="0.7rem"
                        pos="absolute"
                        bottom="7.9rem"
                        left="9.3rem"
                      />
                      <Select
                        id="idDriver"
                        name="idDriver"
                        onChange={handleInputChange}
                        variant="filled"
                      >
                        <option selected value={0}>
                          Seleccione un conductor
                        </option>
                        {drivers.map((driver) => (
                          <option key={driver.id} value={driver.id}>
                            {driver.nameDriver +
                              " " +
                              driver.lastNameDP +
                              " " +
                              driver.lastNameDM}
                          </option>
                        ))}
                      </Select>
                      {warningDriver && (
                        <Alert status="warning">
                          <AlertIcon />
                          El estudiante no tiene conductor asignado, debe
                          asignarle uno.
                        </Alert>
                      )}
                    </>
                  ) : (
                    <Select
                      id="idDriver"
                      name="idDriver"
                      onChange={handleInputChange}
                      variant="filled"
                    >
                      {drivers.map((driver) =>
                        currentDriver === driver.id ? (
                          <option selected key={driver.id} value={driver.id}>
                            {driver.nameDriver +
                              " " +
                              driver.lastNameDP +
                              " " +
                              driver.lastNameDM}
                          </option>
                        ) : (
                          <option key={driver.id} value={driver.id}>
                            {driver.nameDriver +
                              " " +
                              driver.lastNameDP +
                              " " +
                              driver.lastNameDM}
                          </option>
                        )
                      )}
                    </Select>
                  )}
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
                    id="nameAgent"
                    name="nameAgent"
                    defaultValue={studentInfo[0].nameAgent}
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
                      defaultValue={studentInfo[0].phone}
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
                    defaultValue={studentInfo[0].email_agent}
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
                      ¡Información actualizada!
                    </Alert>
                  </Box>
                </SlideFade>
              )}
              {phoneError && (
                <SlideFade startingHeight={1} in={show}>
                  <Box my={4}>
                    <Alert status="error" variant="solid" borderRadius={4}>
                      <AlertIcon />
                      ¡El formato del teléfono es incorrecto!
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
              <ModalFooter>
                <Button type="submit" colorScheme="green" mr={3}>
                  Guardar cambios
                </Button>
                <Button onClick={onClose}>Cerrar</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      )}
      {/* Modal eliminar estudiante */}
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
                  Eliminar Estudiante
                </AlertDialogHeader>
                <AlertDialogBody>
                  Si está seguro de esta acción debe colocar el código de
                  validación de 4 dígitos.
                  <br></br>
                  <strong>
                    Nota: Esta acción dejará al estudiante eliminado para el
                    conductor que tiene asignado.
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
                <SlideFade startingHeight={1} in={codeSended}>
                  <Alert status="success">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>¡Código de validación enviado!</AlertTitle>
                      <AlertDescription>
                        Se ha enviado el código de 4 dígitos a su teléfono
                        registrado.
                      </AlertDescription>
                    </Box>
                  </Alert>
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
                  Habilitar Estudiante
                </AlertDialogHeader>
                <AlertDialogBody>
                  Si está seguro de esta acción debe colocar el código de
                  validación de 4 dígitos.
                  <br></br>
                  <strong>
                    Nota: Esta acción habilitará al estudiante y deberá
                    asignarle un conductor.
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
                <SlideFade startingHeight={1} in={codeSended}>
                  <Alert status="success">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>¡Código de validación enviado!</AlertTitle>
                      <AlertDescription>
                        Se ha enviado el código de 4 dígitos a su teléfono
                        registrado.
                      </AlertDescription>
                    </Box>
                  </Alert>
                </SlideFade>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="submit" colorScheme="green" ml={3}>
                    Habilitar
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

export default TableStudents;
