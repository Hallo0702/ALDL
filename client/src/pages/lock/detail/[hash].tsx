import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Board from '../../../components/common/Board';

const Detail: NextPage = ({}) => {
  const router = useRouter();
  const hash = router.query.hash;

  const formState = {
    title: '예시제목',
    content: `국제
[더뉴스] 러시아 내 '징집' 항의 계속...점령지 합병 투표 '압도적' 가결
2022년 09월 28일 14시 29분 댓글 1개
글자크기 조정하기
 
인쇄하기
 
공유하기


■ 진행 : 김영수 앵커, 엄지민 앵커
■ 출연 : 일리야 벨랴코프 수원대 외국어학부 교수

* 아래 텍스트는 실제 방송 내용과 차이가 있을 수 있으니 보다 정확한 내용은 방송으로 확인하시기 바랍니다. 인용 시 [YTN 더뉴스] 명시해주시기 바랍니다.

[앵커]
러시아가 예비군 부분 동원령을 발동하자 징집을 피해 많은 젊은이들이 해외로 탈출하고 있습니다.

항의 시위는 물론, 점령지 주민투표까지 마감된 상황에서 우크라인 동원 등은 어떻게 전개될지 러시아 출신 방송인인 일리야 벨랴코프 수원대 외국어학부 교수와 짚어보겠습니다.

안녕하세요. 어서 오십시오. 러시아에서 태어나시고 러시아에서 공부하고 한국으로 귀화하신 거죠?

[일리야 벨랴코프]
맞습니다.`,
    hash: 'afasdfjhasdjlkfhaksjdfhkjasdhfkjasdhfkhasdkf',
    imgSrc: '/test.jpeg',
  };
  return (
    <>
      <Head>
        <title>자물쇠 상세보기</title>
        <meta name="description" content="자물쇠 상세보기" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className="text-center font-custom font-bold text-lg text-black mb-12">
        <h1>자물쇠 상세보기</h1>
      </div>
      <Board>
        <div className="flex flex-col gap-8">
          <div className="flex w-full h-12 items-center text-xl font-bold">
            <label htmlFor="title" className="w-16 mr-4">
              제목
            </label>
            <div
              id="title"
              className="w-full border border-black rounded-lg h-full py-2 px-4 font-medium"
            >
              {formState.title}
            </div>
          </div>
          <div className="flex w-full min-h-48 h-auto text-xl font-bold">
            <label htmlFor="content" className="w-16 mr-4 self-start">
              내용
            </label>
            <div
              id="content"
              className="w-full border border-black rounded-lg  p-4 font-medium"
            >
              <img
                src={`${formState.imgSrc}`}
                className="max-w-[50%] ml-8"
                alt="부산"
                align="right"
              />
              {formState.content}
            </div>
          </div>
          <div className="flex w-full items-center text-xl font-bold">
            <label htmlFor="address" className="w-16 mr-4 self-start">
              주소
            </label>
            <p>{formState.hash}</p>
          </div>
        </div>
      </Board>
    </>
  );
};
export default Detail;
