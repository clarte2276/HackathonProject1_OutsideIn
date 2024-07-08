const postList = [
  {
    no: 1,
    name: '기쁨이',
    title: '이겨냈어',
    content: '첫번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 2,
    name: '에스파',
    title: '수수수퍼노바사건은다가와아오우예~',
    content: '두번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 3,
    name: '아이유',
    title: '세상에게서 도망쳐, RUN ON',
    content: '세번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 4,
    name: '기쁨이',
    title: '이겨냈어',
    content: '첫번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 5,
    name: '에스파',
    title: '수수수퍼노바사건은다가와아오우예~',
    content: '두번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 6,
    name: '아이유',
    title: '세상에게서 도망쳐, RUN ON',
    content: '세번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 7,
    name: '기쁨이',
    title: '이겨냈어',
    content: '첫번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 8,
    name: '에스파',
    title: '수수수퍼노바사건은다가와아오우예~',
    content: '두번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 9,
    name: '아이유',
    title: '세상에게서 도망쳐, RUN ON',
    content: '세번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 10,
    name: '기쁨이',
    title: '이겨냈어',
    content: '첫번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 11,
    name: '에스파',
    title: '수수수퍼노바사건은다가와아오우예~',
    content: '두번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 12,
    name: '아이유',
    title: '세상에게서 도망쳐, RUN ON',
    content: '세번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 13,
    name: '기쁨이',
    title: '이겨냈어',
    content: '첫번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 14,
    name: '에스파',
    title: '수수수퍼노바사건은다가와아오우예~',
    content: '두번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
  {
    no: 15,
    name: '아이유',
    title: '세상에게서 도망쳐, RUN ON',
    content: '세번째 게시글 내용입니다.',
    createDate: '2024.07.07',
    readCount: 10,
  },
];

const getPostByNo = (no) => {
  const array = postList.filter((x) => x.no == no);
  if (array.length == 1) {
    return array[0];
  }
  return null;
};

export { postList, getPostByNo };
