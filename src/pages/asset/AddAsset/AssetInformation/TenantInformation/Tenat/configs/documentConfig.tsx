import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { TENANT_TYPE } from "@/constants/global";
import { useFormContext } from "react-hook-form";

export const documentConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();

  return [
    {
      type: "file",
      name: `tenants.${index}.agreement`,
      control,
      label: "Upload Agreement ",
      fullWidth: true,
      accept: ["PDF", "DOC", "DOCX"],
    },
    {
      type: "image",
      name: `tenants.${index}.logo`,
      control,
      label: "Upload Logo",
      accept: ["jpg", "jpeg", "png", "webp", "svg"],
      fullWidth: true,
    },
  ];
};
