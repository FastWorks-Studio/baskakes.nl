import React from 'react';
import './BackgroundVideo.css';

interface BackgroundVideoProps {
  videoSrc?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoSrc }) => {
  function getVideoUrl() {
    const orientation =
      window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    return `./assets/video/bg_${orientation}.mp4`;
  }

  return (
    <video preload="none" src={videoSrc ?? getVideoUrl()} autoPlay muted loop playsInline />
  );
};

export default BackgroundVideo;