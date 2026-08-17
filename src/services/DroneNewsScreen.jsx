import { useEffect, useMemo, useState } from 'react'
import { Eye, ExternalLink, Lock, Newspaper, Radar, Shield, Sprout, TrainFront, Truck, Wind } from 'lucide-react'
import { getDroneNews, SECTORS } from '../services/newsService'

const SECTOR_ICONS = {
  Defence: Shield, Security: Lock, Surveillance: Eye, Reconnaissance: Radar,
  Logistics: Truck, Agriculture: Sprout, 'Solar & Wind Inspection': Wind, Railway: TrainFront,
}

export default function DroneNewsScreen() {
  const [items, setItems] = useState([])
  const [sector, setSector] = useState('All')

  useEffect(() => { getDroneNews().then(setItems) }, [])

  const filtered = useMemo(() => sector === 'All' ? items : items.filter((item) => item.sector === sector), [sector, items])

  return (
    <section className="page fade-in">
      <div className="page-heading">
        <div><h1>Drone News</h1><p>Top developments across drone-enabled sectors in India, refreshed daily</p></div>
        <div className="filter-row">
          <button type="button" className={`filter ${sector === 'All' ? 'selected' : ''}`} onClick={() => setSector('All')}>All</button>
          {SECTORS.map((item) => <button type="button" key={item} className={`filter ${sector === item ? 'selected' : ''}`} onClick={() => setSector(item)}>{item}</button>)}
        </div>
      </div>

      <div className="news-banner"><Newspaper size={14} /> Showing sample headlines — connect a news API key in <code>newsService.js</code> to populate live results.</div>

      <div className="news-grid">
        {filtered.map((item) => {
          const Icon = SECTOR_ICONS[item.sector] || Newspaper
          return (
            <a className="news-card" href={item.url} target="_blank" rel="noreferrer" key={item.id}>
              <div className="news-card-top">
                <span className="sector-tag"><Icon size={12} /> {item.sector}</span>
                <ExternalLink size={14} className="news-link-icon" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="news-meta"><span>{item.source}</span><span>{item.publishedAt}</span></div>
            </a>
          )
        })}
      </div>
    </section>
  )
}