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

export default function Post({ story, preview }) {
  const router = useRouter();
  if (!router.isFallback && !story?.id) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {story.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="description" content={story.description} />
                <meta property="og:image" content={story.image.url} />
              </Head>
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
    </Layout>
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
