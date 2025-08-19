import { FormFieldConfig } from "@/components/UseForm/ControllerMap"
import { Control } from "react-hook-form"

export const formConfig = (control: Control<any>, header: string): FormFieldConfig[] => {
  return [
    {
      type: "text",
      name: "amenityName",
      control,
      label: `${header} Name`,
      placeholder: `Enter ${header} Name`,
    },
    {
        type: "textarea",
        name: "description",
        control,
        label: "Description",
        placeholder: "Enter Description",
        },
  
    {
      type: "image",
      name: "image",
      control,
      label: "Image",
      placeholder: "Upload Image",
    },
    {
        type : "switch",
        name : "status",
        control,
        label:"Status",
        placeholder: "Status",
    }
  ]
}
