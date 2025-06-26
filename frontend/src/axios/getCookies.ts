import { cookies } from "next/headers";

export const getCookies = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};
