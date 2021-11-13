import Head from 'next/head';
import { useMemo } from 'react';

interface TestResultHeadProps {
  level: number;
}

export default function TestResultHead({ level }: TestResultHeadProps) {
  const title = '오맵땡';

  const description = useMemo(() => {
    if (level === 1) {
      return '매운맛만 봐도 정수리가 뜨거워지는 당신. 한 입만 먹었을 뿐이지만... ';
    }

    if (level === 2) {
      return '지금 흐르는건 땀일까 콧물일까? 어질한 매운맛에 정신을..';
    }

    if (level === 3) {
      return '쓰으으으읍 빨간맛만 봐도 군침이 싹 도네. ㅇㅇ 당연함. 그만큼 맛있음.';
    }

    if (level === 4) {
      return '매운 맛 아니면 감흥이 없나요? 그렇다면 매운맛에 이미 중독되었습니다.';
    }

    if (level === 5) {
      return '불닭볶음면정도는 그저 평범한 비빔면일 뿐인 당신 바로 K-입맛 입니다.';
    }
  }, [level]);

  const url = 'https://ohmebddeng.kr';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content={`${url}/assets/OpenGraph/level${level}.png`}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
}
