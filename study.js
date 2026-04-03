// -------- STATE --------
const screens = {
  splash: document.getElementById('screen-splash'),
  entry: document.getElementById('screen-entry'),
  code: document.getElementById('screen-code'),
  home: document.getElementById('screen-home'),
  trial: document.getElementById('screen-trial'),
  journey: document.getElementById('screen-journey'),
  calendar: document.getElementById('screen-calendar'),
  questions: document.getElementById('screen-questions'),
  more: document.getElementById('screen-more')
};

const bottomNav = document.getElementById('bottomNav');

const state = {
  user: { firstName: '', nct: '' },
  study: null
};

// -------- NAV --------
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  if (screens[name]) screens[name].classList.add('active');

  const showNav = ['home','journey','more'].includes(name);
  bottomNav.classList.toggle('visible', showNav);

  updateNav(name);
}

function updateNav(name) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === name);
  });
}

function showMainScreen(name) {
  showScreen(name);
}

// -------- INIT --------
setTimeout(() => showScreen('entry'), 1000);

// nav buttons
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showMainScreen(btn.dataset.screen));
});

document.querySelectorAll('.nav-shortcut').forEach(btn => {
  btn.addEventListener('click', () => showMainScreen(btn.dataset.target));
});

// -------- MAIN FLOW --------
document.getElementById('continueBtn').addEventListener('click', loadStudy);

async function loadStudy() {

  const name = document.getElementById('firstName').value || 'Friend';
  const nct = document.getElementById('nctNumber').value.trim().toUpperCase();

  if (!/^NCT\d{8}$/.test(nct)) {
    alert("Invalid NCT (NCT########)");
    return;
  }

  state.user.firstName = name;
  state.user.nct = nct;

  try {
    const res = await fetch(`/api/trial?nct=${nct}`);
    const data = await res.json();

    if (!data.NCTId) throw new Error();

    state.study = data;

    renderHome();
    showMainScreen('home');

  } catch (e) {
    alert("Error loading study");
    console.error(e);
  }
}

// -------- RENDER --------
function renderHome() {
  document.getElementById('welcomeTitle').textContent =
    `Hello, ${state.user.firstName}`;

  document.getElementById('welcomeSubtitle').textContent =
    state.user.nct;

  document.getElementById('studyTitleHome').textContent =
    state.study.title;

  document.getElementById('studyMetaHome').textContent =
    `${state.study.phase} • ${state.study.condition} • ${state.study.status}`;

  document.getElementById('studyNctChip').textContent =
    state.study.NCTId;
}