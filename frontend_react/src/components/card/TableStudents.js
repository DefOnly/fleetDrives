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
} from "@chakra-ui/react";
// import TablesTableRow from "components/card/";
import { useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { FaUserGraduate } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";

const TableStudents = ({ students, course }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const endPoint = "http://localhost:8000/api";
  const [studentInfo, setStudentInfo] = useState([]);
  const [isShown, setIsShown] = useState(false);
  let count = 1;

  const getInfoStudent = async (event, param) => {
    const response = await axios.get(`${endPoint}/studentInfo/${param}/`);
    setStudentInfo(response.data);
    setIsShown(true);
    onOpen();
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
                  <Button background="#9AE6B4" color="white" hover="#9ae6b469">
                    Reasignar conductor
                  </Button>
                  <Button background="#E53E3E" color="white" hover="#e53e3e8c">
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        {isShown && (
          <ModalContent>
            <ModalHeader>Editar Estudiante</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Rut</FormLabel>
                <Input
                  ref={initialRef}
                  value={studentInfo[0].rut}
                  placeholder="Rut"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Nombres y Apellidos</FormLabel>
                <Input
                  placeholder="Nombres y Apellidos"
                  value={
                    studentInfo[0].name +
                    studentInfo[0].lastNameP +
                    studentInfo[0].lastNameM
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Dirección</FormLabel>
                <Input placeholder="" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Comuna</FormLabel>
                <Input placeholder="" />
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
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Guardar cambios
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
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
