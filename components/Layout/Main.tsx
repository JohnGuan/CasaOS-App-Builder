import { Container, Flex, FlexProps } from "@chakra-ui/react";
import Placeholder from "../Common/Placeholder";

export default function Main(props: FlexProps) {
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="1rem" {...props}>
      <Container flex="1" maxW="8xl" paddingY="1rem">
        <Placeholder minH="lg" bg="bg-accent">
          Main
        </Placeholder>
      </Container>
    </Flex>
  )
}