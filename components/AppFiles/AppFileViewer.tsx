import { useColorMode } from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { AppFile2, useAppData } from "../../modules/CasaOSAppFile";
import {atomOneDark, atomOneLight} from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function JSONViewer() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [appData, setAppData] = useAppData();
  const json = JSON.stringify(appData, null, 2);

  return (
    <SyntaxHighlighter
      language="json"
      showLineNumbers
      style={colorMode === "dark" ? atomOneDark : atomOneLight}
      customStyle={{ height: "100%" }}
    >
      {json}
    </SyntaxHighlighter>
  );
}
