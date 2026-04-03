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

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  if (screens[name]) screens[name].classList.add('active');

  const showNav = ['home', 'journey', 'more'].includes(name);
  if (bottomNav) bottomNav.classList.toggle('visible', showNav);

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

setTimeout(() => showScreen('entry'), 1000);

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showMainScreen(btn.dataset.screen));
});

document.querySelectorAll('.nav-shortcut').forEach(btn => {
  btn.addEventListener('click', () => showMainScreen(btn.dataset.target));
});

const continueBtn = document.getElementById('continueBtn');
if (continueBtn) {
  continueBtn.addEventListener('click', loadStudy);
}

async function loadStudy() {
  const name = document.getElementById('firstName')?.value?.trim() || 'Friend';
  const nct = document.getElementById('nctNumber')?.value?.trim().toUpperCase();

  if (!/^NCT\d{8}$/.test(nct)) {
    alert("Invalid NCT format. Use NCT########");
    return;
  }

  state.user.firstName = name;
  state.user.nct = nct;

  try {
    const res = await fetch(`/api/trial?nct=${encodeURIComponent(nct)}`);
    const data = await res.json();

    if (!res.ok || !data.ok) {
      console.error("Backend error:", data);
      alert(`Backend error: ${data.error || "Unknown error"}`);
      return;
    }

    state.study = data;
    renderHome();
    showMainScreen('home');
  } catch (e) {
    console.error("Frontend fetch error:", e);
    alert(`Frontend error: ${e.message}`);
  }
}

function renderHome() {
  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeSubtitle = document.getElementById('welcomeSubtitle');
  const studyTitleHome = document.getElementById('studyTitleHome');
  const studyMetaHome = document.getElementById('studyMetaHome');
  const studyNctChip = document.getElementById('studyNctChip');

  if (welcomeTitle) welcomeTitle.textContent = `Hello, ${state.user.firstName}`;
  if (welcomeSubtitle) welcomeSubtitle.textContent = state.user.nct;
  if (studyTitleHome) studyTitleHome.textContent = state.study.title;
  if (studyMetaHome) {
    studyMetaHome.textContent =
      `${state.study.phase} • ${state.study.condition} • ${state.study.status}`;
  }
  if (studyNctChip) studyNctChip.textContent = state.study.NCTId;
}
