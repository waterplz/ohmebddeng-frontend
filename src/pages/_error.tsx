import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import Button from '@/components/Input/Button';
import { ROUTES } from '@/constants';
import error_image from 'public/assets/Error/error.svg';

type ErrorStatusCode = 400 | 401 | 404 | 500;

const Error = ({ statusCode }: { statusCode: ErrorStatusCode }) => {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.push(ROUTES.MAIN);
  }, [router]);
  const handleClickGoLevelTest = useCallback(() => {
    router.push(ROUTES.LEVEL_TEST);
  }, [router]);

  return (
    <Container>
      <p>{Errors[statusCode].message}</p>
      <Image src={error_image} alt="error" layout="fixed" />
      <Button
        buttonType="contained"
        color="red"
        rounded
        fullWidth
        onClick={statusCode === 401 ? handleClickGoLevelTest : handleClickBack}
        css={css`
          margin-top: 3rem;
          width: 100%;
        `}
      >
        {statusCode === 401
          ? '레벨 테스트 하러 가기'
          : '이전 페이지로 돌아가기'}
      </Button>
      <Button
        buttonType="outline"
        color="green"
        rounded
        fullWidth
        onClick={statusCode === 401 ? handleClickGoLevelTest : () => {}}
        css={css`
          margin-top: 3rem;
          width: 100%;
        `}
      >
        {statusCode === 401 ? (
          <a href="" target="_blank">
            이전 페이지로 돌아가기
          </a>
        ) : (
          '문의하기'
        )}
      </Button>
    </Container>
  );
};

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  console.log('res', res);
  console.log('err', err);
  // 실제 production 에서 error가 발생해야 확인할 수 있다 ..
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
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

const Errors: { [key: number]: { message: string } } = {
  400: {
    message: '찾는 정보가 없는 것 같습니다..',
  },
  401: {
    message: '레벨 테스트가 필요해요!',
  },
  404: {
    message: '없는 페이지를 찾으셨군요.. 박수!',
  },
  500: {
    message: '펑! 서버가 터졌어요.\n개발자가 빠르게 해결할거에요.',
  },
};

export default Error;
