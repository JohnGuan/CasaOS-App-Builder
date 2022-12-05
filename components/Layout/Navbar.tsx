import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      as="nav"
      role="navigation"
      bg="bg-accent"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <Container maxW="8xl" paddingY="1rem">
      <HStack spacing="10" justify="space-between">
        <Heading as="h1" size="lg">
          CasaOS App Builder
        </Heading>
        <Flex justify="space-between" flex="1">
          <ButtonGroup variant="link" spacing="8"></ButtonGroup>
          <HStack spacing="3">
            <IconButton
              aria-label={"Switch to " + (colorMode === "dark" ? "light" : "dark") + " mode"}
              icon={colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
      </HStack>
      </Container>
    </Box>
  );
}
