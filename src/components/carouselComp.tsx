import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel  from "embla-carousel-react"
import Image from "next/image"
import { msgData } from "@/lib/example"

interface CarouselProps {
    photo?: boolean
}

const CarouselDemo: React.FC<CarouselProps> = ({ photo }) => {
    const plugin = React.useRef(
        Autoplay({ delay: photo?1500:5000})
    )

    return (    
        <Carousel className={`${photo?"w-1/2 border-white border-4 py-10 rounded-3xl my-10":"w-full mt-10"}`}
            opts={{
                loop: true,
                direction : photo?"ltr":"rtl",
            }}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
            plugins={[plugin.current]}
        >
            <CarouselContent className={`${photo?"":"flex flex-row-reverse"}`}>
                {msgData.map((_, index) =>
           { let g = 43 +  Math.floor(Math.random()*100);
            return(
                    <CarouselItem key={index} className={` ${photo?"basis-[100%] md:basis-1/3 pl-0 -ml-0":"basis-1/2 md:basis-1/5"}`}>
                        {photo ? <div className="border-y-8 border-dashed before:border-solid before:absolute before:-top-10 h-max">
                            <Image src={msgData[index].photoURL} alt={msgData[index].name} width={300} height={300} /></div> :
                            <div className={`glass py-6 px-4 rounded-xl`} style={{backgroundColor:`rgba(144,${g},245,0.4)`}}>
                                <p className="backdrop-blur-[1rem_0.5rem_0.5rem_#44aaff]">{msgData[index].message}</p>
                                <p className="text-end mt-4">~ {msgData[index].name}</p>
                            </div>
                            }
                    </CarouselItem>)}
                )}
            </CarouselContent>
        </Carousel>
    )
}

export default CarouselDemo
