import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import foto1 from "../fotos/foto1.jpg"
import foto2 from "../fotos/foto2.jpg"
import foto3 from "../fotos/foto3.jpg"
import foto4 from "../fotos/foto4.jpg"

type Memory = {
  id: string
  src: string
  alt: string
  caption: string
}

const pageContent = {
  names: "Para ti, mi amor",
  date: "Una carta desde el corazón",
  title: "Volvamos a\nelegirnos",
  intro:
    "No busco borrar lo que pasó. Quiero mirarlo de frente, aprender y cuidar de nuevo lo que construimos.",
  lyric: "“Quiero que me digas que me quieres y que me vas a extrañar”",
  letter: [
    "Perdóname por haber hablado mal y por traicionar tu confianza. Sé que mis palabras no solo te lastimaron: también hicieron tambalear ese lugar seguro que habíamos creado entre los dos.",
    "No tengo excusas. Entiendo que confiar otra vez no se pide, se merece. Por eso quiero demostrártelo con paciencia, honestidad y acciones pequeñas, todos los días; escuchándote sin defenderme y respetando el tiempo que necesites.",
    "Lo nuestro importa demasiado para reducirlo a un error. Si me permites caminar a tu lado otra vez, quiero hacerlo mejor: con más verdad, más cuidado y el corazón abierto. No te prometo perfección; te prometo responsabilidad, presencia y un amor que aprenda a cuidarte.",
  ],
  closing: "Con todo mi amor, y con la esperanza de volver a encontrarnos.",
}

const starterMemories: Memory[] = [
  {
    id: "memory-1",
    src: foto1,
    alt: "Megusta tomarme fotos con vos",
    caption: "Donde el tiempo se detuvo",
  },
  {
    id: "memory-2",
    src: foto2,
    alt: "los 2 siendo recontra mortys ",
    caption: "los 2 siendo recontra mortys",
  },
  {
    id: "memory-3",
    src: foto3,
    alt: "",
    caption: "La foto que mas me gusto contigo ",
  },
  {
    id: "memory-4",
    src: foto4,
    alt: "Silueta de una par",
    caption: "eres tan formal y yo todo chusco ",
  },
]

function HeartMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 27.2S4.5 20.5 4.5 11.8A6.2 6.2 0 0 1 16 8.6a6.2 6.2 0 0 1 11.5 3.2C27.5 20.5 16 27.2 16 27.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 5 11 7-11 7V5Z" fill="currentColor" />
    </svg>
  )
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-[0.67rem] font-semibold uppercase tracking-[0.27em] text-[#9b5361]">
      <span className="h-px w-8 bg-[#d6a9ac]" />
      {children}
      <span className="h-px w-8 bg-[#d6a9ac]" />
    </div>
  )
}

function AudioMoment() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const audioUrl = "/acurrucar.mp3"
  const clipLength = 60

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      if (audio.currentTime >= clipLength) audio.currentTime = 0
      await audio.play()
    } else {
      audio.pause()
    }
  }

  const updateTime = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.currentTime >= clipLength) {
      audio.pause()
      audio.currentTime = 0
      setElapsed(clipLength)
      setPlaying(false)
      return
    }
    setElapsed(audio.currentTime)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_24px_80px_rgba(86,31,43,0.1)] backdrop-blur-xl sm:p-8"
    >
      <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#efd1d3]/45 blur-3xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={togglePlayback}
          className="group mx-auto grid size-20 shrink-0 place-items-center rounded-full bg-[#761f35] text-[#fff9f3] shadow-[0_12px_35px_rgba(103,27,47,0.3)] transition duration-300 hover:scale-105 hover:bg-[#8a2942] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#761f35] focus-visible:ring-offset-4 sm:mx-0"
          aria-label={
            playing
              ? "Pausar canción"
              : "Reproducir canción"
          }
        >
          <span className="size-7 transition-transform group-hover:scale-110">
            <PlayIcon playing={playing} />
          </span>
        </button>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="mb-1 text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#a05d68]">
            Nuestra canción · 1 minuto
          </p>
          <h3 className="font-serif text-2xl text-[#3c2026]">
            Acurrucar
          </h3>
          <p className="mt-1 truncate text-sm text-[#826269]">
            Ed Maverick · nuestro pequeño refugio
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="w-8 text-right text-xs tabular-nums text-[#9a7c82]">
              0:{Math.floor(elapsed).toString().padStart(2, "0")}
            </span>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-[#eadbdd]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-[#9d4357]"
                animate={{
                  width: `${Math.min(elapsed / clipLength, 1) * 100}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="text-xs tabular-nums text-[#9a7c82]">1:00</span>
          </div>
        </div>
      </div>

      <div className="relative mt-6 border-t border-[#eadbdd] pt-5 text-center">
        <p className="font-serif text-lg italic leading-relaxed text-[#6b3a45]">
          {pageContent.lyric}
        </p>
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={updateTime}
      />
    </motion.div>
  )
}

function LetterSection() {
  return (
    <section id="carta" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl"
      >
        <div className="absolute -inset-x-2 inset-y-5 rotate-1 rounded-[2rem] border border-[#d9b9b8]/50 bg-[#f2ddd8]/45 sm:-inset-x-5" />
        <article className="relative rounded-[2rem] border border-white/70 bg-[#fffaf5]/90 px-6 py-12 shadow-[0_35px_100px_rgba(87,37,47,0.1)] sm:px-16 sm:py-20">
          <SectionLabel>Lo que necesito decirte</SectionLabel>
          <h2 className="mx-auto mt-8 max-w-xl text-center font-serif text-4xl leading-[1.05] text-[#481f29] sm:text-6xl">
            Perdóname por no haber cuidado tu corazón
          </h2>
          <div className="mx-auto my-9 flex items-center justify-center gap-2 text-[#a34b5f]">
            <span className="h-px w-12 bg-[#d8afb4]" />
            <HeartMark className="size-5" />
            <span className="h-px w-12 bg-[#d8afb4]" />
          </div>
          <div className="mx-auto max-w-2xl space-y-6 text-[1.03rem] leading-8 text-[#685056] sm:text-lg sm:leading-9">
            {pageContent.letter.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[#8c3147]"
                    : ""
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-xl text-center font-serif text-2xl italic leading-relaxed text-[#7f3345]">
            {pageContent.closing}
          </p>
          <div className="mt-9 text-center text-4xl text-[#a95666]">∞</div>
        </article>
      </motion.div>
    </section>
  )
}

function GallerySection() {
  const memories = starterMemories
  const [active, setActive] = useState(0)

  const move = (direction: number) => {
    setActive(
      (current) => (current + direction + memories.length) % memories.length,
    )
  }

  return (
    <section
      id="recuerdos"
      className="overflow-hidden bg-[#5f182b] px-5 py-24 text-[#fff9f1] sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:text-left"
        >
          <div>
            <p className="mb-4 text-[0.67rem] font-semibold uppercase tracking-[0.28em] text-[#e5afb9]">
              Nuestra historia, en instantes
            </p>
            <h2 className="font-serif text-4xl leading-[1.05] sm:text-6xl">
              Lo que sí quiero conservar
            </h2>
          </div>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={memories[active].id}
              initial={{ opacity: 0, scale: 0.96, x: 35 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -35 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex h-[72svh] min-h-[18rem] max-h-[48rem] items-center justify-center overflow-hidden rounded-[1.7rem] bg-[#45101f]"
            >
              <img
                src={memories[active].src}
                alt={memories[active].alt}
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b0712]/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <p className="font-serif text-2xl italic sm:text-4xl">
                  {memories[active].caption}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#edcfd4]">
                  Recuerdo {active + 1} de {memories.length}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2" aria-label="Seleccionar recuerdo">
              {memories.map((memory, index) => (
                <button
                  type="button"
                  key={memory.id}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    active === index
                      ? "w-9 bg-[#f3d3d7]"
                      : "w-3 bg-white/30 hover:bg-white/55"
                  }`}
                  aria-label={`Ver recuerdo ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => move(-1)}
                className="grid size-11 place-items-center rounded-full border border-white/30 transition hover:bg-white/10"
                aria-label="Foto anterior"
              >
                <span className="size-5">
                  <ArrowIcon direction="left" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="grid size-11 place-items-center rounded-full border border-white/30 transition hover:bg-white/10"
                aria-label="Foto siguiente"
              >
                <span className="size-5">
                  <ArrowIcon direction="right" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8eee9] text-[#43252c]">
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#f8eee9] px-5 py-16 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(211,151,156,0.24),transparent_32%),radial-gradient(circle_at_80%_74%,rgba(152,67,85,0.16),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-2 bg-[#761f35]" />

        {!reduceMotion &&
          Array.from({ length: 9 }).map((_, index) => (
            <motion.span
              key={index}
              className="absolute text-[#b66f7c]/20"
              initial={{
                y: "-10vh",
                x: `${8 + index * 11}vw`,
                rotate: index * 18,
              }}
              animate={{
                y: "110vh",
                x: `${4 + index * 10}vw`,
                rotate: index * 18 + 220,
              }}
              transition={{
                duration: 14 + (index % 4) * 3,
                delay: index * 0.7,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <HeartMark className={index % 3 === 0 ? "size-8" : "size-4"} />
            </motion.span>
          ))}

        <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 flex items-center justify-center gap-4"
          >
            <span className="h-px w-12 bg-[#bd8c94]" />
            <HeartMark className="size-5 text-[#963d52]" />
            <span className="h-px w-12 bg-[#bd8c94]" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9a5865]"
          >
            {pageContent.names} · {pageContent.date}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 whitespace-pre-line font-serif text-[clamp(4.2rem,13vw,9.5rem)] leading-[0.78] tracking-[-0.055em] text-[#4c202b]"
          >
            {pageContent.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-10 max-w-xl text-base leading-7 text-[#74585f] sm:text-lg"
          >
            {pageContent.intro}
          </motion.p>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            href="#carta"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#761f35] px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_14px_35px_rgba(89,22,40,0.22)] transition hover:-translate-y-1 hover:bg-[#8b2b43] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#761f35] focus-visible:ring-offset-4"
          >
            Leer mi carta
            <span className="text-base">↓</span>
          </motion.a>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#9f747c]">
          Desliza para sentir
        </div>
      </section>

      <section className="relative px-5 py-20 sm:px-8 sm:py-28">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(132,73,82,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(132,73,82,0.035)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative">
          <SectionLabel>Un recuerdo que suena</SectionLabel>
          <h2 className="mx-auto mb-10 mt-5 max-w-2xl text-center font-serif text-4xl leading-tight text-[#4b242d] sm:text-5xl">
            Dale play. Déjame hablarte desde aquí.
          </h2>
          <AudioMoment />
        </div>
      </section>

      <LetterSection />
      <GallerySection />

      <footer className="relative bg-[#4a1020] px-5 py-16 text-center text-[#f5dfe1]">
        <HeartMark className="mx-auto mb-5 size-7 text-[#d98d9a]" />
        <p className="font-serif text-3xl italic">
          ¿Lo intentamos una vez más?
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#d9b9bf]">
          Esta página no pretende presionarte. Solo guardar, con honestidad,
          todo lo que necesitaba decir.
        </p>
        <a
          href="https://wa.me/51945535505?text=Hola%2C%20ya%20le%C3%AD%20tu%20carta%20y%20quiero%20hablar%20contigo."
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#f5dfe1] px-8 py-4 text-sm font-semibold text-[#5f182b] shadow-lg transition hover:-translate-y-1 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#4a1020]"
        >
          ¿Me perdonas?
        </a>
        <a
          href="#carta"
          className="mt-7 block text-xs font-semibold uppercase tracking-[0.18em] underline decoration-[#b96577] underline-offset-8"
        >
          Volver a la carta
        </a>
      </footer>
    </main>
  )
}

export default App
