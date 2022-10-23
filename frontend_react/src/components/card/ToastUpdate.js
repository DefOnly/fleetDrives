import { useToast, Button } from "@chakra-ui/react";

const ToastUpdate = () => {
  const toast = useToast();
  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
        }
        type="submit"
        colorScheme="blue"
        mr={3}
      >
        Guardar cambios
      </Button>
    </>
  );
};

export default ToastUpdate;
