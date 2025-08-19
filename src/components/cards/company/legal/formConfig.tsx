// Name *
// Full Name
// Firm
// Firm Name
// Email *
// Email
// Phone *
// Phone
// Area of Expertise *
// Area of Expertise
// Type *
// Adviser
// Admin notes

import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";
export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Name *",
            name: "name",
            type: "text",
            control,
        },
        {
            label: "Full Name",
            name: "fullName",
            type: "text",
            control,
        },
        {
            label: "Firm",
            name: "firm",
            type: "text",
            control,
        },
        {
            label: "Firm Name",
            name: "firmName",
            type: "text",
            control,
        },
        {
            label: "Email *",
            name: "email",
            type: "text",
            control,
        },
        {
            label: "Phone *",
            name: "phone",
            type: "text",
            control,
        },
        {
            label: "Area of Expertise *",
            name: "areaOfExpertise",
            type: "text",
            control,
        },
        {
            label: "Type *",
            name: "type",
            type: "select",
            options: [
                { label: "Adviser", value: "adviser" }
            ],
            control,
        },
        {
            label: "Admin notes",
            name: "adminNotes",
            type: "textarea",
            control,
        }
    ]

}