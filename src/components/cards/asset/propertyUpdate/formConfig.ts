import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";
export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Type",
            name: "type",
            type: "select",
            control,
        },
        {
            label: "Description",
            name: "description",
            type: "textarea",
            control,
        },
   

    ];

}