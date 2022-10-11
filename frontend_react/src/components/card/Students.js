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
} from "@chakra-ui/react";
import axios from "axios";
// Custom components
import Card from "components/card/Card.js";
import { MdArrowDownward } from "react-icons/md";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import TableStudents from "./TableStudents";
import TableDrivers from "./TableDrivers";

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
  const endPoint = "http://localhost:8000/api";
  const [show, setShow] = useState(false);
  const [parvulo, setParvulo] = useState(false);
  const [basica, setBasica] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //  useEffect(() => {
  //    getAllStudents();
  //  }, []);

  // const handleClick = event => {
  //   setIsShown(true);
  // };

  const getAllStudents = async (event, param) => {
    const response = await axios.get(`${endPoint}/students/${param}/`);
    let count = 0;
    setCourse(param);
    setStudents(response.data);
    let result = response.data;
    result.map((row) => count++);
    setCount(count);
    setIsShown(true);
  };

  const getAllDrivers = async (event) => {
    const response = await axios.get(`${endPoint}/drivers/`);
    let count = 0;
    setDrivers(response.data);
    let result = response.data;
    result.map((row) => count++);
    setCount(count);
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
          {/* <Button
            position='absolute'
            bg='white'
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p='0px !important'
            top='14px'
            right='14px'
            borderRadius='50%'
            minW='36px'
            h='36px'
            onClick={() => {
              setLike(!like);
            }}>
            <Icon
              transition='0.2s linear'
              w='20px'
              h='20px'
              as={like ? IoHeart : IoHeartOutline}
              color='brand.500'
            />
          </Button> */}
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
                <FormControl>
                  <FormLabel>Rut</FormLabel>
                  <Input ref={initialRef} placeholder="Rut" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Nombres y Apellidos</FormLabel>
                  <Input placeholder="Nombres y Apellidos" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Dirección</FormLabel>
                  <Input placeholder="" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Comuna</FormLabel>
                  <Select>
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
                  <Select placeholder="Seleccione sexo">
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Correo (Opcional):</FormLabel>
                  <Input placeholder="" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Nivel</FormLabel>
                  <Select placeholder="Seleccione nivel">
                    <option value="Prekinder">Prekinder</option>
                    <option value="Kinder">Kinder</option>
                  </Select>
                </FormControl>
                <ModalHeader>Datos del Apoderado</ModalHeader>
                <FormControl>
                  <FormLabel>Apoderado</FormLabel>
                  <Input placeholder="Nombre y Apellido" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input placeholder="+569" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Correo (Opcional)</FormLabel>
                  <Input placeholder="ejemplo@gmail.com" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Agregar
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
              </ModalFooter>
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
                <FormControl>
                  <FormLabel>Rut</FormLabel>
                  <Input ref={initialRef} placeholder="Rut" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Nombres y Apellidos</FormLabel>
                  <Input placeholder="Nombres y Apellidos" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Dirección</FormLabel>
                  <Input placeholder="" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Comuna</FormLabel>
                  <Select>
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
                  <Select placeholder="Seleccione sexo">
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Correo (Opcional):</FormLabel>
                  <Input placeholder="" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Nivel</FormLabel>
                  <Select placeholder="Seleccione nivel">
                    <option value="Primero Básico">Primero Básico</option>
                    <option value="Segundo Básico">Segundo Básico</option>
                    <option value="Tercero Básico">Tercero Básico</option>
                    <option value="Cuarto Básico">Cuarto Básico</option>
                    <option value="Quinto Básico">Quinto Básico</option>
                    <option value="Sexto Básico">Sexto Básico</option>
                    <option value="Séptimo Básico">Séptimo Básico</option>
                    <option value="Octavo Básico">Octavo Básico</option>
                  </Select>
                </FormControl>
                <ModalHeader>Datos del Apoderado</ModalHeader>
                <FormControl>
                  <FormLabel>Apoderado</FormLabel>
                  <Input placeholder="Nombre y Apellido" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input placeholder="+569" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Correo (Opcional)</FormLabel>
                  <Input placeholder="ejemplo@gmail.com" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Agregar
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
              </ModalFooter>
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
            {isShown && <TableStudents course={course} students={students} />}
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
            {isShown && <TableStudents course={course} students={students} />}
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
