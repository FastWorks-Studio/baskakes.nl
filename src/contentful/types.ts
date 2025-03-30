export interface Entry<T> {
  sys: {
    id: string;
    contentType?: {
      sys: {
        id: string;
      };
    };
  };
  fields: T;
}

export const ContentBlockTypeId = 'contentBlock';
export interface ContentBlock {
  entryName: string;
  content: Document;
}

export const VideoBlockTypeId = 'videoBlock';
export interface VideoBlock {
  entryName: string;
  title: string;
  url: string;
  aspectRatio?: string;
}

export const WebsiteStructureTypeId = 'webpage';
export interface WebsiteStructure {
  entryName: string;
  content: Entry<ContentBlock | VideoBlock>[];
}