import { Post, IPost } from '@/lib/models/post'
import connectDB from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

async function getPosts(): Promise<IPost[]> {
  try {
    await connectDB()
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec()
    return posts as unknown as IPost[]
  } catch (error) {
    console.error('获取文章失败:', error)
    return []
  }
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          所有文章
        </h1>
        <p className="text-lg text-muted-foreground">
          按时间倒序排列
        </p>
      </div>
      <div className="grid gap-6 pt-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {post.excerpt || post.content.slice(0, 100)}...
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString('zh-CN')}
              </p>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground">暂无文章</p>
        )}
      </div>
    </div>
  )
} 