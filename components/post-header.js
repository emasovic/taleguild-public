import { useEffect } from "react";

import { useRouter } from "next/router";

const goToStory = (slug) =>
  process.env.NEXT_PUBLIC_STRAPI_UI_URL + "/story/" + slug;

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  description,
  slug,
}) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push(goToStory(slug)), 300);
  }, []);
  return (
    <>
      <div>Redirecting...</div>
    </>
  );
}
