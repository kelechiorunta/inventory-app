import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // If token exists, user is authenticated; otherwise, redirect to sign-in page
      return !!token;
    },
  },
  pages: {
    signIn: '/signin', // Custom sign-in page
  },
});
