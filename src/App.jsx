import { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

const skills = [
  { label: 'Frontend', value: 'React 19, Tailwind CSS, Spline 3D' },
  { label: 'Backend', value: 'Node.js, Express.js, REST APIs' },
  { label: 'Cloud / Platforms', value: 'Supabase, Firebase, Vercel, Render' },
  { label: 'Languages', value: 'JavaScript, TypeScript, Python' },
]

const projects = [
  { name: 'lancelet Flashcards', url: 'https://lancelet.vercel.app/', img: '/projects/lanceletwebsite.png', video: '/videos/lancelet vid.mp4' },
  { name: 'Unofficial Lord of the Mysteries', url: 'https://unofficial-lord-of-the-mysteries.vercel.app/', img: '/projects/lotm website.png', video: '/videos/lotm vid.mp4' },
  { name: 'Valorant Computer Vision Skin Classifier', url: '', img: '/projects/valorant.png', video: '/videos/valorant vid.mp4', dev: true },
   { name: 'XG Inventory System', url: 'https://xg-inventory-management-system-frontend.onrender.com', img: '/projects/xg inventory.png', video: '/videos/xg inventory vid.mp4'},
]

const certifications = [
  { title: 'Microsoft Certified: Azure AI Fundamentals', org: 'Microsoft', date: 'Issued Jun 2026', img: '/certs/Credentials - lancechristianccrucis-2364 _ Microsoft Learn_page-0001.jpg' },
  { title: 'Certificate of Completion: Claude 101', org: 'Anthropic', date: 'Issued Mar 2026', img: '/certs/claude101 cert.jpg' },
  { title: "CS50's Introduction to Computer Science", org: 'Harvard University', date: 'Issued Dec 2025', img: '/certs/CS50x cert.png' },
  { title: 'AI Essentials: Theory and Practice', org: 'University of the Philippines Open University', date: 'Issued Jun 2025', img: '/certs/uplb ai essential cert.jpg' },
  { title: 'WarFrames: Where Design Meets Data (41st CS Week, UPLB)', org: 'University of the Philippines Los Baños', date: 'Issued Mar 2025', img: '/certs/warframe uplb cert.jpg' },
   { title: 'De la Salle Univeristy TECH-A MUNA Episode 9', org: 'Animo Labs HQ, De La Salle University - Manila', date: 'Issued Jun 2026', img: '/certs/tech a muna.jpg' },
    { title: 'AB TALKS ViCoDathon 2026', org: 'India', date: 'Issued Aug 2026', img: '/certs/ab talks.jpg' },
     { title: 'FUTUREHACKS 7 2025', org: 'AiGoLeaning', date: 'Issued Feb 2025', img: '/certs/future hacks.png' },
      { title: 'Responsive Web Design', org: 'FreeCodeCamp', date: 'Issued Apr 2025', img: '/certs/freecodecamp.jpg' },
]

function TiltProfilePic() {
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const handleMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100
    setMouse({ x, y })
    setTilt({ x: -(y / 50) * 12, y: (x / 50) * 12 })
  }, [])

  return (
    <motion.div
      ref={ref}
      className="relative w-[260px] h-[260px] max-md:w-[180px] max-md:h-[180px] rounded-full"
      style={{ perspective: 1000 }}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }) }}
    >
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#f0f0f0] dark:border-[#333]"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <img
          src="/profile_pic.jpg"
          alt="Lance Christian C. Crucis"
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mouse.x / 2 + 50}% ${mouse.y / 2 + 50}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  const Wrapper = project.dev ? 'div' : 'a'
  const wrapperProps = project.dev
    ? { className: 'relative block w-full rounded-2xl overflow-hidden h-[320px] max-md:h-[240px] group cursor-default' }
    : { href: project.url, target: '_blank', rel: 'noopener noreferrer', className: 'relative block w-full rounded-2xl overflow-hidden h-[320px] max-md:h-[240px] group' }

  return (
    <Wrapper
      {...wrapperProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={project.img}
        alt={project.name}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        src={project.video}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="relative z-10 flex flex-col items-start justify-start h-full pt-10 pl-10 max-md:pt-6 max-md:pl-6">
        <h4 className="text-white text-3xl max-md:text-xl font-bold max-w-sm leading-tight">
          {project.name}
        </h4>
        <p className="text-white/70 text-base max-md:text-sm mt-2">
          {project.dev ? 'Currently in development' : 'The project is Live!'}
        </p>
        {!project.dev && (
          <span className="mt-5 max-md:mt-3 inline-block bg-white/20 backdrop-blur-sm text-white text-base max-md:text-sm font-medium px-6 max-md:px-4 py-2.5 max-md:py-2 rounded-full border border-white/30 group-hover:bg-white/30 transition-colors">
            Visit Site &rarr;
          </span>
        )}
        {project.dev && (
          <span className="mt-5 max-md:mt-3 inline-block bg-white/10 backdrop-blur-sm text-white/60 text-base max-md:text-sm font-medium px-6 max-md:px-4 py-2.5 max-md:py-2 rounded-full border border-white/20">
            Not Live
          </span>
        )}
      </div>
    </Wrapper>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 max-md:px-4 py-12 max-md:py-8 min-h-screen">
      <div className="flex items-center justify-between mb-12 max-md:mb-8">
        <div>
          <h1 className="text-4xl max-md:text-2xl font-bold tracking-tight text-[#111] dark:text-white">
            Lance Christian C. Crucis
          </h1>
          <p className="text-lg max-md:text-sm text-[#666] dark:text-[#999] mt-1">
            3rd-Year BS Computer Science &middot; Cavite State University
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="px-4 py-2 rounded-full border border-[#ddd] dark:border-[#444] text-sm font-medium text-[#555] dark:text-[#aaa] hover:bg-[#f0f0f0] dark:hover:bg-[#222] transition-colors cursor-pointer"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      <section className="flex items-center gap-10 mb-14 max-md:flex-col max-md:gap-6 max-md:mb-10 max-md:text-center">
        <div className="shrink-0">
          <TiltProfilePic />
        </div>
        <div className="flex-1">
          <h2 className="text-[2.25rem] max-md:text-[1.75rem] font-bold text-[#111] dark:text-white mb-3">Hello</h2>
          <p className="text-[1.15rem] max-md:text-[1rem] text-[#444] dark:text-[#ccc] mb-2 leading-relaxed">
            I'm a 3rd-Year BS Computer Science student at Cavite State University
            — Silang Campus, based in Dasmariñas, Cavite, Philippines. I build
            things with React, Node.js, and modern web technologies.
          </p>
          <p className="text-[#888] dark:text-[#777] text-base">Dasmariñas, Cavite, Philippines</p>
          <a
            className="inline-block mt-2.5 text-[#555] dark:text-[#aaa] no-underline text-lg border-b-2 border-[#ddd] dark:border-[#555] hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-[color,border-color]"
            href="https://github.com/lancecrucis"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/lancecrucis &rarr;
          </a>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-[1.3rem] font-semibold tracking-wide uppercase text-[#999] dark:text-[#666] mb-6">
          Skills
        </h3>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
          {skills.map((s) => (
            <div key={s.label} className="bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#eee] dark:border-[#333] rounded-xl px-6 py-5">
              <div className="text-[0.85rem] font-semibold uppercase tracking-wide text-[#aaa] dark:text-[#666] mb-1.5">
                {s.label}
              </div>
              <div className="text-base text-[#222] dark:text-[#ddd]">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-[1.3rem] font-semibold tracking-wide uppercase text-[#999] dark:text-[#666] mb-6">
          Projects
        </h3>
        <div className="flex flex-col gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-[1.3rem] font-semibold tracking-wide uppercase text-[#999] dark:text-[#666] mb-6">
          Certifications
        </h3>
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {certifications.map((c) => (
            <div
              key={c.title}
              className="flex flex-col border border-[#eee] dark:border-[#333] rounded-xl overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-shadow"
            >
              <div className="w-full bg-[#fafafa] dark:bg-[#1a1a1a] flex items-center justify-center p-5">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-auto max-h-[300px] object-contain block"
                />
              </div>
              <div className="px-5 py-4 border-t border-[#eee] dark:border-[#333]">
                <div className="font-medium text-base text-[#111] dark:text-white">{c.title}</div>
                <div className="text-[0.85rem] text-[#777] dark:text-[#888] mt-1">
                  {c.org} &middot; <span className="text-[#aaa] dark:text-[#666]">{c.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-none border-t border-[#eee] dark:border-[#333] my-12" />

      <footer className="text-center text-[0.9rem] text-[#bbb] dark:text-[#666] py-6">
        {new Date().getFullYear()} Lance Christian C. Crucis.
      </footer>
    </div>
  )
}