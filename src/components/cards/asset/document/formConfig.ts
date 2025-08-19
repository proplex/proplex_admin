import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";
import { File } from "lucide-react";
export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Type",
            name: "type",
            type: "select",
            control,
        },
        {
            label: "Document ID",
            name: "documentId",
            type: "text",
            control,
        },
        {
            label: "Choose File",
            name: "file",
            type: "file",
            control,
        },

    ];

}