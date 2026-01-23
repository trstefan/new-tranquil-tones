import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'


const FinalCTA = () => {
  return (
      <section className="text-center py-20 bg-moss-500/5 rounded-[4rem] border border-moss-500/10 backdrop-blur-3xl mb-32">
          <h2 className="text-4xl md:text-5xl font-serif italic text-moss-100 mb-8">Ready to compose your quiet?</h2>
          <Link
            href="/sanctuary"
            className="group relative inline-flex items-center gap-4 bg-moss-100 text-stone-950 px-10 py-4 rounded-full font-medium transition-all duration-500 hover:bg-white hover:scale-105"
          >
            Open Sanctuary <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>
  )
}

export default FinalCTA