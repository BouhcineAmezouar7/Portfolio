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
  // Frontend
  { name: "Next.js", category: "Frontend", description: "React framework" },
  { name: "React.js", category: "Frontend", description: "UI library" },
  { name: "TypeScript", category: "Frontend", description: "Typed JavaScript" },
  {
    name: "JavaScript",
    category: "Frontend",
    description: "Programming language",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first CSS",
  },
  { name: "HTML5", category: "Frontend", description: "Markup language" },
  { name: "CSS3", category: "Frontend", description: "Styling language" },
  { name: "Framer Motion", category: "Frontend", description: "UI animations" },
  {
    name: "FullCalendar",
    category: "Frontend",
    description: "Scheduling interfaces",
  },

  // Backend
  { name: "NestJS", category: "Backend", description: "Node.js framework" },
  { name: "Laravel", category: "Backend", description: "PHP framework" },
  { name: "REST APIs", category: "Backend", description: "API development" },
  {
    name: "Microservices",
    category: "Backend",
    description: "Distributed architecture",
  },
  {
    name: "Better Auth",
    category: "Backend",
    description: "Authentication framework",
  },
  {
    name: "JWT",
    category: "Backend",
    description: "Token-based authentication",
  },
  { name: "RabbitMQ", category: "Backend", description: "Message broker" },

  // Databases
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Relational database",
  },
  { name: "MySQL", category: "Database", description: "Relational database" },
  { name: "SQLite", category: "Database", description: "Embedded database" },
  { name: "Redis", category: "Database", description: "In-memory data store" },
  { name: "Prisma", category: "Database", description: "Database ORM" },
  { name: "Supabase", category: "Database", description: "Backend platform" },

  // Systems & Networking
  { name: "C", category: "Systems", description: "Low-level programming" },
  {
    name: "C++",
    category: "Systems",
    description: "Object-oriented programming",
  },

  // DevOps & Tools
  { name: "Docker", category: "Tools", description: "Containerization" },
  { name: "Linux", category: "Tools", description: "System administration" },
  {
    name: "NGINX",
    category: "Tools",
    description: "Web server and reverse proxy",
  },
  { name: "Git", category: "Tools", description: "Version control" },
  { name: "GitHub", category: "Tools", description: "Code collaboration" },
  { name: "Makefile", category: "Tools", description: "Build automation" },
  { name: "Vercel", category: "Tools", description: "Application deployment" },

  // Additional
  {
    name: "Resend",
    category: "Additional",
    description: "Transactional email",
  },
  {
    name: "Cloudinary",
    category: "Additional",
    description: "Media management",
  },
  { name: "Zod", category: "Additional", description: "Schema validation" },
  {
    name: "React Hook Form",
    category: "Additional",
    description: "Form management",
  },
] as const;

export const projects = [
  {
    id: 1,
    slug: "maou3idy",
    number: "01",
    title: "Maou3idy",
    category: "Full Stack",
    image: "/projects/maou3idy_app.png",
    github: "https://github.com/BouhcineAmezouar7/Maou3idy",
    year: "1337",
    description:
      "A healthcare appointment platform developed by a five-member team for ft_transcendence. Patients book appointments and doctors manage their availability. My contribution focused on booking logic, scheduling, and the corresponding patient and doctor interfaces.",
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
      "Integration with NestJS microservices, RabbitMQ, PostgreSQL, and Prisma",
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
    github: "https://github.com/BouhcineAmezouar7/webserv.1337",
    year: "1337",
    description:
      "A lightweight HTTP server built from scratch in C++98 using non-blocking sockets and Linux epoll. It supports configurable listeners, HTTP request handling, static content, CGI execution, and file uploads.",
    tags: ["C++98", "HTTP", "TCP/IP", "epoll", "CGI", "Linux", "Makefile"],
    highlights: [
      "Event-driven handling of client connections using non-blocking sockets and epoll",
      "GET, POST, and DELETE request handling, including chunked bodies and multipart uploads",
      "Configurable server blocks, document roots, redirects, error pages, and directory listings",
      "CGI execution with configurable interpreters and environment variables",
      "Basic cookie-backed sessions and HTTP response generation",
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
    github: "https://github.com/BouhcineAmezouar7/Inception",
    year: "1337",
    description:
      "A containerized infrastructure built with Docker and Docker Compose. It runs NGINX, WordPress, MariaDB, and additional services in isolated containers with TLS, internal networking, and persistent storage.",
    tags: [
      "Docker",
      "Docker Compose",
      "NGINX",
      "WordPress",
      "MariaDB",
      "Redis",
      "Linux",
      "TLS",
    ],
    highlights: [
      "Custom Docker images and multi-service orchestration with Docker Compose",
      "NGINX HTTPS entry point with TLS and WordPress running through PHP-FPM",
      "MariaDB database and persistent storage using configured volumes",
      "Dedicated bridge networking and internal service discovery",
      "Bonus services including Redis, FTP, Adminer, Portainer, and a static website",
    ],
    type: "Infrastructure",
    featured: true,
  },
  {
    id: 5,
    slug: "e-commerce-frontend",
    number: "05",
    title: "YnadimeShop",
    displayTitle: "Ynadime Shop",
    category: "Frontend",
    image: "/projects/shop_app.png",
    demo: "https://ynadime-shop.vercel.app/",
    year: "Practice project",
    description:
      "A responsive e-commerce storefront with a filterable product catalog, product details, favorites, cart and checkout flows, customer accounts, order history, and a lightweight dashboard. It runs as a front-end demo with bundled product data and browser-local persistence.",
    tags: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Heroicons",
      "Embla Carousel",
      "localStorage",
    ],
    highlights: [
      "Responsive storefront with featured products, categories, offers, and promotional sections",
      "Searchable catalog with sorting and filters for category, brand, price, color, rating, and availability",
      "Persistent favorites and cart with cash-on-delivery and simulated card checkout flows",
      "Local account registration, login, password reset, profile management, and a demo customer account",
      "Order confirmation, history, cancellation, and a dashboard with catalog and order summaries",
    ],
    type: "Frontend / E-Commerce",
    featured: false,
  },
  {
    id: 6,
    slug: "cub3d",
    number: "06",
    title: "Cub3D",
    category: "Graphics",
    image: "/projects/cub3d.png",
    github: "https://github.com/BouhcineAmezouar7/Cub3D",
    year: "1337",
    description:
      "A first-person 3D renderer built in C with MiniLibX. It transforms 2D maps into interactive textured environments using raycasting, inspired by classic Wolfenstein 3D graphics.",
    tags: [
      "C",
      "MiniLibX",
      "Raycasting",
      "Computer Graphics",
      "X11",
      "Linux",
      "Makefile",
    ],
    highlights: [
      "Raycasting engine with wall intersection calculations and fish-eye correction",
      "Real-time rendering of textured walls with configurable floor and ceiling colors",
      "Player movement, camera rotation, and collision detection",
      "Scene parsing and validation for .cub maps and XPM textures",
      "Bonus features including a circular minimap, mouse controls, interactive doors, sky texture, and animated weapon",
    ],
    type: "Computer Graphics / Team",
    featured: false,
  },
  {
    id: 7,
    slug: "minishell",
    number: "07",
    title: "Minishell",
    category: "Systems",
    image: "/projects/minishell.png",
    github: "https://github.com/BouhcineAmezouar7/MINI-SHELL-",
    year: "1337",
    description:
      "A lightweight Unix shell built from scratch in C that recreates essential Bash behavior, including command parsing, pipelines, redirections, environment expansion, and process execution.",
    tags: [
      "C",
      "Unix",
      "GNU Readline",
      "POSIX",
      "Processes",
      "Signals",
      "Makefile",
    ],
    highlights: [
      "Interactive command prompt with GNU Readline and command history",
      "Quote-aware parsing, environment variable expansion, and executable lookup through PATH",
      "Process execution, pipelines, file descriptor management, and I/O redirections including heredocs",
      "Seven built-in commands: echo, cd, pwd, export, unset, env, and exit",
      "Bash-like interactive signal handling, exit-status propagation, and tracked memory allocation",
    ],
    type: "System Programming / Team",
    featured: false,
  },
  {
    id: 8,
    slug: "cpp-modules",
    number: "08",
    title: "C++ Modules",
    category: "Systems",
    image: "/projects/cpp_modules-v2.png",
    github: "https://github.com/BouhcineAmezouar7/Cpp-Module",
    year: "1337",
    description:
      "A collection of ten C++98 modules (CPP00–CPP09) covering object-oriented programming, memory management, templates, STL containers, and advanced algorithms through practical exercises.",
    tags: [
      "C++98",
      "OOP",
      "Templates",
      "STL",
      "Algorithms",
      "Memory Management",
      "Makefile",
    ],
    highlights: [
      "Classes, encapsulation, object lifetime, pointers, and references",
      "Orthodox Canonical Form, operator overloading, inheritance, and polymorphism",
      "Exception handling, explicit type casting, and generic programming with templates",
      "STL containers, iterators, algorithms, and reusable data structures",
      "Bitcoin exchange processing, Reverse Polish Notation evaluation, and Ford-Johnson merge-insertion sorting",
    ],
    type: "Object-Oriented Programming / Individual",
    featured: false,
  },
] as const;

export const skillFilters = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Systems",
  "Tools",
  "Additional",
] as const;

export const projectFilters = [
  "All",
  "Full Stack",
  "Systems",
  "Infrastructure",
  "Frontend",
  "Graphics",
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
    description: "Baccalaureate in Life and Earth Sciences (SVT).",
    achievements: [],
    status: "Education",
  },
] as const;
