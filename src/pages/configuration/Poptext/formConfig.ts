import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";
export const formConfig = (control: Control<any>): FormFieldConfig[] => {
  return [
    {
      label: "Type",
      name: "type",
      type: "text",
      control,
    },
    {
      label: "Subtitle",
      name: "subtitle",
      type: "text",
    control,
    },
    {
      label: "Description",
      name: "description",
      type: "text",
     control,
    },
  ];
  
}