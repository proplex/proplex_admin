import CardConfig from '@/components/spv/CardConfig'
import Investor from './Investor'
const index = () => {
    return (
        <div className=''>
            <header className='flex h-16 shrink-0 items-center justify-between p-4'>
                <div>
                    <h1 className='text-xl font-semibold'>Investors</h1>
                    <p className='text-sm text-muted-foreground'>
                        Manage investors and their investments in this  SPV
                    </p>
                </div>
            </header>
            <div className="grid grid-cols-3 gap-4 p-4">
                <CardConfig title="Total Investors" value="10" />
                <CardConfig title="Total Investment" value=" $ 10" />
                <CardConfig title="Average Investment" value=" $ 10" />
            </div>
            <div className="p-4">
                <Investor />
            </div>
        </div>
    )
}

export default index
