import { Post } from '@/lib/models/post'
import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'

const posts = [
  {
    title: '使用Next.js 14开发个人博客',
    content: '本文将介绍如何使用Next.js 14、TypeScript和Tailwind CSS开发一个现代化的个人博客系统。我们将使用App Router进行路由管理，使用MongoDB存储数据，并使用shadcn/ui构建美观的用户界面。\n\n## 技术栈\n\n- Next.js 14\n- TypeScript\n- Tailwind CSS\n- MongoDB\n- shadcn/ui\n\n## 主要功能\n\n1. 文章管理\n2. 主题切换\n3. 响应式设计',
    slug: 'build-blog-with-nextjs',
    excerpt: '使用Next.js 14、TypeScript和Tailwind CSS开发个人博客系统',
  },
  {
    title: 'TypeScript入门指南',
    content: 'TypeScript是JavaScript的超集，它添加了静态类型检查和面向对象编程的特性。本文将介绍TypeScript的基础知识和最佳实践。\n\n## 为什么选择TypeScript\n\n1. 静态类型检查\n2. 更好的IDE支持\n3. 更容易维护的代码\n\n## 基础语法\n\n```typescript\ninterface User {\n  name: string;\n  age: number;\n}\n\nfunction greet(user: User) {\n  console.log(`Hello, ${user.name}`);\n}\n```',
    slug: 'typescript-guide',
    excerpt: 'TypeScript基础知识和最佳实践指南',
  },
  {
    title: 'Tailwind CSS实战技巧',
    content: 'Tailwind CSS是一个功能类优先的CSS框架，它提供了大量预定义的工具类，可以帮助我们快速构建现代化的用户界面。\n\n## Tailwind CSS的优势\n\n1. 无需编写自定义CSS\n2. 响应式设计变得简单\n3. 主题定制非常灵活\n\n## 常用技巧\n\n1. 使用@apply抽取重复的类\n2. 响应式设计的最佳实践\n3. 暗黑模式的实现',
    slug: 'tailwind-css-tips',
    excerpt: 'Tailwind CSS使用技巧和最佳实践',
  }
]

export async function GET() {
  try {
    await connectDB()
    
    // 清空现有数据
    await Post.deleteMany({})
    
    // 插入测试数据
    await Post.insertMany(posts)
    
    return NextResponse.json({ message: '测试数据添加成功' })
  } catch (error) {
    console.error('添加测试数据失败:', error)
    return NextResponse.json(
      { error: '添加测试数据失败' },
      { status: 500 }
    )
  }
} 