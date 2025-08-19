
const Exepenses = ({
  title,
  extraText,
  sqft,
  grossRent,
  netRent,
  expenses = 0,
  currency = "inr",
}: {
  title: string;
  extraText: string;
  sqft: number;
  grossRent: number | string;
  netRent: number | string;
  expenses?: number | string;
  currency?: string;
}) => {
  const currencySymbol = currency === "inr" ? "₹" : "$";
  return (
    <div className='bg-white flex flex-col rounded-lg shadow-sm border border-gray-200 overflow-hidden  transition-all duration-300'>
      <div className='flex justify-between items-center w-full p-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white'>
        <div className='flex items-center gap-2'>
          <h1 className='text-lg font-semibold'>{title}</h1>
        </div>
        <span className='rounded-full bg-gray-500 text-white px-3 py-1  text-sm shadow-sm'>
          {sqft} sft
        </span>
      </div>
      <div className='bg-white flex flex-col p-5 space-y-4'>
        <div className='flex justify-between gap-6 w-full'>
          <div className='flex flex-col items-start p-3  rounded-md flex-1'>
            <h1 className='text-sm text-gray-500 mb-1'>Gross Rent</h1>
            <span className='text-lg font-semibold text-slate-800'>
              {currencySymbol} {grossRent}
            </span>
          </div>
          <div className='flex flex-col items-start p-3  rounded-md flex-1'>
            <h1 className='text-sm text-gray-500 mb-1'>Expenses</h1>
            <span className='text-lg font-bold '>{currencySymbol} {expenses}</span>
          </div>
        </div>

        <div className='bg-gradient-to-r from-slate-100 to-slate-200 p-4 rounded-md flex justify-between items-center mt-2'>
          <div className='flex flex-col'>
            <h1 className='font-medium text-sm text-slate-700'>Net {title}</h1>
            <p className='text-sm text-gray-500'> {extraText}</p>
          </div>
          <span className='text-md font-bold text-black'>{currencySymbol} {netRent}</span>
        </div>
      </div>
    </div>
  );
};

export default Exepenses
