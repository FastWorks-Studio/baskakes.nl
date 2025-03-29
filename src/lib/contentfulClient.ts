import { createClient, Entry } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';

type ContentModel = {
  title: string;
  content: Document;
};

const client = createClient({
  space: '',
  accessToken: ''
});

export async function fetchContent(): Promise<(Entry<ContentModel> & { htmlBody: string })[]> {
  const res = await client.getEntries<ContentModel>({
    content_type: 'portfolioProject'
  });

  return res.items.map((entry) => ({
    ...entry,
    htmlBody: documentToHtmlString(entry.fields.content)
  }));
}
