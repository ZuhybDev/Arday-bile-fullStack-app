import { cookies } from "next/headers";
import Home from "../page";

export const schoolId = async () => {
  const schoolId = (await cookies()).get("schoolid")?.value ?? null;
console.log(schoolId)
  return <Home schoolId={schoolId} />;
};
