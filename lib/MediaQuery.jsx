import React, {createContext, useContext, useState, useEffect} from "react";

const breakpointsOpt = {
  isNarrow: 460,
  isPhone: 767,
  isTablet: 1024,
};

const mediaConditions = (breakpoints) => {
  const media = {};
  for (const bp of Object.entries(breakpoints))
    media[bp[0]] = bp[1] > window.innerWidth;

  return media;
};

const MediaQueryCtx = createContext();
const MediaQueryProvider = ({children}) => {
  const [media, setMedia] = useState(mediaConditions(breakpointsOpt));

  useEffect(() => {
    const handleResize = () => {
      setMedia(mediaConditions(breakpointsOpt));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <MediaQueryCtx.Provider value={media}>{children}</MediaQueryCtx.Provider>
  );
};
export default MediaQueryProvider;
export const useMediaQuery = () => useContext(MediaQueryCtx);
