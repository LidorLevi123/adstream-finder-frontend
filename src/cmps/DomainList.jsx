import { DomainPreview } from "./DomainPreview"

export function DomainList({ domains }) {
    return (
        <section className="domain-list">
            <table>
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Streaming</th>
                        <th>Ads</th>
                    </tr>
                </thead>
                <tbody>
                    {domains.map((domain, idx) => (
                        <DomainPreview key={idx} domain={domain} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}