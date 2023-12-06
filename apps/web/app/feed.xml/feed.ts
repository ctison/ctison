import { allPosts } from 'contentlayer/generated';
import { Feed } from 'feed';

export const feed = new Feed({
  title: '@ctison',
  copyright: 'MIT',
  id: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  language: 'en',
  link: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  updated: new Date(),
  author: {
    name: 'ctison',
    link: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  },
});

allPosts.forEach((post) => {
  feed.addItem({
    title: post.title,
    id: post._id,
    link: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog${post.url}`,
    content: post.body.raw,
    date: new Date(post.date),
    image: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${post.image}`,
  });
});

feed.addCategory('Technology');
