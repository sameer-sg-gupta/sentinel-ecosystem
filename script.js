const progress = document.querySelector('.progress span');
const updateProgress = () => { const scrollable = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${scrollable ? (window.scrollY / scrollable) * 100 : 0}%`; };
window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress();

const stepCopy = [
  ['01', 'Find the signal worth acting on.', 'Sentinel analyzes agreed records and operating-stage video to flag recurring, high-severity risks. It is designed to help teams focus — not create another stream of noise.', 'Sentinel AI', 'Records + event metadata'],
  ['02', 'Turn the signal into a ranked playbook.', 'Potential fixes are ranked by severity, with safety-engineer sign-off. The goal is a recommendation a site team can understand and act on.', 'Sentinel AI + risk engineer', 'Reviewed practices + partner cases'],
  ['03', 'Make the change visible at site level.', 'Manufacturing teams implement the selected corrective action and record the effort, cost, and supporting evidence needed for review.', 'Manufacturing company', 'Action + implementation evidence'],
  ['04', 'Check the fix, then check recurrence.', 'An automated check is paired with independent inspection and a documented view of closure, recurrence, dependencies, and limits.', 'Independent verifier', 'Inspection + supporting evidence'],
  ['05', 'Create a proof dossier for the insurer.', 'A verified fix can earn a premium credit under the proposed model. Any coverage, pricing, or credit decision stays with the insurer.', 'Insurer', 'Baseline + measured indicators']
];
const detail = document.querySelector('.workflow-detail');
const showStep = (button) => {
  document.querySelectorAll('.step').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const [index, title, body, owner, evidence] = stepCopy[Number(button.dataset.step)];
  detail.querySelector('.detail-index').textContent = index;
  detail.querySelector('h3').textContent = title;
  detail.querySelector('p').textContent = body;
  detail.querySelector('.detail-meta').innerHTML = `<span>Owner</span><strong>${owner}</strong><span>Evidence</span><strong>${evidence}</strong>`;
};
document.querySelectorAll('.step').forEach((button) => {
  button.addEventListener('click', () => showStep(button));
  button.addEventListener('mouseenter', () => showStep(button));
  button.addEventListener('focus', () => showStep(button));
});

const ecoCopy = {
  manufacturer: ['MANUFACTURING COMPANIES', 'Contribute records and action evidence.', 'Site teams implement selected corrective actions and retain control of their operational data.'],
  sentinel: ['SENTINEL AI', 'Connects evidence to an action path.', 'The proposed platform analyzes agreed evidence, recommends actions, tracks verification, and produces a prevention-maturity profile.'],
  insurer: ['INDUSTRIAL INSURERS', 'Fund the model and decide the outcome.', 'Insurers receive company-specific evidence and decide any future coverage, pricing, or premium credit.'],
  verifier: ['INDEPENDENT VERIFICATION', 'Checks that selected fixes happened.', 'An independent partner reports verified closure, recurrence, dependencies, and verification limits.']
};
const ecoMap = document.querySelector('.eco-map');
const ecoInfo = ecoMap && ecoMap.querySelector('.eco-info');
document.querySelectorAll('.eco-map [data-eco]').forEach((node) => node.addEventListener('click', () => {
  const key = node.dataset.eco;
  const [label, title, copy] = ecoCopy[key];
  document.querySelectorAll('.eco-map [data-eco]').forEach((item) => item.classList.toggle('selected', item === node));
  ecoMap.className = `eco-map is-focused focus-${key}`;
  ecoInfo.innerHTML = `<span class="eco-info-label">${label}</span><strong>${title}</strong><p>${copy}</p>`;
}));

const audienceValue = {
  manufacturer: {
    inputTitle: 'Operational evidence', inputCopy: 'Process instructions, maintenance logs, inspections, audits, incident records, and agreed video.', inputOwner: 'Manufacturing company',
    outcomeTitle: 'Manufacturer action path', outcomeCopy: 'A focused recommendation, peer comparison, and evidence trail showing which fix was completed and what remains to verify.', outcomeOwner: 'Site team + independent verifier',
    roles: [['Manufacturer','provides evidence + implements'],['Risk engineer','interprets the evidence'],['Independent partner','checks the outcome'],['Insurer','decides the policy outcome']]
  },
  insurer: {
    inputTitle: 'Risk-engineering context', inputCopy: 'Historical cases, risk expertise, company-specific findings, and evidence from participating policyholders.', inputOwner: 'Insurer + risk engineer',
    outcomeTitle: 'Evidence between surveys', outcomeCopy: 'A company-specific prevention profile with recurring findings and verified actions that may support future product or credit decisions.', outcomeOwner: 'Insurer decides the outcome',
    roles: [['Insurer','funds the model + evaluates'],['Risk engineer','coordinates the evidence'],['Sentinel AI','connects findings + profiles'],['Independent partner','verifies selected actions']]
  }
};
document.querySelectorAll('.value-tab').forEach((tab) => tab.addEventListener('click', () => {
  const copy = audienceValue[tab.dataset.value];
  document.querySelectorAll('.value-tab').forEach((item) => item.classList.toggle('active', item === tab));
  const input = document.querySelector('.value-input'); const output = document.querySelector('.value-outcome');
  input.querySelector('h3').textContent = copy.inputTitle; input.querySelector('.value-copy').textContent = copy.inputCopy; input.querySelector('.value-owner').textContent = copy.inputOwner;
  output.querySelector('h3').textContent = copy.outcomeTitle; output.querySelector('.value-copy').textContent = copy.outcomeCopy; output.querySelector('.value-owner').textContent = copy.outcomeOwner;
  document.querySelectorAll('.value-roles > div').forEach((role, index) => { role.querySelector('strong').textContent = copy.roles[index][0]; role.querySelector('span').textContent = copy.roles[index][1]; });
}));
