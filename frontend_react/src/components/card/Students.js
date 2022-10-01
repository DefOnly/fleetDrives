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
} from "@chakra-ui/react";
import axios from "axios";
// Custom components
import Card from "components/card/Card.js";
import { MdArrowDownward } from "react-icons/md";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import TableStudents from "./TableStudents";

export default function Students(props) {
  const { image, name, author, bidders, download, currentbid } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");

  const [students, setStudents] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [course, setCourse] = useState("");
  const [countStudents, setCountStudents] = useState(0);
  const endPoint = "http://localhost:8000/api";
  let count = 0;
  const [show, setShow] = useState(false);

  //  useEffect(() => {
  //    getAllStudents();
  //  }, []);

  // const handleClick = event => {
  //   setIsShown(true);
  // };

  const getAllStudents = async (event, param) => {
    const response = await axios.get(`${endPoint}/students/${param}/`);
    setCourse(param);
    setStudents(response.data);
    let result = response.data;
    result.map((row) => {
      count++;
    });
    setCountStudents(count);
    setIsShown(true);
    // setShow(!show);
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
                Cantidad Actual: {countStudents}
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
              <Text fontWeight="700" fontSize="1.1rem" color={textColorBid}>
                Cantidad Actual: {countStudents}
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
              <Text fontWeight="700" fontSize="sm" color={textColorBid}>
                Cantidad Actual: {currentbid}
              </Text>
              <Link
                href={download}
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}
              >
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="70px"
                  px="24px"
                  py="5px"
                >
                  Ver conductores
                </Button>
              </Link>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
