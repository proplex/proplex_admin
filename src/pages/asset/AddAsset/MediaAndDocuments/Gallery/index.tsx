

import FormGenerator from '@/components/UseForm/FormGenerator';
import formConfig from './formConfig';

const Index = () => {
   return(
  
    <div className='grid  gap-2'>{FormGenerator(formConfig())}</div>
    
  

   );
};
export default Index;
