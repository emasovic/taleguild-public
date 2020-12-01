import { useEffect } from "react";

import { useRouter } from "next/router";

export default function Redirect({ url }) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push(goToStory(url)), 500);
  }, []);
  return (
    <>
      <div>Redirecting...</div>
    </>
  );
}
