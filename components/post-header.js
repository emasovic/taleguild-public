import { useEffect } from "react";

import { useRouter } from "next/router";

import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";

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
    setTimeout(() => router.push(goToStory(slug)), 2000);
  }, []);
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {author && <Avatar name={author.username} picture={author.avatar} />}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {coverImage && <CoverImage title={title} url={coverImage.url} />}
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {author && <Avatar name={author.username} picture={author.avatar} />}
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
        <div className="mb-6 text-lg">{description}</div>
      </div>
    </>
  );
}
