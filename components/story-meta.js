import Head from "next/head";

export default function StoryMeta({ title, description, imageUrl, siteUrl }) {
  return (
    <Head>
      <title>{title}</title>
      <link
        rel="image_src"
        href={imageUrl}
      />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Taleguild" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="Preview image" />

      {/* <meta property="fb:app_id" content="your_app_id" /> */}
      {/* <meta name="twitter:site" content="@website-username" /> */}
    </Head>
  );
}
