import { useEffect } from "react";

import { useRouter } from "next/router";

const getDeviceDetect = (userAgent) => {
  console.log(userAgent);
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
  const isSSR = () => Boolean(userAgent.match(/SSR/i));
  const isMobile = () =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = () => Boolean(!isMobile() && !isSSR());
  const isBot = () => Boolean(userAgent.match(/bot/i));
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
    isBot,
  };
};
const useDeviceDetect = () => {
  useEffect(() => {}, []);
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
  return getDeviceDetect(userAgent);
};

export default function Redirect({ url }) {
  const router = useRouter();
  const currentDevice = useDeviceDetect();

  useEffect(() => {
    if (currentDevice && !currentDevice.isBot()) {
      router.push(url);
    }
  }, []);
  return <div>Redirecting...</div>;
}
