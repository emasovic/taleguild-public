import Head from "next/head";

export default function StoryMeta({ title, description, imageUrl, siteUrl }) {
  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta name="twitter:card" content="summary_large_image" />

      <meta property="og:site_name" content="Taleguild" />
      <meta name="twitter:image:alt" content="Preview image" />

      {/* <meta property="fb:app_id" content="your_app_id" /> */}
      {/* <meta name="twitter:site" content="@website-username" /> */}
    </Head>
  );
}
