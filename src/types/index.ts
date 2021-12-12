export enum TASTE_LEVEL {
  냠냠 = '냠냠',
  쓰읍 = '쓰읍',
  씁하 = '씁하',
  헥헥 = '헥헥',
}

export enum LEVEL {
  냠냠 = '냠냠',
  쓰읍 = '쓰읍',
  씁하 = '씁하',
  헥헥 = '헥헥',
  모름 = '모름',
}

export enum TASTE {
  매콤달콤한 = '매콤달콤한',
  술_땡기는 = '술_땡기는',
  끝맛이_매운 = '끝맛이_매운',
  혀가_얼얼한 = '혀가_얼얼한',
  마라맛 = '마라맛',
  캡사이신맛 = '캡사이신맛',
  별이_다섯개 = '별이_다섯개',
  가끔_떙기는 = '가끔_떙기는',
  땀이_뻘뻘 = '땀이_뻘뻘',
  눈물이_쏙 = '눈물이_쏙',
  어질어질한 = '어질어질한',
  우유가_필수 = '우유가_필수',
  스트레스가_풀리는 = '스트레스가_풀리는',
  정수리가_열나는 = '정수리가_열나는',
}

export enum INITIAL_FOOD {
  FOOD1 = '진라면 매운맛',
  FOOD2 = '불닭 볶음면',
  FOOD3 = '신라면',
}

export enum USER_LEVEL {
  맵찔이 = '맵찔이',
  맵초보 = '맵초보',
  맵러버 = '맵러버',
  맵부심 = '맵부심',
  맵마스터 = '맵마스터',
}

export enum USER_LEVEL_NUMBER {
  맵찔이,
  맵초보,
  맵러버,
  맵부심,
  맵마스터,
}

export interface ReviewState {
  level?: LEVEL;
  taste?: Set<TASTE>;
}

export interface Food {
  id: string;
  name: string;
  subName: string;
  imageUrl: string;
}
