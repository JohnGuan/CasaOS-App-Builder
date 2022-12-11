import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
  HiChevronDown,
  HiSquares2X2,
  HiCog,
} from "react-icons/hi2";
import { fillAppFile2ToAppData, useAppData, useAppImageAgents } from "../../modules/CasaOSAppFile";

export default function AppStoreControl() {
  const {
    isOpen: isPushOpen,
    onOpen: onPushOpen,
    onClose: onPushClose,
  } = useDisclosure();
  const cancelPushRef = useRef();
  const [pushType, setPushType] = useState("0");

  const {
    isOpen: isPullOpen,
    onOpen: onPullOpen,
    onClose: onPullClose,
  } = useDisclosure();
  const cancelPullRef = useRef();
  const [pullData, setPullData] = useState([] as any[]);
  const [pullApp, setPullApp] = useState("");

  const [appData, setAppData] = useAppData();
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
        <MenuItem icon={<HiArrowUpOnSquare />} onClick={onPushOpen}>
          Push to local App Store
          <AlertDialog
            isOpen={isPushOpen}
            leastDestructiveRef={cancelPushRef}
            onClose={onPushClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Push to local App Store
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Text>Please select app's type:</Text>
                  <RadioGroup onChange={setPushType} value={pushType}>
                    <Stack direction="row" marginX="auto">
                      <Radio value="0">Official</Radio>
                      <Radio value="1">Featured</Radio>
                      <Radio value="2">Community</Radio>
                    </Stack>
                  </RadioGroup>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelPushRef} onClick={onPushClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      console.log("Push to App Store");

                      const testAppData = {
                        ...appData,
                        type: parseInt(pushType),
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
                        .then((result) => console.log(result))
                        .catch((error) => console.log("error", error));

                      onPushClose();
                    }}
                    ml={3}
                  >
                    Push
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </MenuItem>
        <MenuItem
          icon={<HiArrowDownOnSquare />}
          onClick={() => {
            console.log("Pull from App Store");
            fetch("/api/appstore/v2/app/newlist")
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                var appStoreList;
                if (result.data) {
                  appStoreList = [
                    ...result.data.community.map((app) => {
                      app.type = 2;
                      return app;
                    }),
                    ...result.data.list.map((app) => {
                      app.type = 0;
                      return app;
                    }),
                    ...result.data.recommend.map((app) => {
                      app.type = 1;
                      return app;
                    }),
                  ];
                  console.log("appStoreList", appStoreList);
                  setPullApp("");
                  setPullData(appStoreList);
                }
              });
            onPullOpen();
          }}
        >
          Pull from App Store
          <AlertDialog
            isOpen={isPullOpen}
            leastDestructiveRef={cancelPullRef}
            onClose={onPullClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Pull to local App Store
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Text>Please select an app:</Text>
                  {pullData ? (
                    <RadioGroup
                      onChange={(value) => {
                        setPullApp(value);
                      }}
                      value={pullApp}
                    >
                      <Stack direction="column" marginX="auto">
                        {pullData.map((app, index) => (
                          <Radio key={app.name} value={index.toString()} isDisabled={!app.github_model}>
                            {app.title}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  ) : (
                    <Text>Loading...</Text>
                  )}
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelPullRef} onClick={onPullClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    isDisabled={pullApp ? false : true}
                    onClick={() => {
                      console.log("Pull from App Store");
                      const pullAppModel = JSON.parse(pullData[parseInt(pullApp)].github_model)
                      console.log("pullAppModel", pullAppModel);
                      setAppData(fillAppFile2ToAppData(pullAppModel, appData));
                      onPullClose();
                    }}
                    ml={3}
                  >
                    Pull
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </MenuItem>
        <MenuItem icon={<HiCog />}>Settings</MenuItem>
      </MenuList>
    </Menu>
  );
}
