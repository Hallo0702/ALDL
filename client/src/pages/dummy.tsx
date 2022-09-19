import type { NextPage } from 'next';
import axios from 'axios';
import { useEffect } from 'react';

const Dummy: NextPage = ({}) => {
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          'http://j7c207.p.ssafy.io:8088/api/emailduplicate?email=asfasd'
        );
        console.log(res);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data);
        }
      }
    };
    fetch();
  }, []);
  return <div>dummy</div>;
};
export default Dummy;
