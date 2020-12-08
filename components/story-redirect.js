import { useEffect } from "react";

import { useRouter } from "next/router";

import styles from "./story-redirect.module.css";

export default function StoryRedirect({ url }) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push(url), 500);
  }, []);
  return (
    <div className={styles.redirect}>
      <img
        src="/images/logo-shield.svg"
        alt="Redirect img"
        width={300}
        height={300}
      />
      <span className={styles.h1}>Redirecting</span>
      <span className={styles.regular}>Please wait a few seconds...</span>
    </div>
  );
}
