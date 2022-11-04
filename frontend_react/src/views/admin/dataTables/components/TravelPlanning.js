/* eslint-disable */
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
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
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
} from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import TimePicker from "react-time-picker";
import axios from "axios";

export default function TravelPlanning(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const brandColor = useColorModeValue("brand.500", "white");
  const data = useMemo(() => tableData, [tableData]);
  const [drivers, setDrivers] = useState([]);
  const endPoint = "http://localhost:8000/api";
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const [driverStudent, setDriverStudent] = useState([]);
  const [idDriver, setIdDriver] = useState([]);
  const [driverTravel, setDriverTravel] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const { selectRange, ...rest } = props;
  const [dateState, setDateState] = useState(new Date());
  const [valueRadio, setValueRadio] = useState("1");
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  const [dateTomorrow, setDateTomorrow] = useState(tomorrow);
  const [timeValue, setTimeValue] = useState("12:00");
  const sizes = ["xl"];
  const [backgroundColor, setBackgroundColor] = useState("#ee5d5078");
  // const [cursor, setCursor] = useState("not-allowed");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [buttonCancel, setButtonCancel] = useState(true);
  const [alertDriver, setAlertDriver] = useState(false);
  const [alertDriverSuccess, setAlertDriverSuccess] = useState(false);
  const initialFocusRef = useRef();

  const handleSizeClick = async (newSize, id_driver) => {
    const response = await axios.get(`${endPoint}/driverStudent/${id_driver}`);
    setSize(newSize);
    setDriverStudent(response.data);
    if (typeof response.data[0] === "undefined") {
      setAlertDriver(!alertDriver);
      setTimeout(() => {
        setAlertDriver(false);
      }, "4000");
    } else {
      setIdDriver(response.data[0].idDriver);
      onOpen();
    }
  };

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
    // const showUpdateStudents = await axios.get(
    //   `${endPoint}/students/${course}/`
    // );
    // let students = showUpdateStudents.data;
    // UpdateStateStudents(students, id_level);
  };

  const getIdStudents = (driverStudent) => {
    const studentsIds = driverStudent.map((idStudent) => idStudent.id);
    return studentsIds;
  };

  const cancelTravel = async (idTravel) => {
    await axios.delete(`${endPoint}/deleteTravel/${idTravel}/`);
    setAlertDriverSuccess(!alertDriverSuccess);
    getDriverTravel();
    setTimeout(() => {
      setAlertDriverSuccess(false);
    }, "4000");
  };

  const changeDate = (e) => {
    setBackgroundColor("#008080");
    setCursor("pointer");
  };

  const handleAccordion = () => {
    setShowStudents(true);
  };

  const getDriverTravel = async () => {
    const { data: response } = await axios.get(`${endPoint}/driverTravel/`);
    setDriverTravel(response);
  };

  useEffect(() => {
    let isMounted = true;
    const getAllDrivers = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(`${endPoint}/drivers/`);
        if (isMounted) setDrivers(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    getAllDrivers();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const getDriverTravel = async () => {
      try {
        const { data: response } = await axios.get(`${endPoint}/driverTravel/`);
        if (isMounted) setDriverTravel(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    getDriverTravel();
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
          Registrar Viajes
        </Text>
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
      {!loading && (
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Conductores</Th>
                <Th>Furgón</Th>
                <Th>Patente</Th>
                <Th>Opciones</Th>
                <Th>Estado de Viaje</Th>
              </Tr>
            </Thead>
            <Tbody>
              {driverTravel.map((driver) => (
                <Tr key={driver.id}>
                  <Td>
                    {driver.nameDriver +
                      " " +
                      driver.lastNameDP +
                      " " +
                      driver.lastNameDM}
                  </Td>
                  <Td>{driver.brand_model}</Td>
                  <Td>{driver.unique_code}</Td>
                  <Td>
                    {driver.idTravel === null
                      ? sizes.map((size) => (
                          <>
                            <Button
                              background="teal"
                              color="white"
                              onClick={() => handleSizeClick(size, driver.id)}
                              key={size}
                              m={4}
                            >
                              Solicitar viaje
                            </Button>
                            <Button disabled={true} colorScheme="red">
                              Cancelar solicitud
                            </Button>
                          </>
                        ))
                      : sizes.map((size) => (
                          <>
                            <Button
                              disabled={true}
                              background="teal"
                              color="white"
                              key={size}
                              m={4}
                            >
                              Solicitar viaje
                            </Button>
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
                                  Cancelar solicitud
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
                                  ¿Está seguro que desea cancelar la solicitud?
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
                          </>
                        ))}
                  </Td>
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
                            label="El conductor recibirá la notificación del viaje"
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
                        {/* #38A169 */}
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
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* <Collapse startingHeight={0} in={alertDriver}> */}
          <ScaleFade initialScale={0.9} in={alertDriver}>
            <Alert
              boxShadow="0 5px 20px rgb(0 0 0 / 0.7);"
              width="xl"
              position="absolute"
              left="30rem"
              bottom="20rem"
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
          {/* </Collapse> */}
          {/* <Collapse startingHeight={0} in={alertDriverSuccess}> */}
          <ScaleFade initialScale={0.9} in={alertDriverSuccess}>
            <Alert
              boxShadow="0 5px 20px rgb(0 0 0 / 0.7);"
              width="xl"
              position="absolute"
              left="30rem"
              bottom="20rem"
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
          {/* </Collapse> */}
        </TableContainer>
      )}

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
              <Accordion defaultIndex={[0]} allowMultiple>
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
              </Accordion>
              <br></br>

              <FormLabel as="legend">Fecha de viaje</FormLabel>
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
                        <TimePicker onChange={setTimeValue} value={timeValue} />
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
              <FormLabel as="legend">
                <Icon w="25px" h="25px" as={FaRoute} color={brandColor} />
                Tipo de viaje
              </FormLabel>
              <RadioGroup onChange={setValueRadio} value={valueRadio}>
                <Stack direction="row">
                  <Radio value="1">Ida (Escuela Rural Básica Riñinahue)</Radio>
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
}
