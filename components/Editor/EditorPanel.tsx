import {
  AspectRatio,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import {
  useAppData,
  appCategory,
  AppFile2ContainerPortsTypeEnum,
  AppFile2ContainerPortsAllocationEnum,
  AppFile2ContainerPortsConfigurableEnum,
  AppFile2ContainerVolumesModeEnum,
  AppFile2ContainerVolumesAllocationEnum,
  AppFile2ContainerVolumesConfigurableEnum,
  AppFile2ContainerEnvsConfigurableEnum,
  AppFile2ContainerDevicesAllocationEnum,
  AppFile2ContainerDevicesConfigurableEnum,
  AppFile2ContainerRestartPolicyEnum,
  appCaps,
  useAppImageAgents,
} from "../../modules/CasaOSAppFile";
import AppFileViewer from "../AppFiles/AppFileViewer";
import OpenButton from "../AppFiles/OpenButton";
import NewButton from "../AppFiles/NewButton";
import AppFileSidebar from "../AppFiles/AppFileSidebar";

function Important() {
  return (
    <Tooltip label="Required" placement="top">
      <Text as="b" color="red" width="1rem">
        *
      </Text>
    </Tooltip>
  );
}

export default function EditorPanel() {
  const [appImageAgents, setAppImageAgents] = useAppImageAgents();
  const [appData, setAppData] = useAppData();

  const toast = useToast();

  useEffect(() => {
    console.log("appData", appData);
  }, [appData]);

  useEffect(() => {
    console.log("appImageAgents", appImageAgents);
  }, [appImageAgents]);

  return (
    <Flex direction="row" height="100%">
      <Box
        flex="1"
        paddingX="1rem"
        maxWidth="18rem"
        height="100%"
      >
        <AppFileSidebar />
      </Box>

      <Box flex="1" paddingX="1rem" height="100%" overflowY="scroll">
        <FormControl>
          <FormLabel>
            <Important /> Version
          </FormLabel>
          <Select
            value={appData.version}
            onChange={(e) =>
              setAppData({
                ...appData,
                version: e.target.value,
              })
            }
          >
            <option value="2.0">2.0</option>
          </Select>
          <FormHelperText>App File Version</FormHelperText>
        </FormControl>

        <br />

        <FormControl>
          <FormLabel>
            <Important /> Title
          </FormLabel>
          <Input
            value={appData.title}
            onChange={(e) =>
              setAppData({
                ...appData,
                title: e.target.value,
              })
            }
          />
          <FormHelperText>{`e.g. "CasaOS"`}</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            <Important /> Name
          </FormLabel>
          <Input
            value={appData.name}
            onChange={(e) =>
              setAppData({
                ...appData,
                name: e.target.value,
              })
            }
          />
          <FormHelperText>{`e.g. "casaos"`}</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            <Important /> Icon
          </FormLabel>
          <InputGroup>
            {appData.icon ? (
              <InputLeftElement>
                <img
                  src={
                    appData.icon?.startsWith("http")
                      ? appData.icon
                      : appImageAgents.icon
                  }
                  width="32"
                  height="32"
                />
              </InputLeftElement>
            ) : null}

            <Input
              value={appData.icon}
              paddingRight="5rem"
              onChange={(e) => {
                setAppData({
                  ...appData,
                  icon: e.target.value,
                });
                if (!e.target.value) {
                  setAppImageAgents({
                    ...appImageAgents,
                    icon: "",
                  });
                }
              }}
            />
            <InputRightElement width="min-content" paddingRight="0.25rem">
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    const reader = new FileReader();
                    if (file) {
                      const filename = file.name;
                      const fileext = filename.split(".").pop();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setAppImageAgents({
                          ...appImageAgents,
                          icon: reader.result as string,
                        });
                      };
                      setAppData({
                        ...appData,
                        icon: "icon." + fileext,
                      });
                    }
                  };
                  input.click();
                  input.remove();
                }}
              >
                Select
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>{`e.g. "https://casaos.com/icon.png".`}</FormHelperText>
          <FormHelperText>Image should be at least 192*192px.</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            <Important /> Tagline
          </FormLabel>
          <Input
            value={appData.tagline}
            onChange={(e) =>
              setAppData({
                ...appData,
                tagline: e.target.value,
              })
            }
          />
          <FormHelperText>
            A one-sentence description of the App features or value
          </FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            <Important /> Overview
          </FormLabel>
          <Textarea
            value={appData.overview}
            onChange={(e) =>
              setAppData({
                ...appData,
                overview: e.target.value,
              })
            }
          />
          <FormHelperText>
            A longer description of the App features or value
          </FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            <Important /> Thumbnail
          </FormLabel>
          {appData.thumbnail ? (
            <AspectRatio
              marginY="0.5rem"
              alignItems="center"
              ratio={16 / 9}
              maxW="24rem"
            >
              <Image
                borderRadius="0.5rem"
                src={
                  appData.thumbnail?.startsWith("http")
                    ? appData.thumbnail
                    : appImageAgents.thumbnail
                }
              />
            </AspectRatio>
          ) : null}
          <InputGroup>
            <Input
              value={appData.thumbnail}
              paddingRight="5rem"
              onChange={(e) => {
                setAppData({
                  ...appData,
                  thumbnail: e.target.value,
                });
                if (!e.target.value) {
                  setAppImageAgents({
                    ...appImageAgents,
                    thumbnail: "",
                  });
                }
              }}
            />
            <InputRightElement width="min-content" paddingRight="0.25rem">
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    const reader = new FileReader();
                    if (file) {
                      const filename = file.name;
                      const fileext = filename.split(".").pop();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setAppImageAgents({
                          ...appImageAgents,
                          thumbnail: reader.result as string,
                        });
                      };
                      const blob = new Blob([file], { type: file.type });
                      setAppData({
                        ...appData,
                        thumbnail: "thumbnail." + fileext,
                      });
                    }
                  };
                  input.click();
                  input.remove();
                }}
              >
                Select
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>Thumbnail url for Featured Apps list.</FormHelperText>
          <FormHelperText>Image should be at least 1280*720px.</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            <Important /> Screenshots{" "}
            <Button
              colorScheme="blue"
              size="xs"
              onClick={() => {
                // add new screenshot to appData.screenshots
                if (appData.screenshots) {
                  setAppData({
                    ...appData,
                    screenshots: [...appData.screenshots, ""],
                  });
                } else {
                  setAppData({
                    ...appData,
                    screenshots: [""],
                  });
                }
                // add new screenshot to appImageAgents.screenshots
                if (appImageAgents.screenshots) {
                  setAppImageAgents({
                    ...appImageAgents,
                    screenshots: [...appImageAgents.screenshots, ""],
                  });
                } else {
                  setAppImageAgents({
                    ...appImageAgents,
                    screenshots: [""],
                  });
                }
              }}
            >
              Add
            </Button>
          </FormLabel>
          {appData.screenshots?.length ? (
            <Flex
              flexDirection="row"
              width="100%"
              justifyContent="center"
              marginBottom="0.5rem"
            >
              {appData.screenshots.map((screenshot, index) =>
                appData.screenshots?.[index] ||
                appImageAgents.screenshots[index] ? (
                  <AspectRatio
                    key={index}
                    ratio={16 / 9}
                    width="24rem"
                    marginLeft={index > 0 ? "0.5rem" : "0"}
                  >
                    <Image
                      borderRadius="0.5rem"
                      src={
                        screenshot.startsWith("http")
                          ? screenshot
                          : appImageAgents.screenshots[index]
                      }
                    />
                  </AspectRatio>
                ) : null
              )}
            </Flex>
          ) : null}
          {appData.screenshots?.length ? (
            appData.screenshots.map((screenshot, index) => (
              <InputGroup
                key={index}
                marginTop={index != 0 ? "0.25rem" : "auto"}
              >
                <Input
                  key={index}
                  paddingRight="7rem"
                  value={screenshot}
                  onChange={(e) => {
                    setAppData({
                      ...appData,
                      screenshots: appData.screenshots?.map((screenshot, i) =>
                        i === index ? e.target.value : screenshot
                      ),
                    });
                    if (!e.target.value) {
                      setAppImageAgents({
                        ...appImageAgents,
                        screenshots: appImageAgents.screenshots.map(
                          (screenshot, i) => (i === index ? "" : screenshot)
                        ),
                      });
                    }
                  }}
                />
                <InputRightElement width="min-content" paddingRight="0.25rem">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        const reader = new FileReader();
                        if (file) {
                          const filename = file.name;
                          const fileext = filename.split(".").pop();
                          reader.readAsDataURL(file);
                          reader.onloadend = () => {
                            setAppImageAgents({
                              ...appImageAgents,
                              screenshots: appImageAgents.screenshots.map(
                                (screenshot, i) =>
                                  i === index
                                    ? (reader.result as string)
                                    : screenshot
                              ),
                            });
                          };
                          setAppData({
                            ...appData,
                            screenshots: appData.screenshots?.map(
                              (screenshot, i) =>
                                i === index
                                  ? "screenshot-" + (index + 1) + "." + fileext
                                  : screenshot
                            ),
                          });
                        }
                      };
                      input.click();
                      input.remove();
                    }}
                  >
                    Select
                  </Button>
                  <IconButton
                    aria-label="Delete Screenshot"
                    icon={<MdDelete />}
                    marginLeft="0.25rem"
                    size="sm"
                    onClick={() => {
                      // Delete screenshot from appData
                      setAppData({
                        ...appData,
                        screenshots: appData.screenshots
                          ?.filter((screenshot, i) => i !== index)
                          .map((screenshot, i) =>
                            screenshot.startsWith("screenshot-")
                              ? "screenshot-" + (i + 1) + ".png"
                              : screenshot
                          ),
                      });
                      // Delete screenshot from appImageAgents
                      setAppImageAgents({
                        ...appImageAgents,
                        screenshots: appImageAgents.screenshots.filter(
                          (screenshot, i) => i !== index
                        ),
                      });
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            ))
          ) : (
            <Text>No screenshots yet. Please add one.</Text>
          )}
          <FormHelperText>App screenshots</FormHelperText>
          <FormHelperText>Images should be at least 1280*720px.</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            <Important /> Category
          </FormLabel>
          <VStack alignItems="start" marginBottom="0.5rem">
            {appData.category?.length || false ? (
              appData.category?.map((category, index) => (
                <Tag key={index}>
                  <TagLabel>{category}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      setAppData({
                        ...appData,
                        category: appData.category?.filter(
                          (category, i) => i !== index
                        ),
                      });
                    }}
                  />
                </Tag>
              ))
            ) : (
              <Text>No category yet. Please add one.</Text>
            )}
          </VStack>
          <Select
            placeholder="Select Category"
            size="sm"
            onChange={(e) => {
              if (!appData.category?.includes(e.target.value)) {
                if (appData.category) {
                  setAppData({
                    ...appData,
                    category: [...appData.category, e.target.value],
                  });
                } else {
                  setAppData({
                    ...appData,
                    category: [e.target.value],
                  });
                }
              }
              e.target.value = "";
            }}
          >
            {appCategory.map((category) =>
              appData.category?.includes(category.name) ? null : (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              )
            )}
          </Select>
          <FormHelperText>App category</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            <Important /> Developer
          </FormLabel>
          <HStack spacing="0.5rem">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={appData.developer?.name}
                onChange={(e) => {
                  if (appData.developer) {
                    setAppData({
                      ...appData,
                      developer: {
                        ...appData.developer,
                        name: e.target.value,
                      },
                    });
                  } else {
                    setAppData({
                      ...appData,
                      developer: {
                        name: e.target.value,
                      },
                    });
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Website</FormLabel>
              <Input
                value={appData.developer?.website}
                onChange={(e) => {
                  if (appData.developer) {
                    setAppData({
                      ...appData,
                      developer: {
                        ...appData.developer,
                        website: e.target.value,
                      },
                    });
                  } else {
                    setAppData({
                      ...appData,
                      developer: {
                        website: e.target.value,
                      },
                    });
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Donate Text</FormLabel>
              <Input
                value={appData.developer?.donate_text}
                onChange={(e) => {
                  if (appData.developer) {
                    setAppData({
                      ...appData,
                      developer: {
                        ...appData.developer,
                        donate_text: e.target.value,
                      },
                    });
                  } else {
                    setAppData({
                      ...appData,
                      developer: {
                        donate_text: e.target.value,
                      },
                    });
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Donate Url</FormLabel>
              <Input
                value={appData.developer?.donate_url}
                onChange={(e) => {
                  if (appData.developer) {
                    setAppData({
                      ...appData,
                      developer: {
                        ...appData.developer,
                        donate_url: e.target.value,
                      },
                    });
                  } else {
                    setAppData({
                      ...appData,
                      developer: {
                        donate_url: e.target.value,
                      },
                    });
                  }
                }}
              />
            </FormControl>
          </HStack>
          <FormHelperText>Original developer of this App</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Adaptor</FormLabel>
          <HStack spacing="0.5rem">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={appData.adaptor?.name}
                onChange={(e) => {
                  if (appData.adaptor) {
                    setAppData({
                      ...appData,
                      adaptor: {
                        ...appData.adaptor,
                        name: e.target.value,
                      },
                    });
                  } else {
                    setAppData({
                      ...appData,
                      adaptor: {
                        name: e.target.value,
                      },
                    });
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Website</FormLabel>
              <Input
                value={appData.adaptor?.website}
                onChange={(e) => {
                  if (appData.adaptor) {
                    setAppData({
                      ...appData,
                      adaptor: {
                        ...appData.adaptor,
                        website: e.target.value,
                      },
                    });
                  } else {
                    setAppData({
                      ...appData,
                      adaptor: {
                        website: e.target.value,
                      },
                    });
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Donate Text</FormLabel>
              <Input
                value={appData.adaptor?.donate_text}
                onChange={(e) => {
                  if (appData.adaptor) {
                    setAppData({
                      ...appData,
                      adaptor: {
                        ...appData.adaptor,
                        donate_text: e.target.value,
                      },
                    });
                  } else {
                    setAppData({
                      ...appData,
                      adaptor: {
                        donate_text: e.target.value,
                      },
                    });
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Donate Url</FormLabel>
              <Input
                value={appData.adaptor?.donate_url}
                onChange={(e) => {
                  if (appData.adaptor) {
                    setAppData({
                      ...appData,
                      adaptor: {
                        ...appData.adaptor,
                        donate_url: e.target.value,
                      },
                    });
                  } else {
                    setAppData({
                      ...appData,
                      adaptor: {
                        donate_url: e.target.value,
                      },
                    });
                  }
                }}
              />
            </FormControl>
          </HStack>
          <FormHelperText>Adaptor of this App</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            <Important /> Container
          </FormLabel>
          <Box border="1px" borderRadius="0.5rem" padding="0.5rem">
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                value={appData.container?.image}
                onChange={(e) => {
                  setAppData({
                    ...appData,
                    container: {
                      ...appData.container,
                      image: e.target.value,
                    },
                  });
                }}
              />
              <FormHelperText>
                example: filebrowser/filebrowser:latest
              </FormHelperText>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Shell</FormLabel>
              <Input
                value={appData.container?.shell}
                onChange={(e) => {
                  setAppData({
                    ...appData,
                    container: {
                      ...appData.container,
                      shell: e.target.value,
                    },
                  });
                }}
              />
              <FormHelperText>example: /bin/bash</FormHelperText>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Privileged</FormLabel>
              <Switch
                isChecked={appData.container?.privileged}
                onChange={(e) =>
                  setAppData({
                    ...appData,
                    container: {
                      ...appData.container,
                      privileged: e.target.checked,
                    },
                  })
                }
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Health Check</FormLabel>
              <Input
                value={appData.container?.health_check}
                onChange={(e) => {
                  setAppData({
                    ...appData,
                    container: {
                      ...appData.container,
                      health_check: e.target.value,
                    },
                  });
                }}
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Network</FormLabel>
              <Select
                placeholder="Select Network"
                value={appData.container?.network_model}
                onChange={(e) =>
                  setAppData({
                    ...appData,
                    container: {
                      ...appData.container,
                      network_model: e.target.value,
                    },
                  })
                }
              >
                <option value="host">host</option>
                <option value="bridge">bridge</option>
              </Select>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Web UI</FormLabel>
              <HStack spacing="0.5rem">
                <FormControl>
                  <FormLabel>HTTP</FormLabel>
                  <Input
                    value={appData.container?.web_ui?.http}
                    onChange={(e) => {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          web_ui: {
                            ...appData.container?.web_ui,
                            http: e.target.value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>HTTPS</FormLabel>
                  <Input
                    value={appData.container?.web_ui?.https}
                    onChange={(e) => {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          web_ui: {
                            ...appData.container?.web_ui,
                            https: e.target.value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Path</FormLabel>
                  <Input
                    value={appData.container?.web_ui?.path}
                    onChange={(e) => {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          web_ui: {
                            ...appData.container?.web_ui,
                            path: e.target.value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
              </HStack>
              <FormHelperText>
                Container port and path to access Web UI
              </FormHelperText>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>
                Ports{" "}
                <Button
                  size="xs"
                  colorScheme="blue"
                  onClick={() => {
                    const ports = appData.container?.ports;
                    if (ports) {
                      ports.push({
                        container: "",
                        host: "",
                        type: AppFile2ContainerPortsTypeEnum.Tcp,
                        allocation:
                          AppFile2ContainerPortsAllocationEnum.Automatic,
                        configurable:
                          AppFile2ContainerPortsConfigurableEnum.Basic,
                        description: "",
                      });
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          ports: ports,
                        },
                      });
                    } else {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          ports: [
                            {
                              container: "",
                              host: "",
                              type: AppFile2ContainerPortsTypeEnum.Tcp,
                              allocation:
                                AppFile2ContainerPortsAllocationEnum.Automatic,
                              configurable:
                                AppFile2ContainerPortsConfigurableEnum.Basic,
                              description: "",
                            },
                          ],
                        },
                      });
                    }
                  }}
                >
                  Add
                </Button>
              </FormLabel>
              {appData.container?.ports?.length || false ? (
                appData.container?.ports?.map((port, index) => (
                  <HStack key={index} spacing="0.5rem" marginBottom="1rem">
                    <Box flexGrow="1" paddingLeft="0.5rem" borderLeft="2px">
                      <HStack spacing="0.5rem" marginBottom="0.5rem">
                        <FormControl>
                          <FormLabel>Container</FormLabel>
                          <Input
                            size="sm"
                            type="number"
                            value={port.container}
                            onChange={(e) => {
                              const ports = appData.container?.ports;
                              if (ports) {
                                ports[index].container = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    ports: ports,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Host</FormLabel>
                          <Input
                            size="sm"
                            type="number"
                            value={port.host}
                            onChange={(e) => {
                              const ports = appData.container?.ports;
                              if (ports) {
                                ports[index].host = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    ports: ports,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Type</FormLabel>
                          <Select
                            size="sm"
                            value={port.type}
                            onChange={(e) => {
                              const ports = appData.container?.ports;
                              if (ports) {
                                ports[index].type = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    ports: ports,
                                  },
                                });
                              }
                            }}
                          >
                            {(
                              Object.keys(
                                AppFile2ContainerPortsTypeEnum
                              ) as Array<
                                keyof typeof AppFile2ContainerPortsTypeEnum
                              >
                            ).map((type) => (
                              <option
                                key={type}
                                value={AppFile2ContainerPortsTypeEnum[type]}
                              >
                                {AppFile2ContainerPortsTypeEnum[type]}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </HStack>
                      <HStack spacing="0.5rem">
                        <FormControl>
                          <FormLabel>Allocation</FormLabel>
                          <Select
                            size="sm"
                            value={port.allocation}
                            onChange={(e) => {
                              const ports = appData.container?.ports;
                              if (ports) {
                                ports[index].allocation = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    ports: ports,
                                  },
                                });
                              }
                            }}
                          >
                            {(
                              Object.keys(
                                AppFile2ContainerPortsAllocationEnum
                              ) as Array<
                                keyof typeof AppFile2ContainerPortsAllocationEnum
                              >
                            ).map((type) => (
                              <option
                                key={type}
                                value={
                                  AppFile2ContainerPortsAllocationEnum[type]
                                }
                              >
                                {type}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Configurable</FormLabel>
                          <Select
                            size="sm"
                            value={port.configurable}
                            onChange={(e) => {
                              const ports = appData.container?.ports;
                              if (ports) {
                                ports[index].configurable = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    ports: ports,
                                  },
                                });
                              }
                            }}
                          >
                            {(
                              Object.keys(
                                AppFile2ContainerPortsConfigurableEnum
                              ) as Array<
                                keyof typeof AppFile2ContainerPortsConfigurableEnum
                              >
                            ).map((type) => (
                              <option
                                key={type}
                                value={
                                  AppFile2ContainerPortsConfigurableEnum[type]
                                }
                              >
                                {type}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Description</FormLabel>
                          <Input
                            size="sm"
                            value={port.description}
                            onChange={(e) => {
                              const ports = appData.container?.ports;
                              if (ports) {
                                ports[index].description = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    ports: ports,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                      </HStack>
                    </Box>
                    <IconButton
                      aria-label="Delete Port"
                      icon={<MdDelete />}
                      height="8.5rem"
                      onClick={() => {
                        const ports = appData.container?.ports;
                        if (ports) {
                          ports.splice(index, 1);
                          setAppData({
                            ...appData,
                            container: {
                              ...appData.container,
                              ports: ports,
                            },
                          });
                        }
                      }}
                    />
                  </HStack>
                ))
              ) : (
                <Text>No ports yet.</Text>
              )}
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>
                Volumes{" "}
                <Button
                  size="xs"
                  colorScheme="blue"
                  onClick={() => {
                    const volumes = appData.container?.volumes;
                    if (volumes) {
                      volumes.push({
                        container: "",
                        host: "",
                        mode: AppFile2ContainerVolumesModeEnum.Rw,
                        allocation:
                          AppFile2ContainerVolumesAllocationEnum.Automatic,
                        configurable:
                          AppFile2ContainerVolumesConfigurableEnum.Basic,
                        description: "",
                      });
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          volumes: volumes,
                        },
                      });
                    } else {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          volumes: [
                            {
                              container: "",
                              host: "",
                              mode: AppFile2ContainerVolumesModeEnum.Rw,
                              allocation:
                                AppFile2ContainerVolumesAllocationEnum.Automatic,
                              configurable:
                                AppFile2ContainerVolumesConfigurableEnum.Basic,
                              description: "",
                            },
                          ],
                        },
                      });
                    }
                  }}
                >
                  Add
                </Button>
              </FormLabel>
              {appData.container?.volumes?.length ? (
                appData.container?.volumes.map((volume, index) => (
                  <HStack
                    key={index}
                    spacing="0.5rem"
                    paddingLeft="0.5rem"
                    borderLeft="2px"
                    marginBottom="1rem"
                  >
                    <Box flex="1">
                      <HStack spacing="0.5rem" marginBottom="0.5rem">
                        <FormControl>
                          <FormLabel>Container</FormLabel>
                          <Input
                            size="sm"
                            value={volume.container}
                            onChange={(e) => {
                              const volumes = appData.container?.volumes;
                              if (volumes) {
                                volumes[index].container = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    volumes: volumes,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Host</FormLabel>
                          <Input
                            size="sm"
                            value={volume.host}
                            onChange={(e) => {
                              const volumes = appData.container?.volumes;
                              if (volumes) {
                                volumes[index].host = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    volumes: volumes,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Mode</FormLabel>
                          <Select
                            size="sm"
                            value={volume.mode}
                            onChange={(e) => {
                              const volumes = appData.container?.volumes;
                              if (volumes) {
                                volumes[index].mode = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    volumes: volumes,
                                  },
                                });
                              }
                            }}
                          >
                            {(
                              Object.keys(
                                AppFile2ContainerVolumesModeEnum
                              ) as Array<
                                keyof typeof AppFile2ContainerVolumesModeEnum
                              >
                            ).map((type) => (
                              <option
                                key={type}
                                value={AppFile2ContainerVolumesModeEnum[type]}
                              >
                                {AppFile2ContainerVolumesModeEnum[type]}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </HStack>
                      <HStack spacing="0.5rem">
                        <FormControl>
                          <FormLabel>Allocation</FormLabel>
                          <Select
                            size="sm"
                            value={volume.allocation}
                            onChange={(e) => {
                              const volumes = appData.container?.volumes;
                              if (volumes) {
                                volumes[index].allocation = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    volumes: volumes,
                                  },
                                });
                              }
                            }}
                          >
                            {(
                              Object.keys(
                                AppFile2ContainerVolumesAllocationEnum
                              ) as Array<
                                keyof typeof AppFile2ContainerVolumesAllocationEnum
                              >
                            ).map((type) => (
                              <option
                                key={type}
                                value={
                                  AppFile2ContainerVolumesAllocationEnum[type]
                                }
                              >
                                {type}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Configurable</FormLabel>
                          <Select
                            size="sm"
                            value={volume.configurable}
                            onChange={(e) => {
                              const volumes = appData.container?.volumes;
                              if (volumes) {
                                volumes[index].configurable = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    volumes: volumes,
                                  },
                                });
                              }
                            }}
                          >
                            {(
                              Object.keys(
                                AppFile2ContainerVolumesConfigurableEnum
                              ) as Array<
                                keyof typeof AppFile2ContainerVolumesConfigurableEnum
                              >
                            ).map((type) => (
                              <option
                                key={type}
                                value={
                                  AppFile2ContainerVolumesConfigurableEnum[type]
                                }
                              >
                                {type}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Description</FormLabel>
                          <Input
                            size="sm"
                            value={volume.description}
                            onChange={(e) => {
                              const volumes = appData.container?.volumes;
                              if (volumes) {
                                volumes[index].description = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    volumes: volumes,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                      </HStack>
                    </Box>
                    <IconButton
                      aria-label="Delete Volume"
                      icon={<MdDelete />}
                      height="8.5rem"
                      onClick={() => {
                        const volumes = appData.container?.volumes;
                        if (volumes) {
                          volumes.splice(index, 1);
                          setAppData({
                            ...appData,
                            container: {
                              ...appData.container,
                              volumes: volumes,
                            },
                          });
                        }
                      }}
                    />
                  </HStack>
                ))
              ) : (
                <Text>No volumes yet.</Text>
              )}
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>
                Devices{" "}
                <Button
                  size="xs"
                  colorScheme="blue"
                  onClick={() => {
                    const devices = appData.container?.devices;
                    if (devices) {
                      devices.push({
                        container: "",
                        host: "",
                        allocation:
                          AppFile2ContainerDevicesAllocationEnum.Optional,
                        configurable:
                          AppFile2ContainerDevicesConfigurableEnum.Basic,
                        description: "",
                      });
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          devices: devices,
                        },
                      });
                    } else {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          devices: [
                            {
                              container: "",
                              host: "",
                              allocation:
                                AppFile2ContainerDevicesAllocationEnum.Optional,
                              configurable:
                                AppFile2ContainerDevicesConfigurableEnum.Basic,
                              description: "",
                            },
                          ],
                        },
                      });
                    }
                  }}
                >
                  Add
                </Button>
              </FormLabel>
              {appData.container?.devices?.length ? (
                appData.container.devices.map((device, index) => (
                  <HStack
                    key={index}
                    spacing="0.5rem"
                    marginBottom="1rem"
                    paddingLeft="0.5rem"
                    borderLeft="2px"
                  >
                    <Box flex="1">
                      <HStack spacing="0.5rem" marginBottom="0.5rem">
                        <FormControl>
                          <FormLabel>Container</FormLabel>
                          <Input
                            size="sm"
                            value={device.container}
                            onChange={(e) => {
                              const devices = appData.container?.devices;
                              if (devices) {
                                devices[index].container = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    devices: devices,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Host</FormLabel>
                          <Input
                            size="sm"
                            value={device.host}
                            onChange={(e) => {
                              const devices = appData.container?.devices;
                              if (devices) {
                                devices[index].host = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    devices: devices,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                      </HStack>
                      <HStack spacing="0.5rem">
                        <FormControl>
                          <FormLabel>Allocation</FormLabel>
                          <Select
                            size="sm"
                            value={device.allocation}
                            onChange={(e) => {
                              const devices = appData.container?.devices;
                              if (devices) {
                                devices[index].allocation = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    devices: devices,
                                  },
                                });
                              }
                            }}
                          >
                            {(
                              Object.keys(
                                AppFile2ContainerDevicesAllocationEnum
                              ) as Array<
                                keyof typeof AppFile2ContainerDevicesAllocationEnum
                              >
                            ).map((type) => (
                              <option
                                key={type}
                                value={
                                  AppFile2ContainerDevicesAllocationEnum[type]
                                }
                              >
                                {type}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Configurable</FormLabel>
                          <Select
                            size="sm"
                            value={device.configurable}
                            onChange={(e) => {
                              const devices = appData.container?.devices;
                              if (devices) {
                                devices[index].configurable = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    devices: devices,
                                  },
                                });
                              }
                            }}
                          >
                            {(
                              Object.keys(
                                AppFile2ContainerDevicesConfigurableEnum
                              ) as Array<
                                keyof typeof AppFile2ContainerDevicesConfigurableEnum
                              >
                            ).map((type) => (
                              <option
                                key={type}
                                value={
                                  AppFile2ContainerDevicesConfigurableEnum[type]
                                }
                              >
                                {type}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Description</FormLabel>
                          <Input
                            size="sm"
                            value={device.description}
                            onChange={(e) => {
                              const devices = appData.container?.devices;
                              if (devices) {
                                devices[index].description = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    devices: devices,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                      </HStack>
                    </Box>
                    <IconButton
                      height="8.5rem"
                      aria-label="Delete"
                      icon={<MdDelete />}
                      onClick={() => {
                        const devices = appData.container?.devices;
                        if (devices) {
                          devices.splice(index, 1);
                          setAppData({
                            ...appData,
                            container: {
                              ...appData.container,
                              devices: devices,
                            },
                          });
                        }
                      }}
                    />
                  </HStack>
                ))
              ) : (
                <Text>No devices yet.</Text>
              )}
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>
                Environment Variables{" "}
                <Button
                  size="xs"
                  colorScheme="blue"
                  onClick={() => {
                    const envs = appData.container?.envs;
                    if (envs) {
                      envs.push({
                        key: "",
                        value: "",
                        configurable:
                          AppFile2ContainerEnvsConfigurableEnum.Basic,
                        description: "",
                      });
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          envs: envs,
                        },
                      });
                    } else {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          envs: [
                            {
                              key: "",
                              value: "",
                              configurable:
                                AppFile2ContainerEnvsConfigurableEnum.Basic,
                              description: "",
                            },
                          ],
                        },
                      });
                    }
                  }}
                >
                  Add
                </Button>
              </FormLabel>
              {appData.container?.envs?.length ? (
                appData.container.envs.map((env, index) => (
                  <HStack
                    key={index}
                    spacing="0.5rem"
                    marginBottom="1rem"
                    paddingLeft="0.5rem"
                    borderLeft="2px"
                  >
                    <Box flex="1">
                      <HStack spacing="0.5rem" marginBottom="0.5rem">
                        <FormControl>
                          <FormLabel>Key</FormLabel>
                          <Input
                            size="sm"
                            value={env.key}
                            onChange={(e) => {
                              const envs = appData.container?.envs;
                              if (envs) {
                                envs[index].key = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    envs: envs,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Value</FormLabel>
                          <Input
                            size="sm"
                            value={env.value}
                            onChange={(e) => {
                              const envs = appData.container?.envs;
                              if (envs) {
                                envs[index].value = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    envs: envs,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                      </HStack>
                      <HStack spacing="0.5rem">
                        <FormControl>
                          <FormLabel>Configurable</FormLabel>
                          <Select
                            size="sm"
                            value={env.configurable}
                            onChange={(e) => {
                              const envs = appData.container?.envs;
                              if (envs) {
                                envs[index].configurable = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    envs: envs,
                                  },
                                });
                              }
                            }}
                          >
                            {(
                              Object.keys(
                                AppFile2ContainerEnvsConfigurableEnum
                              ) as Array<
                                keyof typeof AppFile2ContainerEnvsConfigurableEnum
                              >
                            ).map((type) => (
                              <option
                                key={type}
                                value={
                                  AppFile2ContainerEnvsConfigurableEnum[type]
                                }
                              >
                                {type}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Description</FormLabel>
                          <Input
                            size="sm"
                            value={env.description}
                            onChange={(e) => {
                              const envs = appData.container?.envs;
                              if (envs) {
                                envs[index].description = e.target.value;
                                setAppData({
                                  ...appData,
                                  container: {
                                    ...appData.container,
                                    envs: envs,
                                  },
                                });
                              }
                            }}
                          />
                        </FormControl>
                      </HStack>
                    </Box>
                    <IconButton
                      aria-label="Delete Environment Variable"
                      icon={<MdDelete />}
                      height="8.5rem"
                      onClick={() => {
                        const envs = appData.container?.envs;
                        if (envs) {
                          envs.splice(index, 1);
                          setAppData({
                            ...appData,
                            container: {
                              ...appData.container,
                              envs: envs,
                            },
                          });
                        }
                      }}
                    />
                  </HStack>
                ))
              ) : (
                <Text>No environment variables yet.</Text>
              )}
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Cap Add</FormLabel>
              <VStack alignItems="start" marginBottom="0.5rem">
                {appData.container?.cap_add?.length ? (
                  appData.container.cap_add.map((cap, index) => (
                    <Tag key={index}>
                      <TagLabel>{cap}</TagLabel>
                      <TagCloseButton
                        onClick={() => {
                          const cap_add = appData.container?.cap_add;
                          if (cap_add) {
                            cap_add.splice(index, 1);
                            setAppData({
                              ...appData,
                              container: {
                                ...appData.container,
                                cap_add: cap_add,
                              },
                            });
                          }
                        }}
                      />
                    </Tag>
                  ))
                ) : (
                  <Text>No capabilities added yet.</Text>
                )}
              </VStack>
              <Select
                placeholder="Select capability to add"
                size="sm"
                onChange={(e) => {
                  const cap_add = appData.container?.cap_add;
                  if (!cap_add?.includes(e.target.value)) {
                    if (cap_add) {
                      cap_add.push(e.target.value);
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          cap_add: cap_add,
                        },
                      });
                    } else {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          cap_add: [e.target.value],
                        },
                      });
                    }
                  }
                  e.target.value = "";
                }}
              >
                {appCaps.map((cap) =>
                  appData.container?.cap_add instanceof Array &&
                  appData.container?.cap_add?.includes(cap) ? null : (
                    <option key={cap} value={cap}>
                      {cap}
                    </option>
                  )
                )}
              </Select>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Restart Policy</FormLabel>
              <Select
                placeholder="Select restart policy"
                value={appData.container?.restart_policy}
                onChange={(e) => {
                  setAppData({
                    ...appData,
                    container: {
                      ...appData.container,
                      restart_policy: e.target.value,
                    },
                  });
                }}
              >
                {(
                  Object.keys(AppFile2ContainerRestartPolicyEnum) as Array<
                    keyof typeof AppFile2ContainerRestartPolicyEnum
                  >
                ).map((type) => (
                  <option
                    key={type}
                    value={AppFile2ContainerRestartPolicyEnum[type]}
                  >
                    {AppFile2ContainerRestartPolicyEnum[type]}
                  </option>
                ))}
              </Select>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>CMD</FormLabel>
              {appData.container?.cmd?.length ? (
                <VStack alignItems="start" marginBottom="0.5rem">
                  {appData.container?.cmd?.map((c, index) => (
                    <Tag key={index}>
                      <TagLabel>{c}</TagLabel>
                      <TagCloseButton
                        onClick={() => {
                          const cmd = appData.container?.cmd;
                          if (cmd) {
                            cmd.splice(index, 1);
                            setAppData({
                              ...appData,
                              container: {
                                ...appData.container,
                                cmd: cmd,
                              },
                            });
                          }
                        }}
                      />
                    </Tag>
                  ))}
                </VStack>
              ) : (
                <Text>No CMD yet.</Text>
              )}
              <Formik
                initialValues={{ cmd: "" }}
                onSubmit={(values, actions) => {
                  const cmd = appData.container?.cmd;
                  if (cmd) {
                    cmd.push(values.cmd);
                    setAppData({
                      ...appData,
                      container: {
                        ...appData.container,
                        cmd: cmd,
                      },
                    });
                  } else {
                    setAppData({
                      ...appData,
                      container: {
                        ...appData.container,
                        cmd: [values.cmd],
                      },
                    });
                  }
                  actions.setValues({ cmd: "" });
                }}
              >
                {(props) => (
                  <Form>
                    <HStack spacing="0.5rem" marginBottom="0.5rem">
                      <Field
                        name="cmd"
                        validate={(value: any) => {
                          if (!value) {
                            return "CMD cannot be empty";
                          }
                        }}
                      >
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl>
                            <Input {...field} placeholder="Add new CMD here" />
                          </FormControl>
                        )}
                      </Field>
                      <Button type="submit">Add</Button>
                    </HStack>
                  </Form>
                )}
              </Formik>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Constraints</FormLabel>
              <HStack spacing="0.5rem" marginBottom="0.5rem">
                <FormControl>
                  <FormLabel>Min Memory</FormLabel>
                  <NumberInput
                    min={1}
                    value={appData.container?.constraints?.min_memory?.toString()}
                    onChange={(value) => {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          constraints: {
                            ...appData.container?.constraints,
                            min_memory: parseInt(value),
                          },
                        },
                      });
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Min Storage</FormLabel>
                  <NumberInput
                    min={1}
                    value={appData.container?.constraints?.min_storage?.toString()}
                    onChange={(value) => {
                      setAppData({
                        ...appData,
                        container: {
                          ...appData.container,
                          constraints: {
                            ...appData.container?.constraints,
                            min_storage: parseInt(value),
                          },
                        },
                      });
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>
            </FormControl>
          </Box>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            Tips Before Install{" "}
            <Button
              size="xs"
              colorScheme="blue"
              onClick={() => {
                const before_install = appData.tips?.before_install;
                if (before_install) {
                  before_install.push({
                    content: "",
                    value: "",
                  });
                  setAppData({
                    ...appData,
                    tips: {
                      ...appData.tips,
                      before_install: before_install,
                    },
                  });
                } else {
                  setAppData({
                    ...appData,
                    tips: {
                      ...appData.tips,
                      before_install: [
                        {
                          content: "",
                          value: "",
                        },
                      ],
                    },
                  });
                }
              }}
            >
              Add
            </Button>
          </FormLabel>
          {appData.tips?.before_install?.length ? (
            appData.tips?.before_install?.map((tip, index) => (
              <HStack key={index} spacing="0.5rem" marginBottom="0.5rem">
                <FormControl key={index}>
                  <FormLabel>Content</FormLabel>
                  <Input
                    value={tip.content}
                    onChange={(e) => {
                      const before_install = appData.tips?.before_install;
                      if (before_install) {
                        before_install[index].content = e.target.value;
                        setAppData({
                          ...appData,
                          tips: {
                            ...appData.tips,
                            before_install: before_install,
                          },
                        });
                      }
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Value</FormLabel>
                  <Input
                    value={tip.value}
                    onChange={(e) => {
                      const before_install = appData.tips?.before_install;
                      if (before_install) {
                        before_install[index].value = e.target.value;
                        setAppData({
                          ...appData,
                          tips: {
                            ...appData.tips,
                            before_install: before_install,
                          },
                        });
                      }
                    }}
                  />
                </FormControl>
                <IconButton
                  aria-label="Delete"
                  height="4.5rem"
                  icon={<MdDelete />}
                  onClick={() => {
                    const before_install = appData.tips?.before_install;
                    if (before_install) {
                      before_install.splice(index, 1);
                      setAppData({
                        ...appData,
                        tips: {
                          ...appData.tips,
                          before_install: before_install,
                        },
                      });
                    }
                  }}
                />
              </HStack>
            ))
          ) : (
            <Text>No tips yet.</Text>
          )}
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Changelog</FormLabel>
          <FormControl>
            <FormLabel>Latest Updates</FormLabel>
            <Textarea
              value={appData.changelog?.latest_updates}
              onChange={(e) => {
                setAppData({
                  ...appData,
                  changelog: {
                    ...appData.changelog,
                    latest_updates: e.target.value,
                  },
                });
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Full Changelog URL</FormLabel>
            <Input
              value={appData.changelog?.url}
              onChange={(e) => {
                setAppData({
                  ...appData,
                  changelog: {
                    ...appData.changelog,
                    url: e.target.value,
                  },
                });
              }}
            />
          </FormControl>
        </FormControl>
      </Box>

      <Box flex="1" height="100%">
        <AppFileViewer />
      </Box>
    </Flex>
  );
}
