export interface Project {
  id: string
  title: string
  description: string
  thumbnail_url: string | null
  live_url: string | null
  case_study_url: string | null
  technologies: string[]
  category: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface SiteContent {
  id: string
  key: string
  value: string
  updated_at: string
}

export interface ClientRequest {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string
  budget: string | null
  timeline: string | null
  message: string
  status: 'new' | 'in_progress' | 'completed' | 'archived'
  created_at: string
}

export interface RequestFormData {
  step: number
  name: string
  email: string
  phone: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
}
