import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreStories from "@/components/more-stories";
import Header from "@/components/header";
import PostHeader from "@/components/post-header";
import SectionSeparator from "@/components/section-separator";
import Layout from "@/components/layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/lib/apiz";
import PostTitle from "@/components/post-title";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import { getStory, getStories } from "@/lib/api";
import { NextSeo } from "next-seo";

export default function Post({ story, preview }) {
  const router = useRouter();
  if (!router.isFallback && !story?.id) {
    return <ErrorPage statusCode={404} />;
  }
  const previewImage =
    "https://api.taleguild.com/uploads/Snowball-earth_f61cdd6af5.jpeg";

  const url = story && story.image ? 'https://api.taleguild.com/uploads/' + story.image.url : previewImage;
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
                // canonical="https://www.canonical.ie/"
                openGraph={{
                  // url: "https://www.url.ie/a",
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
              />
              {/* <PostBody content={post.content} /> */}
            </article>
            <SectionSeparator />
            {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          </>
        )}
      </Container>
    </>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const story = await getStory(params.id);

  return {
    props: {
      story,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getStories();
  return {
    paths: allPosts?.map((post) => `/posts/${post.id}`) || [],
    fallback: true,
  };
}
