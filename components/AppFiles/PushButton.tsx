import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import { HiCircleStack } from "react-icons/hi2";
import {
  useAppData,
  useAppImageAgents,
  useAppStoreAppList,
  useCurrentAppID,
  useCurrentAppType,
  updateAppStoreAppList,
} from "../../modules/CasaOSAppFile";

export default function PushButton(props: ButtonProps) {
  const toast = useToast();
  const [appData, setAppData] = useAppData();
  const [currentAppID, setCurrentAppID] = useCurrentAppID();
  const [currentAppType, setCurrentAppType] = useCurrentAppType();
  const [appImageAgents, setAppImageAgents] = useAppImageAgents();
  const [appStoreAppList, setAppStoreAppList] = useAppStoreAppList();

  return (
    <Button
      leftIcon={<HiCircleStack />}
      colorScheme="blue"
      onClick={() => {
        console.log("Push to App Store");
        const testAppData = {
          ...appData,
          id: currentAppID || -1,
          type: currentAppType || 0,
          icon: appData.icon?.startsWith("http")
            ? appData.icon
            : appImageAgents.icon,
          thumbnail: appData.thumbnail?.startsWith("http")
            ? appData.thumbnail
            : appImageAgents.thumbnail,
          screenshots: appData.screenshots
            ? appData.screenshots.map((screenshot) =>
                screenshot.startsWith("http")
                  ? screenshot
                  : appImageAgents.screenshots[0]
              )
            : [],
          latest_update_date: Math.round(
            new Date().getTime() / 1000
          ).toString(),
        };

        var requestOptions = {
          method: "POST",
          body: JSON.stringify(testAppData) || "",
        };

        fetch("/api/appstore/v2/app/add", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result)
            toast({
              title: "Pushed to App Store",
              description: "Your app has been pushed to the App Store.",
              position: "top",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            updateAppStoreAppList(setAppStoreAppList);
          })
          .catch((error) => {
            console.log("error", error)
            toast({
              title: "Push to App Store failed",
              description: "Your app could not be pushed to the App Store.",
              position: "top",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          });
      }}
      {...props}
    >
      To App Store
    </Button>
  );
}
