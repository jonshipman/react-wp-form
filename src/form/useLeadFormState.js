import { useState, useRef } from "react";

export const useLeadFormState = () => {
  const nonce = useRef("");
  const errors = useRef({});
  const fields = useRef([]);
  const loading = useRef(false);
  const trigger = useRef(false);
  const triggerField = useRef();

  const [form, setForm] = useState({});
  const [message, setMessage] = useState();
  const [completed, setCompleted] = useState();
  const [processForm, setProcessForm] = useState(false);

  return {
    nonce,
    errors,
    fields,
    loading,
    form,
    setForm,
    message,
    setMessage,
    completed,
    setCompleted,
    processForm,
    setProcessForm,
    trigger,
    triggerField,
  };
};
