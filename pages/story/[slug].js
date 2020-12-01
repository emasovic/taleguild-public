import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import PostRedirect from "@/components/post-redirect";

import PostTitle from "@/components/post-title";

import { getStory, getStories } from "@/lib/api";
import { NextSeo } from "next-seo";
import { getIdFromSlug } from "@/lib/story";

export default function Post({ story }) {
  const router = useRouter();

  if (!router.isFallback && !story?.id) {
    return <ErrorPage statusCode={404} />;
  }
  const previewImage =
    "https://api.taleguild.com/uploads/Snowball-earth_f61cdd6af5.jpeg";

  const url =
    story && story.image
      ? process.env.NEXT_PUBLIC_STRAPI_API_URL + story.image.url
      : previewImage;

  const redirectUrl =
    process.env.NEXT_PUBLIC_STRAPI_UI_URL + "/story/" + story?.slug;

  return (
    <Container>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <NextSeo
            title={story.title}
            description={story.description}
            openGraph={{
              title: story.title,
              description: story.description,
              images: [
                {
                  url,
                  width: 1200,
                  height: 630,
                  alt: story.title,
                },
              ],
              url: redirectUrl,
              site_name: "https://taleguild.com/",
            }}
            twitter={{
              handle: "@handle",
              site: "@site",
              cardType: "summary_large_image",
            }}
          />
          <PostRedirect url={redirectUrl} />
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
