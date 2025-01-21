import { Post, IPost } from '@/lib/models/post'
import connectDB from '@/lib/db'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface PostPageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string): Promise<IPost | null> {
  try {
    await connectDB()
    const post = await Post.findOne({ slug })
      .lean()
      .exec()
    return post as unknown as IPost | null
  } catch (error) {
    console.error('获取文章失败:', error)
    return null
  }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 100),
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container max-w-3xl py-6 md:py-10">
      <div className="space-y-4">
        <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
          {post.title}
        </h1>
        <div className="text-sm text-muted-foreground">
          {new Date(post.createdAt).toLocaleString('zh-CN', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        {post.content}
      </div>
    </article>
  )
} 