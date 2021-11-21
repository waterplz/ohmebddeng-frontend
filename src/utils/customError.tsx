export default class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number) {
    super();
    this.statusCode = statusCode;
  }

  getMessage() {
    switch (this.statusCode) {
      case 400:
        return '찾는 정보가 없는 것 같습니다..';
      case 401:
        return '레벨 테스트가 필요해요!';
      case 404:
        return '없는 페이지를 찾으셨군요.. 박수!';
      default:
        return '펑! 서버가 터졌어요.\n개발자가 빠르게 해결할거에요.';
    }
  }
}
