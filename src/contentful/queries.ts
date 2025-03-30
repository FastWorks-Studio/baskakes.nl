import { EntrySkeletonType } from 'contentful';
import client from './client';
import { Entry, WebsiteStructure, WebsiteStructureTypeId } from './types';

export async function fetchWebsite(): Promise<Entry<WebsiteStructure>> {
  const response = await client.getEntries<EntrySkeletonType<WebsiteStructure>>({
    content_type: WebsiteStructureTypeId,
  });
  console.log(response.items[0]);
  return response.items[0];
}