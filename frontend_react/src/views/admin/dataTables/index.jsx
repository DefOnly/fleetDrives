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

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import TravelPlanning from "views/admin/dataTables/components/TravelPlanning";
import TravelPlanningDriver from "views/admin/dataTables/components/TravelPlanningDriver";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  let dato = JSON.parse(localStorage.user);
  // console.log(`Hola, status recuperado es: ${dato.statusDriver}`)
  if (dato.status === 1) {
    return (
     <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
       <SimpleGrid
         mb='20px'
         columns={{ sm: 1, md: 1 }}
         spacing={{ base: "20px", xl: "20px" }}>
         <TravelPlanning
           columnsData={columnsDataDevelopment}
           tableData={tableDataDevelopment}
         />
         {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
         {/* <ColumnsTable
           columnsData={columnsDataColumns}
           tableData={tableDataColumns}
         /> */}
         {/* <ComplexTable
           columnsData={columnsDataComplex}
           tableData={tableDataComplex}
         /> */}
       </SimpleGrid>
     </Box>
      );
  }
  else {
      return (
          <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
              <SimpleGrid
                  mb='20px'
                  columns={{ sm: 1, md: 1 }}
                  spacing={{ base: "20px", xl: "20px" }}>
                  <TravelPlanningDriver
                      columnsData={columnsDataDevelopment}
                      tableData={tableDataDevelopment}
                  />
 
                  {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
                  {/* <ColumnsTable
           columnsData={columnsDataColumns}
           tableData={tableDataColumns}
         /> */}
                  {/* <ComplexTable
           columnsData={columnsDataComplex}
           tableData={tableDataComplex}
         /> */}
              </SimpleGrid>
          </Box>
      );
     }
 };
