import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";
export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Name",
            name: "name",
            type: "text",
            control,
        },
        {
            label: "Value",
            name: "value",
            type: "textarea",
            control,
        },

    ];

}