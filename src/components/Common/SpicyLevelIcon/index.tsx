import Image from 'next/image';
import React from 'react';
import { HOT_LEVEL_CLIENT, TASTE_LEVEL } from '@/types';
import svg_0 from 'public/assets/SpciyLevelInput/0.svg';
import svg_0_disabled from 'public/assets/SpciyLevelInput/0_disabled.svg';
import svg_1 from 'public/assets/SpciyLevelInput/1.svg';
import svg_1_disabled from 'public/assets/SpciyLevelInput/1_disabled.svg';
import svg_2 from 'public/assets/SpciyLevelInput/2.svg';
import svg_2_disabled from 'public/assets/SpciyLevelInput/2_disabled.svg';
import svg_3 from 'public/assets/SpciyLevelInput/3.svg';
import svg_3_disabled from 'public/assets/SpciyLevelInput/3_disabled.svg';
import svg_4 from 'public/assets/SpciyLevelInput/4.svg';
import svg_4_disabled from 'public/assets/SpciyLevelInput/4_disabled.svg';

interface SpicyLevelIconProps {
  level: HOT_LEVEL_CLIENT | TASTE_LEVEL;
  checked: boolean;
  width?: number;
  height?: number;
}

const SpicyLevelIcon = ({
  level,
  checked,
  width,
  height,
}: SpicyLevelIconProps) => {
  const IconByLevel = {
    냠냠: (
      <Image
        src={checked ? svg_0 : svg_0_disabled}
        alt={level}
        width={width}
        height={height}
      />
    ),
    쓰읍: (
      <Image
        src={checked ? svg_1 : svg_1_disabled}
        alt={level}
        width={width}
        height={height}
      />
    ),
    씁하: (
      <Image
        src={checked ? svg_2 : svg_2_disabled}
        alt={level}
        width={width}
        height={height}
      />
    ),
    헥헥: (
      <Image
        src={checked ? svg_3 : svg_3_disabled}
        alt={level}
        width={width}
        height={height}
      />
    ),
    모름: (
      <Image
        src={checked ? svg_4 : svg_4_disabled}
        alt={level}
        width={width}
        height={height}
      />
    ),
  };

  return IconByLevel[level] ?? <div></div>;
};

export default SpicyLevelIcon;
