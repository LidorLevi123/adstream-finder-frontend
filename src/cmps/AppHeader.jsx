import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export function AppHeader() {
	const headerRef = useRef(null)
	const [isDark, setIsDark] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	
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

	function onOpenMenu() {
		if (isMenuOpen) return
		setIsMenuOpen(true)
	}

	function onCloseMenu() {
		if (!isMenuOpen) return
		setIsMenuOpen(false)
	}

	const headerClass =`app-header main-layout full ${isDark ? 'dark' : ''} ${isMenuOpen ? 'menu-open' : ''}`
	return (
		<header ref={headerRef} className={headerClass}>
			<nav className="header-nav container">
				<NavLink to="/" className="logo">
					<img src="/img/logo.png" alt="AdStream" className="logo-icon" />
					<h3 className="logo-text">Ad<span className="highlight">Stream</span></h3>
				</NavLink>

				<div className="backdrop" onClick={onCloseMenu}></div>
				<div className="nav-links">
					<NavLink to="/" onClick={onCloseMenu}>Home</NavLink>
					<NavLink to="/docs" onClick={onCloseMenu}>Docs</NavLink>
				</div>

				<div className="burger" onClick={onOpenMenu}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</nav>
		</header>
	)
}
