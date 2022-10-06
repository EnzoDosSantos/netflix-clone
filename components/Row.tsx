import { useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import Thumbnail from "./Thumbnail"
import type { Movie } from "../types"

interface Props {
    movies: Movie[]
    title: string
}

function Row({ title, movies }: Props) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(false)
    const [isOnFinal, setIsOnFinal] = useState(false)
    const [debounce, setDebounce] = useState(false)

    const handleClick = (direction: "left" | "right") => {
        if (debounce) return
        setIsMoved(true)
        setDebounce(true)
        const { scrollLeft, clientWidth } = rowRef.current!
        const maxScroll = rowRef.current!.scrollWidth - clientWidth
        console.log(scrollLeft, maxScroll)
        if(scrollLeft === maxScroll){
            setIsOnFinal(true)
        } else {
            setIsOnFinal(false)
        }
        if(scrollLeft === 0){
            setIsMoved(false)
        }



        const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

        rowRef.current!.scrollTo({
            left: scrollTo,
            behavior: "smooth",
        })

        setTimeout(() => {
            setDebounce(false)
        }, 1000)
    }


    return (
        <div className="h-40 space-y-0.5 md:space-y-2">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
            <div className="group relative md:-ml-2">
                <ChevronLeftIcon
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`}
                    onClick={() => handleClick('left')}
                />
                <div ref={rowRef} className="scrollbar-hide flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
                    {
                        movies.map((movie) => (
                            <Thumbnail key={movie.id} movie={movie} />
                        ))
                    }
                </div>
                <ChevronRightIcon 
                    onClick={() => handleClick("right")}
                    className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${isOnFinal && 'hidden'}`}
                />
            </div>
        </div>
    )
}

export default Row