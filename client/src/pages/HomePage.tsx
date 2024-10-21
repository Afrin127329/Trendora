import React from 'react'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Filter from '../components/Filter'

const HomePage = () => {
  return (
    <Layout title={"Trendora - shop now"}>
      <Hero />
      <Filter />
    </Layout>
  )
}

export default HomePage