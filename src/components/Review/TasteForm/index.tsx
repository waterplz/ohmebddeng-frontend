import styled from '@emotion/styled';
import React from 'react';
import { TasteTagInput } from '@/components/Common';
import { TASTE } from '@/types';

export interface TasteFormProps {
  taste?: Set<TASTE>;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TasteForm = ({ taste, disabled = false, ...props }: TasteFormProps) => {
  return (
    <Form id="spicyLevelForm">
      {Object.values(TASTE).map((name) => (
        <TasteTagInput
          key={name}
          name={name}
          disabled={disabled}
          checked={taste && taste.has(name)}
          {...props}
        />
      ))}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
  align-content: space-between;
`;

export default TasteForm;
