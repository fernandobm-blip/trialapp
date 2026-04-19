const screens = {
  splash: document.getElementById('screen-splash'),
  entry: document.getElementById('screen-entry'),
  code: document.getElementById('screen-code'),
  home: document.getElementById('screen-home'),
  trial: document.getElementById('screen-trial'),
  journey: document.getElementById('screen-journey'),
  overview: document.getElementById('screen-overview'),
  adverseEvents: document.getElementById('screen-adverse-events'),
  calendar: document.getElementById('screen-calendar'),
  questions: document.getElementById('screen-questions'),
  more: document.getElementById('screen-more')
};

const bottomNav = document.getElementById('bottomNav');

const DEMO_NCT = 'NCTDEMO0001';
const DEMO_CODE = 'DEMO001';

// ============================
// SUPABASE CONFIG
// REPLACE THESE 2 VALUES
// ============================
const SUPABASE_URL = 'https://sppdotfmxasfveigxudu.supabase.co/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcGRvdGZteGFzZnZlaWd4dWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NTMxODUsImV4cCI6MjA5MjEyOTE4NX0.GYpXyTox02pgJvRrEN16WIg8E2XMuECdWMdkEf-s_4U';

const QUESTION_BANK = {
  "Understanding clinical trials": [
    { q: "What is a clinical trial?", a: "A clinical trial is a research study that tests new treatments or new ways of using existing treatments." },
    { q: "Why am I being offered a clinical trial?", a: "Your doctor believes this study may be an option for your condition based on your medical history and current treatment plan." },
    { q: "What is the goal of a clinical trial?", a: "The goal is usually to understand safety, effectiveness, or both." },
    { q: "Is the treatment in a clinical trial always new?", a: "Not always. Some trials study new drugs, while others study new combinations, schedules, or ways of using existing treatments." },
    { q: "Does joining a trial mean standard treatment has failed?", a: "Not necessarily. Some studies are offered early, while others are offered later. Your doctor can explain why this study is being considered now." },
    { q: "Who runs a clinical trial?", a: "A sponsor supports the study, and a research team at your treatment center carries it out." },
    { q: "Will I definitely benefit from joining?", a: "Clinical trials are research studies, so direct benefit is not guaranteed." },
    { q: "Is a clinical trial the same as an experiment?", a: "Clinical trials are carefully designed research studies with rules, oversight, and patient protections." },
    { q: "How is safety monitored in a study?", a: "Your health is monitored through visits, tests, symptom review, and reporting requirements throughout the study." },
    { q: "Can I ask questions before deciding?", a: "Yes. You should ask as many questions as you need before deciding whether to participate." },
    { q: "What is informed consent?", a: "It is the process of reviewing the study with your team and signing a document that explains the purpose, risks, and procedures." },
    { q: "Do I get a copy of the consent form?", a: "Yes, you should receive a copy of the consent form for your records." },
    { q: "Can I take time to think before signing?", a: "Yes. You can take time to review the study and discuss it with your family or care team." },
    { q: "Can I leave a clinical trial later?", a: "Yes. Participation is voluntary and you can withdraw at any time." },
    { q: "Will my regular doctor still be involved?", a: "Usually yes, along with the research team." }
  ],

  "Joining a study": [
    { q: "What happens during screening?", a: "Screening determines whether the study is a good fit for you based on eligibility criteria." },
    { q: "What kinds of tests happen during screening?", a: "Screening may include blood tests, exams, scans, biopsies, or other assessments depending on the study." },
    { q: "Does screening mean I am definitely enrolled?", a: "No. Screening checks whether you meet the study requirements. Enrollment happens only after eligibility is confirmed." },
    { q: "How long does screening take?", a: "The timing varies by study. Your team will explain the expected timeline." },
    { q: "Can I fail screening?", a: "Yes. Sometimes a study is not the right fit after testing or review." },
    { q: "Why are there so many eligibility rules?", a: "Eligibility criteria help protect patients and make sure the study answers the right scientific questions." },
    { q: "Can I join if I am already on treatment?", a: "It depends on the study. Some trials allow prior treatment and some do not." },
    { q: "Can medications affect eligibility?", a: "Yes. Some medications may need to be adjusted or reviewed during screening." },
    { q: "Can recent procedures affect eligibility?", a: "Yes. Prior surgery, radiation, biopsy timing, or other treatments may matter." },
    { q: "Can I still ask questions after I sign consent?", a: "Yes. You can ask questions at any time during the study." },
    { q: "Who can explain the eligibility decision to me?", a: "Your study doctor or research coordinator can explain why you were or were not eligible." },
    { q: "What if I am not eligible?", a: "Your doctor may discuss other treatment options or other studies." },
    { q: "Can eligibility change over time?", a: "Sometimes yes. In some cases, a study may become an option later depending on your situation." },
    { q: "Will I know what tests are required before screening starts?", a: "Your team should explain the screening plan before the process begins." },
    { q: "Can I bring someone with me to screening visits?", a: "In many cases yes, but you should confirm any visitor rules with your clinic." }
  ],

  "Study visits and tests": [
    { q: "What is a study visit?", a: "A study visit is a visit where research-related procedures are done." },
    { q: "What is a cycle?", a: "A cycle is a repeating period of treatment." },
    { q: "How often will I need to come to the clinic?", a: "Visit frequency varies by study. Your team will provide your exact schedule." },
    { q: "How long does each visit take?", a: "Some visits are short, while others may take several hours depending on procedures." },
    { q: "Will every visit be the same?", a: "No. Some visits are longer or include different procedures than others." },
    { q: "Will I need blood tests?", a: "Most studies include blood tests to monitor your health and the effects of treatment." },
    { q: "Will I need scans or imaging?", a: "Some studies require scans to monitor disease response." },
    { q: "Will I need biopsies?", a: "Some studies include biopsies, but not all. Ask your team whether they are required in your case." },
    { q: "What if I miss a visit?", a: "Contact your team as soon as possible so they can advise you on next steps." },
    { q: "Will I get a calendar or schedule?", a: "Your care team will usually provide a schedule or explain your upcoming visits." },
    { q: "Can visit times change?", a: "Yes. Some study visits must happen within certain windows, while others are more flexible." },
    { q: "Do I need to fast before visits?", a: "Some visits may require fasting. Your team will tell you ahead of time." },
    { q: "Will I need extra monitoring after treatment?", a: "Some visits include observation after treatment for safety." },
    { q: "Can I ask what each visit includes before I come?", a: "Yes. Your team can explain what to expect before a scheduled visit." },
    { q: "What should I bring to study visits?", a: "Bring your medication list, questions, symptom updates, and anything your team specifically requested." }
  ],

  "Treatment basics": [
    { q: "Is the treatment approved?", a: "Not always. Many clinical trials study investigational treatments that are not yet approved." },
    { q: "Will I definitely receive treatment?", a: "It depends. Some studies include different groups or treatment arms." },
    { q: "Will I receive the same treatment every visit?", a: "Not always. Some visits are different." },
    { q: "How is treatment given?", a: "Treatment may be given by infusion, injection, pills, or another method depending on the study." },
    { q: "Can I continue my current medications?", a: "Some medications may need to be adjusted. Always check with your team." },
    { q: "Will treatment visits take longer?", a: "Often yes. Treatment visits may include labs, exams, treatment, and observation." },
    { q: "Can treatment be delayed?", a: "Sometimes treatment may be delayed for safety reasons or if lab results need review." },
    { q: "What happens if I cannot tolerate treatment?", a: "Your doctor may hold treatment, adjust the plan, or discuss other options." },
    { q: "Can I ask what the treatment is meant to do?", a: "Yes. Your team can explain the purpose of the treatment and what the study is evaluating." },
    { q: "Will the treatment cure my disease?", a: "Clinical trials are research studies, and direct benefit is not guaranteed." },
    { q: "What if the treatment does not work?", a: "Your doctor will discuss other options if the study treatment is not effective." },
    { q: "Will I know what treatment arm I am in?", a: "That depends on the study design. Your team can explain how your study works." },
    { q: "Can treatment stop before the study ends?", a: "Yes. Treatment may stop for several reasons, including side effects, disease progression, or study rules." },
    { q: "Will the team review my medications during treatment?", a: "Yes. Medication review is usually part of ongoing safety monitoring." },
    { q: "Can I ask for the treatment schedule in advance?", a: "Yes. Your team should explain the expected treatment schedule." }
  ],

  "Safety and side effects": [
    { q: "What side effects should I expect?", a: "Side effects vary depending on the treatment. Your team will explain what to watch for." },
    { q: "What side effects are urgent?", a: "Your care team will tell you which symptoms should be reported immediately." },
    { q: "Who do I call if I feel unwell?", a: "You should contact your study team or treating physician." },
    { q: "Who should I contact after hours?", a: "Ask your team for the after-hours contact process before you need it." },
    { q: "Will I be monitored closely?", a: "Yes. Clinical trials often include close monitoring for safety." },
    { q: "What is safety monitoring?", a: "Safety monitoring means ongoing checks to ensure patient safety during the study." },
    { q: "What are labs monitoring?", a: "They help track your body’s response to treatment and watch for side effects." },
    { q: "Will I feel different during the study?", a: "Possibly. Always report any changes to your team." },
    { q: "What symptoms should I write down?", a: "Any new or worsening symptoms, even if they seem minor, are worth noting and discussing with your team." },
    { q: "Can side effects happen between visits?", a: "Yes. That is why it is important to know how to contact your team." },
    { q: "Should I wait until the next visit to report symptoms?", a: "No. If symptoms are urgent or concerning, contact your care team right away." },
    { q: "Can lab results change how treatment is given?", a: "Yes. Lab values may affect treatment timing or safety decisions." },
    { q: "Will every symptom be caused by the study treatment?", a: "Not always. Your team will help determine what may be related." },
    { q: "Can side effects improve after treatment is held?", a: "Sometimes yes. Your doctor will guide the safest next steps." },
    { q: "What if I am unsure whether something matters?", a: "When in doubt, contact your team and ask." }
  ],

  "Costs and insurance": [
    { q: "Do I have to pay for anything?", a: "Some costs may be covered by the study. Ask your team about details." },
    { q: "Will insurance be involved?", a: "Standard care is often billed to insurance, while study-specific procedures may be covered by the sponsor." },
    { q: "Are study drugs always paid for by the sponsor?", a: "It depends on the study. Your team can explain what is covered." },
    { q: "Can travel costs be covered?", a: "Some studies provide support for travel or related expenses, but not all do." },
    { q: "Who can explain coverage to me?", a: "Your research team or financial support staff can help explain how billing works." },
    { q: "Are blood tests always paid for by the study?", a: "Not always. Some labs may be part of standard care, while others are study-specific." },
    { q: "Can insurance deny something related to the study?", a: "It depends on the situation. Your team can help explain what is billed and why." },
    { q: "Will I know what is covered before I start?", a: "Your team should explain the billing framework before you begin." },
    { q: "Can I ask for help understanding costs?", a: "Yes. You should ask if anything about coverage or billing is unclear." },
    { q: "Does joining a trial always save money?", a: "Not necessarily. Coverage varies by study and by what counts as standard care." },
    { q: "What if I receive a bill I do not understand?", a: "Contact your care team or the billing support contact listed by your institution." },
    { q: "Can I still join if I have insurance concerns?", a: "Possibly. Discuss concerns early so your team can help clarify what applies." },
    { q: "Are scans always covered the same way?", a: "No. It depends on whether they are part of standard care or required specifically for the study." },
    { q: "Can I ask these questions before consent?", a: "Yes. Financial questions are important to discuss before starting." },
    { q: "Will this affect my usual insurance coverage?", a: "Your team can explain how study participation fits with your regular care coverage." }
  ],

  "Daily life during a study": [
    { q: "Can I travel during the study?", a: "You should discuss travel plans with your research team." },
    { q: "Can I continue my normal activities?", a: "Often yes, but this depends on your health, treatment, and study requirements." },
    { q: "Will I need someone to drive me?", a: "Some treatments may require assistance. Ask your team." },
    { q: "Can I eat before visits?", a: "Some visits require fasting. Your team will tell you." },
    { q: "What should I bring to visits?", a: "Bring your medication list, questions, and any symptom updates." },
    { q: "Should I track symptoms at home?", a: "Yes. Writing symptoms down can make it easier to discuss them with your team." },
    { q: "Can I work during the study?", a: "Some people can, but it depends on how they feel and on the visit schedule." },
    { q: "Can I exercise during the study?", a: "Ask your doctor what is safe for your specific situation." },
    { q: "Can I take vitamins or supplements?", a: "Always ask your care team before starting anything new." },
    { q: "Should I tell the study team about ER visits or hospital stays?", a: "Yes. It is important to report significant medical events." },
    { q: "Can I still see my other doctors?", a: "Usually yes, but your study team should know about outside care." },
    { q: "Can family come with me?", a: "Often yes, but ask about current clinic visitor rules." },
    { q: "Should I keep a list of questions for each visit?", a: "Yes. That can help you feel more prepared and make visits more productive." },
    { q: "Can I drink water before visits?", a: "Usually yes unless your team gives different instructions." },
    { q: "What is the best way to prepare for treatment days?", a: "Confirm instructions ahead of time, bring what you need, and ask questions if anything is unclear." }
  ],

  "After the study": [
    { q: "What happens after the study ends?", a: "You may enter follow-up or return to standard care." },
    { q: "Will I continue to be monitored after treatment?", a: "Some studies include follow-up visits or calls." },
    { q: "Will I receive results from the study?", a: "Sometimes results are shared, but not always immediately." },
    { q: "Can I switch to another study later?", a: "Possibly, depending on your condition and available options." },
    { q: "Will this affect future treatments?", a: "Your doctor will consider this in your care plan." },
    { q: "What if I change my mind before the study ends?", a: "You can withdraw at any time." },
    { q: "Will my records stay private after the study?", a: "Yes. Privacy protections continue after study participation ends." },
    { q: "Can my doctor still use what was learned during the study?", a: "Your doctor may use the information gathered during participation to guide care decisions." },
    { q: "Will I still be able to ask questions after treatment stops?", a: "You should still know how to contact your team for follow-up needs." },
    { q: "What is long-term follow-up?", a: "Some studies continue collecting information after treatment ends to better understand long-term outcomes." },
    { q: "Can side effects happen after treatment stops?", a: "Sometimes yes, which is why follow-up can matter." },
    { q: "Will I always stay on study treatment until the end?", a: "Not always. Treatment may stop before follow-up ends." },
    { q: "Can I return to regular care after a study?", a: "Yes. Your doctor will explain the next step in your care plan." },
    { q: "Will the study team tell me when I am officially off study?", a: "Yes, they should explain when treatment or participation ends." },
    { q: "Can I ask for a summary of my study participation?", a: "You can ask your team what information they can provide." }
  ]
};

const patientQuestions = Object.values(QUESTION_BANK).flat();

const demoEnhancedStudy = {
  ok: true,
  NCTId: DEMO_NCT,
  title: 'A Study of Aurora-01 in Patients With Relapsed Leukemia',
  condition: 'Relapsed Acute Leukemia',
  phase: 'PHASE 2',
  status: 'ACTIVE',
  sponsor: 'NUR Health',
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
  helpfulTips: [
    'Bring your medication list to each visit.',
    'Write down new symptoms as soon as you notice them.',
    'Confirm your next appointment before leaving the clinic.',
    'Bring water, snacks, and anything your may need if the visit is long.',
    'Ask the team who to contact after hours before you need it.',
    'Tell the team about new medications, supplements, or urgent care visits.',
    'Use one notebook or app note for questions between visits.',
    'Arrive a little early on treatment days in case labs or check-in take longer.'
  ],
  adverseEvents: [
    { key: 'fatigue', label: 'Fatigue', note: 'Feeling more tired than usual.' },
    { key: 'nausea', label: 'Nausea', note: 'Upset stomach or feeling like you may vomit.' },
    { key: 'vomiting', label: 'Vomiting', note: 'Throwing up after treatment or between visits.' },
    { key: 'diarrhea', label: 'Diarrhea', note: 'Loose or frequent stools.' },
    { key: 'constipation', label: 'Constipation', note: 'Difficulty having a bowel movement.' },
    { key: 'fever', label: 'Fever', note: 'Feeling hot, chills, or a measured fever.' },
    { key: 'headache', label: 'Headache', note: 'New or worsening head pain.' },
    { key: 'rash', label: 'Rash', note: 'New skin irritation, redness, or itching.' },
    { key: 'pain', label: 'Pain', note: 'New or worsening pain anywhere in the body.' },
    { key: 'shortness_of_breath', label: 'Shortness of breath', note: 'Trouble breathing or feeling winded.' },
    { key: 'dizziness', label: 'Dizziness', note: 'Feeling lightheaded or unsteady.' },
    { key: 'loss_of_appetite', label: 'Loss of appetite', note: 'Eating less than usual because food is less appealing.' }
  ],
  visits: [
    {
      code: 'SCR',
      shortLabel: 'Screening',
      title: 'Screening Visit',
      subtitle: 'Eligibility and baseline assessments',
      timeEstimate: '3–5 hrs',
      marker: 'SCR',
      expect:
        'This visit may include tests to confirm that the study is a good fit and to establish your baseline before treatment starts.',
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
        { icon: '🧪', title: 'Blood tests', note: 'Labs may be checked before treatment begins.' },
        { icon: '🩺', title: 'Physical exam / review', note: 'The team may review symptoms, medications, and how you are feeling.' },
        { icon: '💉', title: 'Study treatment', note: 'Aurora-01 may be given during this visit.' },
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
        { icon: '🩺', title: 'Physical exam / review', note: 'The team may review side effects, medications, and changes since the last visit.' },
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
        { icon: '🧪', title: 'Blood tests', note: 'Routine study labs may be repeated.' },
        { icon: '🩺', title: 'Physical exam / review', note: 'The team checks your overall status and study progress.' },
        { icon: '📝', title: 'Study review', note: 'The visit may include medication and symptom review.' }
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
        { icon: '🧪', title: 'Blood tests', note: 'Labs may be checked before and/or after treatment.' },
        { icon: '🩺', title: 'Physical exam / review', note: 'The team reviews how you are doing before continuing treatment.' },
        { icon: '💉', title: 'Study treatment', note: 'Treatment may continue according to the study schedule.' },
        { icon: '📝', title: 'Study review', note: 'Medications and side effects may be reviewed.' }
      ]
    }
  ]
};

const state = {
  user: { firstName: '', nct: '' },
  study: null,
  enhanced: false,
  selectedVisitCode: null
};

// ============================
// SUPABASE HELPERS
// ============================

function hasSupabaseConfig() {
  return (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes('YOUR_PROJECT_ID') &&
    !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')
  );
}

async function supabaseSelect(table, params) {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase is not configured yet.');
  }

  const search = new URLSearchParams(params);
  const url = `${SUPABASE_URL}/rest/v1/${table}?${search.toString()}`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: 'application/json'
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase error ${res.status}: ${text}`);
  }

  return res.json();
}

async function checkIfEnhanced(nct) {
  if (!hasSupabaseConfig()) {
    return { isEnhanced: false };
  }

  try {
    const rows = await supabaseSelect('studies', {
      nct: `eq.${nct}`,
      select: 'nct,enhanced,active'
    });

    if (!rows.length) return { isEnhanced: false };

    const row = rows[0];
    return {
      isEnhanced: row.enhanced === true && row.active === true
    };
  } catch (err) {
    console.error('checkIfEnhanced error:', err);
    return { isEnhanced: false };
  }
}

async function validateAccessCode(nct, code) {
  if (!hasSupabaseConfig()) {
    return false;
  }

  try {
    const rows = await supabaseSelect('access_codes', {
      nct: `eq.${nct}`,
      code: `eq.${code}`,
      active: 'eq.true',
      select: 'id'
    });

    return rows.length > 0;
  } catch (err) {
    console.error('validateAccessCode error:', err);
    return false;
  }
}

async function fetchEnhancedStudyContent(nct) {
  if (!hasSupabaseConfig()) {
    return null;
  }

  try {
    const rows = await supabaseSelect('study_content', {
      nct: `eq.${nct}`,
      select: '*'
    });

    if (!rows.length) return null;

    return rows[0];
  } catch (err) {
    console.error('fetchEnhancedStudyContent error:', err);
    return null;
  }
}

function normalizeArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

function buildEnhancedStudyModel(baseStudy, contentRow) {
  if (!contentRow) {
    return {
      ...demoEnhancedStudy,
      NCTId: baseStudy?.NCTId || demoEnhancedStudy.NCTId,
      title: baseStudy?.title || demoEnhancedStudy.title,
      condition: baseStudy?.condition || demoEnhancedStudy.condition,
      phase: baseStudy?.phase || demoEnhancedStudy.phase,
      status: baseStudy?.status || demoEnhancedStudy.status,
      sponsor: baseStudy?.sponsor || demoEnhancedStudy.sponsor,
      summary: baseStudy?.summary || demoEnhancedStudy.summary
    };
  }

  return {
    ok: true,
    NCTId: baseStudy?.NCTId || contentRow.nct || demoEnhancedStudy.NCTId,
    title: contentRow.title || baseStudy?.title || demoEnhancedStudy.title,
    condition: contentRow.condition || baseStudy?.condition || demoEnhancedStudy.condition,
    phase: contentRow.phase || baseStudy?.phase || demoEnhancedStudy.phase,
    status: contentRow.status || baseStudy?.status || demoEnhancedStudy.status,
    sponsor: contentRow.sponsor || baseStudy?.sponsor || demoEnhancedStudy.sponsor,
    summary: contentRow.summary || baseStudy?.summary || demoEnhancedStudy.summary,
    participation: contentRow.participation || baseStudy?.participation || demoEnhancedStudy.participation,
    treatment: contentRow.treatment || baseStudy?.treatment || demoEnhancedStudy.treatment,
    howGiven: contentRow.how_given || baseStudy?.howGiven || demoEnhancedStudy.howGiven,
    questionsToAskTeam: normalizeArray(contentRow.questions_to_ask_team, demoEnhancedStudy.questionsToAskTeam),
    disclaimer: contentRow.disclaimer || baseStudy?.disclaimer || demoEnhancedStudy.disclaimer,
    todayMessage: contentRow.today_message || demoEnhancedStudy.todayMessage,
    questions: normalizeArray(contentRow.questions, patientQuestions),
    helpfulTips: normalizeArray(contentRow.helpful_tips, demoEnhancedStudy.helpfulTips),
    adverseEvents: normalizeArray(contentRow.adverse_events, demoEnhancedStudy.adverseEvents),
    visits: normalizeArray(contentRow.visits, demoEnhancedStudy.visits)
  };
}

// ============================
// CALENDAR GLOBAL BRIDGE
// ============================

function loadCalendarEvents() {
  try {
    return JSON.parse(localStorage.getItem('mtj_calendar_events') || '[]');
  } catch (err) {
    console.error('Could not load calendar events:', err);
    return [];
  }
}

let mtjCalendarEvents = loadCalendarEvents();

function saveCalendarEvents() {
  localStorage.setItem('mtj_calendar_events', JSON.stringify(mtjCalendarEvents));
}

window.registerCalendarEvent = function(event) {
  if (!event || !event.id) return;

  const existingIndex = mtjCalendarEvents.findIndex(e => e.id === event.id);

  if (existingIndex >= 0) {
    mtjCalendarEvents[existingIndex] = event;
  } else {
    mtjCalendarEvents.push(event);
  }

  saveCalendarEvents();

  window.dispatchEvent(new CustomEvent('mtj:calendar-event-saved', {
    detail: event
  }));

  console.log('📅 Calendar event saved:', event);
};

window.deleteCalendarEvent = function(eventId) {
  if (!eventId) return;

  mtjCalendarEvents = mtjCalendarEvents.filter(e => e.id !== eventId);
  saveCalendarEvents();

  window.dispatchEvent(new CustomEvent('mtj:calendar-event-deleted', {
    detail: { id: eventId }
  }));

  console.log('🗑️ Calendar event deleted:', eventId);
};

window.getMTJCalendarEvents = function() {
  return [...mtjCalendarEvents];
};

window.getMTJAppState = function() {
  return { ...state };
};

function showScreen(name) {
  Object.values(screens).forEach(screen => {
    if (screen) screen.classList.remove('active');
  });
  if (screens[name]) screens[name].classList.add('active');

  const showNav = ['home', 'journey', 'calendar'].includes(name);
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
  if (name === 'overview') renderStudyOverview();
  if (name === 'adverseEvents') renderAdverseEvents();
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
    disclaimer:
      'This app is for educational purposes only and does not replace medical advice. Always follow instructions from your care team.',
    questions: [...patientQuestions],
    helpfulTips: [
      'Write questions down between visits so you do not forget them.',
      'Bring your medication list to study visits.',
      'Tell the team about new symptoms, ER visits, or medications.',
      'Confirm your next appointment before leaving the clinic.',
      'Ask your team who to contact after hours.',
      'Follow any fasting or visit instructions exactly as given.'
    ],
    adverseEvents: [],
    visits: []
  };
}

function renderAll() {
  renderHome();
  renderJourney();
  renderStudyOverview();
  renderAdverseEvents();
  renderQuestions();
  renderMore();
}

function renderHome() {
  if (!state.study) return;

  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeSubtitle = document.getElementById('welcomeSubtitle');
  const studyTitleHome = document.getElementById('studyTitleHome');

  if (welcomeTitle) welcomeTitle.textContent = `Hello, ${state.user.firstName}`;
  if (welcomeSubtitle) welcomeSubtitle.textContent = `You are viewing ${state.study.NCTId}.`;
  if (studyTitleHome) studyTitleHome.textContent = state.study.title;
}

function renderJourney() {
  if (!state.study) return;

  renderBasicJourneyOverview();
  renderVisitRibbonAndDetails();
}

function renderStudyOverview() {
  if (!state.study) return;

  const trialAppTitle = document.getElementById('trialAppTitle');
  const trialSummary = document.getElementById('trialSummary');
  const trialWhyItMatters = document.getElementById('trialWhyItMatters');
  const trialTreatment = document.getElementById('trialTreatment');
  const trialHowGiven = document.getElementById('trialHowGiven');

  if (trialAppTitle) trialAppTitle.textContent = state.study.title || '—';
  if (trialSummary) trialSummary.textContent = state.study.summary || '—';
  if (trialWhyItMatters) trialWhyItMatters.textContent = state.study.participation || '—';
  if (trialTreatment) trialTreatment.textContent = state.study.treatment || '—';
  if (trialHowGiven) trialHowGiven.textContent = state.study.howGiven || '—';
}

function renderBasicJourneyOverview() {
  const basicWrap = document.getElementById('basicJourneyOverview');
  const basicTitle = document.getElementById('basicTrialTitle');
  const basicSummary = document.getElementById('basicTrialSummary');
  const basicParticipation = document.getElementById('basicTrialParticipation');
  const basicTreatment = document.getElementById('basicTrialTreatment');

  if (!basicWrap) return;

  if (state.enhanced) {
    basicWrap.classList.add('hidden');
    return;
  }

  basicWrap.classList.remove('hidden');

  if (basicTitle) basicTitle.textContent = state.study.title || '—';
  if (basicSummary) basicSummary.textContent = state.study.summary || '—';
  if (basicParticipation) basicParticipation.textContent = state.study.participation || '—';
  if (basicTreatment) basicTreatment.textContent = state.study.treatment || '—';
}

function renderVisitRibbonAndDetails() {
  const ribbon = document.getElementById('visitRibbon');
  const visitDetailsCard = document.getElementById('visitDetailsCard');
  const basicJourneyNote = document.getElementById('basicJourneyNote');
  const journeyRibbonWrap = document.getElementById('journeyRibbonWrap');
  const journeyActions = document.getElementById('journeyActions');
  const exploreQuestionsBtn = document.getElementById('exploreQuestionsBtn');
  const basicJourneyOverview = document.getElementById('basicJourneyOverview');

  if (!ribbon || !visitDetailsCard || !basicJourneyNote || !journeyRibbonWrap) return;

  const visits = state.study.visits || [];

  if (!state.enhanced) {
    ribbon.innerHTML = '';
    journeyRibbonWrap.classList.add('hidden');
    visitDetailsCard.classList.add('hidden');
    basicJourneyNote.style.display = 'block';
    if (journeyActions) journeyActions.classList.add('hidden');
    if (exploreQuestionsBtn) exploreQuestionsBtn.classList.remove('hidden');
    if (basicJourneyOverview) basicJourneyOverview.classList.remove('hidden');
    return;
  }

  journeyRibbonWrap.classList.remove('hidden');
  visitDetailsCard.classList.remove('hidden');
  basicJourneyNote.style.display = 'none';
  if (journeyActions) journeyActions.classList.remove('hidden');
  if (exploreQuestionsBtn) exploreQuestionsBtn.classList.add('hidden');
  if (basicJourneyOverview) basicJourneyOverview.classList.add('hidden');

  if (!state.selectedVisitCode && visits.length) {
    state.selectedVisitCode = visits[0].code;
  }

  ribbon.innerHTML = '';

  visits.forEach(visit => {
    const btn = document.createElement('button');
    btn.className = `visit-pill ${visit.code === state.selectedVisitCode ? 'active' : ''}`;
    btn.innerHTML = `${visit.shortLabel}<small>${visit.title}</small>`;
    btn.addEventListener('click', () => {
      state.selectedVisitCode = visit.code;
      saveState();
      renderVisitRibbonAndDetails();
      renderAdverseEvents();
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

  const searchInput = document.getElementById('questionsSearch');
  const results = document.getElementById('questionsSearchResults');
  const container = document.getElementById('questionCategories');

  if (!searchInput || !results || !container) return;

  container.innerHTML = '';
  results.innerHTML = '';

  Object.entries(QUESTION_BANK).forEach(([title, questions]) => {
    const block = document.createElement('div');
    block.className = 'category-card';

    block.innerHTML = `
      <button class="category-header" type="button">
        <span>${title}</span>
        <span>+</span>
      </button>
      <div class="category-body">
        ${questions.map(item => `
          <details>
            <summary>${item.q}</summary>
            <p>${item.a}</p>
          </details>
        `).join('')}
      </div>
    `;

    const header = block.querySelector('.category-header');
    header.addEventListener('click', () => {
      block.classList.toggle('open');
      header.querySelector('span:last-child').textContent = block.classList.contains('open') ? '–' : '+';
    });

    container.appendChild(block);
  });

  searchInput.oninput = () => {
    const value = searchInput.value.trim().toLowerCase();

    if (!value) {
      results.classList.remove('active');
      results.innerHTML = '';
      container.style.display = 'grid';
      return;
    }

    const matches = patientQuestions.filter(item =>
      item.q.toLowerCase().includes(value) || item.a.toLowerCase().includes(value)
    );

    container.style.display = 'none';
    results.classList.add('active');
    results.innerHTML = '';

    if (!matches.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-note';
      empty.textContent = 'No matching questions found.';
      results.appendChild(empty);
      return;
    }

    matches.forEach(item => {
      const details = document.createElement('details');
      details.innerHTML = `<summary>${item.q}</summary><p>${item.a}</p>`;
      results.appendChild(details);
    });
  };
}

function renderMore() {
  if (!state.study) return;

  const moreDisclaimer = document.getElementById('moreDisclaimer');
  if (moreDisclaimer) {
    moreDisclaimer.textContent = state.study.disclaimer || '';
  }
}

function getAdverseEventsStorageKey() {
  if (!state.user?.nct) return 'mtj_ae_default';
  const visit = state.selectedVisitCode || 'general';
  return `mtj_ae_${state.user.nct}_${visit}`;
}

function renderAdverseEvents() {
  const container = document.getElementById('adverseEventsList');
  if (!container) return;

  const effects = state.study?.adverseEvents || [];
  const storageKey = getAdverseEventsStorageKey();
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');

  container.innerHTML = '';

  if (!effects.length) {
    const note = document.createElement('div');
    note.className = 'empty-note';
    note.textContent = 'No adverse event tracker is available for this study view.';
    container.appendChild(note);
    return;
  }

  effects.forEach(effect => {
    const checked = !!saved[effect.key];
    const row = document.createElement('div');
    row.className = 'tracker-item';
    row.innerHTML = `
      <input type="checkbox" id="ae_${effect.key}" ${checked ? 'checked' : ''} />
      <div>
        <label for="ae_${effect.key}">${effect.label}</label>
        <small>${effect.note}</small>
      </div>
    `;

    const checkbox = row.querySelector('input');
    checkbox.addEventListener('change', () => {
      saved[effect.key] = checkbox.checked;
      localStorage.setItem(storageKey, JSON.stringify(saved));
    });

    container.appendChild(row);
  });
}

function renderHelpfulTips() {
  const container = document.getElementById('helpfulTipsList');
  if (!container) return;

  const tips = state.study.helpfulTips || [];
  container.innerHTML = '';

  tips.forEach(tip => {
    const div = document.createElement('div');
    div.className = 'tip-item';
    div.textContent = tip;
    container.appendChild(div);
  });
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
    state.selectedVisitCode = null;

    const enhancedCheck = await checkIfEnhanced(nct);

    renderAll();
    saveState();

    if (enhancedCheck.isEnhanced) {
      showScreen('code');
      return;
    }

    showMainScreen('home');
  } catch (e) {
    console.error('Frontend fetch error:', e);
    alert(`Frontend error: ${e.message}`);
  }
}

async function unlockDemoStudy() {
  const code = document.getElementById('siteCode')?.value?.trim().toUpperCase();

  if (!code) {
    alert('Please enter your access code.');
    return;
  }

  if (state.user.nct === DEMO_NCT && code === DEMO_CODE) {
    state.enhanced = true;
    state.study = { ...demoEnhancedStudy };
    state.selectedVisitCode = state.study.visits?.[0]?.code || null;

    renderAll();
    saveState();
    showMainScreen('home');
    return;
  }

  const isValid = await validateAccessCode(state.user.nct, code);

  if (!isValid) {
    alert('Invalid code');
    return;
  }

  state.enhanced = true;

  const contentRow = await fetchEnhancedStudyContent(state.user.nct);
  state.study = buildEnhancedStudyModel(state.study, contentRow);
  state.selectedVisitCode = state.study.visits?.[0]?.code || null;

  renderAll();
  saveState();
  showMainScreen('home');
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
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
    window.open('https://nurjourney.com', '_blank', 'noopener,noreferrer');
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

const studyOverviewBtn = document.getElementById('studyOverviewBtn');
if (studyOverviewBtn) {
  studyOverviewBtn.addEventListener('click', () => {
    if (state.enhanced) {
      showMainScreen('overview');
    }
  });
}

const adverseEventsBtn = document.getElementById('adverseEventsBtn');
if (adverseEventsBtn) {
  adverseEventsBtn.addEventListener('click', () => showMainScreen('adverseEvents'));
}

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

window.addEventListener('load', () => {
  loadSavedState();

  setTimeout(() => {
    if (!state.study) showScreen('entry');
  }, 1000);
});
