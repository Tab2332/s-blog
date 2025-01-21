import mongoose, { Document, Schema, model, models } from 'mongoose'

export interface IPost {
  title: string
  content: string
  slug: string
  excerpt?: string
  createdAt: Date
  updatedAt: Date
}

export interface PostDocument extends Document, IPost {}

const postSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: [true, '标题是必需的'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, '内容是必需的'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // 自动管理 createdAt 和 updatedAt
  }
)

// 如果模型已存在则使用已有模型,否则创建新模型
export const Post = models.Post || model<PostDocument>('Post', postSchema) 