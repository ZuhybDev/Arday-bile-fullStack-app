import { Button } from '@/components/ui/button'
import React from 'react'

const Hero = () => {
  return (
    <div className=' bg-[linear-gradient(to_bottom, #000, #200D42_35%, #4F21A1, #A46EDB_82%)] p-[72px]'>
        <div className="container">
            <h1>Empower Your Academic Journey</h1>

            <p className="italic">Effortless task tracking and smart planning for every scholar.</p>

                <div className='flex gap-4'>

            <Button>Get for free</Button>
            <Button>Look your academic </Button>
                </div>
        </div>
    
    </div>
  )
}

export default Hero
