/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  AlertDescription,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
// import Banner from "views/admin/marketplace/components/Banner";
// import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import Students from "components/card/Students";
import Card from "components/card/Card.js";
import AuthUser from "views/auth/signIn/AuthUser";
import axios from "axios";
import { useState, useCallback } from "react";

// Assets
import Nft1 from "assets/img/avatars/parvulo.jpg";
import Nft2 from "assets/img/avatars/basica.jpg";
import Nft3 from "assets/img/avatars/drivers.jpg";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const endPoint = "http://localhost:8000/api";
  //const { getUser } = AuthUser();
  const getUser = () => {
    const userString = localStorage.getItem("user");
    const userDetail = JSON.parse(userString);
    return userDetail;
  };
  let dato = JSON.parse(localStorage.user);
  if (dato.status === 1) {
    return (
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Grid
          mb="20px"
          gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
          gap={{ base: "20px", xl: "20px" }}
          display={{ base: "block", xl: "grid" }}
        >
          <Flex
            flexDirection="column"
            gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
          >
            {/* <Banner /> */}
            <Flex direction="column">
              <Flex
                mt="45px"
                mb="20px"
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "center" }}
              >
                <Text
                  color={textColor}
                  fontSize="2xl"
                  ms="24px"
                  fontWeight="700"
                >
                  ESTUDIANTES - NIVELES
                </Text>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 1 }} gap="20px">
                <Students
                  name="PÁRVULO"
                  image={Nft1}
                  currentbid="0.91 ETH"
                  download="#"
                />
                <Students
                  name="BÁSICA"
                  image={Nft2}
                  currentbid="0.91 ETH"
                  download="#"
                />
                <Students
                  name="CONDUCTORES"
                  image={Nft3}
                  currentbid="0.91 ETH"
                  download="#"
                />
              </SimpleGrid>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
          ></Flex>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="150px"
        >
          <AlertIcon boxSize="40px" mr={0} alignItems="center" />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            ACCESO RESTRINGIDO!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Este modulo esta disponible solo para el usuario Administrador.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }
}
