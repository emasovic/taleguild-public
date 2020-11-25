import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import Header from "@/components/header";
import PostHeader from "@/components/post-header";
import SectionSeparator from "@/components/section-separator";

import PostTitle from "@/components/post-title";

import { getStory, getStories } from "@/lib/api";
import { NextSeo } from "next-seo";
import { getIdFromSlug } from "@/lib/story";

export default function Post({ story, preview }) {
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

  return (
    <>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <NextSeo
                title={story.title}
                description={story.description}
                openGraph={{
                  title: story.title,
                  description: story.description,
                  images: [
                    {
                      url,
                      width: 800,
                      height: 600,
                      alt: "Og Image Alt",
                    },
                  ],
                  site_name: "SiteName",
                }}
                twitter={{
                  handle: "@handle",
                  site: "@site",
                  cardType: "summary_large_image",
                }}
              />
              <PostHeader
                title={story.title}
                coverImage={story.image}
                date={story.created_at}
                author={story.user}
                description={story.description}
                slug={story.slug}
              />
            </article>
            <SectionSeparator />
          </>
        )}
      </Container>
    </>
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
