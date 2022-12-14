import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import { useState } from "react";
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
  const [isPushing, setIsPushing] = useState(false);

  return (
    <Button
      leftIcon={<HiCircleStack />}
      isLoading={isPushing}
      colorScheme="blue"
      loadingText="Pushing..."
      onClick={() => {
        console.log("Push to App Store");
        setIsPushing(true);
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
            ? appData.screenshots.map((screenshot, i) =>
                screenshot.startsWith("http")
                  ? screenshot
                  : appImageAgents.screenshots[i]
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
          .then((response) => {
            console.log("push response",response);
            return response.text()
          })
          .then((result) => {
            console.log("push result", result);
            if (result) {
              toast({
                title: "Pushed to App Store",
                description: "Your app has been pushed to the App Store.",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              setCurrentAppID(JSON.parse(result).data.id || -1);
              updateAppStoreAppList(setAppStoreAppList);
            } else{
              throw new Error("No result");
            }
          })
          .catch((error) => {
            console.log("push error", error);
            toast({
              title: "Push to App Store failed",
              description: "Your app could not be pushed to the App Store.",
              position: "top",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          })
          .finally(() => {
            setIsPushing(false);
          });
      }}
      {...props}
    >
      To App Store
    </Button>
  );
}
