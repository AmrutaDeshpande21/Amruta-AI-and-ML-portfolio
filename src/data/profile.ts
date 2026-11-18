// All editable site content lives here. Edit freely — no component changes needed.

export const profile = {
  name: 'Amruta Deshpande',
  role: 'Frontend Developer & entry-level AI/ML Engineer',
  location: 'Dharwad, Karnataka, India',
  headline: ['I build interfaces', 'that learn.'],
  intro:
    'I’m Amruta, a software engineer with a UX-first mindset, now building AI and ML products that solve real problems.',
  email: 'amrutadeshpande500@gmail.com',
  github: 'https://github.com/AmrutaDeshpande21',
  linkedin: 'https://www.linkedin.com/in/amu21/',
  photo: '/amruta.jpg',
  resume: '/Amruta_Deshpande_Resume.docx', // replace with a PDF in /public and update this path if you prefer
  aboutTitle: 'Design sense, engineering depth, ML skills',
  about: [
    'Most ML projects stop at a notebook. I take a model all the way to an interface people can trust: clear states, honest uncertainty, and accessibility from the first sketch.',
    'I’m an entry-level AI/ML engineer completing a Minor in AI and Data Science at IIT Mandi, with a software and frontend engineering background from Accenture and freelance work.',
  ],
  contactText: 'Open to frontend and AI-product roles. The fastest way to reach me is email.',
  footer: 'Built with React-style thinking, Three.js and a lot of blur.',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

// value 'years' renders `${yearsExperience}+`. Edit freely.
export const yearsExperience = 4
export const credentials = [
  { value: 'years', label: 'Years of total experience' },
  { value: 'Google', label: 'UI/UX Professional Certificate' },
  { value: 'IIT Mandi', label: 'Minor in AI and Data Science' },
]

export interface FlowStep {
  name: string
  detail: string
}
export interface Project {
  id: string
  title: string
  status: string
  summary: string
  tags: string[]
  flow: FlowStep[]
  link?: string | null
}

// Local fallback — used when Supabase is not configured or the query fails.
export const fallbackProjects: Project[] = [
  {
    id: 'ux-accessibility-auditor',
    title: 'UI/UX Accessibility Auditor',
    status: 'In progress',
    summary:
      'Upload a screenshot or audit a live page and get issues ranked by impact, with plain-language fixes. Rule-based checks catch what is certain; a trained model flags visual problems rules can’t see.',
    tags: ['React', 'TensorFlow', 'Playwright', 'WCAG'],
    flow: [
      { name: 'Rules', detail: 'axe-core, contrast and tap-target checks' },
      { name: 'Model', detail: 'CNN trained on auto-labelled UI screens' },
      { name: 'Explain', detail: 'LLM turns findings into fixes' },
    ],
    link: null,
  },
]

export const moreCaseStudies =
  'Each project will include the problem, data, model choices, metrics, and the UX decisions behind it.'

export const experience = [
  {
    role: 'Freelance Frontend Developer & Web Designer',
    org: 'Independent Consultant',
    period: 'Oct 2022 – Present',
    points: [
      'Design and build responsive, accessible web interfaces and reusable UI components across desktop, tablet and mobile.',
      'Convert Figma and Adobe XD prototypes into production-ready dashboards, forms and navigation workflows.',
      'Integrate client apps with REST APIs and JSON payloads, with cross-browser compatibility.',
      'Tune rendering performance and load speed using Chrome DevTools.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'LGRS Solutions Private Limited, Belagavi',
    period: 'Apr 2022 – Sep 2022',
    points: [
      'Contributed to the frontend of an enterprise HR/Employee Portal using React.js and Python backend services.',
      'Translated high-fidelity Figma prototypes into scalable, visually consistent interfaces.',
      'Debugged interface bottlenecks with Chrome DevTools and joined code reviews and cross-functional standups.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Accenture, Bengaluru',
    period: 'Jul 2018 – Feb 2021',
    points: [
      'Delivered enhancements for enterprise Supply Chain Management applications.',
      'Fixed recurring production defects through DOM/log diagnostics and root-cause analysis.',
      'Won the ACE Award for Automation and Innovation for automating internal operational workflows.',
    ],
  },
]

export const skills = [
  { title: 'Frontend', items: ['React', 'JavaScript', 'Responsive UI', 'Performance', 'Tailwind CSS', 'SCSS', 'Material-UI'] },
  { title: 'UX Design', items: ['Research', 'Wireframes', 'Prototyping', 'Accessibility', 'Figma', 'Adobe XD'] },
  { title: 'AI and ML', items: ['Python', 'TensorFlow and Keras', 'Pandas and NumPy', 'CNNs', 'NLP', 'Scikit-learn', 'Transformers'] },
  { title: 'Data and Backend', items: ['REST APIs', 'Django', 'JWT authentication', 'SQL', 'Supabase', 'Git and GitHub'] },
]

export const journey = [
  { step: 'Trimester 1', title: 'Foundations', text: 'Linear algebra, calculus and probability, plus Python, data analysis and first neural networks in TensorFlow.' },
  { step: 'Trimester 2', title: 'Machine learning', text: 'Regression, classification, clustering, ensembles, model selection and evaluation metrics.' },
  { step: 'Trimester 3', title: 'Deep learning', text: 'CNNs, RNNs, transformers, GANs, reinforcement learning, NLP and computer vision.' },
]

export const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

