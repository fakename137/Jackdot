import React from "react";
import { Input } from "./input";
interface Props {
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
}

const FormInput = ({ value, onChange, placeholder }: Props) => {
  return (
    <Input
      className="form-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default FormInput;
