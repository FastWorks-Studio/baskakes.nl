import { EntrySkeletonType } from 'contentful';
import client from './client';
import { Entry, Webpage, WebpageTypeId } from './types';

export async function fetchWebsite(): Promise<Entry<Webpage>> {
  const response = await client.getEntries<EntrySkeletonType<Webpage>>({
    content_type: WebpageTypeId,
  });
  console.log(response.items[0]);
  return response.items[0];
}