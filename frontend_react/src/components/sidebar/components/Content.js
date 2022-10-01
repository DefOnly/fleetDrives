// chakra imports
import { Box, Flex, Stack, Heading, useColorModeValue, Icon } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
// import SidebarCard from "components/sidebar/components/SidebarCard";
import React from "react";
import { FaBus } from "react-icons/fa";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  const textColor = useColorModeValue("navy.700", "dark");
  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <Icon as={FaBus} fontSize="3rem" position="relative" bottom="0.5rem" mb="4rem" ml="2.8rem"/>
      <Heading color={textColor} fontSize="30px" mb="10px" position="absolute" ml="6.5rem">
        fleetDrives
      </Heading>
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      <Box
        ps="20px"
        pe={{ md: "16px", "2xl": "0px" }}
        mt="60px"
        mb="40px"
        borderRadius="30px"
      >
        {/* <SidebarCard /> */}
      </Box>
    </Flex>
  );
}

export default SidebarContent;
