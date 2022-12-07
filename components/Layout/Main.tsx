import { Container, Flex, FlexProps } from "@chakra-ui/react";
import Placeholder from "../Common/Placeholder";
import EditorPanel from "../Editor/EditorPanel";

export default function Main(props: FlexProps) {
  return (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      py="1rem"
      height="100%"
      overflow="hidden"
      {...props}
    >
      <Container flex="1" maxW="8xl" paddingY="1rem" height="100%">
        <EditorPanel />
      </Container>
    </Flex>
  );
}
