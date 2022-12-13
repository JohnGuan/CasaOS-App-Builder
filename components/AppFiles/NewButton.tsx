import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { HiDocument } from "react-icons/hi2";
import { useAppData, newAppFile2, useCurrentAppID } from "../../modules/CasaOSAppFile";

export default function NewButton(props: ButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [appData, setAppData] = useAppData();
  const [currentAppID, setCurrentAppID] = useCurrentAppID();

  return (
    <>
      <Button
        leftIcon={<HiDocument />}
        colorScheme="blue"
        onClick={onOpen}
        {...props}
      >
        New
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Are you sure?
            </AlertDialogHeader>

            <AlertDialogBody>
              The data currently in the editor will be lost.
              <br />
              <Text as="b">{"You can't undo this action afterwards!"}</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="blue" 
                ml={3}
                onClick={() => {
                  setAppData(newAppFile2);
                  setCurrentAppID(-1);
                  onClose();
                }}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
