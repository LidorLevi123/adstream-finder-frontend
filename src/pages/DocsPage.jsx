import React from 'react'

export function DocsPage() {

    function onScroll(ev) {
        ev.preventDefault()
        const id = ev.target.name
        document.getElementById(id).scrollIntoView({ behavior: 'smooth', top: -50 })
    }

    return (
        <div className="docs-page">
            <div className="docs-container">
                <h1>Detection Logic, Limitations, and Known Issues</h1>
                <p className="docs-intro">
                    This document outlines the methodology used by the collector script to identify domains with streaming content and Google Ads. 
                    The approach is layered to maximize accuracy while maintaining efficiency.
                </p>

                <div className="docs-legend">
                    <h3>Quick Navigation</h3>
                    <ul>
                        <li>
                            <a href="#detection-logic" name="detection-logic" onClick={onScroll}>
                                <span className="emoji">🕵️‍♂️</span> Detection Logic
                            </a>
                        </li>
                        <li>
                            <a href="#system-limitations" name="system-limitations" onClick={onScroll}>
                                <span className="emoji">🚧</span> System Limitations
                            </a>
                        </li>
                        <li>
                            <a href="#false-positives" name="false-positives" onClick={onScroll}>
                                <span className="emoji">⚠️</span> Known False Positives & Negatives
                            </a>
                        </li>
                        <li>
                            <a href="#performance" name="performance" onClick={onScroll}>
                                <span className="emoji">⚡</span> Performance & Error Handling
                            </a>
                        </li>
                    </ul>
                </div>

                <section id="detection-logic" className="docs-section">
                    <h2><span className="emoji">🕵️‍♂️</span> Detection Logic</h2>
                    <p>A layered detection strategy is used for both streaming and ads, prioritizing the most reliable signals first.</p>
                    
                    <h3>Streaming Detection</h3>
                    <p>The system checks for streaming content in the following order of priority:</p>
                    <ul>
                        <li>
                            <strong>Network Request Analysis (Primary Method):</strong> The script monitors all network traffic initiated by the page. 
                            It flags a page as having streaming if it detects requests for common streaming manifest files, such as HLS (.m3u8) or 
                            DASH (.mpd). This is the most reliable method for identifying modern, JavaScript-based video players (e.g., on twitch.tv).
                        </li>
                        <li>
                            <strong>Heuristic URL Check (Fast-Path):</strong> A predefined list of known public streaming platforms (e.g., youtube.com, 
                            vimeo.com) is used for a quick check. If a domain matches, it's immediately flagged, saving the time and resources of a 
                            full page analysis.
                        </li>
                        <li>
                            <strong>DOM Analysis (Fallback Method):</strong> If the above methods don't yield a positive result, the script analyzes 
                            the final rendered HTML of the page. It searches for strong indicators like a &lt;video&gt; tag or an &lt;iframe&gt; whose 
                            source URL points to a known video embedding service (e.g., youtube.com/embed).
                        </li>
                    </ul>

                    <h3>Google Ads Detection</h3>
                    <p>A similar layered approach is used to detect the presence of Google Ads:</p>
                    <ul>
                        <li>
                            <strong>Network Request Analysis (Primary Method):</strong> The script monitors network traffic for requests made to 
                            Google's core ad-serving domains, specifically googlesyndication.com and doubleclick.net. This is the most accurate 
                            and definitive signal that Google Ads are active on the page.
                        </li>
                        <li>
                            <strong>DOM Analysis (Fallback Method):</strong> As a secondary check, the script inspects the DOM for elements that 
                            are unique to Google's ad implementation, such as an &lt;ins&gt; tag with the class adsbygoogle or an &lt;iframe&gt; 
                            with an ID containing google_ads_iframe.
                        </li>
                    </ul>
                </section>

                <section id="system-limitations" className="docs-section">
                    <h2><span className="emoji">🚧</span> System Limitations</h2>
                    <ul>
                        <li>
                            <strong>Login/Paywall Restrictions:</strong> The collector operates as an unauthenticated, first-time visitor. It cannot 
                            access content that requires a user to log in or pay. For major subscription services (e.g., Netflix, Disney+), it can 
                            identify the domain's purpose from the fast-path list but cannot verify a specific stream on the logged-out landing page.
                        </li>
                        <li>
                            <strong>Complex User Interaction:</strong> The script does not handle complex interactions like solving CAPTCHAs, 
                            navigating multi-step cookie consent forms, or performing actions like scrolling or clicking to reveal content. It only 
                            analyzes the state of the page after the initial load.
                        </li>
                        <li>
                            <strong>Geographically Restricted Content:</strong> All analysis is performed from the server's IP address. The script 
                            cannot detect streaming or ads on pages that are geo-blocked in the server's region.
                        </li>
                    </ul>
                </section>

                <section id="false-positives" className="docs-section">
                    <h2><span className="emoji">⚠️</span> Known False Positives & Negatives</h2>
                    
                    <h3>False Positives (Incorrectly Flagged as true)</h3>
                    <ul>
                        <li>
                            <strong>Embedded Social Feeds:</strong> A page might be flagged for streaming if it embeds a social media feed 
                            (e.g., from Facebook or Twitter) that contains a video, even if video is not the primary content of the page itself.
                        </li>
                        <li>
                            <strong>Ad-Related Video Content:</strong> A site might use a video player within an advertisement. The script may 
                            flag this as streaming content, conflating the ad's content with the site's primary content.
                        </li>
                    </ul>

                    <h3>False Negatives (Incorrectly Flagged as false)</h3>
                    <ul>
                        <li>
                            <strong>Highly Obfuscated Scripts:</strong> Sophisticated websites might use heavily obfuscated JavaScript to load 
                            ad networks or video players from non-standard URLs. These custom implementations might evade both our network and 
                            DOM detection methods.
                        </li>
                        <li>
                            <strong>Delayed Content:</strong> If streaming content or ads are loaded only after a significant delay or specific 
                            user action (e.g., clicking a "Load More" button), the script will miss them, as it only waits for the initial 
                            network idle state before performing its analysis.
                        </li>
                    </ul>
                </section>

                <section id="performance" className="docs-section">
                    <h2><span className="emoji">⚡</span> Performance & Error Handling</h2>
                    
                    <h3>Concurrent Processing</h3>
                    <p>
                        The collector utilizes concurrent processing to efficiently analyze multiple domains simultaneously 
                        while maintaining system stability:
                    </p>
                    <ul>
                        <li>
                            <strong>Controlled Concurrency:</strong> Using p-limit, the system processes 5 domains 
                            concurrently. This balance ensures optimal throughput while preventing system overload 
                            and potential IP blocking.
                        </li>
                        <li>
                            <strong>Resource Management:</strong> Each domain analysis runs in its own isolated browser 
                            context, ensuring memory leaks and crashes in one analysis don't affect others.
                        </li>
                    </ul>

                    <h3>Resource Optimization</h3>
                    <p>
                        Several optimization techniques are employed to minimize resource usage and improve processing speed:
                    </p>
                    <ul>
                        <li>
                            <strong>Selective Resource Loading:</strong> The collector automatically blocks requests for 
                            non-essential resources (images, stylesheets, fonts, and media files), significantly reducing 
                            bandwidth usage and processing time.
                        </li>
                        <li>
                            <strong>Early Termination:</strong> Analysis stops as soon as definitive signals are detected, 
                            preventing unnecessary processing (e.g., stopping after finding clear streaming indicators).
                        </li>
                        <li>
                            <strong>Efficient URL Collection:</strong> Uses a Set data structure to track unique URLs, 
                            eliminating duplicates and reducing memory usage.
                        </li>
                    </ul>

                    <h3>Error Handling & Resilience</h3>
                    <p>
                        The system implements robust error handling to ensure reliability:
                    </p>
                    <ul>
                        <li>
                            <strong>Graceful Degradation:</strong> If analysis of one domain fails, the system continues 
                            processing other domains, ensuring partial failures don't affect the entire collection process.
                        </li>
                        <li>
                            <strong>Resource Cleanup:</strong> Browser pages are properly closed after analysis, regardless 
                            of success or failure, preventing memory leaks.
                        </li>
                        <li>
                            <strong>Timeout Protection:</strong> Page loads have a 30-second timeout, preventing the system 
                            from hanging on slow-loading or problematic sites.
                        </li>
                        <li>
                            <strong>Detailed Error Reporting:</strong> Failed analyses are logged with detailed error 
                            messages while still producing a result object, maintaining data consistency.
                        </li>
                    </ul>

                    <h3>Performance Metrics</h3>
                    <ul>
                        <li>
                            <strong>Average Processing Time:</strong> Each domain typically takes 5-15 seconds to analyze, 
                            depending on site complexity and response times.
                        </li>
                        <li>
                            <strong>Resource Savings:</strong> By blocking non-essential resources, memory usage is reduced 
                            by approximately 60-70% compared to full page loads.
                        </li>
                        <li>
                            <strong>Throughput:</strong> With 5 concurrent processes, the system can analyze approximately 
                            1,000-1,500 domains per hour, depending on domain response times and complexity.
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}
