'use server';

import { default as Airtable, FieldSet } from 'airtable';
import { cache } from 'react';

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN! });

export const getLinks = cache(async () => {
  interface Links extends FieldSet {
    href: string;
    tags: string[];
  }

  const records = [] as Links[];
  await airtable
    .base('appcGHd3RQyNKtfzE')
    .table<Links>('tblYPGC2hOj2AzKId')
    .select()
    .eachPage((_records, fetchNextPage) => {
      records.push(..._records.map((record) => record.fields));
      fetchNextPage();
    });

  const links = {} as Record<string, string[]>;
  for (const link of records) {
    for (const tag of link.tags) {
      links[tag] = [...(links[tag] || []), link.href];
    }
  }
  return links;
});
