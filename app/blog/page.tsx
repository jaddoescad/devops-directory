import { getAllPosts } from "@/lib/sanity/queries"
import Link from "next/link"
import { FadeIn } from "@/components/cult/fade-in"

interface Post {
  _id: string;
  slug: {
    current: string;
  };
  coverImage?: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}

export default async function BlogIndex() {
  const posts = await getAllPosts()

  return (
    <FadeIn>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <Link href={`/blog/${post.slug.current}`} key={post._id} className="block">
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                {post.coverImage && (
                  <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-xl mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-auto">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
