import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";
export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Account holder name",
            name: "accountHolderName",
            type: "text",
            control,
        },
        {
            label: "Account number",
            name: "accountNumber",
            type: "text",
            control,
        },
        {
            label: "IFSC Code",
            name: "ifscCode",
            type: "text",
            control,
        },
        {
            label: "Category",
            name: "category",
            type: "select",
            options: [
                { label: "Brokerage", value: "brokerage" },
                { label: "Legal", value: "legal" },
            ],
            control,
        },
        {
            label: "Additional information",
            name: "additionalInformation",
            type: "textarea",
            control,
        },
   
    ]

}