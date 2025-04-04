import {
  ExhibitionResponse,
  GalleryItem,
  CertificationResponse,
  ActivityResponse,
  ActivityDetailResponse,
} from '@/api/types/business'
import { SAMPLE_HTML } from '@/data/_sample'

const DUMMY_IMAGE_LIST: string[] = [
  '/images/dummy/1.png',
  '/images/dummy/2.png',
  '/images/dummy/3.png',
  '/images/dummy/4.png',
  '/images/dummy/5.png',
  '/images/dummy/6.png',
  '/images/dummy/7.png',
  '/images/dummy/8.png',
  '/images/dummy/9.png',
  '/images/dummy/10.png',
]

const randomImageList = DUMMY_IMAGE_LIST.sort(() => Math.random() - 0.5).slice(
  Math.floor(Math.random() * 9) + 1,
)

const DUMMY_GALLERY_LIST: GalleryItem[] = [
  {
    id: 1,
    title: 'FLOWER',
    date: '2024.12.20',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.',
    image: '/images/dummy/9.png',
  },
  {
    id: 2,
    title: 'TITLE 2',
    date: '2024.12.20',
    description:
      'Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et malesuada fames ac turpis egestas sed. Sit amet nisl suscipit adipiscing bibendum est ultricies. Arcu ac tortor dignissim convallis aenean et tortor at. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Eros donec ac odio tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et magnis dis parturient montes nascetur. Est placerat in egestas erat imperdiet. Consequat interdum varius sit amet mattis vulputate enim.',
    image: '/images/dummy/10.png',
  },
  {
    id: 3,
    title: 'TITLE 3',
    date: '2024.12.24',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 4,
    title: 'TITLE 4',
    date: '2024.12.25',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 5,
    title: 'TITLE 5',
    date: '2024.12.26',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 6,
    title: 'TITLE 6',
    date: '2024.12.27',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 7,
    title: 'TITLE 7',
    date: '2024.12.28',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 8,
    title: 'TITLE 8',
    date: '2024.12.29',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 9,
    title: 'TITLE 9',
    date: '2024.12.30',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 10,
    title: 'TITLE 10',
    date: '2024.12.31',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 11,
    title: 'TITLE 11',
    date: '2025.01.01',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 12,
    title: 'TITLE 12',
    date: '2025.01.02',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 13,
    title: 'TITLE 13',
    date: '2025.01.03',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 14,
    title: 'TITLE 14',
    date: '2025.01.04',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 15,
    title: 'TITLE 15',
    date: '2025.01.05',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 16,
    title: 'TITLE 16',
    date: '2025.01.06',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 17,
    title: 'TITLE 17',
    date: '2025.01.07',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 18,
    title: 'TITLE 18',
    date: '2025.01.08',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 19,
    title: 'TITLE 19',
    date: '2025.01.09',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 20,
    title: 'TITLE 20',
    date: '2025.01.10',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 21,
    title: 'TITLE 21',
    date: '2024.12.15',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 22,
    title: 'TITLE 22',
    date: '2025.01.12',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 23,
    title: 'TITLE 23',
    date: '2024.12.18',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 24,
    title: 'TITLE 24',
    date: '2025.01.15',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 25,
    title: 'TITLE 25',
    date: '2024.12.22',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 26,
    title: 'TITLE 26',
    date: '2025.01.18',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 27,
    title: 'TITLE 27',
    date: '2024.12.28',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 28,
    title: 'TITLE 28',
    date: '2025.01.22',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 29,
    title: 'TITLE 29',
    date: '2024.12.30',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 30,
    title: 'TITLE 30',
    date: '2025.01.25',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 31,
    title: 'TITLE 31',
    date: '2024.12.16',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 32,
    title: 'TITLE 32',
    date: '2025.01.13',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 33,
    title: 'TITLE 33',
    date: '2024.12.19',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 34,
    title: 'TITLE 34',
    date: '2025.01.16',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 35,
    title: 'TITLE 35',
    date: '2024.12.23',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 36,
    title: 'TITLE 36',
    date: '2025.01.19',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 37,
    title: 'TITLE 37',
    date: '2024.12.29',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 38,
    title: 'TITLE 38',
    date: '2025.01.23',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 39,
    title: 'TITLE 39',
    date: '2024.12.31',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 40,
    title: 'TITLE 40',
    date: '2025.01.26',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 41,
    title: 'TITLE 41',
    date: '2024.12.17',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 42,
    title: 'TITLE 42',
    date: '2025.01.14',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 43,
    title: 'TITLE 43',
    date: '2024.12.21',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 44,
    title: 'TITLE 44',
    date: '2025.01.17',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 45,
    title: 'TITLE 45',
    date: '2024.12.24',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 46,
    title: 'TITLE 46',
    date: '2025.01.20',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 47,
    title: 'TITLE 47',
    date: '2024.12.26',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 48,
    title: 'TITLE 48',
    date: '2025.01.21',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 49,
    title: 'TITLE 49',
    date: '2024.12.27',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 50,
    title: 'TITLE 50',
    date: '2025.01.24',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 51,
    title: 'TITLE 51',
    date: '2024.12.28',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 52,
    title: 'TITLE 52',
    date: '2025.01.27',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 53,
    title: 'TITLE 53',
    date: '2024.12.29',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 54,
    title: 'TITLE 54',
    date: '2025.01.28',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 55,
    title: 'TITLE 55',
    date: '2024.12.30',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 56,
    title: 'TITLE 56',
    date: '2025.01.29',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 57,
    title: 'TITLE 57',
    date: '2024.12.31',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 58,
    title: 'TITLE 58',
    date: '2025.01.30',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 59,
    title: 'TITLE 59',
    date: '2025.01.01',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 60,
    title: 'TITLE 60',
    date: '2025.01.31',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 61,
    title: 'TITLE 61',
    date: '2025.01.02',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 62,
    title: 'TITLE 62',
    date: '2025.01.03',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 63,
    title: 'TITLE 63',
    date: '2025.01.04',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 64,
    title: 'TITLE 64',
    date: '2025.01.05',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
  {
    id: 65,
    title: 'TITLE 65',
    date: '2025.01.06',
    description: '내용이 들어갈 부분입니다.',
    image: '/images/dummy/default.png',
  },
]

const randomGalleryList = DUMMY_GALLERY_LIST.slice(
  0,
  Math.floor(Math.random() * DUMMY_GALLERY_LIST.length) + 1,
)

export const DOMESTIC_EXHIBITION_DATA: ExhibitionResponse[] = [
  {
    id: 1,
    title: '국제꽃장식대회',
    subTitle: '글로벌 플로리스트 주요사업',
    content:
      '전 세계의 꽃 장식 전문가들이 모여 창의적인 꽃 장식 작품을 선보이는 대회이다.',
    headerImage: '/images/dummy/3.png',
    mainImageList: randomImageList,
    galleryList: DUMMY_GALLERY_LIST,
  },
  {
    id: 2,
    title: '꽃생활화',
    subTitle: '',
    content:
      '학생들에게 꽃과 식물을 통해 생명의 소 중함을 깨닫게 하고, 일상 속에서 자연과 함께 하는 법을 배울 수 있는 기회를 제공하는 프로그램이다.',
    headerImage: '/images/dummy/4.png',
    mainImageList: randomImageList,
    galleryList: DUMMY_GALLERY_LIST,
  },
  {
    id: 3,
    title: '고양꽃박람회',
    subTitle: '',
    content:
      '고양 국제 꽃박람회는 경기도 고양시 호수공원에서 매년 봄 열리는 글로벌 화훼 행사로, 국내외 다양한 꽃과 식물을 전시하며 세계 화훼산업 트렌드를 확인할 수 있다.',
    headerImage: '/images/dummy/5.png',
    mainImageList: randomImageList,
    galleryList: DUMMY_GALLERY_LIST,
  },
  {
    id: 4,
    title: '농업박람회',
    subTitle: '',
    content:
      '농업박람회는 농업 기술, 제품, 문화 요소를 소개하고 체험할 수 있는 행사로, 지역 농업 홍보와 농촌 문화 가치 확산을 위해 매년 가을에 열린다.',
    headerImage: '/images/dummy/6.png',
    mainImageList: randomImageList,
    galleryList: DUMMY_GALLERY_LIST,
  },
  {
    id: 5,
    title: '양재플라워페스타',
    subTitle: '',
    content:
      '양재 플라워 페스타는 매년 가을, 양재 aT센터에서 열리는 꽃과 원예 축제로, 전시와 체험을 통해 꽃의 아름다움을 즐길 수 있는 행사이다.',
    headerImage: '/images/dummy/7.png',
    mainImageList: randomImageList,
    galleryList: DUMMY_GALLERY_LIST,
  },
]

export const INTERNATIONAL_EXHIBITION_DATA: ExhibitionResponse[] = [
  {
    id: 1,
    title: 'BUGA',
    subTitle: '',
    content:
      'BUGA는 독일에서 2년마다 열리는 대규모 원예 박람회로, 자연, 정원 설계, 도시 녹화를 주제로 다양한 국가들이 참여해 정원 디자인과 식물을 선보인다.',
    headerImage: '/images/dummy/8.png',
    mainImageList: randomImageList,
    galleryList: DUMMY_GALLERY_LIST,
  },
  {
    id: 2,
    title: 'IGA',
    subTitle: '',
    content:
      '독일에서 열리는 국제 규모의 정원 박람회로, 원예, 조경, 환경을 주제로 한 세계적인 행사이며, BUGA보다 큰 규모로, 정원과 도시 생태의 혁신적 아이디어를 선보이는 자리이다.',
    headerImage: '/images/dummy/7.png',
    mainImageList: randomImageList,
    galleryList: DUMMY_GALLERY_LIST,
  },
  {
    id: 3,
    title: 'STEINFURTH ROSE FESTIVAL',
    subTitle: '',
    content:
      '독일의 장미 축제로, 장미를 주제로 한 전시와 행사가 열리는 대규모 행사이다. 주로 시정원이나 장미 공원에서 개최되며, 다양한 장미 품종과 관련된 예술, 문화, 원예 기술을 소개한다.',
    headerImage: '/images/dummy/6.png',
    mainImageList: randomImageList,
    galleryList: DUMMY_GALLERY_LIST,
  },
  {
    id: 4,
    title: '퀼른의 봄',
    subTitle: '',
    content:
      '독일 쾰른에서 매년 봄에 열리는 대회로 꽃 전문가들이 여러 작품을 만들어내고 현장에서 대결하는 대회이다.',
    headerImage: '/images/dummy/5.png',
    mainImageList: randomImageList,
    galleryList: DUMMY_GALLERY_LIST,
  },
]

export const CERTIFICATION_DATA: CertificationResponse[] = [
  {
    id: 1,
    title: '대한민국플로리스트',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
    headerImage: '/images/dummy/2.png',
    certification: {
      image: '/images/dummy/6.png',
      information:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
      hyperlink: 'https://pqi.or.kr/inf/qul/infQulBasDetail.do',
    },
  },
  {
    id: 2,
    title: '대한민국테라리움',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
    headerImage: '/images/dummy/3.png',
    certification: {
      image: '/images/dummy/7.png',
      information:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
      hyperlink: 'https://pqi.or.kr/inf/qul/infQulBasDetail.do',
    },
  },
  {
    id: 3,
    title: '수경장식관리자',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
    headerImage: '/images/dummy/4.png',
    certification: {
      image: '/images/dummy/8.png',
      information:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
      hyperlink: 'https://pqi.or.kr/inf/qul/infQulBasDetail.do',
    },
  },
  {
    id: 4,
    title: '독일 IHK 플로리스트',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
    headerImage: '/images/dummy/5.png',
    certification: {
      image: '/images/dummy/9.png',
      information:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
      hyperlink: 'https://pqi.or.kr/inf/qul/infQulBasDetail.do',
    },
  },
]

export const ACTIVITY_DATA: ActivityResponse[] = [
  {
    id: 1,
    title: '데몬스트레이션',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
    headerImage: '/images/dummy/2.png',
    galleryList: randomGalleryList,
  },
  {
    id: 2,
    title: '노인복지센터 봉사',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
    headerImage: '/images/dummy/4.png',
    galleryList: randomGalleryList,
  },
  {
    id: 3,
    title: '꽃으로의 초대 워크숍',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
    headerImage: '/images/dummy/6.png',
    galleryList: randomGalleryList,
  },
  {
    id: 4,
    title: '꽃과 다도',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
    headerImage: '/images/dummy/8.png',
    galleryList: randomGalleryList,
  },
  {
    id: 5,
    title: '와인행사',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, ',
    headerImage: '/images/dummy/3.png',
    galleryList: randomGalleryList,
  },
]

export const ACTIVITY_DETAIL_DATA: ActivityDetailResponse = {
  id: 1,
  title: '2024년 데몬스트레이션',
  content: SAMPLE_HTML,
  mainImage: '/images/dummy/1.png',
  date: '2024.12.20',
  location: '슐레 (성북구)',
  florists: ['OOO', 'OOO', 'OOO'],
}
