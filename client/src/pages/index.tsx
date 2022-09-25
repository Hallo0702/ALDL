import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>알록달록</title>
        <meta
          name="description"
          content="알고 싶은 기억 달고 싶은 기억, 알록달록"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main>
        <section className="w-fill h-72 relative mb-8">
          <Image src="/images/banner.png" alt="배너" layout="fill" />
        </section>

        <section className="flex justify-center mb-16">
          <Link href="/lock/create">
            <Button
              btnSize="large"
              btnType="active"
              label="자물쇠 등록"
              customstyle="mr-8"
            ></Button>
          </Link>
          <Button btnSize="large" btnType="normal" label="모아보기"></Button>
        </section>

        <section className="flex flex-wrap justify-around gap-32">
          <Link href="/place/gwangju">
            <div className="w-1/4">
              <Card title="#광주" imageSrc="/images/landmark/seoul.png"></Card>
            </div>
          </Link>
          <div className="w-1/4 relative top-36 ">
            <Card title="#서울" imageSrc="/images/landmark/seoul.png"></Card>
          </div>
          <div className="w-1/4 relative top-16">
            <Card title="#부울경" imageSrc="/images/landmark/seoul.png"></Card>
          </div>
          <div className="w-1/4 relative top-36">
            <Card title="#구미" imageSrc="/images/landmark/seoul.png"></Card>
          </div>
          <div className="w-1/4">
            <Card title="#대전" imageSrc="/images/landmark/seoul.png"></Card>
          </div>
        </section>
        <div className="h-56"></div>
      </main>
    </>
  );
};

export default Home;
