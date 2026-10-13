
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
      <Link className="logo" to="/" onClick={() => setOpen(false)}>
        K<span>.</span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        ☰
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
      {/* Hero Section */}
      <section className="hero section" id="home">
        <div className="hero-copy">
          <div className="availability">
            <span />
            AVAILABLE FOR FREELANCE WORK
          </div>

          <p className="eyebrow">HELLO, I'M</p>

          <h1>
            Karan Kumar
            <br />
            <span>Paswan.</span>
          </h1>

          <h2>Full Stack Developer</h2>

          <p className="hero-description">
            I build modern, responsive websites and useful web
            applications that help ideas turn into reality.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work ↗
            </a>

            <a href="#contact" className="btn btn-outline">
              Let's Talk
            </a>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="hero-art" aria-label="Developer illustration">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="code-card">
            <div className="code-dots">
              ● <span>●</span> <b>●</b>
            </div>

            <p>
              <span>const</span> developer = {"{"}
            </p>
            <p className="indent">
              name: <em>"Karan"</em>,
            </p>
            <p className="indent">
              role: <em>"Full Stack"</em>,
            </p>
            <p className="indent">
              passion: <em>"Building"</em>
            </p>
            <p>{"};"}</p>
            <p className="code-bottom">developer.create();</p>
          </div>

          <div className="floating-tag">React ✦ Node.js</div>
        </div>
      </section>

      {/* About Section */}
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
      <section className="section" id="services">
        <p className="eyebrow">WHAT I CAN DO</p>
        <h2 className="section-title">Services I offer.</h2>

        <div className="service-grid">
          <article className="service-card">
            <div className="service-icon">◈</div>
            <h3>Web Development</h3>
            <p>
              Responsive websites designed to work across desktop and
              mobile.
            </p>
          </article>

          <article className="service-card">
            <div className="service-icon">⌘</div>
            <h3>Frontend Development</h3>
            <p>
              Interactive interfaces using React, JavaScript and
              modern CSS.
            </p>
          </article>

          <article className="service-card">
            <div className="service-icon">⌬</div>
            <h3>Backend &amp; APIs</h3>
            <p>
              REST APIs, database integration and server-side
              functionality.
            </p>
          </article>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <p className="eyebrow">SELECTED WORK</p>
        <h2 className="section-title">Projects I've built.</h2>

        <div className="project-grid">
          {projectsLoading ? (
            <p className="empty-projects">
              Loading projects...
            </p>
          ) : projectsError ? (
            <p className="empty-projects" role="status">
              {projectsError}
            </p>
          ) : projects.length === 0 ? (
            <div className="empty-projects">
              <h3>Exciting projects are coming soon!</h3>
              <p>
                I'm working on new ideas. Check back soon to see what
                I've been building.
              </p>
            </div>
          ) : (
            projects.map((project) => (
              <article
                className="project-card"
                key={project._id || project.title}
              >
                <div className="project-visual">{"</>"}</div>

                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {(project.tech || []).map((tech, index) => (
                      <span key={`${tech}-${index}`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo ↗
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Contact Section */}
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

      {/* Footer */}
      <footer className="footer">
        <Link className="logo" to="/">
          K<span>.</span>
        </Link>

        <p>Designed &amp; built by Karan Kumar Paswan.</p>

        <a
          href="#home"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          Back to top ↑
        </a>
      </footer>
    </>
  );
}



function Admin() {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    () => localStorage.getItem("adminToken") || ""
  );

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Delete a project
  async function deleteProject(id) {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setError("");

    try {
      await request(`/projects/${id}`, { method: "DELETE" });
      await loadDashboard();
    } catch (err) {
      setError(err.message || "Unable to delete project.");
    }
  }

  // Delete a contact message
  async function deleteMessage(id) {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    setError("");

    try {
      await request(`/contact/${id}`, { method: "DELETE" });
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

  // Admin dashboard
  return (
    <main className="admin-page section">
      <div className="admin-heading">
        <div>
          <p className="eyebrow">CONTROL CENTER</p>
          <h1>Portfolio Dashboard</h1>
        </div>

        <button
          type="button"
          className="btn btn-outline"
          onClick={logout}
        >
          Log Out
        </button>
      </div>

      {error && (
        <p role="alert" className="notice error">
          {error}
        </p>
      )}

      {loading && <p role="status">Loading dashboard...</p>}

      {/* Project form */}
      <section className="admin-panel">
        <h2>{editingId ? "Edit Project" : "Add a Project"}</h2>

        <form className="contact-form" onSubmit={saveProject}>
          <input
            required
            maxLength={100}
            placeholder="Project title"
            value={draft.title}
            onChange={(e) =>
              setDraft({ ...draft, title: e.target.value })
            }
          />

          <textarea
            required
            minLength={10}
            maxLength={1000}
            rows={3}
            placeholder="Project description"
            value={draft.description}
            onChange={(e) =>
              setDraft({ ...draft, description: e.target.value })
            }
          />

          <input
            required
            placeholder="Technologies, comma separated"
            value={draft.tech}
            onChange={(e) =>
              setDraft({ ...draft, tech: e.target.value })
            }
          />

          <input
            type="url"
            placeholder="GitHub URL (optional)"
            value={draft.github}
            onChange={(e) =>
              setDraft({ ...draft, github: e.target.value })
            }
          />

          <input
            type="url"
            placeholder="Live demo URL (optional)"
            value={draft.demo}
            onChange={(e) =>
              setDraft({ ...draft, demo: e.target.value })
            }
          />

          <div className="hero-actions">
            <button
              type="submit"
              className="btn btn-primary"
            >
              {editingId ? "Save Changes" : "Add Project"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetDraft}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Project list */}
      <section className="admin-panel">
        <h2>Projects ({projects.length})</h2>

        {!loading && projects.length === 0 && (
          <p>No projects added yet.</p>
        )}

        {projects.map((project) => (
          <div className="admin-item" key={project._id}>
            <div>
              <strong>{project.title}</strong>
              <p>{project.description}</p>
            </div>

            <div className="admin-actions">
              <button
                type="button"
                onClick={() => editProject(project)}
              >
                Edit
              </button>

              <button
                type="button"
                className="danger-button"
                onClick={() => deleteProject(project._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Contact messages */}
      <section className="admin-panel">
        <h2>Contact Messages ({messages.length})</h2>

        {!loading && messages.length === 0 && (
          <p>No messages yet.</p>
        )}

        {messages.map((message) => (
          <article className="message-card" key={message._id}>
            <div className="admin-item">
              <div>
                <h3>{message.subject || "New inquiry"}</h3>
                <p>
                  <strong>{message.name}</strong> · {message.email}
                </p>
              </div>

              <button
                type="button"
                className="danger-button"
                onClick={() => deleteMessage(message._id)}
              >
                Delete
              </button>
            </div>

            <p>{message.message}</p>

            <small>
              {new Date(message.createdAt).toLocaleString()}
            </small>
          </article>
        ))}
      </section>

      <Link to="/">← View public portfolio</Link>
    </main>
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
