import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, ChevronDown, ChevronUp, Menu, X, Mic, PenLine, Users, ExternalLink } from 'lucide-react';

function useOnScreen(ref) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
  
  return isVisible;
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedWork, setExpandedWork] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const colors = {
    cream: '#F8F6F1',
    creamDark: '#EFECE4',
    creamDarker: '#E0DCD3',
    charcoal: '#3D3D3D',
    charcoalLight: '#6B6B6B',
    muted: '#8B8780',
    border: '#D8D4CB',
    teal: '#5B7B7A',
    tealLight: '#5B7B7A15',
    tealMedium: '#5B7B7A30',
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const testimonials = [
    {
      quote: "Courtney is a total professional and a joy to work with. I have witnessed her continued growth and have been impressed by her positive, no-BS attitude and willingness to get the right things done fast! If you've never had the pleasure of experiencing Courtney running a meeting, I highly encourage you to find a way to work with her as soon as you can. I guarantee you'll wrap early with time to spare.",
      name: "Bobby Tyning",
      title: "Executive"
    },
    {
      quote: "Courtney delivered a product that exceeded our expectations, early and under budget. She not only listened to what we asked for but pointed out pain points, scope creep and worked with our team on education and implementation. Her solution will save us countless hours and increase customer satisfaction.",
      name: "Mary Hunt",
      title: "Project Director"
    }
  ];

  const modules = [
    {
      title: "Dream It, Sell It",
      subtitle: "Vision & Buy-In",
      description: "Define success and align stakeholders before we build.",
      executive: "Aligned teams ship faster. I reduce costly pivots by ensuring everyone understands the why before engineering commits resources.",
      technical: "Stakeholder mapping, user story mapping, and rapid prototyping to validate assumptions before building.",
      pmWhy: "Getting buy-in early prevents the #1 cause of project failure: misaligned expectations."
    },
    {
      title: "Keep It Honest",
      subtitle: "Risk & Responsibility",
      description: "Identify risks early. Build AI that's ethical, not just effective.",
      executive: "Your AI won't blow up in the press or get you sued. Enterprise-level safety protects your data and reputation.",
      technical: "Governance frameworks, bias testing, data privacy controls, and audit trails from day one.",
      pmWhy: "85% of AI projects fail, often due to trust issues. Building safety in from the start is cheaper than fixing it after launch."
    },
    {
      title: "Clean the Mess",
      subtitle: "Data Foundation",
      description: "Your data needs work. I make it AI-ready without the jargon.",
      executive: "Accurate AI that works because it's built on clean data. Bad data equals wasted money.",
      technical: "7 Dimensions of Data Quality assessment, data pipelines, validation rules before training.",
      pmWhy: "Most AI failures trace back to data issues. Unglamorous but essential."
    },
    {
      title: "Build the Thing",
      subtitle: "Development",
      description: "Models, agents, systems that solve your actual problem.",
      executive: "Working products in days, not months. Validate ideas before committing big budgets.",
      technical: "Dual-LLM architecture: one model for fact extraction, one for conversation. RAG over fine-tuning for flexibility.",
      pmWhy: "RAG over fine-tuning: faster to iterate, cheaper to maintain, easier to update."
    },
    {
      title: "Prove It Works",
      subtitle: "Evaluation & Metrics",
      description: "Dashboards that show real impact, not vanity metrics.",
      executive: "Clear ROI data that justifies AI investment. Know what's working before wasting resources.",
      technical: "Precision/recall metrics, A/B testing, user feedback loops, business KPI dashboards.",
      pmWhy: "Business outcomes over technical metrics. Execs need ROI, not accuracy scores."
    },
    {
      title: "Ship It, Run It",
      subtitle: "Launch & Operations",
      description: "Launch with confidence. Keep it running as you grow.",
      executive: "Products that launch on time and stay stable. No surprise maintenance costs.",
      technical: "Monitoring, error handling, scaling infrastructure, rollback procedures from day one.",
      pmWhy: "Launch is just the beginning. Sustainable products need sustainable operations."
    }
  ];

  const work = [
    {
      number: "01",
      category: "Civic Tech · City Partnership",
      title: "City of Phoenix AI Partnership",
      summary: "Scaled a neighborhood tree grant from 50 to 600+ homes using AI automation.",
      executive: "Community impact at scale with zero additional headcount. Turned a potential burnout situation into a successful civic partnership with the City of Phoenix.",
      technical: "Built website with integrated chatbot using conversational AI, eligibility verification logic, request forms, and tree recommendation quiz. Automated 95% of resident interactions.",
      pmWhy: "Chose chatbot over hiring help because it scaled instantly, cost less, and handled 24/7 availability. When scope expands 12x, automation beats hiring.",
      impact: ["600+ homes", "$120K+ neighborhood savings", "95% automated", "City partnership"],
      link: "https://trees.courtneykingsbury.com/",
      linkText: "View Trees Project"
    },
    {
      number: "02",
      category: "AI Product · Built & Shipped",
      title: "Verity: AI-Powered Document Intelligence",
      summary: "Enterprise-secure AI with zero hallucinations. Every answer cites its source, every time.",
      executive: "Proved AI product development capability by shipping a functional product that 4 business owners asked to purchase. Zero hallucinations and 100% citation rate solve the two biggest AI adoption blockers: trust and accuracy.",
      technical: "Dual-LLM architecture with a combination of temperature and fine-tuning to create accurate extraction with mandatory citations in a natural conversational way. RAG-based retrieval ensures every answer traces back to source documents. If it's not in the documents, Verity says so.",
      pmWhy: "Building a way for small business owners to scale without losing what makes them special. Clients who can't afford full services get access to the owner's knowledge and approach. The expert stays the expert, just multiplied.",
      impact: ["0 hallucinations", "100% citations", "Enterprise security", "Product roadmap"],
      link: "https://verity.courtneykingsbury.com/",
      linkText: "Try Verity Live"
    },
    {
      number: "03",
      category: "AI Systems · Global Scale",
      title: "Human-in-the-Loop AI Protocol",
      summary: "Reduced translation delays from 18 months to 1 month across 38 languages.",
      executive: "Unblocked international expansion by eliminating translation bottlenecks. Markets shipped in weeks instead of waiting years.",
      technical: "Human-in-the-loop AI system with context-aware translation, localization for major cities, automatic upload. Unchecked translations auto-ship if not reviewed, creating accountability.",
      pmWhy: "Human-in-the-loop over full automation because perfect translation matters less than timely translation. The forcing function changed behavior, not just process.",
      impact: ["38 languages", "94% faster", "10K+ lines each", "Global expansion"],
      link: null,
      linkText: null
    },
    {
      number: "04",
      category: "Organizational Change · Leadership",
      title: "Agile Transformation & Team Leadership",
      summary: "Introduced SAFe Agile to the company, then proved it worked with 96% on-time delivery.",
      executive: "Transformed how the company builds products. Delivered organizational change, not just project management. Systems beat heroics. The team kept delivering even when a PM left mid-quarter.",
      technical: "Brought and implemented SAFe 6.0 Agile practices company-wide. Created negotiable first-draft roadmaps, built psychological safety frameworks, established clear communication protocols.",
      pmWhy: "SAFe over Scrum because cross-functional complexity needed enterprise Agile. Psychological safety made 'I don't know' safe, which actually sped up decisions.",
      impact: ["Company-wide Agile", "17-person team", "96% on-time", "2.5 years sustained"],
      link: null,
      linkText: null
    }
  ];

  const blogPosts = [
    {
      title: "Why I End Meetings Early",
      description: "Booking long and ending early respects cognitive load and gets better results.",
      category: "Leadership",
      status: "Read on Medium",
      link: "https://medium.com/@courtneykingsbury"
    },
    {
      title: "Working Faster ≠ More Work",
      description: "AI productivity gains shouldn't mean doing more, just delivering value in less time.",
      category: "AI & Work",
      status: "Coming Soon"
    },
    {
      title: "The Honest Ignorance Framework",
      description: "How admitting what you don't know speeds up decision-making.",
      category: "Product",
      status: "Coming Soon"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.cream }}>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b" style={{ backgroundColor: colors.cream, borderColor: colors.border }}>
        <div className="max-w-6xl mx-auto px-8 py-5">
          <div className="flex justify-between items-center">
            <span className="font-serif text-xl" style={{ color: colors.charcoal }}>Courtney Kingsbury</span>
            
            <div className="hidden md:flex items-center gap-10">
              <button onClick={() => scrollToSection('work')} className="text-sm transition hover:opacity-70" style={{ color: colors.charcoalLight }}>Work</button>
              <button onClick={() => scrollToSection('approach')} className="text-sm transition hover:opacity-70" style={{ color: colors.charcoalLight }}>Approach</button>
              <button onClick={() => scrollToSection('about')} className="text-sm transition hover:opacity-70" style={{ color: colors.charcoalLight }}>About</button>
              <button onClick={() => scrollToSection('writing')} className="text-sm transition hover:opacity-70" style={{ color: colors.charcoalLight }}>Writing</button>
              <a 
                href="https://calendar.app.google/h6RukwgVRjQDMMya8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-5 py-2.5 rounded-full transition hover:opacity-90"
                style={{ backgroundColor: colors.teal, color: colors.cream }}
              >
                Let's Talk
              </a>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X style={{ color: colors.charcoal }} /> : <Menu style={{ color: colors.charcoal }} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pb-6 flex flex-col gap-4">
              <button onClick={() => scrollToSection('work')} className="text-left" style={{ color: colors.charcoalLight }}>Work</button>
              <button onClick={() => scrollToSection('approach')} className="text-left" style={{ color: colors.charcoalLight }}>Approach</button>
              <button onClick={() => scrollToSection('about')} className="text-left" style={{ color: colors.charcoalLight }}>About</button>
              <button onClick={() => scrollToSection('writing')} className="text-left" style={{ color: colors.charcoalLight }}>Writing</button>
              <button onClick={() => scrollToSection('contact')} className="text-left" style={{ color: colors.charcoalLight }}>Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero - Clean */}
      <section className="pt-32 pb-20 px-8" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Photo */}
            <AnimatedSection className="order-2 lg:order-1">
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-2xl transform rotate-2" 
                  style={{ backgroundColor: colors.tealMedium }}
                ></div>
                <div 
                  className="relative rounded-2xl overflow-hidden h-[520px]"
                  style={{ backgroundColor: colors.creamDarker }}
                >
                  <img 
                    src="/courtney-photo.png"
                    alt="Courtney Kingsbury"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full items-center justify-center hidden" style={{ color: colors.muted }}>
                    <div className="text-center p-8">
                      <p className="font-serif text-lg">Courtney Kingsbury</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <AnimatedSection>
                <p className="text-sm uppercase tracking-widest mb-6" style={{ color: colors.teal }}>Product Director</p>
              </AnimatedSection>
              
              <AnimatedSection delay={100}>
                <h1 className="font-serif text-5xl lg:text-6xl mb-6 leading-tight" style={{ color: colors.charcoal }}>
                  I translate executive vision into shipped products.
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <p className="text-xl mb-4 leading-relaxed" style={{ color: colors.charcoalLight }}>
                  15 years building AI products, leading teams, and driving transformation. Trained by Polly Allen, Principal PM on Amazon Alexa.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: colors.muted }}>
                  I stepped away to invest deeply in understanding AI at every level: executive, engineering, and product. Now I'm ready for my next chapter.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://calendar.app.google/h6RukwgVRjQDMMya8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full transition hover:opacity-90"
                    style={{ backgroundColor: colors.teal, color: colors.cream }}
                  >
                    Book a Conversation
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/courtney-kingsbury/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border transition hover:opacity-70"
                    style={{ borderColor: colors.border, color: colors.charcoalLight }}
                  >
                    <Linkedin size={18} />
                    LinkedIn
                  </a>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-8" style={{ backgroundColor: colors.creamDark }}>
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-serif text-4xl lg:text-5xl mb-1" style={{ color: colors.charcoal }}>15</p>
                <p className="text-sm uppercase tracking-wide" style={{ color: colors.muted }}>Years Building Products</p>
              </div>
              <div>
                <p className="font-serif text-4xl lg:text-5xl mb-1" style={{ color: colors.charcoal }}>100%</p>
                <p className="text-sm uppercase tracking-wide" style={{ color: colors.muted }}>AI Projects Shipped</p>
              </div>
              <div>
                <p className="font-serif text-4xl lg:text-5xl mb-1" style={{ color: colors.charcoal }}>96%</p>
                <p className="text-sm uppercase tracking-wide" style={{ color: colors.muted }}>On-Time Rate</p>
              </div>
              <div>
                <p className="font-serif text-4xl lg:text-5xl mb-1" style={{ color: colors.charcoal }}>94%</p>
                <p className="text-sm uppercase tracking-wide" style={{ color: colors.muted }}>Faster Delivery</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials - Rotating */}
      <section className="py-16 px-8" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="min-h-[280px] flex flex-col justify-center">
              <blockquote className="font-serif text-xl lg:text-2xl leading-relaxed mb-6" style={{ color: colors.charcoal }}>
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              <p className="text-sm uppercase tracking-widest mb-6" style={{ color: colors.teal }}>
                — {testimonials[activeTestimonial].name}, {testimonials[activeTestimonial].title}
              </p>
              
              {/* Dots */}
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ 
                      backgroundColor: activeTestimonial === index ? colors.teal : colors.border,
                      transform: activeTestimonial === index ? 'scale(1.3)' : 'scale(1)'
                    }}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-24 px-8" style={{ backgroundColor: colors.creamDark }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: colors.teal }}>Selected Work</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-4" style={{ color: colors.charcoal }}>What I've Delivered</h2>
            <p className="text-lg mb-12" style={{ color: colors.charcoalLight }}>
              Click any project for executive impact, technical approach, and strategic decisions.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {work.map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div 
                  className="rounded-2xl p-8 cursor-pointer transition-all hover:shadow-lg"
                  style={{ backgroundColor: colors.cream }}
                  onClick={() => setExpandedWork(expandedWork === index ? null : index)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="font-serif text-3xl" style={{ color: colors.teal }}>{item.number}</span>
                        <span className="text-sm uppercase tracking-wide" style={{ color: colors.muted }}>{item.category}</span>
                      </div>
                      <h3 className="font-serif text-2xl lg:text-3xl mb-2" style={{ color: colors.charcoal }}>{item.title}</h3>
                      
                      {/* Impact tags right under title */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.impact.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 rounded-full text-sm"
                            style={{ backgroundColor: colors.tealLight, color: colors.teal }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-lg" style={{ color: colors.charcoalLight }}>{item.summary}</p>

                      {item.link && (
                        <a 
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 mt-4 text-sm transition hover:opacity-70"
                          style={{ color: colors.teal }}
                        >
                          <ExternalLink size={16} />
                          {item.linkText}
                        </a>
                      )}
                      {item.linkText && !item.link && (
                        <p className="mt-4 text-sm" style={{ color: colors.muted }}>
                          {item.linkText}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {expandedWork === index ? 
                        <ChevronUp style={{ color: colors.teal }} /> : 
                        <ChevronDown style={{ color: colors.muted }} />
                      }
                    </div>
                  </div>

                  {expandedWork === index && (
                    <div className="mt-8 pt-8 space-y-6" style={{ borderTop: `1px solid ${colors.border}` }}>
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: colors.teal }}>Executive Impact</p>
                        <p style={{ color: colors.charcoalLight }}>{item.executive}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: colors.teal }}>Technical Approach</p>
                        <p style={{ color: colors.charcoalLight }}>{item.technical}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: colors.teal }}>Strategic Decision</p>
                        <p style={{ color: colors.charcoalLight }}>{item.pmWhy}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Also Built */}
          <AnimatedSection delay={400}>
            <div className="mt-12 p-8 rounded-2xl" style={{ backgroundColor: colors.cream }}>
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: colors.teal }}>Also Built</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-serif text-xl mb-2" style={{ color: colors.charcoal }}>Enterprise AI Training</h4>
                  <p className="text-sm" style={{ color: colors.charcoalLight }}>Trained entire organization on AI adoption. Built governance frameworks, reduced shadow AI risk, spoke at conferences on implementation.</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2" style={{ color: colors.charcoal }}>Global SaaS Localization</h4>
                  <p className="text-sm" style={{ color: colors.charcoalLight }}>Localization strategy across EMEA, APAC, and LATAM. 40+ languages, culturally-aware product expansion.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Speaking & Writing Bar */}
      <section className="py-12 px-8" style={{ backgroundColor: colors.teal }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Mic size={28} style={{ color: colors.cream }} className="mb-3 opacity-80" />
                <h3 className="font-serif text-lg mb-1" style={{ color: colors.cream }}>Speaking</h3>
                <p className="text-sm" style={{ color: colors.cream, opacity: 0.8 }}>TTI Success Insights Global Conference</p>
              </div>
              <div className="flex flex-col items-center">
                <Users size={28} style={{ color: colors.cream }} className="mb-3 opacity-80" />
                <h3 className="font-serif text-lg mb-1" style={{ color: colors.cream }}>Podcast Host</h3>
                <p className="text-sm mb-2" style={{ color: colors.cream, opacity: 0.8 }}>Career Blindspot (with my husband)</p>
                <div className="flex gap-3">
                  <a 
                    href="https://open.spotify.com/show/1nCYPXQvHvY5eZ1RooPjZU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline transition hover:opacity-70"
                    style={{ color: colors.cream, opacity: 0.7 }}
                  >
                    Spotify
                  </a>
                  <a 
                    href="https://podcasts.apple.com/us/podcast/career-blindspot/id1448943352"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline transition hover:opacity-70"
                    style={{ color: colors.cream, opacity: 0.7 }}
                  >
                    Apple
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <PenLine size={28} style={{ color: colors.cream }} className="mb-3 opacity-80" />
                <h3 className="font-serif text-lg mb-1" style={{ color: colors.cream }}>Writing</h3>
                <p className="text-sm" style={{ color: colors.cream, opacity: 0.8 }}>Product leadership & AI adoption</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Approach / Framework */}
      <section id="approach" className="py-24 px-8" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: colors.teal }}>My Approach</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-4" style={{ color: colors.charcoal }}>How I Build AI Products</h2>
            <p className="text-lg mb-12" style={{ color: colors.charcoalLight }}>
              Trained by Polly Allen, Principal PM on Amazon Alexa. Click any module for details.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <div 
                  className="p-6 rounded-2xl cursor-pointer transition-all hover:shadow-lg h-full"
                  style={{ backgroundColor: colors.creamDark }}
                  onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-xl" style={{ color: colors.charcoal }}>{module.title}</h3>
                    {expandedModule === index ? 
                      <ChevronUp size={18} style={{ color: colors.teal }} /> : 
                      <ChevronDown size={18} style={{ color: colors.muted }} />
                    }
                  </div>
                  
                  <p className="text-sm mb-2" style={{ color: colors.charcoalLight }}>{module.description}</p>
                  <p className="text-xs uppercase tracking-widest" style={{ color: colors.teal }}>{module.subtitle}</p>

                  {expandedModule === index && (
                    <div className="mt-5 pt-5 space-y-4" style={{ borderTop: `1px solid ${colors.border}` }}>
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: colors.teal }}>Executive</p>
                        <p className="text-sm" style={{ color: colors.charcoalLight }}>{module.executive}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: colors.teal }}>Technical</p>
                        <p className="text-sm" style={{ color: colors.charcoalLight }}>{module.technical}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: colors.teal }}>Why</p>
                        <p className="text-sm" style={{ color: colors.charcoalLight }}>{module.pmWhy}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-8" style={{ backgroundColor: colors.creamDark }}>
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: colors.teal }}>Philosophy</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-12" style={{ color: colors.charcoal }}>What I Believe</h2>
          </AnimatedSection>

          <div className="space-y-10">
            <AnimatedSection delay={100}>
              <div className="border-l-2 pl-8" style={{ borderColor: colors.teal }}>
                <h3 className="font-serif text-2xl mb-2" style={{ color: colors.charcoal }}>Honest Ignorance Beats False Confidence</h3>
                <p className="text-lg" style={{ color: colors.charcoalLight }}>
                  "I don't know" is the start of learning. Teams that admit gaps move faster.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="border-l-2 pl-8" style={{ borderColor: colors.teal }}>
                <h3 className="font-serif text-2xl mb-2" style={{ color: colors.charcoal }}>Meetings That End Early</h3>
                <p className="text-lg" style={{ color: colors.charcoalLight }}>
                  I book long and wrap fast. Complete resolution beats status updates.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="border-l-2 pl-8" style={{ borderColor: colors.teal }}>
                <h3 className="font-serif text-2xl mb-2" style={{ color: colors.charcoal }}>Roadmaps Are First Drafts</h3>
                <p className="text-lg" style={{ color: colors.charcoalLight }}>
                  Products that ship and improve beat perfect products that never launch.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="border-l-2 pl-8" style={{ borderColor: colors.teal }}>
                <h3 className="font-serif text-2xl mb-2" style={{ color: colors.charcoal }}>Psychological Safety Is Strategy</h3>
                <p className="text-lg" style={{ color: colors.charcoalLight }}>
                  When people feel safe, they build better products faster.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-8" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: colors.teal }}>About</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-8" style={{ color: colors.charcoal }}>The Path Here</h2>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: colors.charcoalLight }}>
              <p>
                I was told I couldn't join a data science cohort because I didn't have the right degree. I was stuck in junior dev work where technical gatekeeping was the culture.
              </p>
              <p>
                But one programmer was different. They explained things clearly and admitted when they didn't know something. It gave me hope I could change things, and I found a way through product management.
              </p>
              <p>
                Over 15 years at American Express, AmEx Global Business Travel, and a SaaS company, I became the person I needed when I was starting out: a translator between executives and engineers, and someone who makes it safe to say "I don't know."
              </p>
              <p>
                Recently, I made an intentional decision to invest in understanding AI at every level. I trained with Polly Allen, the Principal PM who helped build Alexa, and earned an advanced AI product certification.
              </p>
              <p style={{ color: colors.charcoal }}>
                Now I'm ready for the next chapter.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Writing / Blog */}
      <section id="writing" className="py-24 px-8" style={{ backgroundColor: colors.creamDark }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: colors.teal }}>Writing</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-4" style={{ color: colors.charcoal }}>Thinking Out Loud</h2>
            <p className="text-lg mb-12" style={{ color: colors.charcoalLight }}>
              Ideas on leadership, AI, and challenging how we work.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                {post.link ? (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-2xl h-full transition hover:opacity-80"
                    style={{ backgroundColor: colors.cream }}
                  >
                    <p className="text-xs uppercase tracking-widest mb-3" style={{ color: colors.teal }}>{post.category} · {post.status}</p>
                    <h3 className="font-serif text-xl mb-2" style={{ color: colors.charcoal }}>{post.title}</h3>
                    <p className="text-sm" style={{ color: colors.charcoalLight }}>{post.description}</p>
                  </a>
                ) : (
                  <div
                    className="p-6 rounded-2xl h-full"
                    style={{ backgroundColor: colors.cream }}
                  >
                    <p className="text-xs uppercase tracking-widest mb-3" style={{ color: colors.teal }}>{post.category} · {post.status}</p>
                    <h3 className="font-serif text-xl mb-2" style={{ color: colors.charcoal }}>{post.title}</h3>
                    <p className="text-sm" style={{ color: colors.charcoalLight }}>{post.description}</p>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-8" style={{ backgroundColor: colors.charcoal }}>
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl lg:text-5xl mb-6" style={{ color: colors.cream }}>
              Coffee? Zoom? Let's Chat
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <p className="text-xl mb-6 leading-relaxed" style={{ color: colors.border }}>
              I keep an office in downtown Phoenix that's honestly nicer than it needs to be. Happy to meet there, Zoom, or grab coffee somewhere fun. Recruiters welcome.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-xl mb-12 leading-relaxed" style={{ color: colors.border }}>
              I'm looking for a director role, the right contract opportunity, or a senior position where I can actually make an impact. Let's skip the pitch decks and formalities. I want to hear what you're building, what problems keep you up at night, and why it matters to you.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a 
                href="https://calendar.app.google/h6RukwgVRjQDMMya8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full transition hover:opacity-90"
                style={{ backgroundColor: colors.teal, color: colors.cream }}
              >
                Book a Time
              </a>
              <a 
                href="mailto:cckphx@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full transition hover:opacity-90"
                style={{ backgroundColor: colors.cream, color: colors.charcoal }}
              >
                <Mail size={20} />
                cckphx@gmail.com
              </a>
              <a 
                href="https://www.linkedin.com/in/courtney-kingsbury/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border transition hover:opacity-70"
                style={{ borderColor: colors.charcoalLight, color: colors.border }}
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <p style={{ color: colors.muted }}>
              Phoenix, AZ · Remote-friendly
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-8 text-center" style={{ backgroundColor: '#2D2D2D' }}>
        <p className="text-sm" style={{ color: colors.muted }}>© 2025 Courtney Kingsbury</p>
      </footer>

    </div>
  );
}
