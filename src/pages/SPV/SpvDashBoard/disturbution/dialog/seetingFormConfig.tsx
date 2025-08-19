import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { Control } from 'react-hook-form';
import { DollarSign } from 'lucide-react';

export const seetingFormConfig = ({
    control,
}: {
    control: Control;
}): FormFieldConfig[] => {
    return [
        {
            type: "text",
            name: "distributionName",
            control,
            label: "Distribution Name",
            placeholder: "Enter Distribution Name",
            fullWidth: true,
        },
        {
            type: "number",
            name: "amount",
            control,
            label: "Amount To Distribute",
            placeholder: "Enter Amount",
            fullWidth: false,
        },
        {
            type: "date",
            name: "distributeDate",
            control,
            label: "Distribute Date",
            placeholder: "Enter Distribute Date",
        },
   
        {
            type: "select",
            name: "distributeDate",
            control,
            fullWidth: true,
            label: "Distribute Date",
            placeholder: "Enter Distribute Date",
            options: [
                {
                    label: "Proposal to Investment",
                    value: "Proposal toInvestment",
                },
                {
                    label: "Equal Distribution",
                    value: "Equal Distribution",
                },
                {
                    label: "Custom Allocation",
                    value: "Custom Allocation",
                },

            ],
        }



    ];
}