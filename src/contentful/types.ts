export interface Entry<T> {
  sys: {
    id: string;
  };
  fields: T;
}

export interface ContentBlock {
  title: string;
  content: Document;
}

export interface VideoBlock {
  title: string;
  url: string;
}

export interface WebsiteStructure {
  title: string;
  contentBlocks: Entry<ContentBlock | VideoBlock>[];
}