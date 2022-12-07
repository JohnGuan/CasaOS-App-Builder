import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
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
} from "../../modules/CasaOSAppFile";
import AppFileViewer from "../AppFiles/AppFileViewer";

export default function EditorPanel() {
  const [appData, setAppData] = useAppData();

  const toast = useToast();

  useEffect(() => {
    console.log("appData", appData);
  }, [appData]);

  return (
    <Flex direction="row" height="100%">
      <Box flex="1" paddingX="1rem" height="100%" overflowY="scroll">
        <FormControl>
          <FormLabel>Version</FormLabel>
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
          <FormLabel>Title</FormLabel>
          <Input
            value={appData.title}
            onChange={(e) =>
              setAppData({
                ...appData,
                title: e.target.value,
              })
            }
          />
          <FormHelperText>e.g. "CasaOS"</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            value={appData.name}
            onChange={(e) =>
              setAppData({
                ...appData,
                name: e.target.value,
              })
            }
          />
          <FormHelperText>e.g. "casaos"</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Icon</FormLabel>
          <Input
            value={appData.icon}
            onChange={(e) =>
              setAppData({
                ...appData,
                icon: e.target.value,
              })
            }
          />
          <FormHelperText>e.g. "https://casaos.com/icon.png"</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Tagline</FormLabel>
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
          <FormLabel>Overview</FormLabel>
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
          <FormLabel>Thumbnail</FormLabel>
          <Input
            value={appData.thumbnail}
            onChange={(e) =>
              setAppData({
                ...appData,
                thumbnail: e.target.value,
              })
            }
          />
          <FormHelperText>Thumbnail url for Featured Apps list</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>
            Screenshots{" "}
            <Button
              colorScheme="blue"
              size="xs"
              onClick={() => {
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
              }}
            >
              Add
            </Button>
          </FormLabel>
          {appData.screenshots?.length || false ? (
            appData.screenshots.map((screenshot, index) => (
              <InputGroup marginTop={index != 0 ? "0.25rem" : "auto"}>
                <Input
                  key={index}
                  value={screenshot}
                  onChange={(e) =>
                    setAppData({
                      ...appData,
                      screenshots: appData.screenshots?.map((screenshot, i) =>
                        i === index ? e.target.value : screenshot
                      ),
                    })
                  }
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Delete Screenshot"
                    icon={<MdDelete />}
                    size="sm"
                    onClick={() => {
                      setAppData({
                        ...appData,
                        screenshots: appData.screenshots?.filter(
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
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Category</FormLabel>
          <HStack spacing="0.5rem" marginBottom="0.5rem">
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
          </HStack>
          <Select
            placeholder="Select Category"
            size="sm"
            onChange={(e) => {
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
              e.target.value = "";
            }}
          >
            {appCategory.map((category) => (
              <option value={category.name}>{category.name}</option>
            ))}
          </Select>
          <FormHelperText>App category</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Developer</FormLabel>
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
          <FormLabel>Container</FormLabel>
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
                <HStack spacing="0.5rem" marginBottom="1rem">
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
                              value={AppFile2ContainerPortsAllocationEnum[type]}
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
                      configurable: AppFile2ContainerEnvsConfigurableEnum.Basic,
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
                <option value={AppFile2ContainerRestartPolicyEnum[type]}>
                  {AppFile2ContainerRestartPolicyEnum[type]}
                </option>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Sysctls</FormLabel>
            {appData.container?.sysctls?.length ? (
              <VStack alignItems="start">
                {appData.container?.sysctls?.map((sysctl, index) => (
                  <Tag key={index}>
                    <TagLabel>{sysctl}</TagLabel>
                    <TagCloseButton
                      onClick={() => {
                        const sysctls = appData.container?.sysctls;
                        if (sysctls) {
                          sysctls.splice(index, 1);
                          setAppData({
                            ...appData,
                            container: {
                              ...appData.container,
                              sysctls: sysctls,
                            },
                          });
                        }
                      }}
                    />
                  </Tag>
                ))}
              </VStack>
            ) : (
              <Text>No sysctls yet.</Text>
            )}
            <Formik 
              initialValues={{ sysctl: "" }}
              onSubmit={(values, actions) => {
                const sysctls = appData.container?.sysctls;
                if (sysctls) {
                  sysctls.push(values.sysctl);
                  setAppData({
                    ...appData,
                    container: {
                      ...appData.container,
                      sysctls: sysctls,
                    },
                  });
                } else {
                  setAppData({
                    ...appData,
                    container: {
                      ...appData.container,
                      sysctls: [values.sysctl],
                    },
                  });
                }
                actions.resetForm();
              }}
              >
                {(props) => (
                  <Form>
                    <HStack spacing="0.5rem" marginY="0.5rem">
                    <Field name="sysctl" validate={
                      (value) => {
                        if (!value) {
                          return "Sysctl cannot be empty";
                        }
                      }
                    } >
                      {({ field, form }) => (
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Add new sysctl here"
                          />
                        </FormControl>
                      )
                      }
                    </Field>
                    <Button type="submit">Add</Button>
                    </HStack>
                  </Form>
                )}
            </Formik>
          </FormControl>
        </FormControl>
        <br />
      </Box>
      <Box flex="1" height="100%" overflowY="scroll">
        <AppFileViewer />
      </Box>
    </Flex>
  );
}
