import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  TableContainer,
  TableCaption,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Icon,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Center,
  ScaleFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SlideFade,
  Collapse,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Tooltip,
  Skeleton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  ListIcon,
  LinkBox,
  LinkOverlay,
  Heading,
  Checkbox,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import { FaCheckCircle, FaShuttleVan } from "react-icons/fa";
import Menu from "components/menu/MainMenu";
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import {
  MdChevronLeft,
  MdChevronRight,
  MdBusAlert,
  MdOutlineNoTransfer,
  MdCheckCircle,
} from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import TimePicker from "react-time-picker";
import axios from "axios";
import { MinusIcon } from "@chakra-ui/icons";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

export default function TravelPlanningDriver(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const brandColor = useColorModeValue("brand.500", "white");
  const data = useMemo(() => tableData, [tableData]);
  const [drivers, setDrivers] = useState([]);
  const endPoint = "http://localhost:8000/api";
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [size, setSize] = useState("md");
  const [driverStudent, setDriverStudent] = useState([]);
  const [driverTravel, setDriverTravel] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [showTravel, setShowTravel] = useState(["undefined"]);
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const { selectRange, ...rest } = props;
  const [dateState, setDateState] = useState(new Date());
  const [valueRadio, setValueRadio] = useState("1");
  const [timeValue, setTimeValue] = useState("12:00");
  const [dateFormat, setDateFormat] = useState("");
  const sizes = ["xl"];
  const sizesModalRight = ["md"];
  const [backgroundColor, setBackgroundColor] = useState("#ee5d5078");
  // const [cursor, setCursor] = useState("not-allowed");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [buttonCancel, setButtonCancel] = useState(true);
  const [alertDriver, setAlertDriver] = useState(false);
  const [alertDriverSuccess, setAlertDriverSuccess] = useState(false);
  const [students, setStudents] = useState(false);
  const [modalTravel, setModalTravel] = useState(false);
  const [modalCheckStudents, setModalCheckStudents] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [objectTravel, setObjectTravel] = useState([]);
  const initialFocusRef = useRef();
  let count = 1;
  const [checkedItems, setCheckedItems] = useState([]);
  const [values, setValues] = useState([]);
  const [idTravel, setIdTravel] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const dataDriver = JSON.parse(localStorage.user);
  const [idDriver, setIdDriver] = useState([dataDriver.id]);

  const options = [];
  const studentsList = driverStudent.map((student) => ({
    ...options,
    label: student.name + " " + student.lastNameP + " " + student.lastNameM,
    value: student.id,
  }));

  const handleSubmit = async (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let date = dateState.toISOString().slice(0, 10).replace("T", " ");
    let resultArray = [];
    for (let [key, value] of formData.entries()) {
      resultArray.push(value);
    }
    resultArray.push(date);
    let today = new Date(new Date().setDate(new Date().getDate() - 1));
    let setToday = today.toISOString().slice(0, 10).replace("T", " ");
    let splitArray = setToday.split("-");

    if (resultArray.length === 6) {
      let newArray = resultArray.slice(4, 6);
      newArray.push(resultArray[0].concat(" " + resultArray[3]));
      let splitNewArray = newArray[1].split("-");
      newArray.push(idDriver);
      if (
        splitNewArray[1] < splitArray[1] ||
        splitNewArray[2] <= splitArray[2]
      ) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, "2000");
      } else {
        newArray.push(getIdStudents(driverStudent));
        await axios.post(`${endPoint}/AddDateTimeTravel/`, {
          type_travel: newArray[0],
          date: newArray[1],
          time: newArray[2],
          idDriver: newArray[3],
          studentsIds: newArray[4],
        });
        // setBackgroundColor("#ee5d50");
        // setButtonCancel(false);
        // setCursor("pointer");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, "2000");
        getDriverTravel();
      }
    } else {
      let splitArrayValue = resultArray[1].split("-");
      resultArray.push(idDriver);
      resultArray.push(getIdStudents(driverStudent));
      if (
        splitArrayValue[1] < splitArray[1] ||
        splitArrayValue[2] <= splitArray[2]
      ) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, "2000");
      } else {
        await axios.post(`${endPoint}/AddDateTravel/`, {
          type_travel: resultArray[0],
          date: resultArray[1],
          idDriver: resultArray[2],
          studentsIds: resultArray[3],
        });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, "2000");
        getDriverTravel();
      }
    }
  };

  const getIdStudents = (driverStudent) => {
    const studentsIds = driverStudent.map((idStudent) => idStudent.id);
    return studentsIds;
  };

  const showInfoTravel = async (idTravel) => {
    const response = await axios.get(`${endPoint}/showInfoTravel/${idTravel}/`);
    setShowTravel(response.data);
    let date = response.data[0].date_travel;
    let dateFormat = date.split("-").reverse().join("/");
    setDateFormat(dateFormat);
  };

  const cancelTravel = async (idTravel) => {
    await axios.delete(`${endPoint}/deleteTravel/${idTravel}/`);
    setAlertDriverSuccess(!alertDriverSuccess);
    getDriverTravel();
    setTimeout(() => {
      setAlertDriverSuccess(false);
    }, "4000");
  };

  const changeStatusTravel = async (idTravel, status) => {
    if (status === false) {
      let toDo = 1;
      const { data: response } = await axios.get(
        `${endPoint}/changeStatusTravel/${idTravel}/${toDo}`
      );
      getDriverTravel();
    } else {
      let dato = JSON.parse(localStorage.user);
      let idDriver = dato.id;
      const response = await axios.get(`${endPoint}/driverStudent/${idDriver}`);
      setDriverStudent(response.data);
      setModalTravel(false);
      setStudents(false);
      setModalCheckStudents(true);
      setIdTravel(idTravel);
      onOpen();
    }
  };

  const getDropdownButtonLabel = ({ placeholderButtonLabel, value }) => {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: Todos los estudiantes`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} seleccionados`;
    }
  };

  const onChange = (value, event) => {
    if (event.action === "select-option" && event.option.value === "*") {
      setSelectedOptions(studentsList);
      // setValues(this.options);
      // setValues(this.options.filter((o) => o.value !== "*"));
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      setSelectedOptions(studentsList);
      // setValues(this.options);
    } else if (event.action === "deselect-option") {
      setSelectedOptions(value.filter((o) => o.value !== "*"));
      // setValues(value.filter((o) => o.value !== "*"));
    } else if (value.length === studentsList.length - 1) {
      setSelectedOptions(studentsList);
      // setValues(this.options);
    } else {
      setSelectedOptions(studentsList);
      // setValues(value);
    }
  };

  const confirmStudents = async (event) => {
    event.preventDefault();
    if (selectedOptions.length === 0) {
      setMessageError(true);
      setTimeout(() => {
        setMessageError(false);
      }, "2000");
    } else {
      if (selectedOptions[0].value === "*") {
        let filterArray = selectedOptions.filter((element) => {
          return element.value !== "*";
        });
        const idStudents = filterArray.map((element) => {
          return element.value;
        });
        const { data: response } = await axios.get(
          `${endPoint}/checkAgentsNotification/${idStudents}/`
        );
        const idAgents = response;
        sendNotificationToAgents(idStudents, idAgents);
      } else {
        const idStudents = selectedOptions.map((element) => {
          return element.value;
        });
        const { data: response } = await axios.get(
          `${endPoint}/checkAgentsNotification/${idStudents}/`
        );
        const idAgents = response;
        sendNotificationToAgents(idStudents, idAgents);
      }
      let toDo = 2;
      await axios.get(`${endPoint}/changeStatusTravel/${idTravel}/${toDo}`);
      setMessageSuccess(true);
      setTimeout(() => {
        setMessageSuccess(false);
        onClose();
      }, "3000");
      getDriverTravel();
    }
  };

  const sendNotificationToAgents = async (idStudents, idAgents) => {
    const { data: response } = await axios.post(
      `${endPoint}/sendNotificationToAgents/${idAgents}/${idStudents}/${idTravel}`
    );
  };

  const handleSizeModalRight = async (idDriver) => {
    const response = await axios.get(`${endPoint}/driverStudent/${idDriver}`);
    setDriverStudent(response.data);
    setStudents(true);
    setModalTravel(false);
    setModalCheckStudents(false);
    onOpen();
  };

  const getDriverTravel = async () => {
    let dato = JSON.parse(localStorage.user);
    let idDriver = dato.id;
    const { data: response } = await axios.get(
      `${endPoint}/InfoDriver/${idDriver}`
    );
    setDriverTravel(response);
  };

  useEffect(() => {
    let isMounted = true;
    let dato = JSON.parse(localStorage.user);
    let idDriver = dato.id;
    let toDo = 0;
    const getDriverTravel = async () => {
      try {
        const { data: response } = await axios.get(
          `${endPoint}/InfoDriver/${idDriver}`
        );
        if (isMounted) setDriverTravel(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    getDriverTravel();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    let dato = JSON.parse(localStorage.user);
    let idDriver = dato.id;
    const getInfoDriverTravel = async () => {
      try {
        const { data: response } = await axios.get(
          `${endPoint}/getInfoDriverTravel/${idDriver}/`
        );
        if (isMounted) {
          let travel = [];
          let students = [];
          let notifications = [];
          let agents = [];
          let objectTravel = {
            idTravel: travel,
            idStudents: students,
            // idNotifications: notifications,
            idAgents: agents,
          };
          // const elements = response.map((driver) => {
          //   travel.push(driver.idTravel);
          //   students.push(driver.id_student);
          //   notifications.push(driver.idNotification);
          //   agents.push(driver.idAgent);
          //   return response;
          // });
          response.forEach((driver) => {
            if (
              !students.includes(driver.id_student) &&
              !agents.includes(driver.idAgent)
            ) {
              students.push(driver.id_student);
              agents.push(driver.idAgent);
              travel.push(driver.idTravel);
            }
          });
          setObjectTravel(objectTravel);
          console.log(objectTravel);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getInfoDriverTravel();
    return () => {
      isMounted = false;
    };
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  let dato = JSON.parse(localStorage.user);
  if (driverTravel.length !== 0) {
    return (
      <Card
        direction="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Flex
          px="25px"
          justify="space-between"
          mt="-3rem"
          mb="20px"
          align="center"
        >
          <Text
            color={textColor}
            fontSize="30px"
            fontWeight="700"
            lineHeight="100%"
          >
            Mis Viajes
          </Text>
          <ScaleFade initialScale={2} in={alertDriver}>
            <Alert
              zIndex="1"
              boxShadow="0 5px 20px rgb(0 0 0 / 0.7);"
              width="xl"
              position="relative"
              left="15rem"
              top="20rem"
              borderRadius="15px"
              status="warning"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="140px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                ¡Importante!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                El conductor no tiene estudiantes asignados.
              </AlertDescription>
            </Alert>
          </ScaleFade>
          <ScaleFade initialScale={2} in={alertDriverSuccess}>
            <Alert
              zIndex="1"
              boxShadow="0 5px 20px rgb(0 0 0 / 0.7);"
              width="xl"
              position="relative"
              right="25rem"
              top="20rem"
              borderRadius="15px"
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="140px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                ¡Viaje cancelado!
              </AlertTitle>
            </Alert>
          </ScaleFade>
          <Menu />
        </Flex>
        {loading && (
          <Spinner
            pos="relative"
            ml="46rem"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        <LinkBox
          backgroundColor="#f4f7fe"
          borderColor="#f4f7fe"
          as="article"
          h={40}
          p="5"
          borderWidth="1px"
          rounded="md"
        >
          <Heading size="md" my="2">
            <LinkOverlay>
              Conductor:{" "}
              {driverTravel[0].nameDriver +
                " " +
                driverTravel[0].lastNameDP +
                " " +
                driverTravel[0].lastNameDM}
            </LinkOverlay>
          </Heading>
          <Text style={{fontSize: "1.1rem"}}>
            <strong>Furgón: {driverTravel[0].brand_model}</strong>
          </Text>
          <Text style={{fontSize: "1.1rem"}}>
            <strong>Patente: {driverTravel[0].unique_code}</strong>
          </Text>
          {/* <Icon
            w="45px"
            h="45px"
            as={FaShuttleVan}
            color="black"
          /> */}
        </LinkBox>
        {!loading && (
          <TableContainer>
            {sizesModalRight.map((size) => (
              <Button
                onClick={() => handleSizeModalRight(idDriver)}
                key={size}
                m={4}
                colorScheme="messenger"
              >
                Ver Estudiantes
              </Button>
            ))}
            <Table variant="" colorScheme="teal" backgroundColor="#f4f7fe">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead>
                <Tr>
                  <Th style={{ fontSize: "1rem" }}>#</Th>
                  {/* <Th>Furgón</Th>
                  <Th>Patente</Th> */}
                  <Th style={{ textAlign: "left", fontSize: "0.8rem" }}>
                    Estado de Viaje
                  </Th>
                  <Th style={{ textAlign: "center", fontSize: "0.8rem" }}>
                    Opciones
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {driverTravel.map((driver) => (
                  <Tr key={driver.idTravel}>
                    <Td>
                      <strong>{count++}</strong>
                    </Td>
                    {/* <Td>{driver.brand_model}</Td>
                    <Td>{driver.unique_code}</Td> */}
                    <Td>
                      {driver.status_travel === "1" ? (
                        <>
                          <Icon
                            color="#D69E2E"
                            as={MdBusAlert}
                            w="35px"
                            h="35px"
                            mt="4px"
                          />
                          <strong
                            style={{ position: "relative", bottom: "0.5rem" }}
                          >
                            <Tooltip
                              label="Tiene un viaje pendiente por confirmar."
                              aria-label="A tooltip"
                            >
                              Pendiente
                            </Tooltip>
                          </strong>
                          <Skeleton
                            startColor="yellow.400"
                            endColor="yellow.900"
                            height="15px"
                            width="110px"
                          />
                        </>
                      ) : driver.status_travel === "2" ? (
                        <>
                          <Icon
                            color="#38A169"
                            as={MdBusAlert}
                            w="35px"
                            h="35px"
                            mt="4px"
                          />
                          <strong
                            style={{ position: "relative", bottom: "0.5rem" }}
                          >
                            <Tooltip
                              label="Viaje Confirmado"
                              aria-label="A tooltip"
                            >
                              Confirmado
                            </Tooltip>
                          </strong>
                          <Skeleton
                            startColor="green.400"
                            endColor="green.900"
                            height="15px"
                            width="110px"
                          />
                        </>
                      ) : driver.status_travel === "3" ? (
                        <>
                          <Icon
                            color="#38A169"
                            as={FaCheckCircle}
                            w="34px"
                            h="34px"
                            mt="4px"
                          />
                          <strong
                            style={{ position: "relative", bottom: "0.5rem" }}
                          >
                            <Tooltip
                              label="Viaje Completado"
                              aria-label="A tooltip"
                            >
                              Completado
                            </Tooltip>
                          </strong>
                          {/* <Skeleton
                            startColor="green.400"
                            endColor="green.900"
                            height="15px"
                            width="110px"
                          /> */}
                        </>
                      ) : (
                        <>
                          <Icon
                            color="#E53E3E"
                            as={MdOutlineNoTransfer}
                            w="35px"
                            h="35px"
                            mt="4px"
                          />
                          <strong
                            style={{ position: "relative", bottom: "0.6rem" }}
                          >
                            Sin solicitud
                          </strong>
                        </>
                      )}
                    </Td>
                    <Td style={{ textAlign: "center" }}>
                      {students && (
                        <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                          <DrawerOverlay />
                          <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader fontSize="2rem">
                              Estudiantes
                              <Text fontSize="2xl">
                                Cantidad Actual:{" "}
                                {driverStudent.length === 0
                                  ? "0"
                                  : driverStudent.length}
                              </Text>
                              <Text
                                position="absolute"
                                left="24rem"
                                top="3.8rem"
                                fontSize="2xl"
                              >
                                Nivel:
                              </Text>
                            </DrawerHeader>
                            <DrawerBody>
                              {driverStudent.length === 0 ? (
                                <Alert status="warning">
                                  <AlertIcon />
                                  ¡Sin estudiantes asignados!
                                </Alert>
                              ) : (
                                driverStudent.map((student) => (
                                  <>
                                    <List spacing={3}>
                                      <ListItem key={student.id}>
                                        <ListIcon
                                          as={MdCheckCircle}
                                          color="green.500"
                                        />
                                        {student.name +
                                          " " +
                                          student.lastNameP +
                                          " " +
                                          student.lastNameM}{" "}
                                        <Icon as={MinusIcon} />
                                        <Icon as={MinusIcon} />
                                        <Icon as={MinusIcon} />{" "}
                                        {student.nameLevel}
                                      </ListItem>
                                      <Text pt="2" fontSize="sm">
                                        Comuna: {student.nameProvince} <br></br>
                                        Sector: {student.zone} <br></br>
                                        Dirección:{" "}
                                        {student.address
                                          ? student.address
                                          : "Sin dirección registrada"}
                                      </Text>
                                      <br></br>
                                    </List>
                                  </>
                                ))
                              )}
                            </DrawerBody>
                          </DrawerContent>
                        </Drawer>
                      )}
                      {modalCheckStudents && (
                        <Drawer
                          placement={placement}
                          onClose={onClose}
                          isOpen={isOpen}
                          size={size}
                        >
                          <DrawerOverlay />
                          <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader fontSize="2rem">
                              Confirmación de Estudiantes recogidos
                              <Text fontSize="2xl">
                                Cantidad Actual:{" "}
                                {driverStudent.length === 0
                                  ? "0"
                                  : driverStudent.length}
                              </Text>
                            </DrawerHeader>
                            <DrawerBody>
                              <form onSubmit={confirmStudents}>
                                <ReactMultiSelectCheckboxes
                                  width="15.5rem"
                                  options={[
                                    { label: "Seleccionar todos", value: "*" },
                                    ...studentsList,
                                  ]}
                                  placeholderButtonLabel="Estudiantes"
                                  getDropdownButtonLabel={
                                    getDropdownButtonLabel
                                  }
                                  value={selectedOptions}
                                  onChange={onChange}
                                />
                                <Button
                                  style={{
                                    marginLeft: "16rem",
                                    marginTop: "-4rem",
                                    cursor: "pointer",
                                  }}
                                  colorScheme="whatsapp"
                                  type="submit"
                                >
                                  Confirmar
                                </Button>
                              </form>
                            </DrawerBody>
                            <SlideFade startingHeight={1} in={messageSuccess}>
                              <Box my={4}>
                                <Alert status="success">
                                  <AlertIcon />
                                  <Box>
                                    <AlertTitle>!Viaje completado!</AlertTitle>
                                    <AlertDescription>
                                      Se ha enviado una notificación de
                                      confirmación vía SMS a los apoderados de
                                      los estudiantes
                                    </AlertDescription>
                                  </Box>
                                </Alert>
                              </Box>
                            </SlideFade>
                            <SlideFade startingHeight={1} in={messageError}>
                              <Box my={4}>
                                <Alert
                                  status="error"
                                  variant="solid"
                                  borderRadius={4}
                                >
                                  <AlertIcon />
                                  ¡Debe seleccionar los estudiantes recogidos!
                                </Alert>
                              </Box>
                            </SlideFade>
                          </DrawerContent>
                        </Drawer>
                      )}
                      {driver.idTravel === null
                        ? sizes.map((size) => (
                            <>
                              <Button disabled={true} colorScheme="red">
                                Cancelar solicitud
                              </Button>
                            </>
                          ))
                        : sizes.map((size) => (
                            <>
                              <Popover>
                                <PopoverTrigger>
                                  <Button
                                    onClick={() =>
                                      showInfoTravel(driver.idTravel)
                                    }
                                    colorScheme="messenger"
                                  >
                                    Ver viaje
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  color="white"
                                  bg="blue.800"
                                  borderColor="blue.800"
                                  width="23rem"
                                >
                                  <PopoverArrow />
                                  <PopoverCloseButton />
                                  <PopoverHeader fontWeight="bold">
                                    Información del viaje
                                  </PopoverHeader>
                                  <PopoverBody height="5rem" textAlign="left">
                                    Fecha:{" "}
                                    {typeof showTravel[0].date_travel ===
                                    "undefined"
                                      ? ""
                                      : dateFormat}{" "}
                                    {typeof showTravel[0].hour_travel ===
                                    "undefined"
                                      ? ""
                                      : showTravel[0].hour_travel !== null
                                      ? "Hora: " + showTravel[0].hour_travel
                                      : ""}
                                    <br></br>
                                    Tipo de Viaje:{" "}
                                    {typeof showTravel[0].type_travel ===
                                    "undefined"
                                      ? ""
                                      : showTravel[0].type_travel === "1"
                                      ? "Ida (Escuela Rural Básica Riñinahue)"
                                      : "Vuelta (direcciones de estudiantes)"}
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                              {driver.status_travel === "1" ? (
                                <Button
                                  background="teal"
                                  color="white"
                                  key={size}
                                  m={4}
                                  onClick={() =>
                                    changeStatusTravel(driver.idTravel, false)
                                  }
                                >
                                  Aceptar viaje
                                </Button>
                              ) : driver.status_travel === "2" ? (
                                <Button
                                  background="teal"
                                  color="white"
                                  key={size}
                                  m={4}
                                  onClick={() =>
                                    changeStatusTravel(driver.idTravel, true)
                                  }
                                >
                                  Viaje Completado
                                </Button>
                              ) : driver.status_travel === "3" ? (
                                <Button
                                  background="teal"
                                  color="white"
                                  key={size}
                                  m={4}
                                  style={{ display: "none" }}
                                >
                                  Viaje Completado
                                </Button>
                              ) : null}
                              {driver.status_travel === "3" ? (
                                <Button disabled={true} colorScheme="red">
                                  Cancelar viaje
                                </Button>
                              ) : (
                                <Popover
                                  initialFocusRef={initialFocusRef}
                                  placement="bottom"
                                  closeOnBlur={false}
                                >
                                  <PopoverTrigger>
                                    <Button
                                      // onClick={() => cancelTravel()}
                                      // style={{ cursor }}
                                      colorScheme="red"
                                    >
                                      Cancelar viaje
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    color="white"
                                    bg="blue.800"
                                    borderColor="blue.800"
                                    width="21.5rem"
                                  >
                                    <PopoverHeader
                                      pt={4}
                                      fontWeight="bold"
                                      border="0"
                                    >
                                      Confirmar
                                    </PopoverHeader>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                      ¿Está seguro que desea cancelar la
                                      solicitud?
                                    </PopoverBody>
                                    <PopoverFooter
                                      border="0"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="space-between"
                                      pb={4}
                                    >
                                      {/* <Box fontSize="sm">Step 2 of 4</Box> */}
                                      <ButtonGroup size="sm">
                                        <Button
                                          onClick={() =>
                                            cancelTravel(driver.idTravel)
                                          }
                                          colorScheme="green"
                                        >
                                          Aceptar
                                        </Button>
                                        {/* <Button
                                            colorScheme="blue"
                                            ref={initialFocusRef}
                                          >
                                            Next
                                          </Button> */}
                                      </ButtonGroup>
                                    </PopoverFooter>
                                  </PopoverContent>
                                </Popover>
                              )}
                            </>
                          ))}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        {modalTravel && (
          <Modal
            onClose={onClose}
            size={size}
            isOpen={isOpen}
            scrollBehavior={scrollBehavior}
          >
            <ModalOverlay />
            <form onSubmit={handleSubmit}>
              <ModalContent>
                <ModalHeader>Solicitud de Viaje</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {/* <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                          <h2>
                            <AccordionButton
                              onClick={() => handleAccordion()}
                              background="#b2f5ea"
                            >
                              <Box flex="1" textAlign="left">
                                Estudiantes Asignados
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          {showStudents &&
                            driverStudent.map((student) =>
                              driverStudent.length !== 0 ? (
                                <AccordionPanel background="#F1f5f7" pb={4}>
                                  {student.name +
                                    " " +
                                    student.lastNameP +
                                    " " +
                                    student.lastNameM}
                                </AccordionPanel>
                              ) : (
                                <AccordionPanel background="#F1f5f7" pb={4}>
                                  ¡No tiene estudiantes asignados!
                                </AccordionPanel>
                              )
                            )}
                        </AccordionItem>
                      </Accordion> */}
                  <br></br>
                  <FormLabel style={{ fontSize: "1.2rem" }} as="legend">
                    Fecha de viaje
                  </FormLabel>
                  <br></br>
                  <Center>
                    <Calendar
                      id="date"
                      name="date"
                      // type="date"
                      // minDate={dateTomorrow}
                      value={dateState}
                      onChange={setDateState}
                      selectRange={selectRange}
                      view={"month"}
                      tileContent={<Text color="brand.500"></Text>}
                      prevLabel={
                        <Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />
                      }
                      nextLabel={
                        <Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />
                      }
                    />
                  </Center>
                  <br></br>
                  {valueRadio === "2" ? (
                    <>
                      <ScaleFade initialScale={0.9} in={isOpen}>
                        <FormLabel as="legend">
                          Hora de llegada al Colegio:
                        </FormLabel>
                        <Center>
                          <div
                            style={{
                              background: "#b2f5ea",
                              borderRadius: "100px",
                              border: "0px solid black",
                            }}
                          >
                            <TimePicker
                              onChange={setTimeValue}
                              value={timeValue}
                            />
                            <select
                              aria-label="AM"
                              className="react-time-picker__inputGroup__input react-time-picker__inputGroup__amPm"
                              data-input="true"
                              data-select="true"
                              name="amPm"
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                          </div>
                        </Center>
                      </ScaleFade>
                    </>
                  ) : null}
                  <br></br>
                  <FormLabel style={{ fontSize: "1.2rem" }} as="legend">
                    <Icon w="25px" h="25px" as={FaRoute} color={brandColor} />
                    Tipo de viaje
                  </FormLabel>
                  <RadioGroup onChange={setValueRadio} value={valueRadio}>
                    <Stack direction="row">
                      <Radio value="1">
                        Ida (Escuela Rural Básica Riñinahue)
                      </Radio>
                      <Radio onClick={onToggle} value="2">
                        Vuelta (direcciones de estudiantes)
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </ModalBody>
                {showError && (
                  <SlideFade startingHeight={1} in={isOpen}>
                    <Alert status="error">
                      <AlertIcon />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        ¡Debe ingresar una fecha posterior a la actual!
                      </AlertDescription>
                    </Alert>
                  </SlideFade>
                )}
                {showSuccess && (
                  <SlideFade startingHeight={1} in={isOpen}>
                    <Alert status="success" variant="left-accent">
                      <AlertIcon />
                      ¡Solicitud registrada y enviada al conductor!
                    </Alert>
                  </SlideFade>
                )}
                <ModalFooter>
                  <Button
                    // style={{ backgroundColor, cursor }}
                    background="teal"
                    type="submit"
                    color="white"
                    m={4}
                  >
                    Registrar
                  </Button>
                  <Button onClick={onClose}>Cerrar</Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        )}

        {/* <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Conductor</Th>
                    <Th>Auto</Th>
                    <Th>Estudiantes asignados</Th>
                  </Tr>
                </Thead>
                {drivers.map((driver, index) => {
                  <Tbody>
                    <Tr key={index}>
                      <Td>
                        {driver.nameDriver +
                          " " +
                          driver.lastNameDP +
                          " " +
                          driver.lastNameDM}
                      </Td>
                      <Td>HOLA </Td>
                      <Td>HOLA </Td>
                    </Tr>
                  </Tbody>;
                })}
              </Table>
            </TableContainer> */}
        {/* { drivers.map((driver, index) => {
            <Accordion>
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        HOLA
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                  {driver.nameDriver}
                  </AccordionPanel>
                </AccordionItem> */}

        {/* <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Section 2 title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem> */}
        {/* </Accordion>
               })} */}
        {/* <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
              <Thead>
                {headerGroups.map((headerGroup, index) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <Th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        pe='10px'
                        key={index}
                        borderColor={borderColor}>
                        <Flex
                          justify='space-between'
                          align='center'
                          fontSize={{ sm: "10px", lg: "12px" }}
                          color='gray.400'>
                          {column.render("Header")}
                        </Flex>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, index) => {
                        let data = "";
                        if (cell.column.Header === "NAME") {
                          data = (
                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                              {cell.value}
                            </Text>
                          );
                        } else if (cell.column.Header === "TECH") {
                          data = (
                            <Flex align='center'>
                              {cell.value.map((item, key) => {
                                if (item === "apple") {
                                  return (
                                    <AppleLogo
                                      key={key}
                                      color={iconColor}
                                      me='16px'
                                      h='18px'
                                      w='15px'
                                    />
                                  );
                                } else if (item === "android") {
                                  return (
                                    <AndroidLogo
                                      key={key}
                                      color={iconColor}
                                      me='16px'
                                      h='18px'
                                      w='16px'
                                    />
                                  );
                                } else if (item === "windows") {
                                  return (
                                    <WindowsLogo
                                      key={key}
                                      color={iconColor}
                                      h='18px'
                                      w='19px'
                                    />
                                  );
                                }
                              })}
                            </Flex>
                          );
                        } else if (cell.column.Header === "DATE") {
                          data = (
                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                              {cell.value}
                            </Text>
                          );
                        } else if (cell.column.Header === "PROGRESS") {
                          data = (
                            <Flex align='center'>
                              <Text
                                me='10px'
                                color={textColor}
                                fontSize='sm'
                                fontWeight='700'>
                                {cell.value}%
                              </Text>
                              <Progress
                                variant='table'
                                colorScheme='brandScheme'
                                h='8px'
                                w='63px'
                                value={cell.value}
                              />
                            </Flex>
                          );
                        }
                        return (
                          <Td
                            {...cell.getCellProps()}
                            key={index}
                            fontSize={{ sm: "14px" }}
                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                            borderColor='transparent'>
                            {data}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table> */}
      </Card>
    );
  } else {
    return (
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="150px"
      >
        <AlertIcon boxSize="40px" mr={0} alignItems="center" />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          No tiene viajes pendientes
        </AlertTitle>
        {/* <AlertDescription maxWidth="sm">
          Este modulo esta disponible solo para el usuario Administrador.
        </AlertDescription> */}
      </Alert>
    );
  }
}
