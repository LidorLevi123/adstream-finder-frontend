import { NavLink } from 'react-router-dom'

export function AppHeader() {
	return (
		<header className="app-header full">
			<nav className="header-nav container">
				<NavLink to="/" className="logo">
					<span className="logo-text">Ad<span className="highlight">Stream</span></span>
				</NavLink>
				
				<div className="nav-links">
					<NavLink to="/" end>Home</NavLink>
					<NavLink to="/discover">Discover</NavLink>
					<NavLink to="/analytics">Analytics</NavLink>
				</div>

				<div className="header-actions">
					<button className="btn-secondary">Sign In</button>
					<button className="btn-primary">Get Started</button>
				</div>
			</nav>
		</header>
	)
}
