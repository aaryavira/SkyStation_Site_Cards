export const demoSites = [
  {
    id: 'khavda', name: 'Khavda', location: 'Kutch, Gujarat', coordinates: '23.8382° N, 69.6763° E',
    capacityLabel: '300 GW Site', area: '250 sq. km', blocks: 14, idts: 42, wtgs: 118,
  owner: 'Ammar',
coOwner: 'Janagiraman',
qc: 'Nihal',

spectraLink: 'https://spectra-insights.com/org/khavda',
flightHubLink: 'https://fh.dji.com/login',
flightHubAdmin: 'Aarya',

internalTool: 'Spectra Link',
externalTool: 'FlightHUB2',
status: 'Active',
    activities: ['Worksite Monitoring', 'WTG Blade Inspection', 'Progress Mapping'],
    inventory: [{ type: 'Dock', model: 'SkyStation 3', count: 2, status: 'Online' }, { type: 'Drone', model: 'DJI Matrice 4TD', count: 3, status: 'Ready' }, { type: 'Drone', model: 'DJI Matrice 3TD', count: 1, status: 'Maintenance' }],
    workflow: [{ stage: 'Data Collection', detail: 'Automated dock missions, twice daily' }, { stage: 'Data Processing', detail: 'Spectra Link pipeline, same-day turnaround' }, { stage: 'Deliverables', detail: 'Report PDF · Orthomosaic Images · Site Video' }],
    stakeholders: { day: { internal: [{ name: 'Aarya Vira', role: 'Drone Pilot – Dock Ops' }, { name: 'Rohit Menon', role: 'Solutions Engineer' }, { name: 'Fatima Sheikh', role: 'Site Engineer' }], external: [{ name: 'Vikram Rao', role: 'Customer POC' }] }, night: { internal: [{ name: 'Devika Nair', role: 'Drone Pilot – Dock Ops' }, { name: 'Sameer Iqbal', role: 'Site Engineer' }], external: [{ name: 'Priya Achar', role: 'Customer POC (Night Shift)' }] } },
  },
  {
    id: 'bhuj-north', name: 'Bhuj North', location: 'Bhuj, Gujarat', coordinates: '23.2510° N, 69.6693° E',
    capacityLabel: '180 GW Site', area: '140 sq. km', blocks: 9, idts: 26, wtgs: 74,
owner: 'Kavya Reddy',
coOwner: 'Nihal',
qc: 'Ammar',

spectraLink: 'https://spectra-insights.com/org/bhuj-north',
flightHubLink: 'https://fh.dji.com/login',
flightHubAdmin: 'Aarya',

internalTool: 'Spectra Link',
externalTool: 'FlightHUB2',
status: 'Active',
    activities: ['Solar Panel Thermal Scan', 'Vegetation Encroachment Check'],
    inventory: [{ type: 'Dock', model: 'SkyStation 2', count: 1, status: 'Online' }, { type: 'Drone', model: 'DJI Matrice 3TD', count: 2, status: 'Ready' }],
    workflow: [{ stage: 'Data Collection', detail: 'Automated dock mission, once daily' }, { stage: 'Data Processing', detail: 'Spectra Link pipeline, next-day turnaround' }, { stage: 'Deliverables', detail: 'Thermal Report · Anomaly Images' }],
    stakeholders: { day: { internal: [{ name: 'Arjun Das', role: 'Drone Pilot – Dock Ops' }], external: [{ name: 'Neel Kapoor', role: 'Customer POC' }] }, night: { internal: [{ name: 'On-call Pilot', role: 'Drone Pilot – Dock Ops' }], external: [] } },
  },
  {
    id: 'jaisalmer-east', name: 'Jaisalmer East', location: 'Jaisalmer, Rajasthan', coordinates: '26.9157° N, 70.9083° E',
    capacityLabel: '220 GW Site', area: '190 sq. km', blocks: 11, idts: 30, wtgs: 96,
    owner: 'Janagiraman',
coOwner: 'Kavya Reddy',
qc: 'Nihal',

spectraLink: 'https://spectra-insights.com/org/jaisalmer-east',
flightHubLink: 'https://fh.dji.com/login',
flightHubAdmin: 'Aarya',

internalTool: 'Spectra Link',
externalTool: 'FlightHUB2',
status: 'Setup',
    activities: ['WTG Blade Inspection', 'Site Onboarding Survey'],
    inventory: [{ type: 'Dock', model: 'SkyStation 3', count: 1, status: 'Commissioning' }, { type: 'Drone', model: 'DJI Matrice 4TD', count: 2, status: 'Ready' }],
    workflow: [{ stage: 'Data Collection', detail: 'Manual survey flights during setup' }, { stage: 'Data Processing', detail: 'Spectra Link, pending pipeline handoff' }, { stage: 'Deliverables', detail: 'Baseline Report · Site Map' }],
    stakeholders: { day: { internal: [{ name: 'Fatima Sheikh', role: 'Site Engineer' }], external: [] }, night: { internal: [], external: [] } },
  },
]

export const documents = [
  { section: 'Regulatory', title: 'Drone Rules, 2021', meta: 'Government of India · PDF · 1.2 MB' },
  { section: 'Regulatory', title: 'Digital Sky Airspace Map Guide', meta: 'DGCA reference · PDF · 640 KB' },
  { section: 'Solar Inspection', title: 'Drone Pilot Checklist — Solar Inspection', meta: 'Pre-flight & offering scope · PDF · 340 KB' },
  { section: 'WTG Inspection', title: 'Blade Defect Classification Guide', meta: 'Company reference · PDF · 520 KB' },
]
