import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
import { USER_LEVEL } from '@/types';
import Navigator from '../Navigator';
import level_0 from 'public/assets/Main/level0.svg';
import level_1 from 'public/assets/Main/level1.svg';
import level_2 from 'public/assets/Main/level2.svg';
import level_3 from 'public/assets/Main/level3.svg';
import level_4 from 'public/assets/Main/level4.svg';

export interface ProfileCardProps {
  level: USER_LEVEL;
}

const levelByImage = {
  맵찔이: level_0,
  맵초보: level_1,
  맵러버: level_2,
  맵마스터: level_3,
  맵부심: level_4,
};

const ProfileCard = ({ level }: ProfileCardProps) => {
  return (
    <Container>
      <Image src={levelByImage[level]} alt={level} layout="fixed" />
      <Title>
        {level}님 <br />
        오늘은 무엇이 땡기십니까!
      </Title>
      <Navigator />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 456px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
`;

const Title = styled.p`
  font-size: 20px;
  font-family: SBAggroB;
  line-height: 28px;
`;

export default ProfileCard;
