import { useEffect, useState } from "react"
import { httpService } from "../services/http.service"
import { StatsDisplay } from "../cmps/StatsDisplay"
import '../assets/styles/cmps/HomePage.css'

export function HomePage() {
    const [domains, setDomains] = useState([])

    useEffect(() => {
        getDomains()
    }, [])

    async function getDomains() {
        const domains = await httpService.get('collector-data')
        setDomains(domains)
    }

    if (!domains) return <div>Loading...</div>

    return (
        <section className="home">
            <h1>Stream & Ad Analytics</h1>
            <div className="home-content">
                <StatsDisplay data={domains} />
            </div>
        </section>
    )
}