import { useEffect, useState } from "react"
import Image from "next/image"
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { baseUrl } from "../constants/movie"
import { FaPlay } from "react-icons/fa"
import { InformationCircleIcon } from "@heroicons/react/outline"
import type { Movie } from "../types"

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() =>{
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  },[netflixOriginals])

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + " ..." : str
  }

  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)


  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] w-full -z-10">
        <Image
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
          alt={movie?.name} 
          />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
        {movie?.title || movie?.name}
      </h1>
      <p className="text-shadow-md max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">{truncate(movie?.overview!, 240)}</p>
      <div className="flex space-x-3">
        <button onClick={() => {
          setShowModal(true)
          setCurrentMovie(movie)
        }} className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-6 md:w-6"/>
          Play
        </button>
        <button onClick={() => {
          setShowModal(true)
          setCurrentMovie(movie)
        }} className="bannerButton bg-[gray]/70">
          More info
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8"/>
        </button>
      </div>
    </div>
  )
}

export default Banner