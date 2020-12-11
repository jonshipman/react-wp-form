import { useEffect } from "react";

export const ProcessFormComponent = ({
  setProcessForm,
  errors,
  token,
  nonce,
  form,
  mutate,
  setMessage,
  errorAction,
  loading,
  formError,
}) => {
  useEffect(() => {
    setProcessForm(false);

    if (Object.values(errors.current).filter((v) => v === true).length === 0) {
      loading.current = true;

      const clientMutationId =
        Math.random().toString(36).substring(2) +
        new Date().getTime().toString(36);

      const input = {
        clientMutationId,
        gToken: token,
        wpNonce: nonce.current,
        ...form,
      };

      mutate({
        variables: {
          input,
        },
      });
    } else {
      setMessage(formError || "Check all required fields.");

      if (errorAction) {
        errorAction(errors.current);
      }
    }
  }, [
    mutate,
    token,
    nonce,
    errors,
    errorAction,
    formError,
    form,
    setProcessForm,
    setMessage,
    loading,
  ]);

  return null;
};
