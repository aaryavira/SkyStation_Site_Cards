export const SECTORS = [
  'Defence', 'Security', 'Surveillance', 'Reconnaissance', 'Logistics',
  'Agriculture', 'Solar & Wind Inspection', 'Railway',
]

// Sample placeholder headlines so the tab is reviewable before a live feed is wired up.
// Replace getDroneNews() below with a call to your news API proxy (see note at bottom).
const MOCK_NEWS = [
  { id: 'n1', sector: 'Defence', title: 'Armed forces expand drone swarm trials along border sectors', source: 'Sample Wire', publishedAt: 'Today, 8:10 AM', url: 'https://example.com', summary: 'Trials focus on coordinated multi-drone reconnaissance and rapid-response payload delivery in forward areas.' },
  { id: 'n2', sector: 'Security', title: 'State police units add counter-drone systems to VIP security cover', source: 'Sample Bulletin', publishedAt: 'Today, 7:45 AM', url: 'https://example.com', summary: 'New detection units aim to flag unauthorised drone activity near high-security zones during events.' },
  { id: 'n3', sector: 'Surveillance', title: 'City traffic police pilot drone-based congestion monitoring', source: 'Sample Daily', publishedAt: 'Yesterday, 6:30 PM', url: 'https://example.com', summary: 'Live aerial feeds are being tested to flag bottlenecks and accident sites faster than fixed CCTV coverage.' },
  { id: 'n4', sector: 'Reconnaissance', title: 'Forest department uses drones for wildlife corridor mapping', source: 'Sample Journal', publishedAt: 'Yesterday, 4:15 PM', url: 'https://example.com', summary: 'Aerial surveys are helping identify encroachment and migration patterns across protected corridors.' },
  { id: 'n5', sector: 'Logistics', title: 'Drone delivery corridor cleared for medical supply trial in hill districts', source: 'Sample Wire', publishedAt: 'Today, 9:00 AM', url: 'https://example.com', summary: 'The trial aims to cut delivery times for essential medicine to districts with limited road access.' },
  { id: 'n6', sector: 'Agriculture', title: 'Crop-spraying drone subsidy scheme extended to more districts', source: 'Sample Digest', publishedAt: 'Today, 6:50 AM', url: 'https://example.com', summary: 'Farmer cooperatives can now access subsidised drone spraying services ahead of the sowing season.' },
  { id: 'n7', sector: 'Solar & Wind Inspection', title: 'Utility-scale solar operator adopts automated dock inspections', source: 'Sample Report', publishedAt: 'Today, 8:40 AM', url: 'https://example.com', summary: 'Automated docks are cutting thermal-scan turnaround time across large solar installations.' },
  { id: 'n8', sector: 'Railway', title: 'Railways trials drone-based track and bridge inspection', source: 'Sample Bulletin', publishedAt: 'Yesterday, 5:20 PM', url: 'https://example.com', summary: 'Aerial inspection is being evaluated to supplement manual checks on hard-to-access bridge sections.' },
]

export async function getDroneNews() {
  // TODO: once a news API + Cloud Function proxy is ready, replace this with:
  // const response = await fetch('/api/drone-news')
  // return response.json()
  return MOCK_NEWS
}