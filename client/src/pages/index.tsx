import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import places from '../constant/places';
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
        <section className="w-fill h-72 relative mb-8 hidden md:block">
          <Image src="/images/banner.png" alt="배너" layout="fill" />
        </section>
        <section className="w-fill h-64 relative mb-8 md:hidden">
          <Image src="/images/banner_mobile.png" alt="배너" layout="fill" />
        </section>

        <section className="flex justify-center mb-16">
          <Link href="/lock/collection">
            <Button btnSize="xlarge" btnType="normal" label="모아보기"></Button>
          </Link>
          <Link href="/lock/create">
            <Button
              btnSize="xlarge"
              btnType="active"
              label="자물쇠 등록"
            ></Button>
          </Link>
        </section>

        <section className="flex flex-wrap justify-around gap-lg md:gap-32">
          {places.map((place) => (
            <Link href={`/place/${place.placeName}`} key={place.id}>
              <div className="max-w-full w-96">
                <Card title={`#${place.name}`} imageSrc={place.bgImgSrc}></Card>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
