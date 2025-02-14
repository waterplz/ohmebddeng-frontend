import styled from '@emotion/styled';
import React from 'react';
import { SpicyLevelInput } from '@/components/Common';
import { LEVEL } from '@/types';

export interface SpicyLevelFormProps {
  level?: LEVEL;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const SpicyLevelForm = ({ level, ...props }: SpicyLevelFormProps) => {
  return (
    <Form id="spicyLevelForm">
      {Object.values(LEVEL).map((name) => (
        <SpicyLevelInput
          key={name}
          name={name}
          checked={level === name}
          {...props}
        />
      ))}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  padding: 0 8px;
  & > label {
    margin: auto;
  }
  @media all and (min-width: 375px) {
    & > label {
      margin: 0 11px;
    }
  }
`;

export default SpicyLevelForm;
