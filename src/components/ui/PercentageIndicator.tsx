



interface PercentageIndicatorProps {
  value: number;
  showProgress?: boolean;
  className?: string;
}

export default function PercentageIndicator({
  value,
  showProgress = true,
  className = '',
}: PercentageIndicatorProps) {
  // Format the percentage with a + sign for positive values
  const formattedValue =
    value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className='text-lg font-medium'>{formattedValue}</div>
      {showProgress && (
        <div className='h-1.5 w-full bg-gray-200 rounded-full relative'>
          <div
            className='absolute w-3 h-3 bg-gray-700 rounded-full top-1/2 -translate-y-1/2'
            style={{ left: `${value}%` }}
          />
        </div>
      )}
    </div>
  );
}
