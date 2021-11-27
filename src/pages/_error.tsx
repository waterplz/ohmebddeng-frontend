import React from 'react';
import ErrorView from '@/components/Common/ErrorView';

const Error = () => {
  return (
    <ErrorView
      message={'펑! 서버가 터졌어요.\n개발자가 빠르게 해결할거에요.'}
      statusCode={500}
    />
  );
};

export default Error;
