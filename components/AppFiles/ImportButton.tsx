import { useRef } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { AppFile1, AppFile2, fillAppFile1ToAppData, fillAppFile2ToAppData, useAppData } from "../../modules/CasaOSAppFile";

export default function ImportButton(props: ButtonProps) {
  const [appData, setAppData] = useAppData();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (text) {
          const data = JSON.parse(text as string);
          if (data.version === "1.0") {
            setAppData(fillAppFile1ToAppData(data, appData));
          } else if (data.version === "2.0") {
            console.log("2.0 data", data);
            setAppData(fillAppFile2ToAppData(data, appData));
          } else {
            alert("Unsupported App File Version");
          }
          console.log("data", data);
          console.log("appData", appData);
        }
      };
      reader.readAsText(file);

      e.target.value = "";
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        leftIcon={<HiDocumentArrowUp />}
        colorScheme="blue"
        onClick={() => fileInputRef.current?.click()}
        {...props}
      >
        Import
      </Button>
      <input
        type="file"
        accept=".json"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
    </>
  );
}
