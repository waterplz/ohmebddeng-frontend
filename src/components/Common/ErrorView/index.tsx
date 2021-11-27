import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import Button from '@/components/Input/Button';
import { ROUTES } from '@/constants';
import { Skip } from '@/pages';
import { StatusCode } from '@/utils/customError';
import error_image from 'public/assets/Error/error.svg';

interface ErrorViewProps {
  message: string;
  statusCode: StatusCode;
}

const ErrorView = ({ message, statusCode }: ErrorViewProps) => {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  //TODO 레벨테스트 이동시 테스트페이지를 따로 만드는지, HOME으로 가는지?
  const handleClickGoLevelTest = useCallback(() => {
    router.push(ROUTES.LEVEL_TEST);
  }, [router]);

  return (
    <Container>
      <p>{message}</p>
      <Image src={error_image} alt="error" layout="fixed" />
      <div
        css={css`
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 66px;
        `}
      >
        <Button
          buttonType="contained"
          color="red"
          rounded
          fullWidth
          onClick={
            statusCode === 401 ? handleClickGoLevelTest : handleClickBack
          }
          css={css`
            margin-top: 3rem;
            width: 100%;
          `}
        >
          {statusCode === 401
            ? '레벨 테스트 하러 가기'
            : '이전 페이지로 돌아가기'}
        </Button>
        <Skip
          onClick={() => {
            statusCode === 401 ? handleClickBack() : '';
          }}
        >
          {statusCode === 401 ? (
            '이전 페이지로 돌아가기'
          ) : (
            // TODO 문의하기 링크 추가
            <a href="" target="_blank">
              문의하기
            </a>
          )}
        </Skip>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & p {
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 48px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default ErrorView;
