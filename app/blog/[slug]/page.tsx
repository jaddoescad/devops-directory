import { getPostBySlug } from "@/lib/sanity/queries"
import { FadeIn } from "@/components/cult/fade-in"
import Image from "next/image"
import { PortableText } from "@portabletext/react"

interface PostParams {
  params: {
    slug: string
  }
}

export default async function BlogPost({ params }: PostParams) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <FadeIn>
      <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-8">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        {post.coverImage && (
          <div className="relative w-full h-64 mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div className="prose max-w-none">
          <PortableText value={post.body} />
        </div>
      </article>
    </FadeIn>
  )
}

