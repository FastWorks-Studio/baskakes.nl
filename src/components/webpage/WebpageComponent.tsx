// components/WebsiteStructure.tsx
import { Entry, ContentBlock, VideoBlock, Webpage, ContentBlockTypeId, VideoBlockTypeId } from '../../contentful/types';
import RichTextRenderer from '../rich-text-renderer/RichTextRenderer';
import { Video } from '../rich-text-renderer/video/Video';
import './WebpageComponent.css';

interface Props {
  webpage: Entry<Webpage>;
}

const WebpageComponent = ({ webpage }: Props) => {
  function getVideoUrl() {
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isPortrait) {
      const portraitBackground = webpage.fields.portraitBackground;
      return portraitBackground?.fields.file?.url as string;
    } else {
      const landscapeBackground = webpage.fields.landscapeBackground;
      return landscapeBackground?.fields.file?.url as string;
    }
  }

  return (
    <div className="webpage">
      <div className='page-background'>
        <video id="background-video" preload="none" src={getVideoUrl()} autoPlay muted loop playsInline />
      </div>
      {webpage.fields.content.map((entry: Entry<ContentBlock | VideoBlock>) => {
        switch (entry.sys.contentType?.sys.id) {
          case ContentBlockTypeId:
            const contentBlock = entry as Entry<ContentBlock>;
            return (
              <div key={entry.sys.id}>
                <RichTextRenderer document={contentBlock.fields.content} />
              </div>
            );
          case VideoBlockTypeId:
            const videoBlock = entry as Entry<VideoBlock>;
            return (
              <div key={entry.sys.id}>
                <Video videoBlock={videoBlock.fields} />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default WebpageComponent;
