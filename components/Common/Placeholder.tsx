import { Box, BoxProps } from "@chakra-ui/react";

export default function Placeholder(props: BoxProps) {
  return <Box role="presentation" py="3" px="4" color="on-accent" {...props} />;
}
