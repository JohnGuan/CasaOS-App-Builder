import {
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Switch,
} from "@chakra-ui/react";
import {
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
  HiChevronDown,
  HiSquares2X2,
  HiCog,
} from "react-icons/hi2";
import { useAppData, useAppImageAgents } from "../../modules/CasaOSAppFile";

export default function AppStoreControl() {
  const [appData, setUseAppData] = useAppData();
  const [appImageAgents, setAppImageAgents] = useAppImageAgents();

  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<HiSquares2X2 />}
        rightIcon={<HiChevronDown />}
      >
        App Store
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<HiArrowUpOnSquare />}
          onClick={() => {
            console.log("Push to local App Store");
            var myHeaders = new Headers();
            myHeaders.append(
              "Authorization",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IiIsInBhc3N3b3JkIjoiIiwiZXhwIjoxNjcwNTk1MDM0LCJpc3MiOiJnaW4tYmxvZyJ9.CedzGCsshsxEqA5LDv6fYbs2Tom9N2a4rCDwifE4KJE"
            );
            myHeaders.append("Content-Type", "application/json");

            const testAppData = {
              ...appData,
              icon: appData.icon?.startsWith("http") ? appData.icon : appImageAgents.icon,
              thumbnail: appData.thumbnail?.startsWith("http") ? appData.thumbnail : appImageAgents.thumbnail,
              screenshots: appData.screenshots ? appData.screenshots.map((screenshot) => screenshot.startsWith("http") ? screenshot : appImageAgents.screenshots[0]) : [],
            }

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: testAppData ? JSON.stringify(testAppData) : "",
              redirect: "follow",
            };

            fetch("http://192.168.2.11:8091/v2/app/add", requestOptions as any)
              .then((response) => response.text())
              .then((result) => console.log(result))
              .catch((error) => console.log("error", error));
          }}
        >
          Push to local App Store
        </MenuItem>
        <MenuItem icon={<HiCog />}>Settings</MenuItem>
      </MenuList>
    </Menu>
  );
}
