import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    300: "#68D391",
    500: "#0CA25F",
    600: "#0A864F",
    700: "#086F42",
    800: "#075C37",
    900: "#CC0000",
  },
};

const customTheme = extendTheme({ colors });

export default customTheme;
