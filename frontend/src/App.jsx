
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/logo.png";
import developerHero from "./assets/developer-hero.png";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  Plus,
  Search,
  LogOut,
  ExternalLink,
  Trash2,
  Pencil,
  Menu,
  X,
  RefreshCw,
  Code2,
  Clock3,
  ArrowUpRight,
} from "lucide-react";


const API = import.meta.env.VITE_API_URL || "https://freelance-portfolio-5he9.onrender.com/api";

const initialProjects = [

  {

    _id: "demo-1",

    title: "Smart Hospital",

    description:

      "A hospital discovery platform to compare facilities, ratings and costs.",

    tech: ["React", "Node.js", "MongoDB"],

    github: "",

    demo: "",

  },

  {

    _id: "demo-2",

    title: "Developer Portfolio",

    description:

      "A responsive portfolio to present services, skills and projects.",

    tech: ["React", "CSS"],

    github: "",

    demo: "",

  },

];



function Navbar() {

  const [open, setOpen] = useState(false);



  return (

    <nav className="navbar">

      <Link

        className="logo"

        to="/"

        onClick={() => setOpen(false)}

        aria-label="Karan Paswan home"

      >

        <img src={logo} alt="Karan Paswan logo" />

        <span className="logo-text">

          <strong>Karan Paswan</strong>

          <small>Full Stack Developer</small>

        </span>

      </Link>



      <button

        className="menu-toggle"

        onClick={() => setOpen(!open)}

        aria-label="Toggle navigation"

      >

        
{open ? <X size={24} /> : <Menu size={24} />}


      </button>



      <div className={`nav-links ${open ? "nav-open" : ""}`}>

        {["About", "Services", "Projects", "Contact"].map((item) => (

          <a

            key={item}

            href={`/#${item.toLowerCase()}`}

            onClick={() => setOpen(false)}

          >

            {item}

          </a>

        ))}

        <Link className="nav-admin" to="/admin" onClick={() => setOpen(false)}>

          Admin

        </Link>

      </div>

    </nav>

  );

}





function Home() {

  const [projects, setProjects] = useState(initialProjects);

  const [projectsLoading, setProjectsLoading] = useState(true);

  const [projectsError, setProjectsError] = useState("");



  const [form, setForm] = useState({

    name: "",

    email: "",

    subject: "",

    message: "",

  });



  const [notice, setNotice] = useState("");

  const [sending, setSending] = useState(false);



  // Fetch projects from the backend

  useEffect(() => {

    async function fetchProjects() {

      try {

        const res = await fetch(`${API}/projects`);



        if (!res.ok) {

          throw new Error("Unable to load projects.");

        }



        const data = await res.json();



        if (!Array.isArray(data)) {

          throw new Error("Invalid projects response.");

        }



        setProjects(data);

        setProjectsError("");

      } catch (error) {

        setProjectsError(

          "Unable to load projects right now. Please try again later."

        );

      } finally {

        setProjectsLoading(false);

      }

    }



    fetchProjects();

  }, []);



  // Submit contact form

  async function submitContact(e) {

    e.preventDefault();

    setNotice("");

    setSending(true);



    try {

      const res = await fetch(`${API}/contact`, {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify(form),

      });



      const data = await res.json();



      if (!res.ok) {

        throw new Error(data.message || "Could not send message.");

      }



      setNotice(

        "Message sent successfully! Thank you for contacting me."

      );



      setForm({

        name: "",

        email: "",

        subject: "",

        message: "",

      });

    } catch (error) {

      setNotice(

        error.message || "Unable to contact the server."

      );

    } finally {

      setSending(false);

    }

  }



  return (

    <>

      {/* Premium Home / Hero Section */}
      <section className="hero section premium-hero" id="home">
        <div className="hero-copy premium-hero-copy">
          <div className="availability">
            <span></span>
            AVAILABLE FOR FREELANCE WORK
          </div>

          <p className="eyebrow">HELLO, I'M KARAN</p>

          <h1>
            I build digital
            <br />
            experiences that
            <br />
            <span>make an impact.</span>
          </h1>

          <h2>
            Full Stack Developer <span className="hero-divider">/</span> React &amp; Node.js
          </h2>

          <p className="hero-description">
            I turn ideas into modern, responsive web applications.
            From polished user interfaces to reliable backend systems,
            I focus on building products that look great and work smoothly.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Explore My Work <span>↗</span>
            </a>

            <a href="#contact" className="btn btn-outline">
              Let's Build Together
            </a>
          </div>

          <div className="hero-social-row">
            <span className="hero-social-label">FIND ME ON</span>

            <a
              href="https://github.com/Karan-79P-swan"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>

            <span className="hero-social-separator">/</span>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>

          <div className="hero-tech-strip">
            <span>MY TOOLKIT</span>
            <div>
              <b>React</b>
              <b>JavaScript</b>
              <b>Node.js</b>
              <b>MongoDB</b>
            </div>
          </div>
        </div>

        <div className="hero-art premium-hero-art">
          <div className="hero-art-glow"></div>
          <div className="hero-art-grid"></div>

          <div className="hero-image-frame">
            <img
              src={developerHero}
              alt="Developer workstation with coding setup"
              className="developer-hero-image"
            />

            <div className="hero-image-overlay"></div>
          </div>

          <div className="hero-floating-card hero-card-top">
            <span className="hero-card-icon">{"</>"}</span>
            <div>
              <strong>Clean Code</strong>
              <small>Built with purpose</small>
            </div>
          </div>

          <div className="hero-floating-card hero-card-bottom">
            <span className="hero-status-icon">✦</span>
            <div>
              <strong>Ideas into Reality</strong>
              <small>Design. Develop. Deliver.</small>
            </div>
          </div>

          <div className="hero-art-caption">
            <span>01</span>
            <span>BUILDING THE WEB, ONE IDEA AT A TIME</span>
          </div>
        </div>
      </section>





      <section className="section about-section" id="about">

        <p className="eyebrow">A LITTLE ABOUT ME</p>



        <h2 className="section-title">

          Turning ideas into <span>digital experiences.</span>

        </h2>



        <p className="section-description">

          I'm a developer who enjoys creating clean interfaces,

          practical applications and reliable backends. I focus on

          readable code, responsive design and solving real problems.

        </p>



        <div className="skills">

          {[

            "HTML",

            "CSS",

            "JavaScript",

            "React",

            "Node.js",

            "Express",

            "MongoDB",

            "Java",

          ].map((skill) => (

            <span key={skill}>{skill}</span>

          ))}

        </div>

      </section>


      {/* Services Section */}
      <section className="section services-section" id="services">
        <div className="services-heading">
          <p className="eyebrow">WHAT I BRING TO THE TABLE</p>

          <h2 className="section-title">
            Services built for <span>real results.</span>
          </h2>

          <p className="section-description">
            From your first idea to a working product, I help turn concepts
            into fast, responsive and reliable digital experiences.
          </p>
        </div>

        <div className="service-grid">
          <article className="service-card premium-service-card">
            <div className="service-card-top">
              <div className="service-icon service-icon-purple">
                <span>01</span>
              </div>
              <span className="service-arrow">↗</span>
            </div>

            <p className="service-label">DESIGN & EXPERIENCE</p>
            <h3>Frontend Development</h3>

            <p className="service-description">
              Modern, responsive interfaces that look polished, feel intuitive
              and work smoothly across desktop, tablet and mobile.
            </p>

            <ul className="service-features">
              <li>Responsive website layouts</li>
              <li>Interactive React components</li>
              <li>Clean UI and smooth animations</li>
            </ul>

            <div className="service-tech">
              <span>React</span>
              <span>JavaScript</span>
              <span>CSS</span>
            </div>
          </article>

          <article className="service-card premium-service-card featured-service">
            <div className="service-card-top">
              <div className="service-icon service-icon-blue">
                <span>02</span>
              </div>
              <span className="service-arrow">↗</span>
            </div>

            <p className="service-label">LOGIC & PERFORMANCE</p>
            <h3>Backend & API Development</h3>

            <p className="service-description">
              Reliable server-side functionality that connects your frontend,
              processes data and supports your application's core features.
            </p>

            <ul className="service-features">
              <li>REST API development</li>
              <li>Database integration</li>
              <li>Authentication and validation</li>
            </ul>

            <div className="service-tech">
              <span>Node.js</span>
              <span>Express</span>
              <span>MongoDB</span>
            </div>
          </article>

          <article className="service-card premium-service-card">
            <div className="service-card-top">
              <div className="service-icon service-icon-pink">
                <span>03</span>
              </div>
              <span className="service-arrow">↗</span>
            </div>

            <p className="service-label">IDEA TO LAUNCH</p>
            <h3>Full Stack Web Solutions</h3>

            <p className="service-description">
              Complete web applications that bring frontend, backend and
              database together in one practical solution.
            </p>

            <ul className="service-features">
              <li>Frontend and backend integration</li>
              <li>Database-driven applications</li>
              <li>Deployment-ready project structure</li>
            </ul>

            <div className="service-tech">
              <span>Full Stack</span>
              <span>REST APIs</span>
              <span>Git</span>
            </div>
          </article>
        </div>

        <div className="services-cta">
          <div>
            <span className="services-cta-dot"></span>
            <strong>Have an idea in mind?</strong>
            <p>Let's discuss what we can build together.</p>
          </div>

          <a href="#contact" className="btn btn-primary">
            Start a Project ↗
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section projects-section" id="projects">
        <div className="projects-heading">
          <div>
            <p className="eyebrow">SELECTED WORK</p>
            <h2 className="section-title">
              Projects that bring <span>ideas to life.</span>
            </h2>
          </div>

          <p className="section-description">
            A selection of applications and digital experiences I've built
            using modern technologies, thoughtful design, and practical
            problem-solving.
          </p>
        </div>

        <div className="projects-intro-row">
          <span className="projects-live-dot"></span>
          <span>BUILDING • LEARNING • CREATING</span>
          <span className="projects-count">
            {projects.length.toString().padStart(2, "0")} PROJECTS
          </span>
        </div>

        {projects.length > 0 ? (
          <div className="project-grid premium-project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card premium-project-card project-theme-${index % 3}`}
                key={project._id || project.id || project.title}
                style={{ "--project-index": index }}
              >
                <div className="project-visual premium-project-visual">
                  <div className="project-browser-bar">
                    <div className="project-browser-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="project-browser-label">PROJECT PREVIEW</span>
                    <span className="project-browser-icon">↗</span>
                  </div>

                  <div className="project-preview-content">
                    <span className="project-preview-index">
                      PROJECT / {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="project-preview-symbol">
                      {index % 3 === 0 ? (
                        <svg viewBox="0 0 100 100" aria-hidden="true">
                          <rect x="17" y="20" width="66" height="60" rx="12" />
                          <path d="M30 38h40M30 50h27M30 62h34" />
                          <circle cx="70" cy="62" r="5" />
                        </svg>
                      ) : index % 3 === 1 ? (
                        <svg viewBox="0 0 100 100" aria-hidden="true">
                          <circle cx="50" cy="50" r="32" />
                          <path d="M18 50h64M50 18c19 19 19 45 0 64M50 18c-19 19-19 45 0 64" />
                          <circle cx="50" cy="50" r="15" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 100 100" aria-hidden="true">
                          <path d="M36 26 13 50l23 24M64 26l23 24-23 24M57 17 43 83" />
                        </svg>
                      )}
                    </div>

                    <h3>{project.title}</h3>
                    <span className="project-preview-caption">
                      Designed &amp; developed with purpose
                    </span>

                    <div className="project-preview-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>

                  <span className="project-preview-glow"></span>
                  <span className="project-preview-corner">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="project-content premium-project-content">
                  <div className="project-category-row">
                    <span className="project-category">
                      {project.category || "Web Development"}
                    </span>
                    <span className="project-status">
                      <span></span> PROJECT
                    </span>
                  </div>

                  <h3>{project.title}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-tags premium-project-tags">
                    {(Array.isArray(project.tech)
                      ? project.tech
                      : typeof project.tech === "string"
                        ? project.tech.split(",").map((item) => item.trim())
                        : []
                    )
                      .filter(Boolean)
                      .slice(0, 5)
                      .map((tech, techIndex) => (
                        <span key={`${tech}-${techIndex}`}>{tech}</span>
                      ))}
                  </div>

                  <div className="project-links premium-project-links">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-demo-link"
                      >
                        Live Demo <span>↗</span>
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-source-link"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.5 1.2 15 3.2a13.5 13.5 0 0 0-7 0C5.5 1.2 3.3 1.5 3.3 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 7 18v4" />
                        </svg>
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <span>✦</span>
            <h3>Something exciting is in the works.</h3>
            <p>New projects will appear here soon.</p>
          </div>
        )}

        <div className="projects-bottom-cta">
          <div className="projects-cta-mark">✳</div>
          <div className="projects-cta-copy">
            <span>HAVE A PROJECT IN MIND?</span>
            <h3>Let's build something meaningful.</h3>
            <p>Tell me your idea. Let's turn it into a working product.</p>
          </div>
          <a href="#contact" className="btn btn-primary">
            Let's Talk <span>↗</span>
          </a>
        </div>
      </section>


      <section className="section contact-section" id="contact">

        <div>

          <p className="eyebrow">HAVE A PROJECT IN MIND?</p>



          <h2 className="section-title">

            Let's build something <span>great.</span>

          </h2>



          <p className="section-description">

            Tell me about your idea, and let's discuss how I can help.

          </p>

        </div>



        <form className="contact-form" onSubmit={submitContact}>

          <div className="form-row">

            <input

              required

              minLength={2}

              maxLength={80}

              placeholder="Your name"

              value={form.name}

              onChange={(e) =>

                setForm({ ...form, name: e.target.value })

              }

            />



            <input

              required

              type="email"

              maxLength={254}

              placeholder="Your email"

              value={form.email}

              onChange={(e) =>

                setForm({ ...form, email: e.target.value })

              }

            />

          </div>



          <input

            maxLength={120}

            placeholder="Subject (optional)"

            value={form.subject}

            onChange={(e) =>

              setForm({ ...form, subject: e.target.value })

            }

          />



          <textarea

            required

            minLength={10}

            maxLength={3000}

            rows={5}

            placeholder="Tell me about your project..."

            value={form.message}

            onChange={(e) =>

              setForm({ ...form, message: e.target.value })

            }

          />



          <button className="btn btn-primary" disabled={sending}>

            {sending ? "Sending..." : "Send Message ↗"}

          </button>



          {notice && (

            <p role="status" className="notice">

              {notice}

            </p>

          )}

        </form>

      </section>

      {/* Premium Portfolio Footer */}
      <footer className="premium-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <img src={logo} alt="Karan's portfolio logo" />
              <span>Karan<span className="footer-logo-accent">.</span></span>
            </a>

            <p className="footer-tagline">
              Building digital experiences that turn ideas into reality.
            </p>

            <p className="footer-description">
              I'm a Full Stack Developer focused on creating responsive
              interfaces, reliable backends, and practical web applications.
              Always learning, always building.
            </p>

            <a href="#contact" className="footer-contact-link">
              Have a project in mind? Let's talk <span>↗</span>
            </a>
          </div>

          <div className="footer-column">
            <h3>EXPLORE</h3>
            <a href="#home">Home</a>
            <a href="#about">About Me</a>
            <a href="#services">Services</a>
            <a href="#projects">My Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-column">
            <h3>WHAT I DO</h3>
            <a href="#services">Frontend Development</a>
            <a href="#services">Backend &amp; APIs</a>
            <a href="#services">Full Stack Solutions</a>
            <a href="#projects">Selected Work</a>
          </div>

          <div className="footer-column footer-connect">
            <h3>LET'S CONNECT</h3>
            <p>Have an idea or an interesting project? I'd love to hear about it.</p>

            <a href="#contact" className="footer-message-link">
              <span className="footer-message-icon">↗</span>
              <span>
                <strong>Start a conversation</strong>
                <small>Tell me about your idea</small>
              </span>
            </a>

            <div className="footer-socials">
              <a
                href="https://github.com/Karan-79P-swan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                GH
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>
        </div>

        <div className="footer-tech">
          <span className="footer-tech-label">BUILT WITH</span>
          <div className="footer-tech-list">
            <span>React</span>
            <span>JavaScript</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>MongoDB</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Karan Kumar Paswan.
            <span> Crafted with care.</span>
          </p>

          <a href="#home" className="footer-back-top">
            Back to top <span>↑</span>
          </a>
        </div>
      </footer>


    </>

  );

}

function Admin() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [projectSort, setProjectSort] = useState("newest");
  const [inboxPage, setInboxPage] = useState(1);
  const inboxPageSize = 10;

  const [token, setToken] = useState(
    () => localStorage.getItem("adminToken") || ""
  );

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inboxSearch, setInboxSearch] = useState("");
  const [inboxFilter, setInboxFilter] = useState("all");
  const [inboxSort, setInboxSort] = useState("newest");

  useEffect(() => {
    setInboxPage(1);
  }, [inboxSearch, inboxFilter, inboxSort]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingLogin, setSendingLogin] = useState(false);

  const [draft, setDraft] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
  });

  const [editingId, setEditingId] = useState(null);

  // API request helper
  async function request(path, options = {}) {
    const res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("adminToken");
        setToken("");
      }

      throw new Error(data.message || "Request failed.");
    }

    return data;
  }

  // Load projects and contact messages
  async function loadDashboard() {
    setLoading(true);

    try {
      const [projectData, messageData] = await Promise.all([
        request("/projects"),
        request("/contact"),
      ]);

      setProjects(Array.isArray(projectData) ? projectData : []);
      setMessages(Array.isArray(messageData) ? messageData : []);
      setError("");
    } catch (err) {
      setError(err.message || "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      loadDashboard();
    }
  }, [token]);

  // Admin login
  async function login(e) {
    e.preventDefault();
    setError("");
    setSendingLogin(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username.trim(),
          password: credentials.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (!data.token) {
        throw new Error("The server did not return a login token.");
      }

      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setCredentials({ username: "", password: "" });
      setActivePage("dashboard");
    } catch (err) {
      setError(err.message || "Unable to log in.");
    } finally {
      setSendingLogin(false);
    }
  }

  // Logout
  function logout() {
    localStorage.removeItem("adminToken");
    setToken("");
    setProjects([]);
    setMessages([]);
    setError("");
    setEditingId(null);
    setActivePage("dashboard");
    navigate("/admin");
  }

  // Reset project form
  function resetDraft() {
    setDraft({
      title: "",
      description: "",
      tech: "",
      github: "",
      demo: "",
    });

    setEditingId(null);
  }

  // Add or update a project
  async function saveProject(e) {
    e.preventDefault();
    setError("");

    const payload = {
      title: draft.title.trim(),
      description: draft.description.trim(),
      tech: draft.tech
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      github: draft.github.trim(),
      demo: draft.demo.trim(),
    };

    try {
      await request(
        editingId ? `/projects/${editingId}` : "/projects",
        {
          method: editingId ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );

      resetDraft();
      setActivePage("projects");
      await loadDashboard();
    } catch (err) {
      setError(err.message || "Unable to save project.");
    }
  }

  // Edit a project
  function editProject(project) {
    setEditingId(project._id);

    setDraft({
      title: project.title || "",
      description: project.description || "",
      tech: (project.tech || []).join(", "),
      github: project.github || "",
      demo: project.demo || "",
    });

    setActivePage("add");
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Delete a project
  async function deleteProject(id) {
    if (
      !window.confirm(
        "Are you sure you want to delete this project?"
      )
    ) {
      return;
    }

    setError("");

    try {
      await request(`/projects/${id}`, {
        method: "DELETE",
      });

      await loadDashboard();
    } catch (err) {
      setError(err.message || "Unable to delete project.");
    }
  }

  // Update CRM details for a contact message
  async function updateMessage(id, updates) {
    setError("");

    try {
      const data = await request(`/contact/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      });

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message._id === id ? data.data : message
        )
      );

      return true;
    } catch (err) {
      setError(err.message || "Unable to update message.");
      return false;
    }
  }


  // Delete a contact message
  async function deleteMessage(id) {
    if (
      !window.confirm(
        "Are you sure you want to delete this message?"
      )
    ) {
      return;
    }

    setError("");

    try {
      await request(`/contact/${id}`, {
        method: "DELETE",
      });

      setInboxPage(1);
      await loadDashboard();
    } catch (err) {
      setError(err.message || "Unable to delete message.");
    }
  }

  // Login screen
  if (!token) {
    return (
      <main className="admin-login">
        <form className="contact-form login-card" onSubmit={login}>
          <p className="eyebrow">PRIVATE AREA</p>

          <h1>Admin Login</h1>

          <p className="section-description">
            Sign in to manage your portfolio.
          </p>

          <input
            required
            type="text"
            autoComplete="username"
            placeholder="Admin username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                username: e.target.value,
              })
            }
          />

          <input
            required
            type="password"
            autoComplete="current-password"
            placeholder="Admin password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={sendingLogin}
          >
            {sendingLogin ? "Signing in..." : "Sign In"}
          </button>

          {error && (
            <p role="alert" className="notice error">
              {error}
            </p>
          )}

          <Link to="/">← Back to portfolio</Link>
        </form>
      </main>
    );
  }

  // Search projects

  const filteredProjects = projects
    .filter((project) => {
      const query = projectSearch.trim().toLowerCase();

      const technologies = Array.isArray(project.tech)
        ? project.tech
        : typeof project.tech === "string"
          ? project.tech.split(",").map((item) => item.trim())
          : [];

      const matchesSearch =
        (project.title || "").toLowerCase().includes(query) ||
        (project.description || "").toLowerCase().includes(query) ||
        technologies.join(" ").toLowerCase().includes(query);

      const matchesFilter =
        projectFilter === "all" ||
        (projectFilter === "demo" && Boolean(project.demo)) ||
        (projectFilter === "github" && Boolean(project.github));

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (projectSort === "az") {
        return (a.title || "").localeCompare(b.title || "");
      }

      if (projectSort === "za") {
        return (b.title || "").localeCompare(a.title || "");
      }

      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });


  const filteredMessages = messages
    .filter((message) => {
      const query = inboxSearch.trim().toLowerCase();

      const searchableText = [
        message.name,
        message.email,
        message.subject,
        message.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query);

      const matchesFilter =
        inboxFilter === "all" ||
        (inboxFilter === "subject" &&
          Boolean(message.subject?.trim()));

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      return inboxSort === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
  const totalInboxPages = Math.max(
    1,
    Math.ceil(filteredMessages.length / inboxPageSize)
  );

  const paginatedMessages = filteredMessages.slice(
    (inboxPage - 1) * inboxPageSize,
    inboxPage * inboxPageSize
  );


  // Page headings
  const pageInfo = {
    dashboard: {
      title: "Dashboard",
      subtitle:
        "Here is what's happening with your portfolio today.",
    },
    projects: {
      title: "Projects",
      subtitle:
        "Manage, update, and organize your portfolio projects.",
    },
    add: {
      title: editingId ? "Edit project" : "Add a project",
      subtitle:
        "Showcase your work with clear details and useful links.",
    },
    messages: {
      title: "Messages",
      subtitle:
        "Review inquiries sent through your portfolio contact form.",
    },
  };

  // Main admin dashboard
  return (
    <div className="admin-shell">
      {sidebarOpen && (
        <button
          type="button"
          className="admin-mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? "is-open" : ""
          }`}
      >
        <div className="admin-brand">
          <div className="admin-brand-mark">
            <Code2 size={21} />
          </div>

          <div>
            <strong>Portfolio</strong>
            <span>ADMIN STUDIO</span>
          </div>

          <button
            className="admin-close-sidebar"
            type="button"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <p className="admin-nav-label">WORKSPACE</p>

        <nav className="admin-nav">
          <button
            type="button"
            className={
              activePage === "dashboard" ? "active" : ""
            }
            onClick={() => {
              setActivePage("dashboard");
              setSidebarOpen(false);
            }}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </button>

          <button
            type="button"
            className={
              activePage === "projects" ? "active" : ""
            }
            onClick={() => {
              setActivePage("projects");
              setSidebarOpen(false);
            }}
          >
            <FolderKanban size={18} />
            <span>Projects</span>
            <span className="admin-nav-count">
              {projects.length}
            </span>
          </button>

          <button
            type="button"
            className={activePage === "add" ? "active" : ""}
            onClick={() => {
              resetDraft();
              setActivePage("add");
              setSidebarOpen(false);
            }}
          >
            <Plus size={18} />
            <span>Add project</span>
          </button>

          <button
            type="button"
            className={
              activePage === "messages" ? "active" : ""
            }
            onClick={() => {
              setActivePage("messages");
              setSidebarOpen(false);
            }}
          >
            <Mail size={18} />
            <span>Messages</span>

            {messages.length > 0 && (
              <span className="admin-nav-count">
                {messages.length}
              </span>
            )}
          </button>
        </nav>

        {/* Sidebar bottom */}
        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>

            <div className="admin-profile-copy">
              <strong>Administrator</strong>
              <span>Portfolio owner</span>
            </div>
          </div>

          <button
            type="button"
            className="admin-logout"
            onClick={logout}
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>

          <Link to="/" className="admin-view-site">
            <ExternalLink size={16} />
            View public portfolio
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-button"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={21} />
          </button>

          <div className="admin-breadcrumb">
            <span>Workspace</span>
            <span className="admin-breadcrumb-separator">
              /
            </span>
            <strong>{pageInfo[activePage].title}</strong>
          </div>

          <button
            type="button"
            className="admin-refresh-button"
            onClick={loadDashboard}
            disabled={loading}
            title="Refresh data"
          >
            <RefreshCw
              size={17}
              className={loading ? "admin-spin" : ""}
            />
            <span>Refresh</span>
          </button>
        </header>

        <div className="admin-page-content">
          {/* Page heading */}
          <div className="admin-welcome">
            <div>
              <p className="eyebrow">CONTROL CENTER</p>
              <h1>{pageInfo[activePage].title}</h1>
              <p>{pageInfo[activePage].subtitle}</p>
            </div>

            {activePage !== "add" && (
              <button
                type="button"
                className="admin-primary-button"
                onClick={() => {
                  resetDraft();
                  setActivePage("add");
                }}
              >
                <Plus size={18} />
                New project
              </button>
            )}
          </div>

          {error && (
            <p role="alert" className="notice error admin-error">
              {error}
            </p>
          )}

          {loading && (
            <p role="status" className="admin-loading">
              Loading your data...
            </p>
          )}

          {/* Dashboard overview */}
          {activePage === "dashboard" && (
            <>
              <section className="admin-stat-grid">
                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span>Total projects</span>
                    <span className="admin-stat-icon purple">
                      <FolderKanban size={19} />
                    </span>
                  </div>

                  <strong>{projects.length}</strong>
                  <p>Projects in your portfolio</p>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span>Inbox messages</span>
                    <span className="admin-stat-icon blue">
                      <Mail size={19} />
                    </span>
                  </div>

                  <strong>{messages.length}</strong>
                  <p>Contact form inquiries</p>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span>Technologies</span>
                    <span className="admin-stat-icon green">
                      <Code2 size={19} />
                    </span>
                  </div>

                  <strong>
                    {
                      new Set(
                        projects.flatMap(
                          (project) => project.tech || []
                        )
                      ).size
                    }
                  </strong>

                  <p>Unique technologies used</p>
                </article>
              </section>

              {/* Recent projects */}
              <section className="admin-content-card">
                <div className="admin-card-heading">
                  <div>
                    <h2>Recent projects</h2>
                    <p>Your latest portfolio work</p>
                  </div>

                  <button
                    type="button"
                    className="admin-text-button"
                    onClick={() => setActivePage("projects")}
                  >
                    View all <ArrowUpRight size={16} />
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="admin-empty">
                    <FolderKanban size={28} />
                    <strong>No projects yet</strong>
                    <p>Add your first project to get started.</p>

                    <button
                      className="admin-primary-button"
                      type="button"
                      onClick={() => setActivePage("add")}
                    >
                      <Plus size={17} />
                      Add project
                    </button>
                  </div>
                ) : (
                  <div className="admin-project-list">
                    {projects.slice(0, 5).map((project) => (
                      <article
                        className="admin-project-row"
                        key={project._id}
                      >
                        <div className="admin-project-symbol">
                          <Code2 size={20} />
                        </div>

                        <div className="admin-project-copy">
                          <strong>{project.title}</strong>
                          <p>{project.description}</p>

                          <div className="admin-tech-list">
                            {(project.tech || [])
                              .slice(0, 4)
                              .map((tech) => (
                                <span key={tech}>{tech}</span>
                              ))}
                          </div>
                        </div>

                        <div className="admin-row-actions">
                          <button
                            type="button"
                            title="Edit project"
                            onClick={() => editProject(project)}
                          >
                            <Pencil size={16} />
                          </button>

                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noreferrer"
                              title="Open demo"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              {/* Latest messages */}
              <section className="admin-content-card">
                <div className="admin-card-heading">
                  <div>
                    <h2>Latest messages</h2>
                    <p>Recent inquiries from visitors</p>
                  </div>

                  <button
                    type="button"
                    className="admin-text-button"
                    onClick={() => setActivePage("messages")}
                  >
                    Open inbox <ArrowUpRight size={16} />
                  </button>
                </div>

                <div className="inbox-toolbar">
                  <div className="inbox-search">
                    <Search size={18} />
                    <input
                      type="search"
                      placeholder="Search name, email or message..."
                      value={inboxSearch}
                      onChange={(e) => setInboxSearch(e.target.value)}
                      aria-label="Search inbox messages"
                    />
                    {inboxSearch && (
                      <button
                        type="button"
                        onClick={() => setInboxSearch("")}
                        aria-label="Clear search"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <select
                    value={inboxFilter}
                    onChange={(e) => setInboxFilter(e.target.value)}
                    aria-label="Filter messages"
                  >
                    <option value="all">All messages</option>
                    <option value="subject">With subject</option>
                  </select>

                  <select
                    value={inboxSort}
                    onChange={(e) => setInboxSort(e.target.value)}
                    aria-label="Sort messages"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>

                  <span className="inbox-result-count">
                    {filteredMessages.length} of {messages.length}
                  </span>
                </div>


                {filteredMessages.length === 0 ? (
                  <div className="admin-empty compact">
                    <Mail size={25} />
                    <p>Your inbox is clear.</p>
                  </div>
                ) : (
                  <div className="admin-message-list">
                    {messages.slice(0, 3).map((message) => (
                      <article
                        className="admin-message-row"
                        key={message._id}
                      >
                        <div className="admin-message-avatar">
                          {(message.name || "V")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="admin-message-copy">
                          <strong>
                            {message.name || "Visitor"}
                          </strong>
                          <span>{message.email}</span>
                          <p>
                            {message.subject || message.message}
                          </p>
                        </div>

                        <span className="admin-message-date">
                          {message.createdAt
                            ? new Date(
                              message.createdAt
                            ).toLocaleDateString()
                            : ""}
                        </span>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {/* Projects management */}
          {activePage === "projects" && (
            <section className="admin-content-card">
              <div className="admin-card-heading admin-project-heading">
                <div>
                  <h2>
                    All projects{" "}
                    <span className="admin-inline-count">
                      {projects.length}
                    </span>
                  </h2>
                  <p>
                    Update or remove work from your portfolio.
                  </p>
                </div>

                <div className="admin-search">
                  <Search size={17} />
                  <input
                    value={projectSearch}
                    onChange={(e) =>
                      setProjectSearch(e.target.value)
                    }
                    placeholder="Search projects..."
                  />
                </div>
              </div>

              <div className="project-management-toolbar">
                <div className="project-filter-group">
                  {[
                    { value: "all", label: "All projects" },
                    { value: "demo", label: "Live demo" },
                    { value: "github", label: "GitHub" },
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      type="button"
                      className={
                        projectFilter === filter.value ? "active" : ""
                      }
                      onClick={() => setProjectFilter(filter.value)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="project-sort-control">
                  <label htmlFor="project-sort">Sort by</label>
                  <select
                    id="project-sort"
                    value={projectSort}
                    onChange={(e) => setProjectSort(e.target.value)}
                  >
                    <option value="newest">Newest first</option>
                    <option value="az">Name: A–Z</option>
                    <option value="za">Name: Z–A</option>
                  </select>
                </div>

                <span className="project-result-count">
                  {filteredProjects.length}{" "}
                  {filteredProjects.length === 1 ? "project" : "projects"}
                </span>
              </div>


              {filteredProjects.length === 0 ? (
                <div className="admin-empty">
                  <FolderKanban size={28} />
                  <strong>No matching projects</strong>
                  <p>
                    Try a different search or add a project.
                  </p>
                </div>
              ) : (
                <div className="admin-project-list">
                  {filteredProjects.map((project) => (
                    <article
                      className="admin-project-row"
                      key={project._id}
                    >
                      <div className="admin-project-symbol">
                        <Code2 size={20} />
                      </div>

                      <div className="admin-project-copy">
                        <strong>{project.title}</strong>
                        <p>{project.description}</p>

                        <div className="admin-tech-list">
                          {(project.tech || []).map((tech) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>

                        <div className="admin-project-links">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink size={14} />
                              GitHub
                            </a>
                          )}

                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink size={14} />
                              Live demo
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="admin-row-actions">
                        <button
                          type="button"
                          title="Edit project"
                          onClick={() => editProject(project)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="danger"
                          title="Delete project"
                          onClick={() =>
                            deleteProject(project._id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}


          {activePage === "add" && (
            <section className="creative-project-page">
              <div className="creative-project-heading">
                <div className="creative-heading-copy">
                  <div className="creative-heading-icon">
                    <FolderKanban size={23} />
                  </div>
                  <div>
                    <span className="creative-kicker">
                      PROJECT WORKSPACE / {editingId ? "EDIT" : "NEW"}
                    </span>
                    <h2>
                      {editingId ? "Refine your project." : "Bring your work to life."}
                    </h2>
                    <p>
                      {editingId
                        ? "Update your project details and keep your portfolio fresh."
                        : "Add something remarkable to your portfolio."}
                    </p>
                  </div>
                </div>

                <div className="creative-heading-status">
                  <span className="creative-status-dot" />
                  Draft workspace
                </div>
              </div>

              <div className="creative-project-layout">
                <div className="creative-form-panel">
                  <div className="creative-panel-heading">
                    <div>
                      <span className="creative-step-label">01 — DETAILS</span>
                      <h3>Project information</h3>
                    </div>
                    <span className="creative-required-note">
                      * Required fields
                    </span>
                  </div>

                  <form className="creative-project-form" onSubmit={saveProject}>
                    <label className="creative-field">
                      <span>Project name <b>*</b></span>
                      <input
                        required
                        maxLength={100}
                        placeholder="e.g. Smart Hospital"
                        value={draft.title}
                        onChange={(e) =>
                          setDraft({ ...draft, title: e.target.value })
                        }
                      />
                      <small>Choose a clear name that describes your work.</small>
                    </label>

                    <label className="creative-field">
                      <span>About the project <b>*</b></span>
                      <textarea
                        required
                        minLength={10}
                        maxLength={1000}
                        rows={5}
                        placeholder="What did you build? What problem does it solve?"
                        value={draft.description}
                        onChange={(e) =>
                          setDraft({ ...draft, description: e.target.value })
                        }
                      />
                      <small>
                        {draft.description.length}/1000 characters
                      </small>
                    </label>

                    <div className="creative-field">
                      <label htmlFor="creative-tech">
                        Technologies <b>*</b>
                      </label>
                      <div className="creative-input-with-icon">
                        <Code2 size={18} />
                        <input
                          id="creative-tech"
                          required
                          placeholder="React, Node.js, MongoDB"
                          value={draft.tech}
                          onChange={(e) =>
                            setDraft({ ...draft, tech: e.target.value })
                          }
                        />
                      </div>
                      <small>Separate each technology with a comma.</small>

                      {draft.tech.trim() && (
                        <div className="creative-tech-preview">
                          {draft.tech
                            .split(",")
                            .map((tech) => tech.trim())
                            .filter(Boolean)
                            .map((tech, index) => (
                              <span key={`${tech}-${index}`}>{tech}</span>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="creative-divider">
                      <span>PROJECT LINKS</span>
                    </div>

                    <label className="creative-field">
                      <span>GitHub repository</span>
                      <div className="creative-input-with-icon">
                        <ExternalLink size={17} />
                        <input
                          type="url"
                          placeholder="https://github.com/username/project"
                          value={draft.github}
                          onChange={(e) =>
                            setDraft({ ...draft, github: e.target.value })
                          }
                        />
                      </div>
                    </label>

                    <label className="creative-field">
                      <span>Live project URL</span>
                      <div className="creative-input-with-icon">
                        <ArrowUpRight size={18} />
                        <input
                          type="url"
                          placeholder="https://your-project.com"
                          value={draft.demo}
                          onChange={(e) =>
                            setDraft({ ...draft, demo: e.target.value })
                          }
                        />
                      </div>
                    </label>

                    <div className="creative-form-footer">
                      <div className="creative-save-note">
                        <span className="creative-status-dot" />
                        {editingId
                          ? "Ready to update"
                          : "Ready to publish"}
                      </div>

                      <div className="creative-form-buttons">
                        <button
                          type="button"
                          className="creative-cancel-button"
                          onClick={() => {
                            resetDraft();
                            setActivePage("projects");
                          }}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="creative-submit-button"
                        >
                          <Plus size={18} />
                          {editingId ? "Save changes" : "Create project"}
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <aside className="creative-preview-panel">
                  <div className="creative-preview-top">
                    <span className="creative-step-label">02 — PREVIEW</span>
                    <span className="creative-preview-live">
                      <span className="creative-status-dot" />
                      Live
                    </span>
                  </div>

                  <div className="creative-preview-art">
                    <div className="creative-art-orb creative-art-orb-one" />
                    <div className="creative-art-orb creative-art-orb-two" />
                    <div className="creative-art-window">
                      <div className="creative-art-window-bar">
                        <i />
                        <i />
                        <i />
                        <span>PROJECT / PREVIEW</span>
                      </div>
                      <div className="creative-art-code">
                        <span className="creative-code-purple">const</span>{" "}
                        project = {"{"}
                        <br />
                        &nbsp;&nbsp;title:{" "}
                        <span className="creative-code-green">
                          "your next idea"
                        </span>
                        ,
                        <br />
                        &nbsp;&nbsp;status:{" "}
                        <span className="creative-code-blue">"building"</span>
                        <br />
                        {"}"};
                      </div>
                      <div className="creative-art-progress">
                        <span />
                      </div>
                    </div>
                    <div className="creative-art-caption">
                      <Code2 size={16} />
                      <span>Built with intention.</span>
                    </div>
                  </div>

                  <div className="creative-preview-content">
                    <span className="creative-preview-label">PROJECT CARD</span>
                    <h3>{draft.title.trim() || "Your project title"}</h3>
                    <p>
                      {draft.description.trim() ||
                        "Your project description will appear here as you type."}
                    </p>

                    <div className="creative-preview-technologies">
                      {draft.tech
                        .split(",")
                        .map((tech) => tech.trim())
                        .filter(Boolean)
                        .slice(0, 6)
                        .map((tech, index) => (
                          <span key={`${tech}-${index}`}>{tech}</span>
                        ))}
                      {!draft.tech.trim() && (
                        <span className="creative-empty-tech">
                          Technologies go here
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="creative-preview-links">
                    <span>
                      <ExternalLink size={15} />
                      {draft.github.trim() ? "Repository added" : "GitHub link optional"}
                    </span>
                    <span>
                      <ArrowUpRight size={15} />
                      {draft.demo.trim() ? "Live demo added" : "Live demo optional"}
                    </span>
                  </div>

                  <div className="creative-preview-tip">
                    <div>
                      <Mail size={20} />
                    </div>
                    <div>
                      <strong>Make it stand out</strong>
                      <p>
                        Add a clear description and relevant technologies so visitors
                        understand the value of your work.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          )}


          {/* Messages inbox */}
          {activePage === "messages" && (
            <section className="admin-content-card">
              <div className="admin-card-heading">
                <div>
                  <h2>
                    Inbox{" "}
                    <span className="admin-inline-count">
                      {messages.length}
                    </span>
                  </h2>
                  <p>
                    Messages submitted through your portfolio.
                  </p>
                </div>
              </div>

              <div className="inbox-toolbar">
                <div className="inbox-search">
                  <Search size={18} />
                  <input
                    type="search"
                    placeholder="Search name, email or message..."
                    value={inboxSearch}
                    onChange={(e) => setInboxSearch(e.target.value)}
                    aria-label="Search inbox messages"
                  />
                  {inboxSearch && (
                    <button
                      type="button"
                      onClick={() => setInboxSearch("")}
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <select
                  value={inboxFilter}
                  onChange={(e) => setInboxFilter(e.target.value)}
                  aria-label="Filter messages"
                >
                  <option value="all">All messages</option>
                  <option value="subject">With subject</option>
                </select>

                <select
                  value={inboxSort}
                  onChange={(e) => setInboxSort(e.target.value)}
                  aria-label="Sort messages"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>

                <span className="inbox-result-count">
                  {filteredMessages.length} of {messages.length}
                </span>
              </div>

              {filteredMessages.length === 0 ? (

                <div className="admin-empty">
                  <Mail size={28} />
                  <strong>
                    {messages.length === 0
                      ? "Your inbox is empty"
                      : "No matching messages"}
                  </strong>
                  <p>
                    {messages.length === 0
                      ? "New contact form messages will appear here."
                      : "Try another search or change your filter."}
                  </p>
                </div>

              ) : (
                <>
                  <div className="admin-inbox-list">
                    {paginatedMessages.map((message) => (
                      <article
                        className="admin-inbox-card"
                        key={message._id}
                      >
                        <div className="admin-inbox-header">
                          <div className="admin-message-avatar">
                            {(message.name || "V")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="admin-message-copy">
                            <strong>
                              {message.name || "Visitor"}
                            </strong>
                            <a href={`mailto:${message.email}`}>
                              {message.email}
                            </a>
                          </div>

                          <span className="admin-message-date">
                            <Clock3 size={14} />
                            {message.createdAt
                              ? new Date(
                                message.createdAt
                              ).toLocaleString()
                              : "Date unavailable"}
                          </span>
                        </div>

                        <h3>
                          {message.subject || "New inquiry"}
                        </h3>

                        <p className="admin-inbox-body">
                          {message.message}
                        </p>

                        <div className="inbox-crm-fields">
                          <label>
                            Status
                            <select
                              value={message.status || "new"}
                              onChange={(e) =>
                                updateMessage(message._id, {
                                  status: e.target.value,
                                })
                              }
                            >
                              <option value="new">New</option>
                              <option value="in-progress">In progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </label>

                          <label>
                            Budget (₹)
                            <input
                              type="number"
                              min="0"
                              max="100000000"
                              placeholder="Enter budget"
                              value={message.budget ?? ""}
                              onChange={(e) =>
                                setMessages((current) =>
                                  current.map((item) =>
                                    item._id === message._id
                                      ? {
                                        ...item,
                                        budget:
                                          e.target.value === ""
                                            ? null
                                            : Number(e.target.value),
                                      }
                                      : item
                                  )
                                )
                              }
                              onBlur={(e) =>
                                updateMessage(message._id, {
                                  budget:
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value),
                                })
                              }
                            />
                          </label>

                          <label>
                            Follow-up date
                            <input
                              type="date"
                              value={
                                message.followUpDate
                                  ? new Date(message.followUpDate)
                                    .toISOString()
                                    .slice(0, 10)
                                  : ""
                              }
                              onChange={(e) =>
                                updateMessage(message._id, {
                                  followUpDate: e.target.value || null,
                                })
                              }
                            />
                          </label>

                          <label className="inbox-crm-notes">
                            Notes
                            <textarea
                              rows={3}
                              maxLength={2000}
                              placeholder="Add client notes..."
                              value={message.notes || ""}
                              onChange={(e) =>
                                setMessages((current) =>
                                  current.map((item) =>
                                    item._id === message._id
                                      ? { ...item, notes: e.target.value }
                                      : item
                                  )
                                )
                              }
                              onBlur={(e) =>
                                updateMessage(message._id, {
                                  notes: e.target.value,
                                })
                              }
                            />
                          </label>

                          <button
                            type="button"
                            className="admin-secondary-button"
                            onClick={() =>
                              updateMessage(message._id, {
                                isRead: !message.isRead,
                              })
                            }
                          >
                            {message.isRead ? "Mark unread" : "Mark read"}
                          </button>
                        </div>


                        <div className="admin-inbox-actions">
                          <a
                            className="admin-secondary-button"
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                              message.email
                            )}&su=${encodeURIComponent(
                              `Re: ${message.subject || "Your inquiry"}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Mail size={16} />
                            Reply by email
                          </a>

                          <button
                            type="button"
                            className="admin-danger-button"
                            onClick={() =>
                              deleteMessage(message._id)
                            }
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="inbox-pagination">
                    <span>
                      Page {inboxPage} of {totalInboxPages}
                      {" · "}
                      {filteredMessages.length} messages
                    </span>

                    <div className="inbox-pagination-actions">
                      <button
                        type="button"
                        disabled={inboxPage === 1}
                        onClick={() =>
                          setInboxPage((page) => Math.max(1, page - 1))
                        }
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        disabled={inboxPage >= totalInboxPages}
                        onClick={() =>
                          setInboxPage((page) =>
                            Math.min(totalInboxPages, page + 1)
                          )
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {

  return (

    <>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<Admin />} />

      </Routes>

    </>

  );

}
