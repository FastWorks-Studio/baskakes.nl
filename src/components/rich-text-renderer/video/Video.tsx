import React from "react";
import "./Video.css";
import { VideoBlock } from "../../../contentful/types";

interface VideoProps {
  videoBlock: VideoBlock;
}

function parseAspectRatio(input?: string): number {
  if (!input) return 16 / 9;

  const float = parseFloat(input);
  if (!isNaN(float) && input.match(/^\d+(\.\d+)?$/)) {
    return float;
  }

  const parts = input.split(/[:\/]/);
  if (parts.length === 2) {
    const width = parseFloat(parts[0]);
    const height = parseFloat(parts[1]);
    if (!isNaN(width) && !isNaN(height) && height !== 0) {
      return width / height;
    }
  }

  return 16 / 9;
}

export const Video: React.FC<VideoProps> = ({ videoBlock }) => {
  const src = `${videoBlock.url}?badge=0&autopause=0&player_id=0&app_id=58479`;
  const aspectRatio = parseAspectRatio(videoBlock.aspectRatio);
  const paddingBottom = `${100 / aspectRatio}%`;
  return (
    <div className="video">
      {videoBlock.title ? <h2>{videoBlock.title}</h2> : null}
      <div className="video-container" style={{ paddingBottom }}>
        <iframe
          src={src}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={videoBlock.title}
        ></iframe>
      </div>
    </div>
  );
};