import { NavLink } from 'react-router-dom'

export function AppHeader() {
	return (
		<header className="app-header main-layout full">
			<nav className="header-nav container">
				<NavLink to="/" className="logo">
					<img src="/img/favicon.png" alt="AdStream" className="logo-icon" />
					<span className="logo-text">Ad<span className="highlight">Stream</span></span>
				</NavLink>
				
				<div className="nav-links">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/docs">Docs</NavLink>
				</div>
			</nav>
		</header>
	)
}
