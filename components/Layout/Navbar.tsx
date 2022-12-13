import {
  Box,
  BoxProps,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import PushButton from "../AppFiles/PushButton";
import SaveButton from "../AppFiles/SaveButton";

export default function Navbar(props: BoxProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      as="nav"
      role="navigation"
      bg="bg-accent"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      {...props}
    >
      <Container maxW="8xl" paddingY="1rem">
        <HStack spacing="10" justify="space-between">
          <Heading as="h1" size="lg">
            CasaOS App Builder
          </Heading>
          <Flex justify="space-between" flex="1">
            <ButtonGroup spacing="0.5rem">
              <IconButton
                aria-label={
                  "Switch to " +
                  (colorMode === "dark" ? "light" : "dark") +
                  " mode"
                }
                icon={colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
                onClick={toggleColorMode}
              />
            </ButtonGroup>
            <HStack spacing="0.5rem">
              <SaveButton />
              <PushButton />
            </HStack>
          </Flex>
        </HStack>
      </Container>
    </Box>
  );
}
