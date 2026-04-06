export const site = {
  name: 'Sebastián Muena',
  siteName: 'sebastianmuena.com',
  url: 'https://sebastianmuena.com',
  locale: {
    es: 'es_CL',
    en: 'en_US'
  },
  person: {
    fullName: 'Sebastián Muena',
    legalName: 'Sebastián Muena Cortés',
    role: {
      es: 'Cofundador, CFO y COO de Candel Medical',
      en: 'Co-founder, CFO and COO at Candel Medical'
    },
    tagline: {
      es: 'Economista, operador y emprendedor healthtech enfocado en construir tecnología médica con impacto real en Latinoamérica.',
      en: 'Economist, operator, and healthtech founder focused on building medical technology with real impact across Latin America.'
    },
    image: '/images/pic00.jpg',
    ogImage: '/images/og-cover.svg'
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/sebastian-muena-cortes/',
    github: 'https://github.com/MuenaWWW',
    substack: 'https://healthtechcl.substack.com',
    candel: 'https://candel.cl',
    repo: 'https://github.com/MuenaWWW/MuenaWWW.github.io'
  },
  nav: [
    {
      key: 'home',
      label: { es: 'Inicio', en: 'Home' }
    },
    {
      key: 'about',
      label: { es: 'Sobre mí', en: 'About' }
    },
    {
      key: 'projects',
      label: { es: 'Proyectos', en: 'Projects' }
    },
    {
      key: 'blog',
      label: { es: 'Blog', en: 'Writing' }
    },
    {
      key: 'media',
      label: { es: 'Media kit', en: 'Media kit' }
    },
    {
      key: 'contact',
      label: { es: 'Contacto', en: 'Contact' }
    }
  ],
  social: [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sebastian-muena-cortes/'
    },
    {
      key: 'github',
      label: 'GitHub',
      href: 'https://github.com/MuenaWWW'
    },
    {
      key: 'substack',
      label: 'Substack',
      href: 'https://healthtechcl.substack.com'
    }
  ],
  pages: {
    home: {
      paths: {
        es: '/index.html',
        en: '/en/index.html'
      },
      canonical: {
        es: '/',
        en: '/en/'
      },
      title: {
        es: 'Sebastián Muena | Cofundador de Candel Medical',
        en: 'Sebastián Muena | Co-founder of Candel Medical'
      },
      description: {
        es: 'Sitio personal de Sebastián Muena: economista, cofundador de Candel Medical y operador healthtech en Latinoamérica.',
        en: 'Personal website of Sebastián Muena: economist, co-founder of Candel Medical, and healthtech operator in Latin America.'
      },
      hero: {
        eyebrow: {
          es: 'Salud, tecnología y ejecución',
          en: 'Health, technology, and execution'
        },
        title: {
          es: 'Construyo compañías y productos donde la salud necesita mejor tecnología.',
          en: 'I build companies and products where healthcare needs better technology.'
        },
        summary: {
          es: 'Soy Sebastián Muena, cofundador de Candel Medical. Trabajo en finanzas, operaciones y estrategia para acercar la neuromodulación eléctrica no invasiva a más personas en Latinoamérica.',
          en: 'I am Sebastián Muena, co-founder of Candel Medical. I work across finance, operations, and strategy to bring non-invasive electrical neuromodulation to more people across Latin America.'
        },
        stats: [
          {
            value: '2021',
            label: {
              es: 'inicio de Candel Medical',
              en: 'Candel Medical founded'
            }
          },
          {
            value: 'Chile -> LatAm',
            label: {
              es: 'contexto de operación',
              en: 'operating context'
            }
          },
          {
            value: 'Healthtech',
            label: {
              es: 'foco de trabajo',
              en: 'operating focus'
            }
          }
        ]
      },
      validation: {
        heading: {
          es: 'Respaldo y validación',
          en: 'Validation and backing'
        },
        body: {
          es: 'Señales concretas de confianza, selección y contexto institucional alrededor del trabajo en healthtech.',
          en: 'Concrete signals of trust, selection, and institutional context around the healthtech work.'
        },
        items: [
          {
            label: 'Candel Medical',
            note: {
              es: 'Compañía principal',
              en: 'Core company'
            }
          },
          {
            label: 'Start-Up Chile',
            note: {
              es: 'Aceleración',
              en: 'Acceleration'
            }
          },
          {
            label: 'ANID',
            note: {
              es: 'Innovación aplicada',
              en: 'Applied innovation'
            }
          },
          {
            label: 'BID Lab',
            note: {
              es: 'Apoyo regional',
              en: 'Regional backing'
            }
          },
          {
            label: 'Corfo',
            note: {
              es: 'Escalamiento',
              en: 'Scale support'
            }
          },
          {
            label: 'GS1 Day 2025',
            note: {
              es: 'Reconocimiento',
              en: 'Recognition'
            }
          }
        ]
      },
      highlights: [
        {
          icon: 'pulse',
          title: {
            es: 'Operación y crecimiento',
            en: 'Operations and growth'
          },
          body: {
            es: 'Construcción de procesos, finanzas y ejecución comercial para equipos que necesitan pasar de la idea al sistema.',
            en: 'Process design, finance, and commercial execution for teams moving from idea to operating system.'
          }
        },
        {
          icon: 'lab',
          title: {
            es: 'Innovación aplicada a salud',
            en: 'Health innovation in practice'
          },
          body: {
            es: 'Trabajo en la intersección entre dispositivos médicos, acceso y estrategia para que la tecnología tenga adopción real.',
            en: 'I work at the intersection of medical devices, access, and strategy so technology reaches real-world adoption.'
          }
        },
        {
          icon: 'map',
          title: {
            es: 'Latinoamérica como contexto',
            en: 'Latin America as context'
          },
          body: {
            es: 'Me interesa construir soluciones pensadas para las restricciones y oportunidades concretas de la región.',
            en: "I care about building solutions that reflect the region's real constraints and opportunities."
          }
        }
      ],
      now: {
        heading: {
          es: 'En qué estoy enfocado hoy',
          en: 'What I am focused on now'
        },
        body: {
          es: 'Una capa breve para entender dónde está puesta mi atención actual, sin convertir el sitio en un feed.',
          en: 'A short layer to understand where my attention sits right now, without turning the site into a feed.'
        },
        items: [
          {
            icon: 'hospital',
            title: {
              es: 'Escalar Candel Medical con criterio operativo',
              en: 'Scaling Candel Medical with operational discipline'
            },
            body: {
              es: 'Prioridades de crecimiento, estructura financiera y decisiones que permitan expandir sin perder foco.',
              en: 'Growth priorities, financial structure, and decisions that allow expansion without losing focus.'
            }
          },
          {
            icon: 'chart',
            title: {
              es: 'Convertir complejidad en sistemas claros',
              en: 'Turning complexity into clear systems'
            },
            body: {
              es: 'Diseño de procesos y marcos de decisión que ayuden a equipos pequeños a ejecutar mejor.',
              en: 'Process design and decision frameworks that help small teams execute more effectively.'
            }
          },
          {
            icon: 'pen',
            title: {
              es: 'Escribir para ordenar ideas y compartir criterio',
              en: 'Writing to sharpen ideas and share judgment'
            },
            body: {
              es: 'Notas sobre healthtech, Latinoamérica y cómo construir empresas útiles en contextos exigentes.',
              en: 'Notes on healthtech, Latin America, and how to build useful companies in demanding contexts.'
            }
          }
        ]
      },
      experience: [
        {
          period: {
            es: '2021 - hoy',
            en: '2021 - present'
          },
          role: {
            es: 'Cofundador, CFO y COO',
            en: 'Co-founder, CFO and COO'
          },
          organization: 'Candel Medical',
          href: 'https://candel.cl',
          body: {
            es: 'Lidero finanzas, operaciones y estrategia en una startup de neuromodulación eléctrica no invasiva. El trabajo va desde modelo de negocio y levantamiento de recursos hasta despliegue operacional y posicionamiento de producto.',
            en: 'I lead finance, operations, and strategy in a non-invasive electrical neuromodulation startup. The work spans business model design, fundraising, operational rollout, and product positioning.'
          }
        },
        {
          period: {
            es: 'Formación',
            en: 'Education'
          },
          role: {
            es: 'Ingeniería Comercial, mención Economía',
            en: 'Business and Economics'
          },
          organization: 'Universidad de Chile',
          body: {
            es: 'Base en economía aplicada, finanzas y pensamiento cuantitativo, con foco en convertir análisis en decisiones ejecutables.',
            en: 'Foundation in applied economics, finance, and quantitative thinking, with a focus on turning analysis into execution.'
          }
        }
      ],
      recognition: [
        {
          icon: 'award',
          title: 'GS1 Day 2025',
          body: {
            es: 'Reconocimiento en innovación por el desarrollo de soluciones médicas con estándares GS1.',
            en: 'Innovation recognition for developing medical solutions aligned with GS1 standards.'
          }
        },
        {
          icon: 'rocket',
          title: 'Start-Up Chile y ANID',
          body: {
            es: 'Selección en programas de aceleración y fondos de innovación para fortalecer el desarrollo y escalamiento.',
            en: 'Selected by acceleration programs and innovation grants to support development and scale.'
          }
        },
        {
          icon: 'globe',
          title: 'BID Lab y Corfo',
          body: {
            es: 'Apoyo institucional e internacional para avanzar tecnología médica con mayor acceso en la región.',
            en: 'Institutional and international support to move medical technology forward with broader regional access.'
          }
        }
      ],
      writing: {
        heading: {
          es: 'Escritura destacada',
          en: 'Selected writing'
        },
        body: {
          es: 'Una pequeña selección para mostrar dónde vivo las ideas, no solo dónde publico enlaces.',
          en: 'A concise selection to show where ideas live, not only where links get published.'
        },
        items: [
          {
            title: 'Personal Website Launch',
            eyebrow: {
              es: 'Substack',
              en: 'Substack'
            },
            body: {
              es: 'El texto que acompaña el lanzamiento del sitio y la decisión de construir una presencia digital más clara y duradera.',
              en: 'The essay that accompanies the site launch and the decision to build a clearer, more durable digital presence.'
            },
            href: 'https://healthtechcl.substack.com/p/personal-website-launch',
            action: {
              es: 'Leer ensayo',
              en: 'Read essay'
            }
          },
          {
            title: 'HealthtechCL',
            eyebrow: {
              es: 'Publicación',
              en: 'Publication'
            },
            body: {
              es: 'La publicación principal donde comparto ideas sobre salud, tecnología y construcción de compañías.',
              en: 'The main publication where I share ideas on healthcare, technology, and company building.'
            },
            href: 'https://healthtechcl.substack.com',
            action: {
              es: 'Abrir publicación',
              en: 'Open publication'
            }
          },
          {
            title: {
              es: 'Archivo editorial del sitio',
              en: 'Editorial archive on this site'
            },
            eyebrow: {
              es: 'Archivo',
              en: 'Archive'
            },
            body: {
              es: 'Punto de entrada para entender los temas que voy a seguir desarrollando y cómo organizo el criterio público.',
              en: 'An entry point to understand the themes I plan to keep developing and how I organize public-facing judgment.'
            },
            pageKey: 'blog',
            action: {
              es: 'Ver archivo',
              en: 'View archive'
            }
          }
        ]
      },
      speaking: {
        heading: {
          es: 'Temas para conversar',
          en: 'Topics I can speak about'
        },
        body: {
          es: 'Paneles, clases, conversaciones estratégicas o encuentros donde haga sentido unir economía, salud y ejecución.',
          en: 'Panels, lectures, strategic conversations, or gatherings where it makes sense to connect economics, healthcare, and execution.'
        },
        topics: [
          {
            icon: 'mic',
            title: {
              es: 'Healthtech en Latinoamérica',
              en: 'Healthtech in Latin America'
            },
            body: {
              es: 'Qué cambia cuando producto, acceso y mercado se diseñan para restricciones reales de la región.',
              en: 'What changes when product, access, and market strategy are designed for the region’s real constraints.'
            }
          },
          {
            icon: 'chart',
            title: {
              es: 'Economía, estrategia y asignación',
              en: 'Economics, strategy, and allocation'
            },
            body: {
              es: 'Cómo traducir análisis económico y financiero en decisiones ejecutables para compañías jóvenes.',
              en: 'How to translate economic and financial analysis into executable decisions for young companies.'
            }
          },
          {
            icon: 'briefcase',
            title: {
              es: 'Operar empresas pequeñas con ambición grande',
              en: 'Operating small teams with large ambition'
            },
            body: {
              es: 'Procesos, claridad y ritmo para sostener crecimiento cuando el equipo todavía es compacto.',
              en: 'Processes, clarity, and cadence to sustain growth while the team is still compact.'
            }
          },
          {
            icon: 'bolt',
            title: {
              es: 'Dispositivos médicos y adopción real',
              en: 'Medical devices and real adoption'
            },
            body: {
              es: 'El trabajo menos visible entre validación, posicionamiento y despliegue comercial.',
              en: 'The less visible work between validation, positioning, and commercial rollout.'
            }
          }
        ],
        note: {
          es: 'Disponible para conversaciones estratégicas, paneles, clases, encuentros de ecosistema y colaboraciones editoriales.',
          en: 'Available for strategic conversations, panels, lectures, ecosystem gatherings, and editorial collaborations.'
        }
      },
      contact: {
        heading: {
          es: 'Conversemos',
          en: "Let's talk"
        },
        body: {
          es: 'Si quieres conversar sobre salud, tecnología, operaciones o nuevas iniciativas, este es el mejor punto de partida.',
          en: 'If you want to talk about health, technology, operations, or a new venture, this is the best place to start.'
        },
        note: {
          es: 'También puedes encontrarme en LinkedIn, revisar el media kit o seguir lo que escribo en Substack.',
          en: 'You can also find me on LinkedIn, review the media kit, or follow my writing on Substack.'
        },
        fit: {
          heading: {
            es: 'Buenos puntos de partida',
            en: 'Good starting points'
          },
          items: {
            es: [
              'Healthtech, dispositivos médicos y acceso al mercado en Latinoamérica.',
              'Estrategia, finanzas y operación para compañías en construcción.',
              'Paneles, conversaciones y colaboración editorial.'
            ],
            en: [
              'Healthtech, medical devices, and market access in Latin America.',
              'Strategy, finance, and operations for companies being built.',
              'Panels, conversations, and editorial collaboration.'
            ]
          }
        }
      }
    },
    about: {
      paths: {
        es: '/sobre-mi.html',
        en: '/en/about.html'
      },
      canonical: {
        es: '/sobre-mi.html',
        en: '/en/about.html'
      },
      title: {
        es: 'Sobre mí | Sebastián Muena',
        en: 'About | Sebastián Muena'
      },
      description: {
        es: 'Perfil, enfoque y principios de trabajo de Sebastián Muena en salud, tecnología y operaciones.',
        en: 'Profile, focus, and working principles of Sebastián Muena across healthcare, technology, and operations.'
      },
      intro: {
        heading: {
          es: 'Un perfil construido entre análisis y ejecución.',
          en: 'A profile built between analysis and execution.'
        },
        paragraphs: {
          es: [
            'Mi trabajo ha estado marcado por una pregunta simple: cómo convertir tecnología compleja en soluciones útiles, sostenibles y accesibles.',
            'Esa pregunta me llevó a emprender en healthtech, a operar equipos con foco en finanzas y crecimiento, y a interesarme por la forma en que se toman decisiones cuando el contexto es exigente.'
          ],
          en: [
            'My work has been shaped by a simple question: how do we turn complex technology into solutions that are useful, sustainable, and accessible?',
            'That question led me into healthtech, into operating teams through finance and growth, and into understanding how decisions get made under pressure.'
          ]
        }
      },
      pillars: [
        {
          icon: 'chart',
          title: {
            es: 'Economía y estrategia',
            en: 'Economics and strategy'
          },
          body: {
            es: 'Uso herramientas cuantitativas para priorizar, asignar recursos y tomar decisiones con criterio operativo.',
            en: 'I use quantitative tools to prioritize, allocate resources, and make decisions with an operational lens.'
          }
        },
        {
          icon: 'pulse',
          title: {
            es: 'Healthtech y dispositivos médicos',
            en: 'Healthtech and medical devices'
          },
          body: {
            es: 'Me interesa especialmente donde el producto, la validación y el acceso al mercado tienen que avanzar al mismo tiempo.',
            en: 'I care most about the moments when product, validation, and market access must move together.'
          }
        },
        {
          icon: 'seed',
          title: {
            es: 'Construcción de largo plazo',
            en: 'Long-term building'
          },
          body: {
            es: 'Prefiero procesos sólidos, equipos claros y progreso acumulativo por sobre el ruido de corto plazo.',
            en: 'I prefer solid processes, clear teams, and cumulative progress over short-term noise.'
          }
        }
      ],
      principles: {
        heading: {
          es: 'Cómo me gusta trabajar',
          en: 'How I like to work'
        },
        items: {
          es: [
            'Resolver primero lo que bloquea al sistema, no solo lo que se ve urgente.',
            'Mantener la complejidad bajo control para que el equipo pueda avanzar con claridad.',
            'Construir relaciones de confianza con clínicos, fundadores, inversionistas y operadores.'
          ],
          en: [
            'Solve what blocks the system first, not only what looks urgent.',
            'Keep complexity under control so the team can move with clarity.',
            'Build trusted relationships with clinicians, founders, investors, and operators.'
          ]
        }
      },
      note: {
        heading: {
          es: 'Fuera del trabajo',
          en: 'Outside work'
        },
        summary: {
          es: 'También me interesan los videojuegos, las historias bien contadas y la vida familiar. Me gusta aprender, observar sistemas y entender cómo mejorar lo que ya existe.',
          en: 'I also care about games, well-told stories, and family life. I enjoy learning, watching systems closely, and figuring out how to improve what already exists.'
        }
      }
    },
    projects: {
      paths: {
        es: '/proyectos.html',
        en: '/en/projects.html'
      },
      canonical: {
        es: '/proyectos.html',
        en: '/en/projects.html'
      },
      title: {
        es: 'Proyectos | Sebastián Muena',
        en: 'Projects | Sebastián Muena'
      },
      description: {
        es: 'Proyectos y frentes de trabajo de Sebastián Muena en healthtech, tecnología y presencia digital.',
        en: 'Projects and workstreams by Sebastián Muena across healthtech, technology, and digital presence.'
      },
      featured: [
        {
          icon: 'hospital',
          title: 'Candel Medical',
          href: 'https://candel.cl',
          body: {
            es: 'Startup medtech fundada en 2021 para desarrollar soluciones de neuromodulación eléctrica no invasiva con foco en el mercado latinoamericano.',
            en: 'A medtech startup founded in 2021 to develop non-invasive electrical neuromodulation solutions for the Latin American market.'
          },
          tags: {
            es: ['Healthtech', 'Operaciones', 'Estrategia'],
            en: ['Healthtech', 'Operations', 'Strategy']
          },
          snapshot: {
            es: [
              { label: 'Rol', value: 'Cofundador, CFO y COO' },
              { label: 'Trabajo', value: 'Finanzas, operaciones y estrategia' },
              { label: 'Señal', value: 'Start-Up Chile, ANID, BID Lab y Corfo' }
            ],
            en: [
              { label: 'Role', value: 'Co-founder, CFO and COO' },
              { label: 'Work', value: 'Finance, operations, and strategy' },
              { label: 'Signal', value: 'Start-Up Chile, ANID, BID Lab, and Corfo' }
            ]
          }
        },
        {
          icon: 'bolt',
          title: 'CandelStim',
          body: {
            es: 'Dispositivo médico orientado al tratamiento del dolor crónico y a la rehabilitación, con una propuesta de valor construida para acceso y adopción real.',
            en: 'A medical device aimed at chronic pain treatment and rehabilitation, with a value proposition built for real-world access and adoption.'
          },
          tags: {
            es: ['Producto', 'Dispositivo médico', 'Go-to-market'],
            en: ['Product', 'Medical device', 'Go-to-market']
          },
          snapshot: {
            es: [
              { label: 'Enfoque', value: 'Dolor crónico y rehabilitación' },
              { label: 'Trabajo', value: 'Posicionamiento, acceso y despliegue' },
              { label: 'Criterio', value: 'Diseñado para adopción real en la región' }
            ],
            en: [
              { label: 'Focus', value: 'Chronic pain and rehabilitation' },
              { label: 'Work', value: 'Positioning, access, and rollout' },
              { label: 'Lens', value: 'Designed for real adoption in the region' }
            ]
          }
        },
        {
          icon: 'monitor',
          title: {
            es: 'Sitio personal y sistema editorial',
            en: 'Personal website and editorial system'
          },
          href: 'https://github.com/MuenaWWW/MuenaWWW.github.io',
          body: {
            es: 'Este sitio fue replanteado como una base estática curada para presentar trabajo, escribir con consistencia y escalar contenido bilingüe sin fricción.',
            en: 'This site was rebuilt as a curated static foundation to present work, publish consistently, and scale bilingual content without friction.'
          },
          tags: {
            es: ['Marca personal', 'Static site', 'Bilingüe'],
            en: ['Personal brand', 'Static site', 'Bilingual']
          },
          snapshot: {
            es: [
              { label: 'Objetivo', value: 'Posicionamiento y claridad narrativa' },
              { label: 'Sistema', value: 'Publicación bilingüe y SEO base' },
              { label: 'Uso', value: 'Marca personal, media kit y escritura' }
            ],
            en: [
              { label: 'Goal', value: 'Positioning and narrative clarity' },
              { label: 'System', value: 'Bilingual publishing and baseline SEO' },
              { label: 'Use', value: 'Personal brand, media kit, and writing' }
            ]
          }
        }
      ],
      selection: {
        heading: {
          es: 'Dónde seguir el trabajo',
          en: 'Where to follow the work'
        },
        items: [
          {
            icon: 'github',
            title: 'GitHub',
            href: 'https://github.com/MuenaWWW',
            body: {
              es: 'Código, experimentos y mejoras iterativas del sitio.',
              en: 'Code, experiments, and iterative improvements to the site.'
            }
          },
          {
            icon: 'substack',
            title: 'Substack',
            href: 'https://healthtechcl.substack.com',
            body: {
              es: 'Escritura sobre salud, tecnología y emprendimiento.',
              en: 'Writing on healthcare, technology, and entrepreneurship.'
            }
          },
          {
            icon: 'linkedin',
            title: 'LinkedIn',
            href: 'https://www.linkedin.com/in/sebastian-muena-cortes/',
            body: {
              es: 'Actualizaciones profesionales, hitos y conversaciones del ecosistema.',
              en: 'Professional updates, milestones, and ecosystem conversations.'
            }
          }
        ]
      }
    },
    blog: {
      paths: {
        es: '/blog.html',
        en: '/en/blog.html'
      },
      canonical: {
        es: '/blog.html',
        en: '/en/blog.html'
      },
      title: {
        es: 'Blog | Sebastián Muena',
        en: 'Writing | Sebastián Muena'
      },
      description: {
        es: 'Artículos y notas sobre salud, tecnología y emprendimiento en Latinoamérica.',
        en: 'Essays and notes on healthcare, technology, and entrepreneurship in Latin America.'
      },
      intro: {
        heading: {
          es: 'Escritura sobre salud, tecnología y construcción de compañías.',
          en: 'Writing about healthcare, technology, and company building.'
        },
        body: {
          es: 'Uso el blog para ordenar ideas, compartir aprendizajes y documentar lo que voy observando al construir en healthtech.',
          en: 'I use writing to sharpen ideas, share lessons, and document what I observe while building in healthtech.'
        }
      },
      posts: [
        {
          title: 'Personal Website Launch',
          date: {
            es: 'Marzo 2026',
            en: 'March 2026'
          },
          excerpt: {
            es: 'El lanzamiento de este sitio y el proceso de aprendizaje detrás de convertirlo en una presencia digital más clara y duradera.',
            en: 'The launch of this site and the learning process behind turning it into a clearer, more durable digital presence.'
          },
          href: 'https://healthtechcl.substack.com/p/personal-website-launch'
        }
      ],
      topics: [
        {
          icon: 'pulse',
          title: {
            es: 'Healthtech en contexto',
            en: 'Healthtech in context'
          },
          body: {
            es: 'Acceso, regulación, adopción y las fricciones reales de construir para salud.',
            en: 'Access, regulation, adoption, and the real frictions of building for healthcare.'
          }
        },
        {
          icon: 'map',
          title: {
            es: 'Latinoamérica y ejecución',
            en: 'Latin America and execution'
          },
          body: {
            es: 'Reflexiones sobre operar equipos y productos cuando el contexto importa.',
            en: 'Reflections on operating teams and products when context truly matters.'
          }
        },
        {
          icon: 'pen',
          title: {
            es: 'Pensamiento en público',
            en: 'Thinking in public'
          },
          body: {
            es: 'Notas para convertir experiencia práctica en criterio compartible.',
            en: 'Notes that turn practical experience into shareable judgment.'
          }
        }
      ],
      cta: {
        heading: {
          es: 'Seguir leyendo',
          en: 'Keep reading'
        },
        body: {
          es: 'La publicación principal vive en Substack. Si quieres recibir nuevos textos, ese es el mejor canal.',
          en: 'The main publication lives on Substack. If you want new essays in your inbox, that is the best place to subscribe.'
        }
      }
    },
    media: {
      paths: {
        es: '/media-kit.html',
        en: '/en/media-kit.html'
      },
      canonical: {
        es: '/media-kit.html',
        en: '/en/media-kit.html'
      },
      title: {
        es: 'Media kit | Sebastián Muena',
        en: 'Media kit | Sebastián Muena'
      },
      description: {
        es: 'Biografía, temas de conversación, enlaces y activos básicos de Sebastián Muena para prensa, eventos y colaboraciones.',
        en: 'Biography, speaking topics, links, and core assets for Sebastián Muena across press, events, and collaborations.'
      },
      intro: {
        heading: {
          es: 'Un punto de partida claro para prensa, eventos y colaboraciones.',
          en: 'A clear starting point for press, events, and collaborations.'
        },
        body: {
          es: 'Este media kit reúne la información esencial para presentar mi trabajo con claridad: quién soy, en qué trabajo, qué temas puedo abordar y desde dónde seguir la conversación.',
          en: 'This media kit gathers the essentials needed to introduce my work clearly: who I am, what I work on, which topics I can cover, and where to continue the conversation.'
        }
      },
      facts: [
        {
          label: {
            es: 'Rol actual',
            en: 'Current role'
          },
          value: {
            es: 'Cofundador, CFO y COO de Candel Medical',
            en: 'Co-founder, CFO and COO at Candel Medical'
          }
        },
        {
          label: {
            es: 'Foco',
            en: 'Focus'
          },
          value: {
            es: 'Healthtech, operaciones, estrategia y crecimiento',
            en: 'Healthtech, operations, strategy, and growth'
          }
        },
        {
          label: {
            es: 'Contexto',
            en: 'Context'
          },
          value: {
            es: 'Chile y Latinoamérica',
            en: 'Chile and Latin America'
          }
        },
        {
          label: {
            es: 'Canales',
            en: 'Channels'
          },
          value: {
            es: 'LinkedIn, Substack y sebastianmuena.com',
            en: 'LinkedIn, Substack, and sebastianmuena.com'
          }
        }
      ],
      bios: {
        short: {
          es: 'Sebastián Muena es economista, cofundador, CFO y COO de Candel Medical. Trabaja en la intersección entre salud, tecnología, estrategia y operaciones para construir soluciones médicas con adopción real en Latinoamérica.',
          en: 'Sebastián Muena is an economist and the co-founder, CFO, and COO of Candel Medical. He works at the intersection of healthcare, technology, strategy, and operations to build medical solutions with real-world adoption across Latin America.'
        },
        long: {
          es: 'Sebastián Muena es economista y cofundador de Candel Medical, donde lidera finanzas, operaciones y estrategia. Su trabajo se enfoca en convertir tecnología médica compleja en sistemas, decisiones y propuestas que puedan sostener crecimiento, validación y acceso al mercado al mismo tiempo. Le interesa especialmente el cruce entre healthtech, dispositivos médicos, asignación de recursos y ejecución en contextos latinoamericanos.',
          en: 'Sebastián Muena is an economist and co-founder of Candel Medical, where he leads finance, operations, and strategy. His work is centered on turning complex medical technology into systems, decisions, and narratives that can support growth, validation, and market access at the same time. He is especially interested in the intersection of healthtech, medical devices, resource allocation, and execution across Latin American contexts.'
        }
      },
      descriptors: [
        {
          title: {
            es: 'Presentación corta',
            en: 'Short introduction'
          },
          body: {
            es: 'Economista y cofundador de Candel Medical, enfocado en healthtech, operaciones y estrategia.',
            en: 'Economist and co-founder of Candel Medical, focused on healthtech, operations, and strategy.'
          }
        },
        {
          title: {
            es: 'Presentación para eventos',
            en: 'Event introduction'
          },
          body: {
            es: 'Operador y emprendedor healthtech que trabaja en cómo llevar tecnología médica a adopción real en Latinoamérica.',
            en: 'Healthtech operator and founder working on how to bring medical technology to real adoption across Latin America.'
          }
        },
        {
          title: {
            es: 'Presentación editorial',
            en: 'Editorial introduction'
          },
          body: {
            es: 'Escribe sobre salud, tecnología y construcción de compañías desde una mirada económica y operativa.',
            en: 'Writes about healthcare, technology, and company building from an economic and operational perspective.'
          }
        }
      ],
      topics: [
        {
          icon: 'mic',
          title: {
            es: 'Healthtech en Latinoamérica',
            en: 'Healthtech in Latin America'
          },
          body: {
            es: 'Mercado, acceso, regulación práctica y desafíos de adopción desde una mirada operativa.',
            en: 'Market dynamics, access, practical regulation, and adoption challenges from an operator’s perspective.'
          }
        },
        {
          icon: 'chart',
          title: {
            es: 'Economía y decisiones bajo restricción',
            en: 'Economics and decisions under constraint'
          },
          body: {
            es: 'Cómo asignar recursos, priorizar y sostener ritmo cuando la ejecución importa más que la narrativa.',
            en: 'How to allocate resources, prioritize, and maintain cadence when execution matters more than narrative.'
          }
        },
        {
          icon: 'briefcase',
          title: {
            es: 'Construcción operativa en etapas tempranas',
            en: 'Operational building in early stages'
          },
          body: {
            es: 'Sistemas, claridad y secuencia para compañías pequeñas con ambición real.',
            en: 'Systems, clarity, and sequencing for small companies with real ambition.'
          }
        },
        {
          icon: 'pen',
          title: {
            es: 'Escritura y criterio público',
            en: 'Writing and public judgment'
          },
          body: {
            es: 'Cómo usar la escritura para pensar mejor, explicar mejor y construir presencia intelectual con consistencia.',
            en: 'How to use writing to think better, explain better, and build intellectual presence with consistency.'
          }
        }
      ],
      availability: {
        heading: {
          es: 'Formatos que hacen sentido',
          en: 'Formats that make sense'
        },
        items: {
          es: [
            'Paneles y conversaciones sobre salud, tecnología y emprendimiento.',
            'Clases, encuentros universitarios y espacios formativos.',
            'Conversaciones estratégicas con founders, operadores o equipos de innovación.'
          ],
          en: [
            'Panels and conversations about healthcare, technology, and entrepreneurship.',
            'Lectures, university sessions, and learning environments.',
            'Strategic conversations with founders, operators, or innovation teams.'
          ]
        },
        note: {
          es: 'Para coordinar una conversación, el formulario del sitio y LinkedIn siguen siendo los canales principales.',
          en: 'To coordinate a conversation, the site form and LinkedIn remain the primary channels.'
        }
      }
    }
  }
};
