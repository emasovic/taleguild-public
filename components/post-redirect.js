import { useEffect } from "react";

import { useRouter } from "next/router";

export default function PostRedirect({ url }) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push(url), 300);
  }, []);
  return (
    <>
      <div>Redirecting...</div>
    </>
  );
}
