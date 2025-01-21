export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export interface Post {
  title: string
  content: string
  slug: string
  excerpt?: string
  createdAt: Date
  updatedAt: Date
} 