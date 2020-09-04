import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import { getStories, getStory } from '@/lib/api'

export default function Index({ story, preview }) {
console.log(story)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
           {story && (
            <HeroPost
              title={story.title}
              coverImage={story.image}
              date={story.created_at}
              author={story.user}
              slug={story.slug}
              id={story.id}
              excerpt={story.excerpt}
            />
          )}
          {/*{morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const story = null
  return {
    props: { story },
  }
}
