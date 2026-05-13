document.addEventListener("DOMContentLoaded", () => {

  // ===== CURSOR GLOW =====
  const glow = document.getElementById("cursorGlow");
  if (glow) {
    document.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  // ===== BG CANVAS PARTICLES =====
  const canvas = document.getElementById("bgCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let W, H, particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    let resizeTimer;
    window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); });

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.5 + .3;
        this.vx = (Math.random() - .5) * .3;
        this.vy = (Math.random() - .5) * .3;
        this.alpha = Math.random() * .5 + .1;
        this.color = Math.random() > .5 ? "56,189,248" : "167,139,250";
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 90; i++) particles.push(new Particle());

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${(1 - dist / 100) * .07})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ===== HEADER SCROLL =====
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
    }, { passive: true });
  }

  // ===== BURGER MENU =====
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", () => menu.classList.toggle("open"));
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
  }

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute("data-delay") || "0");
        setTimeout(() => entry.target.classList.add("show"), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach(el => obs.observe(el));

  // ===== ACTIVE NAV =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".menu a[href^='#']");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute("href") === `#${current}` ? "var(--text)" : "";
    });
  }, { passive: true });

  // ===== I18N =====
  const I18N = {
    fr: {
      menu_about: "À propos",
      menu_skills: "Compétences",
      menu_projects: "Projets",
      menu_contact: "Contact",
      hero_kicker: "Développeur Full-Stack Junior",
      hero_pitch: "Développeur Full-Stack Junior capable de concevoir des applications complètes : Frontend moderne, APIs backend et bases de données.",
      hero_title: 'Je construis des apps <em>web</em>, <em>mobile</em> & <em>backend</em>',
      cta_projects: "Voir mes projets",
      cta_contact: "Me contacter",
      card_description: "Développeur Full-Stack Junior — Web · Mobile · Backend",
      card_skill1: "Applications full-stack",
      card_skill2: "APIs REST",
      card_skill3: "Mobile Android",
      status_open: "Disponible pour opportunités",
      about_title: "À propos",
      about_description: "Qui je suis, ce que j'ai construit, ce que j'apporte.",
      about_p2: "Je suis <strong>Chris Kalanda</strong>, développeur <strong>Full-Stack Junior</strong> passionné par la construction d'applications complètes et bien architecturées. Mes projets m'ont permis de maîtriser la chaîne entière du développement : une API REST pour un parc d'attractions, une app Android de surveillance écologique, une plateforme e-commerce Vue.js, et une application de gestion de tâches full-stack React/FastAPI.",
      about_p3: "Ce qui me définit, c'est une approche <strong>analytique et méthodique</strong>. Je ne me contente pas de faire fonctionner quelque chose — je cherche à comprendre <em>pourquoi</em> ça fonctionne, à anticiper les cas limites, et à écrire un code que d'autres développeurs pourront maintenir facilement. Face à un bug complexe, je suis dans mon élément.",
      about_p4: "Je recherche une première opportunité professionnelle en tant que <strong>développeur junior</strong> pour contribuer à des projets concrets, collaborer avec une équipe expérimentée, et accélérer ma progression. Je suis disponible rapidement et prêt à m'investir pleinement.",
      about_callout_title: "Ce que j'apporte",
      about_li1: "<strong>Analytique avant tout</strong> : je modélise le problème avant d'écrire la moindre ligne.",
      about_li2: "<strong>Débogueur acharné</strong> : bugs complexes, stack traces, logs — je traque jusqu'à la cause racine.",
      about_li3: "<strong>Autonome & resourceful</strong> : documentation, forums, expérimentation — je trouve des solutions.",
      about_li4: "<strong>Stack complète</strong> : React, Angular, Node, ASP.NET, Laravel, Android — du frontend à la DB.",
      about_li5: "<strong>En veille constante</strong> : je teste de nouveaux outils dès qu'ils émergent.",
      about_li6: "<strong>Communicant technique</strong> : j'explique des choix d'architecture clairement et simplement.",
      stat_projects: "Projets livrés",
      stat_tech: "Technologies",
      stat_langs: "Langues",
      skills_title: "Compétences",
      skills_languages: "Langages",
      skills_databases: "Base de données & Outils",
      project_minireseausocial: "Mini réseau social développé en PHP avec CSS.",
      project_thrillworld: "API REST pour la gestion d'un parc d'attractions.",
      project_lavalife: "Site web avec profils utilisateurs et messagerie.",
      project_ecoparc: "Application Android de surveillance écologique des espèces en danger dans les parcs naturels.",
      project_shopvue: "Plateforme de e-commerce moderne avec gestion de catalogue et panier.",
      project_taskflow: "Application web full-stack de gestion de tâches avec tableau Kanban et authentification JWT.",
      contact_tagline: "Envie de collaborer ou une question ?",
    },
    en: {
      menu_about: "About",
      menu_skills: "Skills",
      menu_projects: "Projects",
      menu_contact: "Contact",
      hero_kicker: "Junior Full-Stack Developer",
      hero_pitch: "Junior Full-Stack Developer able to build complete applications: modern frontend, backend APIs, and databases.",
      hero_title: 'I build <em>web</em>, <em>mobile</em> & <em>backend</em> apps',
      cta_projects: "View my projects",
      cta_contact: "Contact me",
      card_description: "Junior Full-Stack Developer — Web · Mobile · Backend",
      card_skill1: "Full-stack applications",
      card_skill2: "REST APIs",
      card_skill3: "Android mobile",
      status_open: "Open to opportunities",
      about_title: "About",
      about_description: "Who I am, what I've built, what I bring.",
      about_p2: "I'm <strong>Chris Kalanda</strong>, a <strong>Junior Full-Stack Developer</strong> passionate about building complete, well-architected applications. My projects gave me end-to-end ownership of the stack: a REST API for a theme park, an Android ecological monitoring app, a Vue.js e-commerce platform, and a full-stack task management app with React and FastAPI.",
      about_p3: "What defines me is an <strong>analytical and methodical approach</strong> to code. I don't just make things work — I want to understand <em>why</em> they work, anticipate edge cases, and write code that others can maintain easily. Complex bugs are where I do my best work.",
      about_p4: "I'm looking for my first professional opportunity as a <strong>junior developer</strong> where I can contribute to real projects, collaborate with experienced engineers, and grow fast. I'm available immediately and ready to give it everything.",
      about_callout_title: "What I bring",
      about_li1: "<strong>Analytical first</strong>: I model the problem thoroughly before writing any code.",
      about_li2: "<strong>Relentless debugger</strong>: complex bugs, stack traces, logs — I trace issues to their root cause.",
      about_li3: "<strong>Autonomous & resourceful</strong>: docs, forums, experimentation — I find solutions.",
      about_li4: "<strong>Full stack</strong>: React, Angular, Node, ASP.NET, Laravel, Android — front to back.",
      about_li5: "<strong>Always learning</strong>: I actively test new tools and keep up with the ecosystem.",
      about_li6: "<strong>Clear communicator</strong>: I explain architecture decisions in plain language.",
      stat_projects: "Projects delivered",
      stat_tech: "Technologies",
      stat_langs: "Languages",
      skills_title: "Skills",
      skills_languages: "Languages",
      skills_databases: "Databases & Tools",
      project_minireseausocial: "Mini social network developed in PHP with CSS.",
      project_thrillworld: "REST API for managing a theme park.",
      project_lavalife: "Web app with user profiles and messaging.",
      project_ecoparc: "Android app for ecological monitoring of endangered species in natural parks.",
      project_shopvue: "Modern e-commerce platform with catalog and cart management.",
      project_taskflow: "Full-stack task management web app with Kanban board and JWT authentication.",
      contact_tagline: "Want to collaborate or have a question?",
    }
  };

  function applyLanguage(lang) {
    const dict = I18N[lang] || I18N.fr;
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "fr" ? "EN" : "FR";
    localStorage.setItem("portfolio_lang", lang);
  }

  const saved = localStorage.getItem("portfolio_lang") || "fr";
  applyLanguage(saved);

  const toggleBtn = document.getElementById("langToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = localStorage.getItem("portfolio_lang") || "fr";
      applyLanguage(current === "fr" ? "en" : "fr");
    });
  }

});
