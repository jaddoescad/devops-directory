import { client } from './client'

export async function getAllPosts() {
  console.log('Fetching all posts...');
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "coverImage": mainImage.asset->url
  }`);
  console.log('Fetched posts:', posts);
  return posts;
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    "coverImage": mainImage.asset->url
  }`, { slug })
}
