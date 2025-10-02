import { Tooltip } from "./Tooltip"

export function DomainPreview({ domain }) {
    return (
        <tr className="domain-preview">
            <td className={domain.error ? 'red' : ''}>
                {domain.error ? (
                    <Tooltip content={domain.error} position="right">
                        <span>{domain.domain} 🔴</span>
                    </Tooltip>
                ) : (
                    domain.domain
                )}
            </td>
            <td className={domain.hasStreaming ? 'green' : 'red'}>{domain.hasStreaming ? '✓' : '✗'}</td>
            <td className={domain.hasAds ? 'green' : 'red'}>{domain.hasAds ? '✓' : '✗'}</td>
        </tr>
    )
}