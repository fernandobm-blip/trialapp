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

const DEMO_NCT = 'NCTDEMO0001';
const DEMO_CODE = 'DEMO001';

const patientQuestions = [
  { q: 'What is a clinical trial?', a: 'A clinical trial is a research study that tests new treatments or new ways of using existing treatments.' },
  { q: 'Why am I being offered this study?', a: 'Your doctor believes this study may be an option for your condition based on your medical history.' },
  { q: 'Is this treatment approved?', a: 'Not always. Many clinical trials study investigational treatments that are not yet approved.' },
  { q: 'What is the goal of this study?', a: 'The goal is usually to understand safety, effectiveness, or both.' },
  { q: 'Will I definitely receive treatment?', a: 'It depends. Some studies include different groups or treatment arms.' },
  { q: 'How often will I need to come to the clinic?', a: 'Visit frequency varies by study. Your team will provide your exact schedule.' },
  { q: 'How long does each visit take?', a: 'Some visits are short, while others may take several hours depending on procedures.' },
  { q: 'Will I need blood tests?', a: 'Most studies include blood tests to monitor your health and the effects of treatment.' },
  { q: 'Will I need scans or imaging?', a: 'Some studies require scans to monitor disease response.' },
  { q: 'Will I need biopsies?', a: 'Some studies include biopsies, but not all. Ask your team whether they are required in your case.' },
  { q: 'What side effects should I expect?', a: 'Side effects vary depending on the treatment. Your team will explain what to watch for.' },
  { q: 'What side effects are urgent?', a: 'Your care team will tell you which symptoms should be reported immediately.' },
  { q: 'Who do I call if I feel unwell?', a: 'You should contact your study team or treating physician.' },
  { q: 'Can I continue my current medications?', a: 'Some medications may need to be adjusted. Always check with your team.' },
  { q: 'Can I leave the study at any time?', a: 'Yes. Participation is voluntary, and you can withdraw at any time.' },
  { q: 'Will this study cure my disease?', a: 'Clinical trials are research studies and may or may not provide direct benefit.' },
  { q: 'What happens if the treatment does not work?', a: 'Your doctor will discuss other options if the study treatment is not effective.' },
  { q: 'Will I be monitored closely?', a: 'Yes. Clinical trials often include close monitoring for safety.' },
  { q: 'Will I still see my regular doctor?', a: 'Usually yes, along with the research team.' },
  { q: 'Do I have to pay for anything?', a: 'Some costs may be covered by the study. Ask your team about details.' },
  { q: 'Will insurance be involved?', a: 'Standard care is often billed to insurance, while study-specific procedures may be covered by the sponsor.' },
  { q: 'Can I travel during the study?', a: 'You should discuss travel plans with your research team.' },
  { q: 'What happens during screening?', a: 'Screening determines if the study is a good fit for you.' },
  { q: 'What is informed consent?', a: 'It is a document explaining the study that you review before participating.' },
  { q: 'Do I have to sign consent?', a: 'Yes, before any study procedures begin.' },
  { q: 'Can I ask questions before signing?', a: 'Yes, and you should ask as many questions as needed.' },
  { q: 'Will I get a copy of the consent?', a: 'Yes, you should receive a copy.' },
  { q: 'What is a study visit?', a: 'A study visit is a visit where study-related procedures are performed.' },
  { q: 'What is a cycle?', a: 'A cycle is a repeating period of treatment.' },
  { q: 'Will I receive the same treatment every visit?', a: 'Not always. Some visits are different.' },
  { q: 'What should I bring to visits?', a: 'Bring your medication list, questions, and any symptom updates.' },
  { q: 'Can I eat before visits?', a: 'Some visits require fasting. Your team will tell you.' },
  { q: 'Will I need someone to drive me?', a: 'Some treatments may require assistance. Ask your team.' },
  { q: 'What if I miss a visit?', a: 'Contact your team as soon as possible.' },
  { q: 'Will I receive reminders?', a: 'Some sites provide reminders, but always confirm your schedule.' },
  { q: 'What happens after the study ends?', a: 'You may enter follow-up or return to standard care.' },
  { q: 'Will I continue to be monitored after treatment?', a: 'Some studies include follow-up visits or calls.' },
  { q: 'Will my data be kept private?', a: 'Yes, your information is handled confidentially.' },
  { q: 'Can I switch studies later?', a: 'Possibly, depending on your condition and options.' },
  { q: 'Will this affect my future treatments?', a: 'Your doctor will consider this in your care plan.' },
  { q: 'What if I change my mind?', a: 'You can withdraw at any time.' },
  { q: 'Will I receive results from the study?', a: 'Sometimes results are shared, but not always immediately.' },
  { q: 'What is a sponsor?', a: 'The sponsor is the organization running the study.' },
  { q: 'Who is the research team?', a: 'Doctors, nurses, and coordinators manage the study.' },
  { q: 'What is safety monitoring?', a: 'Safety monitoring means ongoing checks to ensure patient safety during the study.' },
  { q: 'What are labs monitoring?', a: 'They help track your body’s response to treatment and watch for side effects.' },
  { q: 'Will I feel different during the study?', a: 'Possibly. Always report any changes to your team.' },
  { q: 'How do I prepare for visits?', a: 'Follow the instructions given by your team.' },
  { q: 'Can I ask questions anytime?', a: 'Yes. Communication is encouraged.' },
  { q: 'Who should I contact after hours?', a: 'Ask your team for the after-hours contact process before you need it.' }
];

const demoEnhancedStudy = {
  ok: true,
  NCTId: DEMO_NCT,
  title: 'A Study of Aurora-01 in Patients With Relapsed Leukemia',
  condition: 'Relapsed Acute Leukemia',
  phase: 'PHASE 2',
  status: 'ACTIVE',
  sponsor: 'My Trial Journey Biotech',
  summary:
    'This study is evaluating Aurora-01 in patients with relapsed leukemia. The goal is to better understand how this treatment works, how safe it is, and how patients respond over time.',
  participation:
    'Participation may involve screening tests, clinic visits, blood tests, treatment visits, and close monitoring for side effects. Your research team will explain your exact schedule and instructions.',
  treatment:
    'Aurora-01 investigational drug',
  howGiven:
    'Intravenous infusion during scheduled study visits',
  questionsToAskTeam: [
    'How often are visits expected during the first cycle?',
    'What symptoms should I report right away?',
    'Will I need extra labs or scans during treatment?',
    'Who should I call if I feel unwell after hours?'
  ],
  disclaimer:
    'This app is for educational purposes only and does not replace medical advice. Always follow instructions from your care team.',
  todayMessage:
    'Review your upcoming visits, note any symptoms, and bring your questions to the study team.',
  questions: [...patientQuestions],
  visits: [
    {
      code: 'SCR',
      shortLabel: 'Screening',
      title: 'Screening Visit',
      subtitle: 'Eligibility and baseline assessments',
      timeEstimate: '3–5 hrs',
      marker: 'SCR',
      expect:
        'This visit may include blood work, a physical exam, and baseline tests to confirm that the study is a good fit.',
      tip:
        'Bring your medication list and be ready to review your medical history.',
      procedures: [
        { icon: '🧪', title: 'Blood tests', note: 'Routine and study-required labs may be collected.' },
        { icon: '🩺', title: 'Physical exam', note: 'Your research team may review your current health status.' },
        { icon: '📝', title: 'Eligibility review', note: 'The team confirms study requirements and next steps.' }
      ]
    },
    {
      code: 'C1D1',
      shortLabel: 'C1D1',
      title: 'Cycle 1 Day 1',
      subtitle: 'First treatment visit',
      timeEstimate: 'Most of day',
      marker: '1.1',
      expect:
        'Your first treatment visit may be longer because it can include labs, treatment, and monitoring after infusion.',
      tip:
        'Plan extra time and ask your team if there are any special instructions before treatment.',
      procedures: [
        { icon: '💉', title: 'Study drug infusion', note: 'Aurora-01 may be given during this visit.' },
        { icon: '🧪', title: 'Pre-treatment labs', note: 'Labs may be checked before treatment begins.' },
        { icon: '👀', title: 'Observation', note: 'You may be monitored after treatment for safety.' }
      ]
    },
    {
      code: 'C1D8',
      shortLabel: 'C1D8',
      title: 'Cycle 1 Day 8',
      subtitle: 'Early follow-up visit',
      timeEstimate: '2–4 hrs',
      marker: '1.8',
      expect:
        'This visit may focus on safety, symptom review, and lab monitoring after the first treatment.',
      tip:
        'Write down any side effects or questions since your last visit.',
      procedures: [
        { icon: '🧪', title: 'Blood tests', note: 'Lab work may help monitor how you are doing on study.' },
        { icon: '💬', title: 'Symptom review', note: 'The team may ask about any side effects or changes.' }
      ]
    },
    {
      code: 'C1D15',
      shortLabel: 'C1D15',
      title: 'Cycle 1 Day 15',
      subtitle: 'Ongoing treatment follow-up',
      timeEstimate: '2–4 hrs',
      marker: '1.15',
      expect:
        'Ongoing monitoring and additional study procedures may happen depending on how you are doing.',
      tip:
        'Tell the team about any new medications, ER visits, or symptoms.',
      procedures: [
        { icon: '🧪', title: 'Labs', note: 'Routine study labs may be repeated.' },
        { icon: '🩺', title: 'Clinical review', note: 'The team checks your overall status and study progress.' }
      ]
    },
    {
      code: 'C2D1',
      shortLabel: 'C2D1',
      title: 'Cycle 2 Day 1',
      subtitle: 'Next cycle treatment visit',
      timeEstimate: '2–5 hrs',
      marker: '2.1',
      expect:
        'This visit may include another treatment day, labs, and ongoing safety monitoring.',
      tip:
        'Confirm the schedule with your team and bring any new questions.',
      procedures: [
        { icon: '💉', title: 'Study treatment', note: 'Treatment may continue according to the study schedule.' },
        { icon: '🧪', title: 'Blood tests', note: 'Labs may be checked before and/or after treatment.' },
        { icon: '📝', title: 'Study review', note: 'Medications and side effects may be reviewed.' }
      ]
    }
  ],
  journeySteps: [
    { title: 'Screening', subtitle: 'Before treatment starts', state: 'complete' },
    { title: 'Treatment', subtitle: 'Visit-by-visit journey', state: 'current' },
    { title: 'Follow-up', subtitle: 'After treatment ends', state: 'upcoming' }
  ]
};

const state = {
  user: { firstName: '', nct: '' },
  study: null,
  enhanced: false,
  selectedVisitCode: null
};

function setPrimaryButtonText() {
  const continueBtn = document.getElementById('continueBtn');
  if (continueBtn) continueBtn.textContent = 'START MY JOURNEY';
}

function hideInternalModeIndicators() {
  if (modePill) modePill.style.display = 'none';
  const experienceBadge = document.getElementById('experienceBadge');
  if (experienceBadge) experienceBadge.style.display = 'none';
}

function improveJourneyLayout() {
  const screenJourney = document.getElementById('screen-journey');
  const visitCard = document.getElementById('visitDetailsCard');
  const ribbonWrap = document.getElementById('visitRibbon')?.closest('.stack');
  const sectionHeader = screenJourney?.querySelector('.section-header');
  const journeySubnav = screenJourney?.querySelector('.journey-subnav');

  if (journeySubnav) {
    const calendarShortcut = journeySubnav.querySelector('[data-target="calendar"]');
    if (calendarShortcut) calendarShortcut.style.display = 'none';
  }

  if (screenJourney && sectionHeader && ribbonWrap && visitCard) {
    sectionHeader.insertAdjacentElement('afterend', ribbonWrap);
    ribbonWrap.insertAdjacentElement('afterend', visitCard);
  }
}

function relabelJourneyCards() {
  const summaryLabel = document.getElementById('trialSummary')?.closest('.card')?.querySelector('.mini-label');
  const participationLabel = document.getElementById('trialWhyItMatters')?.closest('.card')?.querySelector('.mini-label');
  const treatmentLabel = document.getElementById('trialTreatment')?.closest('.card')?.querySelector('.mini-label');
  const disclaimerLabel = document.getElementById('trialDisclaimer')?.closest('.card')?.querySelector('.mini-label');

  if (summaryLabel) summaryLabel.textContent = 'About this study';
  if (participationLabel) participationLabel.textContent = 'What participation may involve';
  if (treatmentLabel) treatmentLabel.textContent = 'Treatment being studied';
  if (disclaimerLabel) disclaimerLabel.textContent = 'Questions to ask your team';
}

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
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

    renderAll();
    showMainScreen('home');
  } catch (err) {
    console.error('Could not load saved state:', err);
  }
}

function toSentenceCase(value) {
  if (!value || typeof value !== 'string') return 'N/A';
  const normalized = value.replaceAll('_', ' ').toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function cleanSummary(text) {
  if (!text || typeof text !== 'string') {
    return 'This study is evaluating a treatment for your condition.';
  }

  return text
    .replace(/\s+/g, ' ')
    .replace(/This study was loaded from ClinicalTrials\.gov.*$/i, '')
    .trim();
}

function getBasicStudyModel(apiData) {
  return {
    NCTId: apiData.NCTId,
    title: apiData.title,
    condition: apiData.condition || 'N/A',
    phase: apiData.phase || 'N/A',
    status: apiData.status || 'N/A',
    sponsor: apiData.sponsor || 'ClinicalTrials.gov',
    summary: cleanSummary(apiData.summary),
    participation:
      'Participation may involve clinic visits, blood tests, treatment visits, and monitoring for side effects. Your research team will explain your exact schedule and instructions.',
    treatment: apiData.intervention || 'Investigational treatment under study',
    howGiven: 'Ask your team how the study treatment is given and how often visits are expected.',
    questionsToAskTeam: [
      'How often will I need to come to the clinic?',
      'What side effects should I report immediately?',
      'Will I need additional tests or scans?',
      'Who should I contact if I feel unwell after hours?'
    ],
    disclaimer:
      'This app is for educational purposes only and does not replace medical advice. Always follow instructions from your care team.',
    todayMessage:
      'Review the study overview, write down your questions, and confirm details with your research team.',
    questions: [...patientQuestions],
    visits: [
      {
        code: 'OVERVIEW',
        shortLabel: 'Overview',
        title: 'General Study View',
        subtitle: 'High-level study information',
        timeEstimate: 'Varies',
        marker: 'GEN',
        expect:
          'Your exact visit schedule depends on the study and on your care team’s instructions.',
        tip:
          'Ask your team about visit timing, required labs, and who to contact with symptoms.',
        procedures: [
          { icon: '📘', title: 'Study overview', note: 'Public study details such as title, sponsor, condition, and phase.' },
          { icon: '🧪', title: 'Possible monitoring', note: 'Participation may involve labs, clinic visits, scans, or treatment visits.' },
          { icon: '💬', title: 'Questions for your team', note: 'Use this app to prepare questions for your care team.' }
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
  const homeMetaLine = document.getElementById('homeMetaLine');
  const progressSnapshot = document.getElementById('progressSnapshot');

  if (welcomeTitle) welcomeTitle.textContent = `Hello, ${state.user.firstName}`;
  if (welcomeSubtitle) welcomeSubtitle.textContent = `You are viewing ${state.study.NCTId}.`;
  if (studyTitleHome) studyTitleHome.textContent = state.study.title;
  if (studyMetaHome) {
    studyMetaHome.textContent =
      `${toSentenceCase(state.study.phase)} • ${state.study.condition} • ${state.study.sponsor}`;
  }
  if (studyNctChip) studyNctChip.textContent = state.study.NCTId;
  if (todayMessage) todayMessage.textContent = state.study.todayMessage || '';

  if (homeMetaLine) {
    homeMetaLine.innerHTML = '';
    [toSentenceCase(state.study.phase), state.study.condition, toSentenceCase(state.study.status)].forEach(value => {
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

function formatQuestionList(list) {
  if (!Array.isArray(list) || !list.length) return '—';
  return list.map(item => `• ${item}`).join('<br>');
}

function renderJourney() {
  if (!state.study) return;

  relabelJourneyCards();

  const trialAppTitle = document.getElementById('trialAppTitle');
  const trialSummary = document.getElementById('trialSummary');
  const trialWhyItMatters = document.getElementById('trialWhyItMatters');
  const trialTreatment = document.getElementById('trialTreatment');
  const trialHowGiven = document.getElementById('trialHowGiven');
  const trialDisclaimer = document.getElementById('trialDisclaimer');
  const journeyOverviewPill = document.getElementById('journeyOverviewPill');

  if (trialAppTitle) trialAppTitle.textContent = state.study.title;
  if (trialSummary) trialSummary.textContent = state.study.summary || '—';
  if (trialWhyItMatters) trialWhyItMatters.textContent = state.study.participation || '—';
  if (trialTreatment) trialTreatment.textContent = state.study.treatment || '—';
  if (trialHowGiven) trialHowGiven.textContent = state.study.howGiven || '—';
  if (trialDisclaimer) {
    trialDisclaimer.innerHTML = formatQuestionList(state.study.questionsToAskTeam || []);
  }
  if (journeyOverviewPill) {
    journeyOverviewPill.textContent = `${toSentenceCase(state.study.phase)} • ${state.study.sponsor}`;
  }

  renderVisitRibbonAndDetails();
}

function renderVisitRibbonAndDetails() {
  const ribbon = document.getElementById('visitRibbon');
  const visitDetailsCard = document.getElementById('visitDetailsCard');
  const basicJourneyNote = document.getElementById('basicJourneyNote');

  if (!ribbon || !visitDetailsCard) return;

  const visits = state.study.visits || [];
  if (!state.selectedVisitCode && visits.length) {
    state.selectedVisitCode = visits[0].code;
  }

  if (!state.enhanced) {
    ribbon.innerHTML = '';
    visitDetailsCard.style.display = 'none';

    if (basicJourneyNote) {
      basicJourneyNote.style.display = 'block';
      basicJourneyNote.textContent =
        'Your exact visit schedule will be explained by your research team. In many studies, participation may include screening tests, clinic visits, blood tests, treatment visits, and safety monitoring.';
    }
    return;
  }

  visitDetailsCard.style.display = 'grid';
  if (basicJourneyNote) basicJourneyNote.style.display = 'none';

  ribbon.innerHTML = '';

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
    moreExperienceText.textContent =
      'This app is designed to help you understand your study and stay informed during your participation.';
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
    alert('Invalid NCT format. Use NCT######## or NCTDEMO0001.');
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
      console.error('Backend error:', data);
      alert(`Backend error: ${data.error || 'Unknown error'}`);
      return;
    }

    state.enhanced = false;
    state.study = getBasicStudyModel(data);
    state.selectedVisitCode = state.study.visits?.[0]?.code || null;

    renderAll();
    saveState();
    showMainScreen('home');
  } catch (e) {
    console.error('Frontend fetch error:', e);
    alert(`Frontend error: ${e.message}`);
  }
}

function unlockDemoStudy() {
  const code = document.getElementById('siteCode')?.value?.trim().toUpperCase();

  if (state.user.nct === DEMO_NCT && code === DEMO_CODE) {
    state.enhanced = true;
    state.study = { ...demoEnhancedStudy };
    state.selectedVisitCode = state.study.visits?.[0]?.code || null;

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
if (continueBtn) continueBtn.addEventListener('click', loadStudy);

const unlockBtn = document.getElementById('unlockBtn');
if (unlockBtn) unlockBtn.addEventListener('click', unlockDemoStudy);

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

window.addEventListener('load', () => {
  setPrimaryButtonText();
  hideInternalModeIndicators();
  improveJourneyLayout();
  relabelJourneyCards();
  loadSavedState();

  setTimeout(() => {
    if (!state.study) showScreen('entry');
  }, 1000);
});
