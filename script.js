const projects = [
  {
    id: "posh-theme-browser",
    name: "Posh Theme Browser",
    status: "Shipped",
    summary:
      "A prompt theme selection system that turns shell customization into a real installable product surface.",
    details:
      "The project combines terminal previewing, theme distribution, one-command install paths, and a clear operator workflow instead of treating theming as a loose collection of shell tweaks.",
    surface: "TUI browser + public install surface",
    focus: "PowerShell tooling / distribution UX",
    stack: ["PowerShell", "Python", "fzf", "Vercel", "WinGet"],
    links: [
      {
        label: "Open repo",
        url: "https://github.com/SpillKernelX/posh-theme-browser",
      },
      {
        label: "Install surface",
        anchor: "#install",
      },
    ],
  },
  {
    id: "recon-assistant",
    name: "Recon Assistant",
    status: "Active",
    summary:
      "Operational web tooling for reconciliation, logs, and store workflows where accuracy matters more than visual noise.",
    details:
      "The interface language is shaped around clarity, recovery, and speed for the people who actually close out counts, reconcile movement, and work through operational edge cases.",
    surface: "Ops web app family",
    focus: "Inventory / logbook / workflow systems",
    stack: ["Web apps", "Operations UI", "Reconciliation", "Logging"],
    links: [{ label: "See manifesto", anchor: "#manifest" }],
  },
  {
    id: "boottrackr",
    name: "BootTrackr",
    status: "Field model",
    summary:
      "Workflow and transaction tracking designed for movement, accountability, and state clarity under real field conditions.",
    details:
      "The product logic emphasizes visibility, auditability, and low-friction execution so the system can stay useful beyond the first rollout.",
    surface: "Tracking workflow surface",
    focus: "Field execution / inventory state",
    stack: ["Tracking", "Transactions", "Field ops"],
    links: [{ label: "Explore approach", anchor: "#workflow" }],
  },
  {
    id: "windowstestutility",
    name: "WindowsTestUtility",
    status: "Desktop",
    summary:
      "Machine-facing Windows support tooling for testing, diagnostics, and fast technician access to core system actions.",
    details:
      "The value comes from directness: native access, fast system feedback, and the ability to solve support problems without burying the useful controls.",
    surface: "Desktop utility",
    focus: "Windows diagnostics / support tooling",
    stack: ["C#", "Windows", "Diagnostics"],
    links: [{ label: "Open GitHub", url: "https://github.com/SpillKernelX" }],
  },
];

const body = document.body;
const hero = document.querySelector(".hero");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");
const topbarActionLinks = document.querySelectorAll(".topbar a, .topbar button");
const projectTabs = document.getElementById("project-tabs");
const projectPanel = document.getElementById("project-panel");
const copyInstallButton = document.getElementById("copy-install");
const installCommand = document.getElementById("install-command");
const revealNodes = document.querySelectorAll(".reveal");

let activeProjectId = projects[0].id;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setMenuOpen(nextState) {
  const isOpen = Boolean(nextState);
  body.classList.toggle("is-menu-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
}

function renderProjectTabs() {
  if (!projectTabs) {
    return;
  }

  projectTabs.innerHTML = projects
    .map((project) => {
      const activeClass = project.id === activeProjectId ? " is-active" : "";
      return `
        <button
          class="project-tab${activeClass}"
          type="button"
          role="tab"
          aria-selected="${project.id === activeProjectId}"
          data-project-tab="${project.id}"
        >
          <strong>${escapeHtml(project.name)}</strong>
          <span>${escapeHtml(project.surface)}</span>
        </button>
      `;
    })
    .join("");

  projectTabs.querySelectorAll("[data-project-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeProjectId = button.dataset.projectTab;
      renderProjects();
    });
  });
}

function renderProjectPanel() {
  if (!projectPanel) {
    return;
  }

  const project =
    projects.find((entry) => entry.id === activeProjectId) || projects[0];

  const linksMarkup = project.links
    .map((link) => {
      if (link.url) {
        return `
          <a class="button button--ghost" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">
            ${escapeHtml(link.label)}
          </a>
        `;
      }

      return `
        <a class="button button--ghost" href="${escapeHtml(link.anchor)}">
          ${escapeHtml(link.label)}
        </a>
      `;
    })
    .join("");

  const stackMarkup = project.stack
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");

  projectPanel.innerHTML = `
    <div class="project-panel__status">${escapeHtml(project.status)}</div>
    <div>
      <h3>${escapeHtml(project.name)}</h3>
    </div>
    <p>${escapeHtml(project.summary)}</p>
    <div class="project-panel__meta">${stackMarkup}</div>
    <div class="project-panel__columns">
      <div class="project-panel__card">
        <h4>Surface</h4>
        <p>${escapeHtml(project.surface)}</p>
      </div>
      <div class="project-panel__card">
        <h4>Focus</h4>
        <p>${escapeHtml(project.focus)}</p>
      </div>
      <div class="project-panel__card">
        <h4>Why it exists</h4>
        <p>${escapeHtml(project.details)}</p>
      </div>
      <div class="project-panel__card">
        <h4>Design bias</h4>
        <p>Operator clarity, deliberate setup, and usable long-term maintenance.</p>
      </div>
    </div>
    <div class="project-panel__actions">${linksMarkup}</div>
  `;
}

function renderProjects() {
  renderProjectTabs();
  renderProjectPanel();
}

async function copyInstallCommand() {
  if (!installCommand || !copyInstallButton) {
    return;
  }

  const text = installCommand.textContent.trim();

  try {
    await navigator.clipboard.writeText(text);
    copyInstallButton.textContent = "Copied";
  } catch {
    copyInstallButton.textContent = "Copy failed";
  }

  window.setTimeout(() => {
    copyInstallButton.textContent = "Copy command";
  }, 1800);
}

function setupRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupSpotlightMotion() {
  if (!hero) {
    return;
  }

  const reset = () => {
    hero.style.setProperty("--spotlight-x", "0");
    hero.style.setProperty("--spotlight-y", "0");
  };

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 32;
    hero.style.setProperty("--spotlight-x", x.toFixed(2));
    hero.style.setProperty("--spotlight-y", y.toFixed(2));
  });

  hero.addEventListener("pointerleave", reset);
  reset();
}

function setupHashState() {
  if (location.hash.startsWith("#projects/")) {
    const projectId = location.hash.replace("#projects/", "");
    const exists = projects.some((project) => project.id === projectId);

    if (exists) {
      activeProjectId = projectId;
      renderProjects();
      document.getElementById("projects")?.scrollIntoView();
    }
  }
}

function wireNavigation() {
  topbarActionLinks.forEach((node) => {
    node.addEventListener("click", () => {
      if (body.classList.contains("is-menu-open")) {
        setMenuOpen(false);
      }
    });
  });

  siteNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (body.classList.contains("is-menu-open")) {
        setMenuOpen(false);
      }
    });
  });
}

function init() {
  renderProjects();
  setupRevealObserver();
  setupSpotlightMotion();
  setupHashState();
  wireNavigation();

  menuToggle?.addEventListener("click", () => {
    setMenuOpen(!body.classList.contains("is-menu-open"));
  });

  copyInstallButton?.addEventListener("click", copyInstallCommand);
}

init();
