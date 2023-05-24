// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Información General
      </Text>
      <SimpleGrid columns="2" gap="20px">
        <Information
          boxShadow={cardShadow}
          title="Identificación"
          value="Escuela Rural Riñinahue"
        />
        <Information
          boxShadow={cardShadow}
          title="DECRETO COOPERADOR"
          value="3160/1981"
        />
        <Information boxShadow={cardShadow} title="R.B.D" value="007303-2" />
        <Information
          boxShadow={cardShadow}
          title="DIRECCIÓN"
          value="C.RIÑINAHUE KM. 28"
        />
        <Information
          boxShadow={cardShadow}
          title="SOSTENEDOR"
          value="I.MUNICIPALIDAD DE LAGO RANCO"
        />
        <Information
          boxShadow={cardShadow}
          title="JORNADA"
          value="ESCOLAR COMPLETA DIURNA"
        />
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
          HORARIO FUNCIONAMIENTO: Lunes a jueves 07:30 a 18:00 HRS./Viernes
          07:30 a 15:00 hrs
        </Text>
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
          NOMBRE DIRECTOR: LUIS MEZA CAIHUANTE.
        </Text>
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
          III.- ANTECEDENTES GENERALES. a) MATRÍCULA TOTAL 2022 : 155 alumnos.
          Matrícula Nivel Parvulario(30) : NT1 14 alumnos y NT2 16 alumnos.
          Matrícula Básica : 114 alumnos.
        </Text>
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
          Equipo Profesionales PIE : 02 Educadoras Diferencial 40 hrs. 01
          Psicólogo 15 hrs. 01 Fonoaudiólogo 26 hrs. 01 Terapeuta 06 hrs. 1
          psicopedagoga 08 hrs. 01 Técnico Educ. Diferencial 44 hrs. 01 Auxiliar
          PIE
        </Text>
      </SimpleGrid>
    </Card>
  );
}
