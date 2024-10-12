import { Metadata } from 'next'
import { notFound, redirect } from "next/navigation"

import { FadeIn } from "@/components/cult/fade-in"
import { getProductById } from "@/app/actions/product"

import { ProductDetails } from "./details"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductById(params.slug)

  if (!product) {
    return {
      title: 'Course Not Found | All DevOps Courses',
      description: 'The requested course could not be found in our directory.',
    }
  }

  return {
    title: `${product.name} | All DevOps Courses`,
    description: product.description || `Learn about ${product.name} and enhance your DevOps skills.`,
    openGraph: {
      title: `${product.name} | All DevOps Courses`,
      description: product.description || `Discover ${product.name} and advance your DevOps career.`,
      type: 'article',
      url: `https://alldevopscourses.com/products/${params.slug}`,
      images: [
        {
          url: product.image || 'https://alldevopscourses.com/default-course-image.jpg',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  }
}

const ProductIdPage = async ({ params }: { params: { slug: string } }) => {
  let data = await getProductById(params.slug)
  
  if (!data) {
    notFound()
  }

  return (
    <>
      <div className="z-10">
        <div className="py-4 w-full relative mx-auto max-w-6xl">
          <FadeIn>{data ? <ProductDetails product={data} /> : null}</FadeIn>
        </div>
      </div>
    </>
  )
}

export default ProductIdPage
