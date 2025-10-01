import { NavLink } from 'react-router-dom'

export function AppHeader() {

	return (
		<header className="app-header full">
			<nav>
				<NavLink to="/" className="logo">
					E2E Demo
				</NavLink>
			</nav>
		</header>
	)
}
