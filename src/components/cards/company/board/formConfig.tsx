
import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";
export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Name *",
            name: "fullName",
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
            label: "Title *",
            name: "title",
            type: "text", 
            control,
        },
        {
            label: "Permission Level *", 
            name: "permissionLevel",
            type: "select",
            options: [
                { label: "Manager", value: "manager" },
            ],
            control,
        },
        {
            label: "Status",
            name: "status", 
            type: "select",
            options: [
                { label: "Active", value: "active" },
            ],
            control,
        },
        {
            label: "Have DSC & DIN?",
            name: "hasDscDin",
            type: "select", 
            options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
            ],
            control,
        },
        {
            label: "Relevant document",
            name: "relevantDocument",
            type: "file",
            control,
        },
        {
            label: "Provides customer support?",
            name: "providesCustomerSupport", 
            type: "select",
            options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
            ],
            control,
        },
        {
            label: "Whatsapp number",
            name: "whatsappNumber",
            type: "text",
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