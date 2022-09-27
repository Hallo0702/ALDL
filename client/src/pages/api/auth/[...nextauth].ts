import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '../../../api/auth';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const response = await login({
          email,
          password,
        });
        // if (email !== 'test123@gmail.com' || password !== '1234') {
        //   throw new Error('등록되지 않은 회원입니다.');
        // }
        return response?.data;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    // error: '/auth/error',
    // signOut: '/auth/logout',
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: '유저 이메일, 패스워드 방식',
//       // The credentials is used to generate a suitable form on the sign in page.
//       // You can specify whatever fields you are expecting to be submitted.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: {
//           label: '이메일',
//           type: 'email',
//           placeholder: 'user@email.com',
//         },
//         password: {
//           label: '비밀번호',
//           type: 'password',
//         },
//       },
//       async authorize(credentials, req) {
//         // Add logic here to look up the user from the credentials supplied
//         // todo: 로그인 api 수정
//         if (
//           credentials.email === 'test123@gmail.com' &&
//           credentials.password === 'test123'
//         ) {
//           // Any object returned will be saved in `user` property of the JWT
//           const user = { id: 1, name: '테스트', email: 'test123@gmail.com' };
//           return user;
//         }
//         // If you return null or false then the credentials will be rejected
//         return null;
//         // You can also Reject this callback with an Error or with a URL:
//         // throw new Error("error message") // Redirect to error page
//         // throw "/path/to/redirect"        // Redirect to a URL
//       },
//     }),
//   ],
//   secret: process.env.SECRET,
// });
