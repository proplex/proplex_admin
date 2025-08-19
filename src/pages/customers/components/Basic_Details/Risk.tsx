import { HorizontalData } from '@/pages/customer/components/helper';
import { CheckCircle, Shield, TriangleAlert } from 'lucide-react'
import React from 'react'


type PersonalInfoProps = {
    userDetails: any;
};

const Risk: React.FC<PersonalInfoProps> = ({ userDetails }) => {
    return (
        <div className='border w-4/12  border-gray-200 bg-white shadow-sm rounded-lg p-5 '>
            <h1 className='text-2xl font-bold '> Risk Assesment </h1>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="bg-green-400/30 rounded-full p-5 mt-5">
                    <Shield />
                </div>
                <h1 className='text-xl font-bold'> {userDetails?.gb_score}</h1>
                <span className='bg-transparent text-xs font-bold rounded-full border border-black px-1   '>
                    {userDetails?.score_band}
                </span>

            </div>
            <div className="grid grid-cols-1 w-full space-y-2 mt-5">
                <div className="flex items-center gap-3 p-3 rounded-md border border-gray-200 bg-gray-200/10 shadow-sm">
                    <div className={`px-2  rounded-full flex items-center justify-center`}>
                   { userDetails?.aadhar_pan_linkage ? <span className='text-green-500'><CheckCircle/></span> :
                    <span className='text-yellow-500'>
                    <TriangleAlert/>
                    </span>
                    }

                    </div>
                    <div className="flex justify-between w-full">
                        <span className="text-base font-medium text-black capitalize">Aadhar Pan Linkage</span>
                        <div className="text-base font-medium text-black capitalize">
                            {userDetails?.aadhar_pan_linkage?
                             <span className='border p-1 text-xs border-gray-200 rounded-full'>Linked </span>
                             :
                        <span className='border p-1 text-xs  border-gray-200 rounded-full'> Not linked </span>
                        }</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-md border border-gray-200 bg-gray-200/10 shadow-sm">
                    <div className={`px-2  rounded-full flex items-center justify-center`}>
                   { userDetails?.state_is_blacklisted ? <span className='text-green-500'><CheckCircle/></span> :
                    <span className='text-yellow-500'>
                    <TriangleAlert/>
                    </span>
                    }

                    </div>
                    <div className="flex justify-between w-full">
                        <span className="text-base font-medium text-black capitalize">Black Listed list</span>
                        <div className="text-base font-medium text-black capitalize">
                            {userDetails?.state_is_blacklisted?
                             <span className='border px-2 py-1 text-white text-xs bg-red-500 border-gray-200 rounded-full'>Yes </span>
                             :
                        <span className='border p-1 text-xs text-green-500 border-gray-200 rounded-full'> No </span>
                        }</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-md border border-gray-200 bg-gray-200/10 shadow-sm">
                    <div className={`px-2  rounded-full flex items-center justify-center`}>
                   { userDetails?.is_tax_payer ? <span className='text-green-500'><CheckCircle/></span> :
                    <span className='text-yellow-500'>
                    <TriangleAlert/>
                    </span>
                    }

                    </div>
                    <div className="flex justify-between w-full">
                        <span className="text-base font-medium text-black capitalize">Tax Payer</span>
                        <div className="text-base font-medium text-black capitalize">
                            {userDetails?.is_tax_payer?
                             <span className='border p-1 text-xs border-gray-200 rounded-full'>Yes </span>
                             :
                        <span className='border p-1 text-xs  border-gray-200 rounded-full'> No </span>
                        }</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Risk