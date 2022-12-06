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
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useAppData, appCategory } from "../../modules/CasaOSAppFile";


export default function EditorPanel() {
  const [appData, setAppData] = useAppData();

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
          {appData.screenshots ? (
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
          <HStack 
            spacing="0.5rem"
            marginBottom="0.5rem"
            >
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
      </Box>
      <Box flex="1" bg="blue.500">
        b
      </Box>
    </Flex>
  );
}
