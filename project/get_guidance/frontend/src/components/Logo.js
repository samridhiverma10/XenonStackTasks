import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import LogoPic from "../components/logos/logo.png";
export default function Logo(props) {
  return (
    <Box {...props} mr={5}>
      <Image w="200px" src={LogoPic} alt="Logo" />
    </Box>
  );
}
