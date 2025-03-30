// components/WebsiteStructure.tsx
import { Entry, ContentBlock, VideoBlock, WebsiteStructure, ContentBlockTypeId, VideoBlockTypeId } from '../../contentful/types';
import RichTextRenderer from '../rich-text-renderer/RichTextRenderer';
import { Video } from '../rich-text-renderer/video/Video';
import './WebsiteStructure.css';

interface Props {
  website: Entry<WebsiteStructure>;
}

const WebsiteStructureComponent = ({ website }: Props) => {
  return (
    <div className="websiteStructure">
      {website.fields.contentBlocks.map((entry: Entry<ContentBlock | VideoBlock>) => {
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

export default WebsiteStructureComponent;
