import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
import Button from '@/components/Input/Button';
import error_image from 'public/assets/Error/error.svg';

interface Message {
  message: string;
}

const ErrorView = ({ message }: Message) => {
  return (
    <Container>
      <p>{message}</p>
      <Image src={error_image} alt="error" layout="fixed" />
      <Button
        buttonType="contained"
        color="red"
        rounded
        fullWidth
        css={css`
          margin-top: 3rem;
          width: 100%;
        `}
      >
        button 1
      </Button>
      <Button
        buttonType="outline"
        color="green"
        rounded
        fullWidth
        css={css`
          margin-top: 3rem;
          width: 100%;
        `}
      >
        button 2
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & p {
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 48px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default ErrorView;
