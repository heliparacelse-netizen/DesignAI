export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/history/:path*", "/viewer/:path*", "/settings/:path*"],
};
