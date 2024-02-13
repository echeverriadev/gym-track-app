import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChanged = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  }

  return {
    ...formState,
    formState,
    onInputChanged,
    onResetForm
  }
}
