import Image from "next/image"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import type { Movie } from "../types"

interface Props {
    movie: Movie
}

function Thumbnail({ movie }: Props) {

    const [showModal, setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    return (
        <div onClick={() => {
            setShowModal(true)
            setCurrentMovie(movie)
        }} className="overflow-y-hidden relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                className="rounded-sm object-cover md:rounded"
                layout="fill"
                alt={movie.title || movie.original_name}
            />
            <p className="relative mt-[120px] text-[white]/80 font-bold ml-2">{movie.title || movie.original_name}</p>
        </div>
    )
}

export default Thumbnail