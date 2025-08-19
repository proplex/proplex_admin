import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import RegalTable from './RegalTable';

interface AccordionComponentProps {
  fields: Array<any>;
  update: (index: number, value: any) => void;
  setIndex: (index: number | null) => void;
  setDeleteIndex: (index: number | null) => void;
  handleAdd: () => void;
  totalNumberOfSfts: number;
  pricePerSft: number;
}

const AccordionComponent: React.FC<AccordionComponentProps> = ({ fields, update, setIndex, setDeleteIndex, handleAdd, totalNumberOfSfts, pricePerSft }) => {
  return (
    <Accordion type='single'  collapsible>
      <AccordionItem value='item-1' className='bg-gray-100 rounded-md'>
        <AccordionTrigger className='p-4 text-lg font-bold text-gray-800'>
          Legal Fee
        </AccordionTrigger>
        <AccordionContent className='bg-white mx-2 my-3 space-y-2'>
          <RegalTable
            fields={fields}
            update={update}
            setIndex={setIndex}
            setDeleteIndex={setDeleteIndex}
          />
          <Button
            type='button'
            variant='secondary'
            onClick={handleAdd}
            className='mx-2'
            disabled={!totalNumberOfSfts || !pricePerSft}
          >
            <span className='text-lg'>+</span>
            <span>Add Fee</span>
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionComponent;