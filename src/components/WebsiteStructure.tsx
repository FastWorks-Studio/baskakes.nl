// components/WebsiteStructure.tsx
import { Entry, ContentBlock, VideoBlock, WebsiteStructure } from '../contentful/types';
import RichTextRenderer from './RichTextRenderer';

interface Props {
  website: Entry<WebsiteStructure>;
}

const WebsiteStructureComponent = ({ website }: Props) => {
  return (
    <>
      {website.fields.contentBlocks.map((entry: Entry<ContentBlock | VideoBlock>) => {
        if ('content' in entry.fields) {
          const contentBlock = entry as Entry<ContentBlock>;
          return (
            <div key={entry.sys.id}>
              <RichTextRenderer document={contentBlock.fields.content} />
            </div>
          );
        } else if ('url' in entry.fields) {
          const videoBlock = entry as Entry<VideoBlock>;
          return (
            <div key={entry.sys.id}>
              <video controls width="100%">
                <source src={videoBlock.fields.url} />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default WebsiteStructureComponent;
