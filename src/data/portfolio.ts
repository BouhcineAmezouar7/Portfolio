export const profile = {
  name: "Bouhcine Amezouar",
  firstName: "Bouhcine",
  role: "Full-Stack Developer",
  email: "amezouarbouhcine@gmail.com",
  phone: "+212 675 853 859",
  phoneHref: "tel:+212675853859",
  location: "Casablanca, Morocco",
  school: "1337 Coding School",
  graduationYear: "2024",
  resumePath: "/resume/Bouhcine_Amezouar_ATS_Resume.pdf",
  summary:
    "Full-Stack Developer and student at 1337 Coding School with hands-on experience building modern web applications using Next.js, NestJS, TypeScript, PostgreSQL, and Prisma. Experienced in REST APIs, authentication systems, database-driven applications, booking and scheduling workflows, and responsive user interfaces, with a strong foundation in software engineering, networking, Linux, Docker, and collaborative development.",
} as const;

export const portfolioYear = "2026";

export const mainNavigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
] as const;

export const resumeNavigationLink = {
  name: "Resume",
} as const;

export const socialLinks = [
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/BouhcineAmezouar7",
    external: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bouhcine-amezouar-18ba65402",
    external: true,
  },
  {
    id: "email",
    name: "Email",
    href: `mailto:${profile.email}`,
    external: false,
  },
] as const;

export const technicalSkills = [
  { name: "Next.js", category: "Frontend", description: "React framework" },
  { name: "React.js", category: "Frontend", description: "UI library" },
  { name: "TypeScript", category: "Frontend", description: "Typed JavaScript" },
  { name: "JavaScript", category: "Frontend", description: "Programming language" },
  { name: "Tailwind CSS", category: "Frontend", description: "Utility-first CSS" },
  { name: "HTML5", category: "Frontend", description: "Markup language" },
  { name: "CSS", category: "Frontend", description: "Styling language" },
  { name: "NestJS", category: "Backend", description: "Node.js framework" },
  { name: "Laravel", category: "Backend", description: "PHP framework" },
  { name: "REST APIs", category: "Backend", description: "Service interfaces" },
  { name: "Microservices", category: "Backend", description: "Distributed architecture" },
  { name: "PostgreSQL", category: "Database", description: "Relational database" },
  { name: "MySQL", category: "Database", description: "Relational database" },
  { name: "SQLite", category: "Database", description: "Embedded database" },
  { name: "Prisma", category: "Database", description: "Database ORM" },
  { name: "Docker", category: "Tools", description: "Containerization" },
  { name: "Git", category: "Tools", description: "Version control" },
  { name: "Linux", category: "Tools", description: "Development environment" },
  { name: "RabbitMQ", category: "Tools", description: "Message broker" },
  { name: "Supabase", category: "Additional", description: "Backend platform" },
  { name: "Better Auth", category: "Additional", description: "Authentication" },
  { name: "Resend", category: "Additional", description: "Transactional email" },
] as const;

export const projects = [
  {
    id: 1,
    slug: "maou3idy",
    number: "01",
    title: "Maou3idy",
    category: "Full Stack",
    image: "/projects/maou3idy_app.png",
    year: "1337",
    description:
      "A healthcare appointment platform built by a five-developer team for ft_transcendence. I owned the booking and scheduling workflows across the Next.js frontend and NestJS services.",
    tags: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "RabbitMQ",
      "Microservices",
    ],
    highlights: [
      "Appointment booking, scheduling, cancellation, and completion workflows",
      "Doctor availability and appointment-slot management",
      "Doctor dashboard and patient booking interfaces with Next.js",
      "NestJS service integration in a PostgreSQL and Prisma microservices architecture",
    ],
    type: "Full Stack / Team",
    featured: true,
  },
  {
    id: 2,
    slug: "atlas-team-manager",
    number: "02",
    title: "Atlas",
    category: "Full Stack",
    image: "/projects/team-project-management-platform.png",
    year: "Completed",
    description:
      "A full-stack team-management platform for organizing workspaces, members, projects, and task boards, with secure authentication and role-based permissions.",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "NestJS 11",
      "Better Auth",
      "PostgreSQL",
      "Prisma",
      "Resend",
    ],
    highlights: [
      "Workspace, member, project, and task-board organization",
      "Email and password authentication with optional Google sign-in",
      "Email verification, password recovery, and transactional email with Resend",
      "Role-based workspace permissions and system administration",
    ],
    type: "Personal Project",
    featured: true,
  },
  {
    id: 3,
    slug: "webserv",
    number: "03",
    title: "Webserv",
    category: "Systems",
    image: "/projects/webserve_app.png",
    diagram: "/projects/webserve.png",
    year: "1337",
    description:
      "An HTTP server built in C++ to explore sockets, request and response handling, networking, and client/server architecture.",
    tags: ["C / C++", "HTTP", "TCP/IP", "Sockets", "Networking", "Linux"],
    highlights: [
      "Socket-based client and server communication",
      "HTTP request parsing and response generation",
      "Server configuration and routing behavior",
      "Networking fundamentals beneath web frameworks",
    ],
    type: "Systems / Networking",
    featured: true,
  },
  {
    id: 4,
    slug: "inception",
    number: "04",
    title: "Inception",
    category: "Infrastructure",
    image: "/projects/inception_app.png",
    year: "1337",
    description:
      "A system-administration project that builds a multi-service environment with containers, images, volumes, networks and persistent data.",
    tags: ["Docker", "Docker Compose", "Linux", "Networking"],
    highlights: [
      "Multi-service containerized environment",
      "Custom images and service orchestration",
      "Persistent data with volumes",
      "Isolated service communication through Docker networks",
    ],
    type: "Infrastructure",
    featured: false,
  },
  {
    id: 5,
    slug: "e-commerce-frontend",
    number: "05",
    title: "E-Commerce Frontend",
    category: "Frontend",
    image: "/projects/shop_app.png",
    year: "Practice project",
    description:
      "A frontend-focused storefront built to practice reusable components, responsive layouts, product presentation and navigation.",
    tags: ["Nextjs", "JavaScript", "HTML", "CSS"],
    highlights: [
      "Reusable interface components",
      "Responsive storefront layouts",
      "Product-focused presentation",
      "Clear navigation across screen sizes",
    ],
    type: "Frontend",
    featured: false,
  },
] as const;

export const projectFilters = [
  "All",
  "Full Stack",
  "Systems",
  "Infrastructure",
] as const;

export const featuredProjects = projects.filter((project) => project.featured);

export const experiences = [
  {
    id: "1337",
    number: "01",
    title: "Software Engineering Student",
    company: "1337 Coding School",
    period: "Current Student",
    description:
      "Developing programming, problem-solving, and software-engineering skills through project-based work in systems, networking, infrastructure, and full-stack development.",
    achievements: [
      "Built Webserv in C++ and the containerized Inception infrastructure",
      "Delivered Maou3idy with a five-developer ft_transcendence team",
      "Owned booking and scheduling workflows across Next.js and NestJS",
    ],
    status: "Current",
  },
  {
    id: "dm-decore",
    number: "02",
    title: "Full-Stack Developer — PFE Intern",
    company: "DM-Decore",
    period: "PFE Internship · 2 months",
    description:
      "Collaborated with a team on an e-commerce application using Laravel and React.js, building interfaces and integrating them with backend APIs and database operations.",
    achievements: [
      "Frontend functionality with React.js",
      "Laravel application logic, APIs, and database operations",
      "Team-based development and Git workflows",
    ],
    status: "Previous",
  },
  {
    id: "netone",
    number: "03",
    title: "Web Development / Database Intern",
    company: "NetoneMaroc",
    period: "Internship · 3 months",
    description:
      "Managed and organized application data and designed frontend interfaces for viewing and interacting with structured database information.",
    achievements: [
      "Database management",
      "Frontend development and UI design",
      "Usable interfaces for database-driven information",
    ],
    status: "Previous",
  },
  {
    id: "ofppt",
    number: "04",
    title: "Digital Development — Web Full Stack",
    company: "OFPPT — CFPM Sidi Moumen",
    period: "Graduated 2023",
    description:
      "Specialized training in full-stack web development, frontend and backend development, databases, and web application architecture in Casablanca.",
    achievements: [
      "Laravel and React.js",
      "JavaScript, HTML, CSS, and MySQL",
      "Full-stack application architecture",
    ],
    status: "Education",
  },
  {
    id: "baccalaureate",
    number: "05",
    title: "Baccalaureate — Life and Earth Sciences",
    company: "Morocco",
    period: "2021",
    description:
      "Baccalaureate in Life and Earth Sciences (SVT).",
    achievements: [],
    status: "Education",
  },
] as const;
