import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";
export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Question",
            name: "question",
            type: "text",
            control,
        },
        {
            label: "Answer",
            name: "answer",
            type: "textarea",
            control,
        },
   

    ];

}