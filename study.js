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
const modePill = document.getElementById('modePill');

const DEMO_NCT = "NCTDEMO0001";
const DEMO_CODE = "DEMO001";

const demoEnhancedStudy = {
  ok: true,
  NCTId: DEMO_NCT,
  title: "A Study of Aurora-01 in Patients With Relapsed Leukemia",
  condition: "Relapsed Acute Leukemia",
  phase: "PHASE 2",
  status: "ACTIVE",
  sponsor: "My Trial Journey Biotech",
  summary:
    "Aurora-01 is an investigational therapy being studied in patients with relapsed leukemia. This demo enhanced journey shows how a richer patient experience could look inside the app.",
  whyThisMatters:
    "This study explores whether Aurora-01 may help control relapsed leukemia while the research team closely monitors safety and response.",
  treatment:
    "Aurora-01 investigational drug",
  howGiven:
    "Intravenous infusion during scheduled study visits",
  disclaimer:
    "This app is for educational purposes only and does not replace medical advice. Always follow instructions from your care team.",
  todayMessage:
    "Your enhanced journey is active. Review your upcoming visits and bring any questions to your study team.",
  questions: [
    {
      q: "What is this study testing?",
      a: "This study is testing Aurora-01, an investigational treatment for patients with relapsed leukemia."
    },
    {
      q: "Will every visit be the same?",
      a: "No. Some visits are shorter and focused on labs or symptom review, while others may include treatment and closer monitoring."
    },
    {
      q: "What should I bring to visits?",
      a: "Bring your medication list, any questions for the team, and let them know about any new or worsening symptoms."
    },
    {
      q: "Why do some visits take longer?",
      a: "Certain visits may include labs, physical exams, treatment, and observation after the infusion."
    }
  ],
  visits: [
    {
      code: "SCR",
      shortLabel: "Screening",
      title: "Screening Visit",
      subtitle: "Eligibility and baseline assessments",
      timeEstimate: "3–5 hrs",
      marker: "SCR",
      expect:
        "This visit may include blood work, a physical exam, and baseline tests to confirm that the study is a good fit.",
      tip:
        "Bring your medication list and be ready to review your medical history.",
      procedures: [
        { icon: "🧪", title: "Blood tests", note: "Routine and study-required labs may be collected." },
        { icon: "🩺", title: "Physical exam", note: "Your research team may review your current health status." },
        { icon: "📝", title: "Eligibility review", note: "The team confirms study requirements and next steps." }
      ]
    },
    {
      code: "C1D1",
      shortLabel: "C1D1",
      title: "Cycle 1 Day 1",
      subtitle: "First treatment visit",
      timeEstimate: "Most of day",
      marker: "1.1",
      expect:
        "Your first treatment visit may be longer because it can include labs, treatment, and monitoring after infusion.",
      tip:
        "Plan extra time and ask your team if there are any special instructions before treatment.",
      procedures: [
        { icon: "💉", title: "Study drug infusion", note: "Aurora-01 may be given during this visit." },
        { icon: "🧪", title: "Pre-treatment labs", note: "Labs may be checked before treatment begins." },
        { icon: "👀", title: "Observation", note: "You may be monitored after treatment for safety." }
      ]
    },
    {
      code: "C1D8",
      shortLabel: "C1D8",
      title: "Cycle 1 Day 8",
      subtitle: "Early follow-up visit",
      timeEstimate: "2–4 hrs",
      marker: "1.8",
      expect:
        "This visit may focus on safety, symptom review, and lab monitoring after the first treatment.",
      tip:
        "Write down any side effects or questions since your last visit.",
      procedures: [
        { icon: "🧪", title: "Blood tests", note: "Lab work may help monitor how you are doing on study." },
        { icon: "💬", title: "Symptom review", note: "The team may ask about any side effects or changes." }
      ]
    },
    {
      code: "C1D15",
      shortLabel: "C1D15",
      title: "Cycle 1 Day 15",
      subtitle: "Ongoing treatment follow-up",
      timeEstimate: "2–4 hrs",
      marker: "1.15",
      expect:
        "Ongoing monitoring and additional study procedures may happen depending on how you are doing.",
      tip:
        "Tell the team about any new medications, ER visits, or symptoms.",
      procedures: [
        { icon: "🧪", title: "Labs", note: "Routine study labs may be repeated." },
        { icon: "🩺", title: "Clinical review", note: "The team checks your overall status and study progress." }
      ]
    },
    {
      code: "C2D1",
      shortLabel: "C2D1",
      title: "Cycle 2 Day 1",
      subtitle: "Next cycle treatment visit",
      timeEstimate: "2–5 hrs",
      marker: "2.1",
      expect:
        "This visit may include another treatment day, labs, and ongoing safety monitoring.",
      tip:
        "Confirm the schedule with your team and bring any new questions.",
      procedures: [
        { icon: "💉", title: "Study treatment", note: "Treatment may continue according to the study schedule." },
        { icon: "🧪", title: "Blood tests", note: "Labs may be checked before and/or after treatment." },
        { icon: "📝", title: "Study review", note: "Medications and side effects may be reviewed." }
      ]
    }
  ],
  journeySteps: [
    { title: "Screening", subtitle: "Before treatment starts", state: "complete" },
    { title: "Treatment", subtitle: "Visit-by-visit journey", state: "current" },
    { title: "Follow-up", subtitle: "After treatment ends", state: "upcoming" }
  ]
};

const basicQuestions = [
  {
    q: "What is a clinical trial?",
    a: "A clinical trial is a research study designed to learn more about a treatment, including how safe it is and how well it may work."
  },
  {
    q: "What happens during a study visit?",
    a: "Visits may include lab tests, physical exams, treatment, or study-related assessments depending on the study."
  },
  {
    q: "What should I bring to visits?",
    a: "Bring your medication list, any new symptoms, and questions you may want to discuss with your team."
  },
  {
    q: "Who should I contact if I feel unwell?",
    a: "Your research team or treating physician is your primary contact for symptoms or concerns."
  }
];

const state = {
  user: { firstName: '', nct: '' },
  study: null,
  enhanced: false,
  selectedVisitCode: null
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

  if (name === 'home') renderHome();
  if (name === 'journey') renderJourney();
  if (name === 'questions') renderQuestions();
  if (name === 'more') renderMore();
}

function saveState() {
  localStorage.setItem('mtj_state', JSON.stringify(state));
}

function loadSavedState() {
  const saved = localStorage.getItem('mtj_state');
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    if (!parsed?.study) return;

    state.user = parsed.user || state.user;
    state.study = parsed.study;
    state.enhanced = !!parsed.enhanced;
    state.selectedVisitCode = parsed.selectedVisitCode || null;

    setModePill();
    renderAll();
    showMainScreen('home');
  } catch (err) {
    console.error('Could not load saved state:', err);
  }
}

function setModePill() {
  if (!modePill) return;
  modePill.textContent = state.enhanced ? 'Enhanced mode' : 'Basic mode';
}

function getBasicStudyModel(apiData) {
  return {
    NCTId: apiData.NCTId,
    title: apiData.title,
    condition: apiData.condition || 'N/A',
    phase: apiData.phase || 'N/A',
    status: apiData.status || 'N/A',
    sponsor: apiData.sponsor || 'ClinicalTrials.gov',
    summary: `This study was loaded from ClinicalTrials.gov using ${apiData.NCTId}. The basic version provides a simple patient-facing overview.`,
    whyThisMatters:
      'This basic experience helps patients understand the study at a high level using public information.',
    treatment:
      'Study treatment details may vary by protocol.',
    howGiven:
      'May vary by study',
    disclaimer:
      'This app is for educational purposes only and does not replace medical advice. Always follow instructions from your care team.',
    todayMessage:
      'Bring your medication list and keep track of any new questions for your care team.',
    questions: [...basicQuestions],
    visits: [
      {
        code: 'OVERVIEW',
        shortLabel: 'Overview',
        title: 'General Study View',
        subtitle: 'High-level study information',
        timeEstimate: 'Varies',
        marker: 'GEN',
        expect:
          'The basic experience focuses on a high-level understanding of the study rather than detailed protocol-based visits.',
        tip:
          'Ask your care team about the exact structure and requirements of your scheduled visits.',
        procedures: [
          { icon: '📘', title: 'Study overview', note: 'Basic studies show public information such as title, phase, sponsor, and condition.' },
          { icon: '🧭', title: 'General journey', note: 'The basic experience outlines a simpler overall journey.' },
          { icon: '💬', title: 'Questions', note: 'Patients can review short answers to common questions.' }
        ]
      }
    ],
    journeySteps: [
      { title: 'Screening', subtitle: 'Before treatment starts', state: 'complete' },
      { title: 'Treatment', subtitle: 'Study participation', state: 'current' },
      { title: 'Follow-up', subtitle: 'After treatment', state: 'upcoming' }
    ]
  };
}

function renderAll() {
  renderHome();
  renderJourney();
  renderQuestions();
  renderMore();
}

function renderHome() {
  if (!state.study) return;

  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeSubtitle = document.getElementById('welcomeSubtitle');
  const studyTitleHome = document.getElementById('studyTitleHome');
  const studyMetaHome = document.getElementById('studyMetaHome');
  const studyNctChip = document.getElementById('studyNctChip');
  const todayMessage = document.getElementById('todayMessage');
  const experienceBadge = document.getElementById('experienceBadge');
  const homeMetaLine = document.getElementById('homeMetaLine');
  const progressSnapshot = document.getElementById('progressSnapshot');

  if (welcomeTitle) welcomeTitle.textContent = `Hello, ${state.user.firstName}`;
  if (welcomeSubtitle) welcomeSubtitle.textContent = `You are viewing ${state.study.NCTId}.`;
  if (studyTitleHome) studyTitleHome.textContent = state.study.title;
  if (studyMetaHome) {
    studyMetaHome.textContent =
      `${state.study.phase} • ${state.study.condition} • ${state.study.sponsor}`;
  }
  if (studyNctChip) studyNctChip.textContent = state.study.NCTId;
  if (todayMessage) todayMessage.textContent = state.study.todayMessage || '';
  if (experienceBadge) experienceBadge.textContent = state.enhanced ? 'Enhanced' : 'Basic';

  if (homeMetaLine) {
    homeMetaLine.innerHTML = '';
    [state.study.phase, state.study.condition, state.study.status].forEach(value => {
      const pill = document.createElement('span');
      pill.className = 'meta-pill';
      pill.textContent = value || 'N/A';
      homeMetaLine.appendChild(pill);
    });
  }

  if (progressSnapshot) {
    progressSnapshot.innerHTML = '';
    (state.study.journeySteps || []).forEach(step => {
      const item = document.createElement('div');
      item.className = 'progress-item';
      const active = step.state === 'complete' || step.state === 'current';
      item.innerHTML = `
        <div class="dot ${active ? 'active' : ''}"></div>
        <div>
          <strong style="font-size:14px;">${step.title}</strong>
          <div class="helper" style="margin-top:4px;">${step.subtitle}</div>
        </div>
      `;
      progressSnapshot.appendChild(item);
    });
  }
}

function renderJourney() {
  if (!state.study) return;

  const trialAppTitle = document.getElementById('trialAppTitle');
  const trialSummary = document.getElementById('trialSummary');
  const trialWhyItMatters = document.getElementById('trialWhyItMatters');
  const trialTreatment = document.getElementById('trialTreatment');
  const trialHowGiven = document.getElementById('trialHowGiven');
  const trialDisclaimer = document.getElementById('trialDisclaimer');
  const journeyOverviewPill = document.getElementById('journeyOverviewPill');

  if (trialAppTitle) trialAppTitle.textContent = state.study.title;
  if (trialSummary) trialSummary.textContent = state.study.summary || '—';
  if (trialWhyItMatters) trialWhyItMatters.textContent = state.study.whyThisMatters || '—';
  if (trialTreatment) trialTreatment.textContent = state.study.treatment || '—';
  if (trialHowGiven) trialHowGiven.textContent = state.study.howGiven || '—';
  if (trialDisclaimer) trialDisclaimer.textContent = state.study.disclaimer || '—';
  if (journeyOverviewPill) journeyOverviewPill.textContent = `${state.study.phase} • ${state.study.sponsor}`;

  renderVisitRibbonAndDetails();
}

function renderVisitRibbonAndDetails() {
  const ribbon = document.getElementById('visitRibbon');
  const journeyModePill = document.getElementById('journeyModePill');
  const basicJourneyNote = document.getElementById('basicJourneyNote');

  if (!ribbon) return;

  const visits = state.study.visits || [];
  if (!state.selectedVisitCode && visits.length) {
    state.selectedVisitCode = visits[0].code;
  }

  ribbon.innerHTML = '';
  if (journeyModePill) {
    journeyModePill.textContent = state.enhanced ? 'Enhanced ribbon' : 'Basic journey';
  }
  if (basicJourneyNote) {
    basicJourneyNote.style.display = state.enhanced ? 'none' : 'block';
  }

  visits.forEach(visit => {
    const btn = document.createElement('button');
    btn.className = `visit-pill ${visit.code === state.selectedVisitCode ? 'active' : ''}`;
    btn.innerHTML = `${visit.shortLabel}<small>${visit.title}</small>`;
    btn.addEventListener('click', () => {
      state.selectedVisitCode = visit.code;
      saveState();
      renderVisitRibbonAndDetails();
    });
    ribbon.appendChild(btn);
  });

  const selected = visits.find(v => v.code === state.selectedVisitCode) || visits[0];
  if (!selected) return;

  const selectedVisitTitle = document.getElementById('selectedVisitTitle');
  const selectedVisitSubtitle = document.getElementById('selectedVisitSubtitle');
  const selectedVisitTime = document.getElementById('selectedVisitTime');
  const visitMarker = document.getElementById('visitMarker');
  const visitExpect = document.getElementById('visitExpect');
  const visitTip = document.getElementById('visitTip');
  const procedureList = document.getElementById('procedureList');

  if (selectedVisitTitle) selectedVisitTitle.textContent = selected.title;
  if (selectedVisitSubtitle) selectedVisitSubtitle.textContent = selected.subtitle;
  if (selectedVisitTime) selectedVisitTime.textContent = selected.timeEstimate;
  if (visitMarker) visitMarker.textContent = selected.marker;
  if (visitExpect) visitExpect.textContent = selected.expect;
  if (visitTip) visitTip.textContent = selected.tip;

  if (procedureList) {
    procedureList.innerHTML = '';
    (selected.procedures || []).forEach(item => {
      const div = document.createElement('div');
      div.className = 'procedure-item';
      div.innerHTML = `
        <div class="procedure-icon">${item.icon}</div>
        <div class="procedure-text">
          <strong>${item.title}</strong>
          <span>${item.note}</span>
        </div>
      `;
      procedureList.appendChild(div);
    });
  }
}

function renderQuestions() {
  if (!state.study) return;

  const questionsList = document.getElementById('questionsList');
  if (!questionsList) return;

  questionsList.innerHTML = '';
  (state.study.questions || []).forEach(item => {
    const details = document.createElement('details');
    details.innerHTML = `<summary>${item.q}</summary><p>${item.a}</p>`;
    questionsList.appendChild(details);
  });
}

function renderMore() {
  if (!state.study) return;

  const moreExperienceText = document.getElementById('moreExperienceText');
  const moreDisclaimer = document.getElementById('moreDisclaimer');

  if (moreExperienceText) {
    moreExperienceText.textContent = state.enhanced
      ? 'This study is currently using the enhanced experience.'
      : 'This study is currently using the basic experience.';
  }

  if (moreDisclaimer) {
    moreDisclaimer.textContent = state.study.disclaimer || '';
  }
}

async function loadStudy() {
  const name = document.getElementById('firstName')?.value?.trim() || 'Friend';
  const nct = document.getElementById('nctNumber')?.value?.trim().toUpperCase();

  const isRealNCT = /^NCT\d{8}$/.test(nct);
  const isDemoNCT = nct === DEMO_NCT;

  if (!isRealNCT && !isDemoNCT) {
    alert("Invalid NCT format. Use NCT######## or NCTDEMO0001.");
    return;
  }

  state.user.firstName = name;
  state.user.nct = nct;

  if (isDemoNCT) {
    showScreen('code');
    return;
  }

  try {
    const res = await fetch(`/api/trial?nct=${encodeURIComponent(nct)}`);
    const data = await res.json();

    if (!res.ok || !data.ok) {
      console.error("Backend error:", data);
      alert(`Backend error: ${data.error || "Unknown error"}`);
      return;
    }

    state.enhanced = false;
    state.study = getBasicStudyModel(data);
    state.selectedVisitCode = state.study.visits?.[0]?.code || null;

    setModePill();
    renderAll();
    saveState();
    showMainScreen('home');
  } catch (e) {
    console.error("Frontend fetch error:", e);
    alert(`Frontend error: ${e.message}`);
  }
}

function unlockDemoStudy() {
  const code = document.getElementById('siteCode')?.value?.trim().toUpperCase();

  if (state.user.nct === DEMO_NCT && code === DEMO_CODE) {
    state.enhanced = true;
    state.study = { ...demoEnhancedStudy };
    state.selectedVisitCode = state.study.visits?.[0]?.code || null;

    setModePill();
    renderAll();
    saveState();
    showMainScreen('home');
    return;
  }

  alert('Invalid code');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showMainScreen(btn.dataset.screen));
});

document.querySelectorAll('.nav-shortcut').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    if (target) showMainScreen(target);
  });
});

document.querySelectorAll('.demo-basic').forEach(btn => {
  btn.addEventListener('click', () => {
    const nctNumber = document.getElementById('nctNumber');
    const firstName = document.getElementById('firstName');
    if (firstName) firstName.value = 'Fernando';
    if (nctNumber) nctNumber.value = btn.dataset.nct || 'NCT06387342';
  });
});

document.querySelectorAll('.demo-enhanced').forEach(btn => {
  btn.addEventListener('click', () => {
    const nctNumber = document.getElementById('nctNumber');
    const firstName = document.getElementById('firstName');
    if (firstName) firstName.value = 'Fernando';
    if (nctNumber) nctNumber.value = DEMO_NCT;
  });
});

document.querySelectorAll('.demo-code').forEach(btn => {
  btn.addEventListener('click', () => {
    const siteCode = document.getElementById('siteCode');
    if (siteCode) siteCode.value = DEMO_CODE;
  });
});

const continueBtn = document.getElementById('continueBtn');
if (continueBtn) {
  continueBtn.addEventListener('click', loadStudy);
}

const unlockBtn = document.getElementById('unlockBtn');
if (unlockBtn) {
  unlockBtn.addEventListener('click', unlockDemoStudy);
}

const backToEntryBtn = document.getElementById('backToEntryBtn');
if (backToEntryBtn) {
  backToEntryBtn.addEventListener('click', () => showScreen('entry'));
}

const websiteLink = document.getElementById('websiteLink');
if (websiteLink) {
  websiteLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Website link placeholder.');
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

setTimeout(() => {
  if (!state.study) showScreen('entry');
}, 1000);

window.addEventListener('load', () => {
  loadSavedState();
  setModePill();
});
