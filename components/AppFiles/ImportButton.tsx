import { useRef } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { AppFile1, AppFile2, useAppData } from "../../modules/CasaOSAppFile";

function fillAppFile1ToAppData(appFile1: AppFile1 | any, appData: any): AppFile2 {
  return{
    ...appData,
    version: "2.0",
    title: appFile1.label || "",
    name: appFile1.label?.toLowerCase() || "",
    icon: appFile1.icon || "",
    overview: appFile1.description || "",
    container: {
      ...appData.container,
      image: appFile1.image || "",
      privileged: appFile1.privileged || false,
      network_model: appFile1.network_model || "bridge",
      web_ui: {
        ...appData.container?.web_ui,
        path: appFile1.index || "",
      },
      ports:
        appFile1.ports?.map(
          (port: { container: any; host: any; protocol: any; desc: any }) => ({
            container: port.container || "",
            host: port.host || "",
            type: port.protocol || "tcp",
            allocation: "automatic",
            configurable: "basic",
            description: port.desc || "",
          })
        ) || [],
      volumes:
        appFile1.volumes?.map(
          (volume: { container: any; host: any; desc: any }) => ({
            container: volume.container || "",
            host: volume.host || "",
            mode: "rw",
            allocation: "automatic",
            configurable: "basic",
            description: volume.desc || "",
          })
        ) || [],
      devices:
        appFile1.devices?.map(
          (device: { container: any; host: any; desc: any }) => ({
            container: device.container || "",
            host: device.host || "",
            allocation: "optional",
            configurable: "basic",
            description: device.desc || "",
          })
        ) || [],
      envs:
        appFile1.envs?.map((env: { container: any; host: any; desc: any }) => ({
          key: env.container || "",
          value: env.host || "",
          allocation: "optional",
          configurable: "basic",
          description: env.desc || "",
        })) || [],
      cap_add: appFile1.cap_add || [],
      restart_policy: appFile1.restart || "unless-stopped",
      cmd: appFile1.cmd || [],
    },
  }
}

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
            setAppData(data as AppFile2);
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
