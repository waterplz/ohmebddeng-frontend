import styled from '@emotion/styled';
import React from 'react';
import { TASTE } from '@/types';

export interface TasteTagInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: TASTE;
}

const TasteTagInput = ({
  name,
  type,
  checked,
  disabled,
  ...rest
}: TasteTagInputProps) => {
  return (
    <Container checked={checked}>
      <Input
        type={type ?? 'checkbox'}
        name={name}
        value={name}
        {...rest}
        disabled={disabled}
      />
      {name}
    </Container>
  );
};

const Container = styled.label<{ checked?: boolean }>`
  border-radius: 24px;
  border: ${({ checked, theme }) =>
    checked
      ? `solid 1px ${theme.colors.red}`
      : `solid 1px ${theme.colors.grey20}`};
  background-color: ${({ checked, theme }) =>
    checked ? theme.colors.red : theme.colors.grey50};
  color: ${({ theme }) => theme.colors.grey0};
  padding: 14px 16px;
  text-align: center;
  cursor: pointer;
  margin: 4px 6px;
`;

const Input = styled.input`
  display: none;
`;

export default TasteTagInput;
