import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ROUTES } from '@/constants';
import { TASTE_LEVEL } from '@/types';
import svg_0 from 'public/assets/SpciyLevelInput/0.svg';
import svg_0_disabled from 'public/assets/SpciyLevelInput/0_disabled.svg';
import svg_1 from 'public/assets/SpciyLevelInput/1.svg';
import svg_1_disabled from 'public/assets/SpciyLevelInput/1_disabled.svg';
import svg_2 from 'public/assets/SpciyLevelInput/2.svg';
import svg_2_disabled from 'public/assets/SpciyLevelInput/2_disabled.svg';
import svg_3 from 'public/assets/SpciyLevelInput/3.svg';
import svg_3_disabled from 'public/assets/SpciyLevelInput/3_disabled.svg';

const iconByLevel = {
  [TASTE_LEVEL.냠냠]: svg_0,
  [TASTE_LEVEL.쓰읍]: svg_1,
  [TASTE_LEVEL.씁하]: svg_2,
  [TASTE_LEVEL.헥헥]: svg_3,
};
const iconByLevelDisabled = {
  [TASTE_LEVEL.냠냠]: svg_0_disabled,
  [TASTE_LEVEL.쓰읍]: svg_1_disabled,
  [TASTE_LEVEL.씁하]: svg_2_disabled,
  [TASTE_LEVEL.헥헥]: svg_3_disabled,
};

const Navigator = () => {
  const router = useRouter();
  const [navigateReady, setNavigateReady] = useState<Boolean>(false);
  const [selectLevel, setSelectLevel] = useState<TASTE_LEVEL | undefined>(
    undefined
  );

  const handleNavigate = (level: TASTE_LEVEL) => () => {
    if (navigateReady) return;

    const timeToDelay = 0.5 * 1000;
    setNavigateReady(true);
    setSelectLevel(level);
    setTimeout(() => {
      router.push(`${ROUTES.CATEGORY}/${level}`);
    }, timeToDelay);
  };

  return (
    <Container>
      {Object.values(TASTE_LEVEL).map((level) => (
        <ImageContainer
          level={level}
          selectLevel={selectLevel}
          onClick={handleNavigate(level)}
          key={level}
        >
          <Image
            src={
              level === selectLevel
                ? iconByLevel[level]
                : iconByLevelDisabled[level]
            }
            alt={level}
          />
          <p>{level}</p>
        </ImageContainer>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const ImageContainer = styled.div<{
  level: string;
  selectLevel: string | undefined;
}>`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  cursor: pointer;

  & p {
    font-size: 13px;
    font-weight: 700;
    margin-top: 8px;
    color: ${({ level, selectLevel, theme }) =>
      level === selectLevel ? theme.colors.white : theme.colors.grey10};
  }
`;

export default Navigator;
