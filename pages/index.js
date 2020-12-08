export default function Index() {
  return <>Welcome to taleguild.</>;
}

export async function getStaticProps({ preview = null }) {
  const story = null;
  return {
    props: { story },
  };
}
