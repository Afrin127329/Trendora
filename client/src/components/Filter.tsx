import React from 'react'
import { RadioGroupDemo } from './ui/radio-com'
const Filter = () => {
  return (
    <section className="py-24 relative px-10 flex items-center gap-10 justify-between">
      {/* price filter  */}
      <div className='w-[25%]'>
        <RadioGroupDemo />
      </div>

      {/* category filter  */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <h3 className='mb-4 text-zinc-950  text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-center '>Categories</h3>
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
          <button type="button" className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">All categories</button>
          <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Samsung</button>
          <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Iphone</button>
          <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Vivo</button>
          <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Oppo</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <img className="h-auto w-[17rem] max-w-full rounded-lg" src="iphone4.webp" alt="" />
          </div>
          <div>
            <img className="h-auto w-[17rem] max-w-full rounded-lg" src="Oppo.webp" alt="" />

          </div>
          <div>
            <img className="h-auto w-[17rem] max-w-full rounded-lg" src="samsung3.webp" alt="" />

          </div>
        </div>
      </div>



    </section>

  )
}

export default Filter