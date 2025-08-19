
import { PieChart, Pie, Cell } from 'recharts'

const data = [
  { name: 'Ryzer Token (RYZ)', value: 430090 },
  { name: 'Ethereum (ETH)', value: 225810 },
  { name: 'Tether (USDT)', value: 175000 },
]

const COLORS = ['#9b59b6', '#3498db', '#2ecc71'] // purple, blue, green

const renderCenterText = () => {
  return (
    <foreignObject x="35%" y="42%" width="30%" height="20%">
      <div className="flex flex-col items-center justify-center text-center text-sm font-semibold text-gray-700">
        <div className="text-2xl font-bold text-black">$830,900</div>
        <div className="text-sm text-gray-500">Total Value</div>
      </div>
    </foreignObject>
  )
}

const AllBalanceDonut = () => {
  return (
    
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={150}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {renderCenterText()}
        </PieChart>
      
  )
}

export default AllBalanceDonut
