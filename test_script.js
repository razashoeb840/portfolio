
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
const $ = s => document.querySelector(s);

// Toast utility
function copyText(txt, msg) {
  navigator.clipboard.writeText(txt).then(() => {
    const t = $('#toast');
    t.textContent = msg || 'Copied to clipboard!';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2400);
  }).catch(() => {
    location.href = (txt.includes('@') ? 'mailto:' : 'tel:') + txt;
  });
}

// Hero letters animation
document.querySelectorAll('h1 .l').forEach((l, i) => {
  const t = l.textContent.trim();
  l.textContent = '';
  [...t].forEach((ch, j) => {
    const s = document.createElement('span');
    s.className = 'c';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.animationDelay = (0.12 + i * 0.22 + j * 0.05) + 's';
    l.appendChild(s);
  });
});

// Tech marquee ticker
const techList = [
  'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 
  'Angular', 'TypeScript', 'JavaScript', 'C++', 'Java', 'Python', 
  'SQL / MySQL', 'Tailwind CSS', 'REST APIs', 'System Design', 'Git', 'GitHub', 'Linux', 'Postman', 'Vercel', 'Render'
];
$('#mq').innerHTML = [...techList, ...techList].map(t => `<span>${t}</span>`).join('');

// Certifications & Recognitions
const CERT = [
  {
    i: 'Infosys Springboard',
    t: 'Full Stack Development Internship Certificate',
    d: 'Industry-oriented software training & successfully building CampusEventHub with Angular and REST APIs.',
    y: 'Apr 2026'
  },
  {
    i: 'LeetCode Milestone',
    t: '350+ Algorithmic Problems Solved',
    d: 'Contest rating 1432, with proven strength in arrays, strings, trees, hashing, sliding window, and two pointers.',
    y: 'Oct 2025 – Present',
    u: 'https://leetcode.com/u/razashoeb2358/'
  },
  {
    i: 'CodeChef Contest Rank',
    t: '2-Star Coder (Rating 1428)',
    d: 'Consistently participating in global Division contests with 120+ algorithmic challenges solved.',
    y: 'Sep 2025 – Present',
    u: 'https://www.codechef.com/users/razashoeb2358'
  },
  {
    i: 'Hackathon Award',
    t: 'FocusGuard Pro — Hackathon Winner',
    d: 'Engineered a privacy-centric productivity extension that blocks digital distractions and tracks focused sessions.',
    y: 'Sep 2025',
    u: 'https://github.com/sushantranjan912/FocusguardPro-hackathon'
  },
  {
    i: 'Oracle Certification',
    t: 'OCI 2025 Certified Generative AI Professional',
    d: 'Validated expertise in LLM architectures, prompt engineering, fine-tuning, RAG frameworks, and deployment on Oracle Cloud Infrastructure.',
    y: 'Aug 2025'
  },
  {
    i: 'Lovely Professional University',
    t: 'CodeXtreme 2.0 Certificate',
    d: 'Honored for competitive problem-solving excellence and algorithmic efficiency in university-wide technical challenge.',
    y: 'May 2025'
  }
];

const card = c => `
  <${c.u ? 'a href="' + c.u + '" target="_blank" rel="noopener noreferrer"' : 'div'} class="box cc tilt">
    <small>${c.i}</small>
    <h3>${c.t}</h3>
    <p>${c.d}</p>
    <em>${c.y}${c.u ? ' ↗' : ''}</em>
  </${c.u ? 'a' : 'div'}>
`;
$('#cr').innerHTML = [...CERT, ...CERT].map(card).join('');

// More Non-Repeating Repositories on GitHub (NO repeats of the 5 featured projects!)
const RP = [
  ['College_event_hub', 'Angular / TypeScript / Campus Event Discovery'],
  ['infosys_project', 'Angular / REST APIs / State Services'],
  ['Deadlock_Toolkit', 'Operating Systems / Banker\'s Algorithm Visualizer'],
  ['NodeJs', 'Backend Architectures / Express / REST APIs'],
  ['CPP_Bank_Account_Management_System_SHOEB_RAZA', 'C++ / OOP / File I/O Streams'],
  ['Leetcode', 'C++ / Algorithms / 350+ Solved Challenges']
];
$('#rp').innerHTML = '<h4>More Open Source Repositories on GitHub</h4>' + RP.map(([n, l]) => `
  <a href="https://github.com/razashoeb840/${n}" target="_blank" rel="noopener noreferrer">
    <b>${n}</b>
    <span>${l}</span>
  </a>
`).join('');

// Interactive Technical Skills Category Filter
const filterBtns = document.querySelectorAll('.sk-filter-btn');
const skillCards = document.querySelectorAll('.sk-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    skillCards.forEach(c => {
      const match = f === 'all' || c.dataset.category === f;
      c.classList.toggle('dimmed', !match);
    });
  });
});

// Interactive Technology Inspector Banner
const inspectorMsg = $('#sk-inspector-msg');
const inspectorIcon = $('#sk-inspector .sk-inspector-icon');
document.querySelectorAll('#skills .chips span').forEach(chip => {
  const desc = chip.dataset.desc;
  if (!desc) return;
  chip.style.cursor = 'pointer';
  chip.addEventListener('mouseenter', () => {
    inspectorMsg.innerHTML = `<b>${chip.textContent.trim()}</b> — ${desc}`;
    inspectorIcon.textContent = '⚡';
  });
  chip.addEventListener('click', () => {
    inspectorMsg.innerHTML = `<b>${chip.textContent.trim()}</b> — ${desc}`;
    inspectorIcon.textContent = '🚀';
  });
});

// Scroll Reveals & Counters & Bars
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const t = e.target;
  t.classList.add('in');
  io.unobserve(t);

  t.querySelectorAll('[data-n]').forEach(c => {
    const n = +c.dataset.n, s = performance.now();
    (function f(x) {
      const k = Math.min((x - s) / 1600, 1);
      c.textContent = Math.round(n * (1 - Math.pow(1 - k, 4)));
      if (k < 1) requestAnimationFrame(f);
    })(s);
  });

  t.querySelectorAll('[data-w]').forEach(b => b.style.width = b.dataset.w);
}), { threshold: 0.15 });

document.querySelectorAll('.rv, .rvl').forEach(e => io.observe(e));

// Navigation Active State Tracking
const navLinks = [...document.querySelectorAll('nav a')];
const navObserver = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    const id = e.target.id;
    navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + id));
  }
}), { rootMargin: '-40% 0px -45% 0px' });

document.querySelectorAll('#home, section').forEach(s => navObserver.observe(s));

// Card Tilt Effect
document.querySelectorAll('.tilt').forEach(c => {
  c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(4px)`;
  });
  c.addEventListener('pointerleave', () => c.style.transform = '');
});

// Cursor Glow and Progress Bar
let mx = 0, my = 0, sc = 0;
const glow = $('#glow'), bar = $('#bar');
addEventListener('pointermove', e => {
  mx = e.clientX / innerWidth - 0.5;
  my = e.clientY / innerHeight - 0.5;
  glow.style.transform = `translate(${e.clientX - innerWidth / 2}px, ${e.clientY - innerHeight / 2}px)`;
});
addEventListener('scroll', () => {
  sc = scrollY / Math.max(1, document.body.scrollHeight - innerHeight);
  bar.style.transform = `scaleX(${sc})`;
}, { passive: true });

// =========================================================
// THREE.JS 3D BACKGROUND (EXACT UNTOUCHED CODE PRESERVED)
// =========================================================
try {
  const cv = $('#bg'), R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
  R.setPixelRatio(Math.min(devicePixelRatio, 2));
  const S = new THREE.Scene(), C = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  C.position.z = 14;
  const N = innerWidth < 700 ? 900 : 2200, pos = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * (i % 3 == 2 ? 60 : 50);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: 0x6f7dff, size: 0.07, transparent: true, opacity: 0.85 }));
  S.add(pts);
  const pg = new THREE.PlaneGeometry(70, 70, 70, 70), pl = new THREE.Mesh(pg, new THREE.MeshBasicMaterial({ color: 0x2a35c9, wireframe: true, transparent: true, opacity: 0.3 }));
  pl.rotation.x = -1.25;
  pl.position.y = -7;
  S.add(pl);
  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, 1), new THREE.MeshBasicMaterial({ color: 0x00f5ff, wireframe: true, transparent: true, opacity: 0.28 }));
  ico.position.set(-6, 2, -6);
  S.add(ico);
  const tor = new THREE.Mesh(new THREE.TorusKnotGeometry(2, 0.5, 120, 12), new THREE.MeshBasicMaterial({ color: 0x8a2be2, wireframe: true, transparent: true, opacity: 0.25 }));
  tor.position.set(8, -4, -8);
  S.add(tor);
  function rs() {
    R.setSize(innerWidth, innerHeight, false);
    C.aspect = innerWidth / innerHeight;
    C.updateProjectionMatrix();
  }
  rs();
  addEventListener('resize', rs);
  const p0 = pg.attributes.position.array.slice();
  (function loop(t) {
    requestAnimationFrame(loop);
    t *= 0.001;
    const a = pg.attributes.position;
    if (!RM) for (let i = 0; i < a.count; i++) {
      const x = p0[i * 3], y = p0[i * 3 + 1];
      a.array[i * 3 + 2] = Math.sin(x * 0.3 + t) * Math.cos(y * 0.3 + t * 0.8) * 1.4;
    }
    a.needsUpdate = true;
    pts.rotation.y = t * 0.03 + sc * 3;
    pts.rotation.x = sc * 1.2;
    ico.rotation.x = t * 0.2 + sc * 6;
    ico.rotation.y = t * 0.25;
    tor.rotation.y = t * 0.2;
    tor.rotation.x = -sc * 5;
    ico.position.y = 2 - sc * 14;
    tor.position.y = -4 + sc * 10;
    C.position.x += (mx * 3 - C.position.x) * 0.04;
    C.position.y += (-my * 2 - sc * 4 - C.position.y) * 0.04;
    C.lookAt(0, C.position.y * 0.3, 0);
    R.render(S, C);
  })(0);
} catch (e) {
  console.warn('WebGL unavailable', e);
}

// =========================================================
// INTERACTIVE 3D FIGURE (EXACT UNTOUCHED CODE PRESERVED)
// =========================================================
try {
  const el = $('#bot'), r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  el.prepend(r.domElement);
  const s = new THREE.Scene(), c = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  c.position.set(0, 0.4, 9);
  const m = new THREE.MeshStandardMaterial({ color: 0x0b0b10, metalness: 0.95, roughness: 0.22 }), G = new THREE.Group();
  const add = (geo, x, y, z, rz = 0) => {
    const o = new THREE.Mesh(geo, m);
    o.position.set(x, y, z);
    o.rotation.z = rz;
    G.add(o);
    return o;
  };
  add(new THREE.SphereGeometry(0.55, 32, 32), 0, 1.9, 0).scale.set(1, 1.15, 1);
  add(new THREE.CylinderGeometry(0.18, 0.22, 0.3, 16), 0, 1.3, 0);
  add(new THREE.CylinderGeometry(0.95, 0.55, 1.6, 24), 0, 0.35, 0);
  [-1, 1].forEach(k => {
    add(new THREE.SphereGeometry(0.3, 20, 20), k * 1.05, 1, 0);
    add(new THREE.CylinderGeometry(0.16, 0.12, 1.5, 14), k * 1.35, 0.2, 0, k * 0.25);
    add(new THREE.SphereGeometry(0.17, 16, 16), k * 1.55, -0.55, 0);
    add(new THREE.CylinderGeometry(0.22, 0.16, 1.5, 14), k * 0.35, -1.3, 0);
    add(new THREE.SphereGeometry(0.2, 16, 16), k * 0.35, -0.5, 0);
  });
  G.position.y = -0.1;
  s.add(G);
  const l1 = new THREE.PointLight(0x4a5bff, 60, 30);
  l1.position.set(-4, 3, 5);
  const l2 = new THREE.PointLight(0x00f5ff, 40, 30);
  l2.position.set(4, -2, 4);
  s.add(l1, l2, new THREE.AmbientLight(0x222244, 1.2));
  let dn = false, lx = 0, vy = 0.01;
  el.addEventListener('pointerdown', e => {
    dn = true;
    lx = e.clientX;
    el.style.cursor = 'grabbing';
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointerup', () => {
    dn = false;
    el.style.cursor = 'grab';
  });
  el.addEventListener('pointermove', e => {
    if (dn) {
      vy = (e.clientX - lx) * 0.01;
      lx = e.clientX;
    }
  });
  function rs() {
    const w = el.clientWidth, h = el.clientHeight;
    r.setSize(w, h, false);
    c.aspect = w / h;
    c.updateProjectionMatrix();
  }
  rs();
  addEventListener('resize', rs);
  (function loop(t) {
    requestAnimationFrame(loop);
    G.rotation.y += vy;
    if (!dn) vy += (0.008 - vy) * 0.03;
    G.position.y = -0.1 + Math.sin(t * 0.002) * 0.12;
    l1.position.x = -4 + mx * 6;
    r.render(s, c);
  })(0);
} catch (e) {}
