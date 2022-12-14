import {
  Button,
  ButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import JSZip from "jszip";
import {
  HiArrowDownTray,
  HiDocumentArrowDown,
  HiFolderArrowDown,
} from "react-icons/hi2";
import {
  AppFile2,
  useAppData,
  useAppImageAgents,
} from "../../modules/CasaOSAppFile";

function getBlobFromUrl(url: string) {
  return fetch(url).then((r) => r.blob());
}

function saveAppFile(outputAppData: AppFile2 | any) {
  const blob = new Blob([JSON.stringify(outputAppData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${
    outputAppData.name ? outputAppData.name + "-" : ""
  }appfile.json`;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

function saveAppFileZip(
  folderName: string,
  appData: AppFile2,
  outputAppData: AppFile2 | any,
  appImageAgents: any
) {
  var zip = new JSZip();
  zip.file(
    `${folderName}/appfile.json`,
    JSON.stringify(outputAppData, null, 2)
  );
  !appData.icon?.startsWith("http") && appImageAgents.icon
    ? zip.file(
        `${folderName}/${appData.icon}`,
        getBlobFromUrl(appImageAgents.icon)
      )
    : null;
  !appData.thumbnail?.startsWith("http") && appImageAgents.thumbnail
    ? zip.file(
        `${folderName}/${appData.thumbnail}`,
        getBlobFromUrl(appImageAgents.thumbnail)
      )
    : null;
  appData.screenshots?.map((screenshot, i) => {
    !screenshot.startsWith("http") && appImageAgents.screenshots[i]
      ? zip.file(
          `${folderName}/${screenshot}`,
          getBlobFromUrl(appImageAgents.screenshots[i])
        )
      : null;
  });

  zip.generateAsync({ type: "blob" }).then(function (content) {
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${folderName}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  });
}

export default function SaveButton(props: ButtonProps) {
  const [appData, setAppData] = useAppData();
  const [appImageAgents, setAppImageAgents] = useAppImageAgents();

  const folderName = appData.title?.replace(/[^a-z0-9-]/gi, "");
  const outputAppData = {
    ...appData,
    icon: appData.icon?.startsWith("http")
      ? appData.icon
      : `https://cdn.jsdelivr.net/gh/IceWhaleTech/CasaOS-AppStore@main/Apps/${folderName}/${appData.icon}`,
    thumbnail: appData.thumbnail?.startsWith("http")
      ? appData.thumbnail
      : `https://cdn.jsdelivr.net/gh/IceWhaleTech/CasaOS-AppStore@main/Apps/${folderName}/${appData.thumbnail}`,
    screenshots: appData.screenshots
      ? appData.screenshots.map((screenshot) =>
          screenshot.startsWith("http")
            ? screenshot
            : `https://cdn.jsdelivr.net/gh/IceWhaleTech/CasaOS-AppStore@main/Apps/${folderName}/${screenshot}`
        )
      : [],
    latest_update_date: Math.round(new Date().getTime() / 1000).toString(),
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu isOpen={isOpen} offset={[0, 0]}>
      <MenuButton
        as={Button}
        leftIcon={<HiArrowDownTray />}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        {...props}
      >
        Save
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
        <MenuItem
          icon={<HiDocumentArrowDown />}
          onClick={() => saveAppFile(outputAppData)}
        >
          {"App File (.json)"}
        </MenuItem>
        <MenuItem
          icon={<HiFolderArrowDown />}
          onClick={() =>
            saveAppFileZip(folderName, appData, outputAppData, appImageAgents)
          }
        >
          {"App Package (.zip)"}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
