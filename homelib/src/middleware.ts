export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/add-book","/add-cover-images","/authors/add","/genres/add","/user-profile"],
};
