import { useRouter } from "next/router";
import ErrorPage from "next/error";

import Container from "@/components/container";
import StoryRedirect from "@/components/story-redirect";

import PostTitle from "@/components/post-title";
import StoryMeta from "@/components/story-meta";

import { getStory, getStories } from "@/lib/api";
import { getIdFromSlug } from "@/lib/story";

export default function Post({ story }) {
  const router = useRouter();

  if (!router.isFallback && !story?.id) {
    return <ErrorPage statusCode={404} />;
  }

  const url =
    story && story.image
      ? process.env.NEXT_PUBLIC_STRAPI_API_URL + story.image.url
      : process.env.NEXT_PUBLIC_STRAPI_SHARE_URL + "/images/taleguild-logo.png";

  const redirectUrl =
    process.env.NEXT_PUBLIC_STRAPI_UI_URL + "/story/" + story?.slug;

  const siteUrl =
    process.env.NEXT_PUBLIC_STRAPI_SHARE_URL + "/story/" + story?.slug;

  return (
    <Container>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <StoryMeta
            title={story.title}
            description={story.description}
            imageUrl={url}
            siteUrl={siteUrl}
          />
          <StoryRedirect url={redirectUrl} />
        </>
      )}
    </Container>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const id = getIdFromSlug(params.slug);
  const story = await getStory(id);

  return {
    props: {
      story,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getStories();

  return {
    paths: allPosts?.map((post) => `/story/${post.slug}`) || [],
    fallback: true,
  };
}
