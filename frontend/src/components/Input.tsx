import { ChangeEventHandler } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.6em 1.2em;
  font-size: 1em;
  border: 1px solid var(--white-color);
  border-radius: 8px;
  font-weight: 500;

  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

type InputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
  placeholder: string;
  value: string
};

const Input = ({ onChange, type, placeholder, value }: InputProps) => {
  return (
    <StyledInput
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      value={value}
    >
    </StyledInput>
  )
};

export default Input;
