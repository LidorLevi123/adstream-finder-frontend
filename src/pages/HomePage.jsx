import { useEffect, useState } from "react"
import { httpService } from "../services/http.service"
import { StatsDisplay } from "../cmps/StatsDisplay"
import { DomainList } from "../cmps/DomainList"

export function HomePage() {
    const [domains, setDomains] = useState([])
    const [filterBy, setFilterBy] = useState('top')

    useEffect(() => {
        getDomains()
    }, [])

    async function getDomains() {
        try {
            const domains = await httpService.get('collector-data')
            setDomains(domains)
        } catch (err) {
            console.error('Error fetching domains:', err)
        }
    }

    if (!domains) return <div>Loading...</div>

    let domainsToDisplay
    if (filterBy === 'top') domainsToDisplay = domains.filter(domain => domain.hasStreaming && domain.hasAds)
    else if (filterBy === 'all') domainsToDisplay = domains

    return (
        <section className="home">
            <h1>Stream & Ad Analytics</h1>
            <div className="home-content">
                <StatsDisplay data={domains} />

                <div className="table-header">
                    <h1 className="table-title">
                        {filterBy === 'top' ? 'Top Streaming & Ads Domains' : 'All Domains'}
                    </h1>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filterBy === 'top' ? 'active' : ''}`}
                            onClick={() => setFilterBy('top')}
                        >
                            TOP
                        </button>
                        <button
                            className={`filter-btn ${filterBy === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterBy('all')}
                        >
                            ALL
                        </button>
                    </div>
                </div>

                <DomainList domains={domainsToDisplay} />
            </div>
        </section>
    )
}