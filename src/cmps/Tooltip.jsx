import { useState, useRef, useEffect } from 'react'

export function Tooltip({ children, content, position = 'top' }) {
    const [isVisible, setIsVisible] = useState(false)
    const [tooltipStyle, setTooltipStyle] = useState({})
    const targetRef = useRef(null)
    const tooltipRef = useRef(null)

    useEffect(() => {
        if (isVisible && targetRef.current && tooltipRef.current) {
            const targetRect = targetRef.current.getBoundingClientRect()
            const tooltipRect = tooltipRef.current.getBoundingClientRect()
            
            let top, left

            switch (position) {
                case 'top':
                    top = -tooltipRect.height - 10
                    left = (targetRect.width - tooltipRect.width) / 2
                    break
                case 'bottom':
                    top = targetRect.height + 10
                    left = (targetRect.width - tooltipRect.width) / 2
                    break
                case 'left':
                    top = (targetRect.height - tooltipRect.height) / 2
                    left = -tooltipRect.width - 10
                    break
                case 'right':
                    top = (targetRect.height - tooltipRect.height) / 2
                    left = targetRect.width + 10
                    break
                default:
                    top = -tooltipRect.height - 10
                    left = (targetRect.width - tooltipRect.width) / 2
            }

            setTooltipStyle({
                top: `${top}px`,
                left: `${left}px`
            })
        }
    }, [isVisible, position, content])

    return (
        <div 
            ref={targetRef}
            className="tooltip-wrapper"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && content && (
                <div 
                    ref={tooltipRef}
                    className={`tooltip tooltip-${position}`}
                    style={tooltipStyle}
                >
                    {content}
                </div>
            )}
        </div>
    )
}
