import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import useSpvNames from "@/hooks/spv/useSpvNames";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

export const formConfig = ({ asset }: { asset: any }): FormFieldConfig[] => {
  const { id } = useParams<{ id?: string }>();
  const { control, setValue } = useFormContext();
  const { spvNames, fetchSpv, fetchSpvNames } = useSpvNames();

  const fetchedSpv = async (id: string) => {
    if (id) {
      setValue("companyId", id);
      await fetchSpv(id).then((res) => {
        console.log(res);
        setValue("currency", res?.currency ?? "INR");
        setValue("company", res);
      });
    }
  };
  const { companyId, company } = asset || {};

  if (id && companyId) {
    return [
      {
        name: "companyId",
        control,
        type: "select",
        label: "Company",
        options: [
          {
            label: company?.name,
            value: companyId,
          },
        ],
        disabled: true,
      },
    ];
  }

  return [
    {
      name: "companyId",
      control,
      type: "select",
      label: "Company",
      options: spvNames,
      rules: { required: "Company is required" },
      onChange: (value) => {
        fetchedSpv(value);
      },
      onBlur: () => {
        fetchSpvNames();
      }
    },
  ];
};
