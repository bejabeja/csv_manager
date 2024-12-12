import { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
    display: inline-block;
    font-size: 1em;
    margin: 1em;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.3s;
    background-color: #1a1a1a;
    color: var(--white-color);

    ${(props) => props.variant === "primary" && `
    border: 2px solid var(--primary-color);

        &:hover {
            background-color: var(--primary-color);
            color: var(--white-color);
        }
    `}

  
  ${(props) => props.variant === "secondary" && `
    border: 2px solid var(--secondary-color);

        &:hover {
            background-color: var(--secondary-color);
            color: var(--white-color);
        }
    `}

    &:focus,:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }

    &[disabled] {
        pointer-events: none;
    } 
`;


type ButtonProps = {
    children: ReactNode;
    disabled?: boolean;
    variant: "primary" | "secondary";
};

const Button = ({ children, disabled, variant }: ButtonProps) => {
    return <StyledButton disabled={disabled} variant={variant}>
        {children}
    </StyledButton>;
};

export default Button;