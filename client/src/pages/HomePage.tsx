import { LoaderCircle } from 'lucide-react'
import React from 'react'
import Filter from '../components/Filter'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import ShoppingCard from '../components/ShoppingCard'
import { Button } from '../components/ui/button'

const HomePage = () => {
  return (
    <Layout title={"Trendora - shop now"}>
      <Hero />
      <Filter />

      {/* all products  */}
      <div>
        <h3 className='mb-4 text-zinc-950  text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-center '>All Mobile Phones</h3>
        <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-3 gap-4'>
          <ShoppingCard />
          <ShoppingCard />
          <ShoppingCard />
          <ShoppingCard />
          <ShoppingCard />
          <ShoppingCard />

        </div>
        <div className='w-full mx-auto flex justify-center'>
          <Button variant='ghost' className='text-xl text-zinc-950 '>Load More<LoaderCircle /></Button>
        </div>
      </div>

    </Layout>
  )
}

export default HomePage