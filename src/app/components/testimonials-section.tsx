'use client'

import { Card, CardContent } from '@/components/ui/card'

interface TestimonialsSectionProps {
  testimonials: Array<{
    name: string
    role: string
    location: string
    content: string
    avatar: string
  }>
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <article key={index} className="hover:shadow-xl transition-shadow">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold" aria-hidden="true">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-purple-300">{testimonial.location}</div>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                <p>&quot;{testimonial.content}&quot;</p>
              </blockquote>
            </CardContent>
          </Card>
        </article>
      ))}
    </div>
  )
}