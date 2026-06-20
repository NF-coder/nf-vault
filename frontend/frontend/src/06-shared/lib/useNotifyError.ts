import useError from "@/06-shared/lib/error/useError";

export const useNotifyError = () => {
  const { showError } = useError();

  return (error: unknown) => {
    if (error instanceof Error) {
      showError(
        JSON.parse(error.message).message
      );
    }
  };
};