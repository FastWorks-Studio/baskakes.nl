import { EntrySkeletonType } from 'contentful';
import client from './client';
import { Entry, ContentBlock, WebsiteStructure } from './types';

export async function fetchEntries(): Promise<Entry<ContentBlock>[]> {
  const response = await client.getEntries<EntrySkeletonType<ContentBlock>>({
    content_type: 'contentBlock',
  });

  return response.items;
}

export async function fetchWebsite(): Promise<Entry<WebsiteStructure>> {
  const response = await client.getEntries<EntrySkeletonType<WebsiteStructure>>({
    content_type: 'websiteStructure',
  });

  return response.items[0];
}