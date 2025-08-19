import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FormGenerator from "@/components/UseForm/FormGenerator";
import {
  assetManagementFormConfig,
  brokerageFormConfig,
  legalFormConfig,
} from "./formConfig";

function EscrowLegal({ asset }: any) {
  return (
    <div>
      <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem value="item-1" className="bg-gray-100 rounded-md">
          <AccordionTrigger className="p-4 text-lg font-bold text-gray-800">
            Service Providers
          </AccordionTrigger>
          <AccordionContent className="mx-2 mb-2">
            <div className="px-2">
              <div className="py-1">
                <div className="flex justify-between items-center">
                  <p className="text-xl">Legal Advisory</p>
                  {/* <Button>Add New</Button> */}
                </div>
                <div className="bg-white p-2 my-1 grid grid-cols-2 gap-2">
                  {FormGenerator(legalFormConfig())}
                </div>
              </div>

              <div className="py-1">
                <div className="flex justify-between items-center">
                  <p className="text-xl">Asset Management Company</p>
                  {/* <Button>Add New</Button> */}
                </div>
                <div className="bg-white p-2 my-1 grid grid-cols-2 gap-2">
                  {FormGenerator(assetManagementFormConfig())}
                </div>
              </div>

              <div className="py-1">
                <div className="flex justify-between items-center">
                  <p className="text-xl">Brokerage</p>
                  {/* <Button>Add New</Button> */}
                </div>
                <div className="bg-white p-2 my-1 grid grid-cols-2 gap-2">
                  {FormGenerator(brokerageFormConfig())}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
export default EscrowLegal;
