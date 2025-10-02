import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export function AppHeader() {
	const headerRef = useRef(null)
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '50px 0px 0px 0px',
		}

		const observerCallback = (entries) => {
			entries.forEach(entry => {
				setIsDark(!entry.isIntersecting)
			})
		}

		const headerObserver = new IntersectionObserver(observerCallback, options)
		const triggerElement = document.querySelector('.header-intersection')
		headerObserver.observe(triggerElement)

		return () => {
			headerObserver.unobserve(triggerElement)
		}
	}, [])
	return (
		<header ref={headerRef} className={`app-header main-layout full ${isDark ? 'dark' : ''}`}>
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
