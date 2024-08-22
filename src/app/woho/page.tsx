"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: false })
  ])
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    setIsPlaying(autoScroll.isPlaying())
    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoScroll.isPlaying()))
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide basis-1/3" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 8
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const App: React.FC = () => (
  <>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </>
)

export default App