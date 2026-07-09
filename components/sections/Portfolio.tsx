'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, BookOpen, Tag } from 'lucide-react'
import type { Project } from '@/lib/types'

const CATEGORIES = ['All', 'Website', 'E-Commerce', 'CMS', 'Branding', 'Domain & Email']

const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Veetros Restaurant',
    description: 'A premium restaurant website with tribal maze aesthetics, online menu, and reservation flow.',
    thumbnail_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    live_url: '#',
    case_study_url: null,
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
    category: 'Website',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'New Trends Botswana',
    description: 'Full-stack fashion e-commerce platform with inventory management, order tracking, and admin panel.',
    thumbnail_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
    live_url: '#',
    case_study_url: null,
    technologies: ['Next.js 14', 'Supabase', 'Stripe'],
    category: 'E-Commerce',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Sesigo Referral CMS',
    description: 'End-to-end injury referral management system with state-machine workflows and partner clinic network.',
    thumbnail_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    live_url: null,
    case_study_url: '#',
    technologies: ['Next.js', 'PostgreSQL', 'Prisma'],
    category: 'CMS',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Partner Clinics Portal',
    description: 'Standalone clinic management portal with appointment scheduling, patient records, and reporting dashboard.',
    thumbnail_url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80',
    live_url: '#',
    case_study_url: null,
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
    category: 'CMS',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'BFL Corporate Suite',
    description: 'Enterprise CMS with multi-role access, content versioning, and integrated payment reconciliation.',
    thumbnail_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    live_url: '#',
    case_study_url: null,
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    category: 'CMS',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Hive Creative Agency',
    description: 'Brand identity system and marketing website for a pan-African creative agency.',
    thumbnail_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80',
    live_url: '#',
    case_study_url: '#',
    technologies: ['Next.js', 'Framer Motion', 'GSAP'],
    category: 'Branding',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? FALLBACK_PROJECTS
      : FALLBACK_PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <section id="portfolio" className="section-pad bg-cream-50 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-amber-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
            Projects That <span className="text-gradient">Drive Results</span>
          </h2>
          <p className="max-w-xl mx-auto text-charcoal-500 text-lg">
            Every project is a partnership. Here is what we have built together with our clients.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-amber-600 text-white shadow-glow-amber'
                  : 'bg-white border border-cream-300 text-charcoal-600 hover:border-amber-400 hover:text-amber-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-charcoal-400 py-16">No projects in this category yet.</p>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-cream-300 card-hover shadow-card flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden bg-charcoal-900">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 hex-bg flex items-center justify-center">
            <span className="text-charcoal-600 text-4xl font-display font-bold">
              {project.title[0]}
            </span>
          </div>
        )}
        {project.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-600 text-white text-xs font-bold rounded-lg">
            Featured
          </span>
        )}
        <span className="absolute top-3 right-3 px-2.5 py-1 glass-dark text-charcoal-200 text-xs font-medium rounded-lg">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold text-charcoal-900 text-xl mb-2">{project.title}</h3>
        <p className="text-charcoal-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium rounded-lg"
            >
              <Tag className="w-3 h-3" />
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              Live View
            </a>
          )}
          {project.case_study_url && (
            <a
              href={project.case_study_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-charcoal-200 hover:border-amber-400 text-charcoal-600 hover:text-amber-600 text-sm font-semibold rounded-xl transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              Case Study
            </a>
          )}
          {!project.live_url && !project.case_study_url && (
            <span className="flex-1 flex items-center justify-center py-2.5 bg-charcoal-50 text-charcoal-400 text-sm rounded-xl">
              Confidential
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
