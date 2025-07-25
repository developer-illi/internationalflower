import {
  BaseInformationResponse,
  ContactInformationResponse,
  CorporationIdentityResponse,
  GreetingResponse,
  HistoryResponse,
  Information,
  History,
  OrganizationResponse,
  Profile,
} from '@/api/types/about'
import { getHistory } from '@/api/about'

export const BASE_INFORMATION_DATA: BaseInformationResponse = {
  name: '사단법인 국제꽃예술인협회',
  instagram: 'https://www.instagram.com/if_international_florist_a/',
  blog: 'https://blog.naver.com/ifa2002',
  address: '(02880) 서울특별시 성북구 성북로5길 37-2 (성북동1가)',
}

export const CONTACT_INFORMATION_DATA: ContactInformationResponse = {
  name: '사단법인 국제꽃예술인협회',
  phone: '070-8065-8832',
  email: 'hugyourdays@naver.com',
  address: '(02880) 서울특별시 성북구 성북로5길 37-2 (성북동1가)',
  location: {
    latitude: 37.5893095084587,
    longitude: 127.002797214028,
  },
}

export const GREETING_DATA: GreetingResponse = {
  title: '안녕하십니까 국제꽃예술인협회를 찾아주신 여러분.',
  content: `안녕하세요 사단법인 국제꽃예술인협회 이사장 김세은입니다.
저희 사단법인 국제꽃예술인협회는 협회창립과 함께 24년이라는 오랜 시간 동안 꽃을 통한 국제적 교류와 실력 있는 플로리스트 인재를 양성하고 꽃문화를 위한 국제꽃장식대회, 꽃예술조형전시, 플로리스트 양성교육 등 다양한 활동을 수행해왔습니다. 

저희 협회는 꽃생활화의 대중화 및 한국 화훼 장식 세계화를 목표로 각 지역 및 해외 플로리스트들과 함께 기량을 펼치고 세계적으로 우리의 꽃 장식의 우수성과 지속 가능한 화훼 장식 방향을 알리기 위한 활동을 하고 있고 이런 활동 등을 통한 시민들의 위로 공간과 화훼 농가의 활성화에 기여하는데 목적을 두고 있습니다.

앞으로도 저희 사단법인 국제꽃예술인협회는 사람들에게 꽃생활화를 알리고, 우리나라의 꽃예술에 대한 자긍심을 가지고 세계에 알릴 수 있는 기회를 끊임없이 가질 수 있도록 최선을 다해 노력하겠습니다.

감사합니다.`,
  writer: {
    association: '국제꽃예술인협회',
    position: '이 사 장',
    name: '김  세  은',
  },
}

const HISTORY_INFORMATION: Information = {
  id: 1,
  type: 'information',
  title: '협회소개',
  information: `사단법인 국제꽃예술인협회는 2002년 농림축산식품부 소관으로 설립된 비영리단체로, 화훼 예술의 발전과 대중화를 위한 전문적 연구와 교육을 수행합니다. 협회는 화훼 디자인과 소비 문화를 선도하며, 국제적 정보 교류와 네트워크 구축을 통해 글로벌 화훼 예술 산업의 중심 역할을 하고 있습니다. 전문 플로리스트 양성을 위한 체계적 교육과 자격 인증 프로그램을 운영하며, 테라리움 등 최신 트렌드를 반영한 특화 강좌를 제공합니다. 
꽃 소비 기반 확대를 위한 문화 사업과 행사 기획은 물론, 미래 세대의 화훼 문화 확산에도 기여하고 있습니다.`,
  keywords: [
    {
      keyword: '화훼 예술 개발',
      description:
        '화훼 예술 개발에 관한 조사와 연구를 수행하고, 그 결과를 보급합니다.',
    },
    {
      keyword: '국제교류',
      description:
        '화훼 문화의 국제적 교류와 정보 수집을 통해 글로벌 네트워크를 구축합니다.',
    },
    {
      keyword: '교육활동',
      description:
        '꽃 예술인 교육을 통해 전문 인력을 양성하고, 관련 지식을 확산시킵니다.',
    },
    {
      keyword: '문화사업 및 행사',
      description:
        '꽃 소비 기반 확대를 위한 다양한 문화 사업과 행사를 기획하고 진행합니다.',
    },
  ],
}
const HISTORY_LIST : History[]= [
]

// const HISTORY_LIST: History[] = [
//   {
//     id: 2,
//     type: 'history',
//     title: '~2024',
//     content: [
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: '국제꽃예술인협회 행사',
//           },
//           {
//             content: 'LOREM IPSUM DOLOR SIT AMET',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: 'LOREM IPSUM',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: 'LOREM IPSUM DOLOR',
//             image: '/images/dummy/5.png',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: '국제꽃예술인협회 행사',
//           },
//           {
//             content: 'LOREM IPSUM DOLOR SIT AMET',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: 'LOREM IPSUM',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: 'LOREM IPSUM DOLOR',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     type: 'history',
//     title: '2020~2023',
//     content: [
//       {
//         date: '2023.00',
//         events: [
//           {
//             content: '국제꽃예술인협회 행사',
//           },
//           {
//             content: 'LOREM IPSUM DOLOR SIT AMET',
//           },
//         ],
//       },
//       {
//         date: '2023.00',
//         events: [
//           {
//             content: 'LOREM IPSUM',
//           },
//         ],
//       },
//       {
//         date: '2023.00',
//         events: [
//           {
//             content: 'LOREM IPSUM DOLOR',
//             image: '/images/dummy/5.png',
//           },
//         ],
//       },
//       {
//         date: '2023.00',
//         events: [
//           {
//             content: '국제꽃예술인협회 행사',
//           },
//           {
//             content: 'LOREM IPSUM DOLOR SIT AMET',
//           },
//         ],
//       },
//       {
//         date: '2023.00',
//         events: [
//           {
//             content: 'LOREM IPSUM',
//           },
//         ],
//       },
//       {
//         date: '2023.00',
//         events: [
//           {
//             content: 'LOREM IPSUM DOLOR',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 4,
//     type: 'history',
//     title: '2010~2019',
//     content: [
//       {
//         date: '2019.00',
//         events: [
//           {
//             content: '국제꽃예술인협회 행사',
//           },
//           {
//             content: 'LOREM IPSUM DOLOR SIT AMET',
//           },
//         ],
//       },
//       {
//         date: '2019.00',
//         events: [
//           {
//             content: 'LOREM IPSUM',
//           },
//         ],
//       },
//       {
//         date: '2019.00',
//         events: [
//           {
//             content: 'LOREM IPSUM DOLOR',
//             image: '/images/dummy/5.png',
//           },
//         ],
//       },
//       {
//         date: '2019.00',
//         events: [
//           {
//             content: '국제꽃예술인협회 행사',
//           },
//           {
//             content: 'LOREM IPSUM DOLOR SIT AMET',
//           },
//         ],
//       },
//       {
//         date: '2019.00',
//         events: [
//           {
//             content: 'LOREM IPSUM',
//           },
//         ],
//       },
//       {
//         date: '2019.00',
//         events: [
//           {
//             content: 'LOREM IPSUM DOLOR',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 5,
//     type: 'history',
//     title: '~2022',
//     content: [
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: '국제꽃예술인협회 행사',
//           },
//           {
//             content: 'LOREM IPSUM DOLOR SIT AMET',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: 'LOREM IPSUM',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: 'LOREM IPSUM DOLOR',
//             image: '/images/dummy/5.png',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: '국제꽃예술인협회 행사',
//           },
//           {
//             content: 'LOREM IPSUM DOLOR SIT AMET',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: 'LOREM IPSUM',
//           },
//         ],
//       },
//       {
//         date: '2024.00',
//         events: [
//           {
//             content: 'LOREM IPSUM DOLOR',
//           },
//         ],
//       },
//     ],
//   },
// ]

export const HISTORY_DATA: HistoryResponse[] = [
  HISTORY_INFORMATION,
  ...HISTORY_LIST,
]

const ORGANIZATION_PRESIDENT: Profile[] = [
  {
    image: '/images/profile/default.svg',
    name: '김세은',
    position: '이사장',
    description: [
      '연암대학교 화훼플로리스트과 겸임교수',
      '스윗플로라 플라워샵 대표',
      '농업회사법인(주)다민치유농장 대표',
    ],
  },
]

const ORGANIZATION_VICE_PRESIDENT: Profile[] = [
  {
    image: '/images/profile/default.svg',
    name: '박진두',
    position: '부이사장',
    description: [
      '독일 IHK FLORIST MEISTER',
      'I AM A FLORIST 식물도감 저자',
      '백석문화대학교 화훼플로리스트과 교수',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '송지안',
    position: '부이사장',
    description: [
      'LABOS LAB 대표',
      '꽃,일상을품다 플로리스트',
      '홍익대 광고홍보대학원 브랜드매니지먼트 석사',
    ],
  },
]

const ORGANIZATION_DIRECTOR: Profile[] = [
  {
    image: '/images/profile/default.svg',
    name: '강재규',
    position: '이사',
    description: [
      '수목화 꽃집 대표',
      '독일 IHK 플로리스트 마이스터',
      '(주)황동엘앤씨 대표',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '김샛별',
    position: '이사',
    description: [
      '',
      'DER MOND 대표',
      '삼육대학교 환경디자인원예학과 겸임교수',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '김용관',
    position: '이사',
    description: [
      '(주)가꾸다 대표이사',
      '서울시립대 과학기술대학원 환경원예학 이학석사',
      '독일 IHK 플로리스트',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '박가연',
    position: '이사',
    description: [
      '플라워샵 엘모멘또 대표',
      '독일 IHK 플로리스트 마이스터',
      'BUGA 2015 HAVELREGION 전시작가',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '박상준',
    position: '이사',
    description: [
      '플로체디자인랩 대표',
      '2023 wfc 챔피언쉽 한국대표선수 출전 및 수상',
      '한국미술협회 정회원',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '방선',
    position: '이사',
    description: [
      '방플라워가든 대표',
      '신구대학교 원예디자인학과 겸임교수',
      '서울시립대학교 환경원예학 석사',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '송윤진',
    position: '이사',
    description: [
      'LABOS LAB 대표',
      '꽃,일상을품다 플로리스트',
      '홍익대 광고홍보대학원 브랜드매니지먼트 석사',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '송은미',
    position: '이사',
    description: [
      '예능꽃예술원 회장',
      '한국꽃예술작가협회 이사',
      '피오니 대표',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '정다은',
    position: '이사',
    description: [
      '17회국제꽃장식대회 국무총리상',
      '독일 쾰른 국제대회 3등 수상',
      '유앤미워크팀 소속',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '정혜린',
    position: '이사',
    description: [
      '독일 IHK FLORIST MEISTER',
      '방식꽃예술원 강사',
      '일레어나인 대표',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '전엄지',
    position: '감사',
    description: [
      'ILLI 일리 대표',
      'ILLI Design FACTORY 대표',
      'ENGINEER COLORIST',
    ],
  },
  {
    image: '/images/profile/default.svg',
    name: '조난희',
    position: '감사',
    description: [
      '수목화 꽃집 대표',
      '독일 IHK 플로리스트',
      'IGA Berlin 2017 전시작가',
    ],
  },
]

export const ORGANIZATION_DATA: OrganizationResponse = {
  president: ORGANIZATION_PRESIDENT,
  vicePresidents: ORGANIZATION_VICE_PRESIDENT,
  directors: ORGANIZATION_DIRECTOR,
}

export const CORPORATION_IDENTITY_DATA: CorporationIdentityResponse = {
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quis assumenda natus doloribus, repellat aspernatur quo repellendus aliquid. Blanditiis illo in at quae, officiis velit animi! Ab esse voluptatum explicabo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quis assumenda natus doloribus, repellat aspernatur quo repellendus aliquid. Blanditiis illo in at quae, officiis velit animi! Ab esse voluptatum explicabo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quis assumenda natus doloribus, repellat aspernatur quo repellendus aliquid. Blanditiis illo in at quae, officiis velit animi! Ab esse voluptatum explicabo!',
  logotypeConfiguration:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit expedita veniam rem reiciendis unde ab laboriosam quidem veritatis laudantium aspernatur ut est explicabo atque tempore ipsam ex eveniet, quae sit!',
  symbolMark:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit expedita veniam rem reiciendis unde ab laboriosam quidem veritatis laudantium aspernatur ut est explicabo atque tempore ipsam ex eveniet, quae sit!',
  colorSystem:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit expedita veniam rem reiciendis unde ab laboriosam quidem veritatis laudantium aspernatur ut est explicabo atque tempore ipsam ex eveniet, quae sit!',
  symbolMark2:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit expedita veniam rem reiciendis unde ab laboriosam quidem veritatis laudantium aspernatur ut est explicabo atque tempore ipsam ex eveniet, quae sit!',
}
