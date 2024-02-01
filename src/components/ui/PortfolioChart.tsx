import { Pie } from 'react-chartjs-2'

import { useCrypto } from '@/context'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export const PortfolioChart = () => {
  const { assets } = useCrypto()

  const data = {
    datasets: [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        data: assets.map(a => a.totalAmount),
        label: '$',
      },
    ],
    labels: assets.map(a => a.name),
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '400px',
        justifyContent: 'center',
        marginBottom: '1rem',
      }}
    >
      <Pie data={data} />
    </div>
  )
}
