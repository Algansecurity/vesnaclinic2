export interface SiteSettings {
  id: string
  siteName: string
  tagline: string
  description: string
  logo?: string
  favicon?: string
  primaryColor: string
  secondaryColor: string
  whatsappNumber?: string
  instagramUrl?: string
  facebookUrl?: string
  twitterUrl?: string
  address?: string
  phone?: string
  email?: string
  workingHours?: string
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  title: string
  description: string
  content: string
  image?: string
  price?: string
  duration?: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface BeforeAfter {
  id: string
  title: string
  description?: string
  beforeImage: string
  afterImage: string
  category: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  name: string
  content: string
  rating: number
  image?: string
  location?: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Page {
  id: string
  title: string
  slug: string
  content: string
  metaTitle?: string
  metaDescription?: string
  isPublished: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  metaTitle?: string
  metaDescription?: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Gallery {
  id: string
  title: string
  image: string
  category: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Admin {
  id: string
  email: string
  name: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface ServiceFormData {
  title: string
  description: string
  content: string
  image?: string
  price?: string
  duration?: string
  isActive?: boolean
}

export interface BeforeAfterFormData {
  title: string
  description?: string
  beforeImage: string
  afterImage: string
  category: string
  isActive?: boolean
}

export interface TestimonialFormData {
  name: string
  content: string
  rating: number
  image?: string
  location?: string
  isActive?: boolean
}

export interface PageFormData {
  title: string
  slug: string
  content: string
  metaTitle?: string
  metaDescription?: string
  isPublished?: boolean
}

export interface BlogPostFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  metaTitle?: string
  metaDescription?: string
  isPublished?: boolean
}

export interface SiteSettingsFormData {
  siteName: string
  tagline: string
  description: string
  logo?: string
  favicon?: string
  primaryColor: string
  secondaryColor: string
  whatsappNumber?: string
  instagramUrl?: string
  facebookUrl?: string
  twitterUrl?: string
  address?: string
  phone?: string
  email?: string
  workingHours?: string
} 