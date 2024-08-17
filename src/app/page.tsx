import GSquare from "@/components/gsapSquare"
import { Pacifico } from "next/font/google"

const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"]
})

const Home :React.FC =()=>{
  return (
    <main className="h-screen flex justify-evenly">
      <section className="h-full flex justify-center items-center">
        <GSquare/>
      </section>
      <section className="text-7xl h-full flex justify-center items-center">
        <p  className={pacifico.className}></p>
      </section>
    </main>
  )
}

export default Home