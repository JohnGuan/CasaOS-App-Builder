import {
  Button,
  IconButton,
  ButtonGroup,
  HStack,
  VStack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiArrowPath, HiTrash } from "react-icons/hi2";
import {
  fillAppFile2ToAppData,
  updateAppStoreAppList,
  useAppData,
  useAppStoreAppList,
  useCurrentAppID,
  useCurrentAppType,
} from "../../modules/CasaOSAppFile";
import NewButton from "./NewButton";
import OpenButton from "./OpenButton";



export default function AppFileSidebar() {
  const toast = useToast();
  const [appStoreAppList, setAppStoreAppList] = useAppStoreAppList();
  const [currentAppID, setCurrentAppID] = useCurrentAppID();
  const [currentAppType, setCurrentAppType] = useCurrentAppType();
  const [appData, setAppData] = useAppData();

  useEffect(() => {
    updateAppStoreAppList(setAppStoreAppList);
  }, []);

  return (
    <>
      <VStack spacing="1rem" height="100%">
        <HStack justifyContent="center" width="100%">
          <NewButton size="sm" />
          <OpenButton size="sm" />
        </HStack>
        <VStack padding="0.5rem" width="100%" border="1px" borderRadius="0.5rem">
          <Text as="b">Current Editing App</Text>
          <Text as="b" fontSize="sm">
            App ID
          </Text>
          <HStack>
            <Button
              size="xs"
              colorScheme="blue"
              variant={currentAppID === -1 ? "solid" : "outline"}
              onClick={() => setCurrentAppID(-1)}
            >
              New App
            </Button>
            <NumberInput
              width="6rem"
              size="xs"
              value={currentAppID}
              onChange={(valueStr, valueNum) => setCurrentAppID(valueNum)}
              min={-1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>

          <Text as="b" fontSize="sm">
            App Type
          </Text>
          <ButtonGroup
            isAttached
            size="xs"
            width="100%"
            colorScheme="blue"
          >
            <Button
              variant={currentAppType === 0 ? "solid" : "outline"}
              onClick={() => {
                setCurrentAppType(0);
              }}
            >
              Official
            </Button>
            <Button
              variant={currentAppType === 1 ? "solid" : "outline"}
              onClick={() => {
                setCurrentAppType(1);
              }}
            >
              Featured
            </Button>
            <Button
              variant={currentAppType === 2 ? "solid" : "outline"}
              onClick={() => {
                setCurrentAppType(2);
              }}
            >
              Community
            </Button>
          </ButtonGroup>
        </VStack>

        <Text as="b">
          Apps{" "}
          <IconButton
            aria-label="Refresh"
            size="xs"
            icon={<HiArrowPath />}
            onClick={() => updateAppStoreAppList(setAppStoreAppList)}
          />
        </Text>
        <Text fontSize="xs">From local App Store</Text>
        <VStack height="100%" paddingX="1rem" overflowY="scroll">
          {appStoreAppList &&
            appStoreAppList.map((app) => {
              return (
                <ButtonGroup
                  key={app.id}
                  isAttached
                  size="xs"
                  width="100%"
                  colorScheme="blue"
                  variant={"outline"}
                >
                  <Button
                    flexGrow="1"
                    variant={app.id === currentAppID ? "solid" : "outline"}
                    isDisabled={!app.github_model}
                    onClick={() => {
                      setCurrentAppID(app.id);
                      setCurrentAppType(app.type);
                      setAppData(
                        fillAppFile2ToAppData(
                          JSON.parse(app.github_model),
                          appData
                        )
                      );
                    }}
                  >
                    {app.title}
                  </Button>
                  <Tooltip label={app.id.toString()} placement="right">
                    <Button onClick={() => setCurrentAppID(app.id)}>ID</Button>
                  </Tooltip>
                  <Tooltip label="Delete" placement="right">
                    <IconButton
                      aria-label="Delete"
                      icon={<HiTrash />}
                      onClick={() => {
                        console.log("Delete app", app);
                        fetch(`/api/appstore/v2/app/${app.id}`, {
                          method: "DELETE",
                        })
                          .then((response) => response.json())
                          .then((result) => {
                            console.log(result);
                            toast({
                              title: `App ${app.title} (ID:${app.id}) deleted.`,
                              status: "success",
                              duration: 3000,
                              isClosable: true,
                              position: "top",
                            });
                            updateAppStoreAppList(setAppStoreAppList);
                          });
                      }}
                    />
                  </Tooltip>
                </ButtonGroup>
              );
            })}
        </VStack>
      </VStack>
    </>
  );
}
