import React, { Component, ErrorInfo, ReactNode } from 'react';
import CustomError, { StatusCode } from '@/utils/customError';
import ErrorView from '../ErrorView';

interface Props {
  children: ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  statusCode: StatusCode;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    statusCode: 500,
    message: '펑! 서버가 터졌어요.\n개발자가 빠르게 해결할거에요.',
  };

  public static getDerivedStateFromError(_: Error): State {
    if (_ instanceof CustomError) {
      return {
        hasError: true,
        statusCode: _.statusCode,
        message: _.getMessage(),
      };
    }
    return {
      hasError: true,
      statusCode: 500,
      message: '펑! 서버가 터졌어요.\n개발자가 빠르게 해결할거에요.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return <>{this.props.fallback}</>;
    }

    return (
      <ErrorView
        message={this.state.message}
        statusCode={this.state.statusCode}
      />
    );
  }
}
