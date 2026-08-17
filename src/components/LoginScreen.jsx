import { Lock, Plane, TriangleAlert } from 'lucide-react'
import logo from '../assets/skylark-logo.png'

export default function LoginScreen({ onGoogleLogin, onDemoLogin, error, firebaseEnabled }) {
  return (
    <main className="login-shell">
      <section className="login-card">
        <img className="login-logo" src={logo} alt="Skylark Drones" />
        <br></br>
        <p className="login-kicker">Skylark Drones - Site Repository</p>
        <button className="button button-primary" type="button" onClick={onGoogleLogin} disabled={!firebaseEnabled}>
          Continue with Google Workspace
        </button>
        {!firebaseEnabled && <button className="button button-ghost" type="button" onClick={onDemoLogin}>Open demo workspace</button>}
        {error && <p className="login-error"><TriangleAlert size={14} /> {error}</p>}
        <p className="login-help"><Lock size={12} /> {firebaseEnabled ? 'Restricted to your authorized Firebase users.' : 'Demo mode is active. Add Firebase values to enable sign-in.'}</p>
      </section>
    </main>
  )
}
