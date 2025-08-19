import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";
export const formConfig = (control: Control<any>): FormFieldConfig[] => {
  return [
    {
      label: "Title",
      name: "title",
      type: "text",
      control,
    },
    {
      label: "Description",
      name: "description",
      type: "text",
    control,
    },
    {
      label: "Attaachment",
      name: "attachment",
      accept: ["image/*"],  
      type: "file",
     control,
    },
  ];
  
}