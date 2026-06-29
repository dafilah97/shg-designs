import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import RequestForm from '@/components/sections/RequestForm'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <RequestForm />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
