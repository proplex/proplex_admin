import FormGenerator from '@/components/UseForm/FormGenerator'
import formConfig from './formConfig'

const index = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">Investor Requirements & Timeline</h2>
        <p className="text-gray-600 text-sm">Configure investment criteria and timeline for your asset tokenization</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FormGenerator(formConfig())}
      </div>
    </div>
  )
}

export default index
