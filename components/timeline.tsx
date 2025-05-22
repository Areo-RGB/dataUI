"use client"
import { useScroll, useTransform, motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      className="w-full bg-card dark:bg-card font-sans md:px-10 rounded-xl border border-border shadow-sm"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <motion.h1
              className="text-3xl md:text-6xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-chart-4 via-chart-1 to-chart-2 text-transparent bg-clip-text" // from-purple-500 via-blue-500 to-teal-500 -> from-chart-4 via-chart-1 to-chart-2
              initial={{ opacity: 1 }}
            >
              {Array.from("TIMELINE").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                className="inline-block w-[3px] h-[40px] md:h-[60px] bg-chart-1 ml-1 align-middle" // bg-blue-500 -> bg-chart-1
              />
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "circOut" }}
              className="h-[3px] w-full bg-gradient-to-r from-chart-4 via-chart-1 to-transparent absolute -bottom-2 left-0" // from-purple-500 via-blue-500 -> from-chart-4 via-chart-1
            />
          </div>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-card dark:bg-card flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-muted border border-border p-2" /> {/* bg-neutral-200 dark:bg-neutral-800 -> bg-muted, border-neutral-300 dark:border-neutral-700 -> border-border */}
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-muted-foreground "> {/* text-neutral-500 dark:text-neutral-500 -> text-muted-foreground */}
                {item.title.replace("+", "")} <span className="text-sm font-normal">03.05.2025</span>
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-muted-foreground"> {/* text-neutral-500 dark:text-neutral-500 -> text-muted-foreground */}
                {item.title.replace("+", "")} <span className="text-sm font-normal">03.05.2025</span>
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-muted to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] " // via-neutral-200 dark:via-neutral-700 -> via-muted
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-chart-4 via-chart-1 to-transparent from-[0%] via-[10%] rounded-full" // from-purple-500 via-blue-500 -> from-chart-4 via-chart-1
          />
        </div>
      </div>
    </div>
  )
}
