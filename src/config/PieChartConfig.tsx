
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartConfigProps {
  labels: string[];
  values: number[];
  className?: string;
}

const PieChartConfig = ({
  labels = [],
  values = [],
  className,
}: PieChartConfigProps) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset',
        data: values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 20,
          boxHeight: 10,
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartConfig;
