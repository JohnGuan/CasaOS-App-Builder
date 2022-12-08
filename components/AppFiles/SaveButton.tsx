import { Button, ButtonProps } from "@chakra-ui/react";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { useAppData } from "../../modules/CasaOSAppFile";

export default function SaveButton(props: ButtonProps) {
  const [appData, setAppData] = useAppData();

  return (
    <Button
      leftIcon={<HiDocumentArrowDown />}
      onClick={() => {
        const blob = new Blob([JSON.stringify(appData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${appData.name?appData.name+"-":""}appfile.json`;
        a.click();
        URL.revokeObjectURL(url);
      }}
      {...props}
    >
      Save
    </Button>
  )
}