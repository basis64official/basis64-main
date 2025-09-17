import { useState } from "react";

const useInput = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const reset = () => setValue(initialValue);

  return [ value, onChange, setValue, reset ] as const;
};

export default useInput;
