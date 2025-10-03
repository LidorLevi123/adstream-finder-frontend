import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Tooltip as TooltipCmp } from './Tooltip'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function StatsDisplay({ data }) {
  // Calculate counts for each category
  const counts = {
    streamingAndAds: data.filter(item => item.hasStreaming && item.hasAds).length,
    streamingOnly: data.filter(item => item.hasStreaming && !item.hasAds).length,
    adsOnly: data.filter(item => !item.hasStreaming && item.hasAds).length,
    noCrawl: data.filter(item => item.error).length
  }

  const chartData = {
    labels: ['Streaming & Ads', 'Streaming Only', 'Ads Only', 'Could Not Crawl'],
    datasets: [
      {
        label: `Number of Domains (${data.length})`,
        data: [counts.streamingAndAds, counts.streamingOnly, counts.adsOnly, counts.noCrawl],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 3
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Domain Analysis Results'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  }

  return (
    <div className="stats-display">
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}