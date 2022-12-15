import {
  ButtonProps,
  IconButton,
  IconButtonProps,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiBarsArrowDown } from "react-icons/hi2";
import {
  updateAppStoreAppList,
  useAppStoreAppList,
} from "../../modules/CasaOSAppFile";

export default function PullButton(prop: ButtonProps) {
  const toast = useToast();
  const [, setAppStoreAppList] = useAppStoreAppList();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Tooltip label="Update from GitHub" placement="top">
      <IconButton
        aria-label="Update from GitHub"
        isLoading={isLoading}
        size="xs"
        icon={<HiBarsArrowDown />}
        onClick={() => {
          setIsLoading(true);
          fetch("/api/appstore/v2/app/import", {
            method: "POST",
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.code === 200) {
                toast({
                  title: "Updated GitHub App Store Data",
                  position: "top",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
                updateAppStoreAppList(setAppStoreAppList);
              } else {
                throw new Error(result.message);
              }
            })
            .catch((err) => {
              console.log(err);
              toast({
                title: "Failed to update GitHub App Store Data",
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      />
    </Tooltip>
  );
}
