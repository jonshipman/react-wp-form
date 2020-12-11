import { useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRecaptcha } from "./useRecaptcha";

const Query = gql`
  query LeadForm {
    formData {
      id
      wpNonce {
        id
        form
        wpNonce
      }
      recatchaSiteKey
    }
  }
`;

export const useFormData = ({ nonce: nonceRef, formName, trigger }) => {
  const { data } = useQuery(Query, {
    errorPolicy: "all",
  });

  useEffect(() => {
    const wpNonce = data?.formData?.wpNonce || "";
    if (formName && wpNonce.length > 0) {
      nonceRef.current = wpNonce.filter((n) => n.form === formName)[0]?.wpNonce;
    }
  }, [data, formName, nonceRef]);

  const recaptchaSiteKey = useMemo(
    () => data?.formData?.recatchaSiteKey || "",
    [data]
  );

  const { token } = useRecaptcha({
    trigger,
    key: recaptchaSiteKey,
  });

  return { token };
};
