import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";

export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Full Name",
            name: "fullName",
            type: "text",
            control,
            placeholder: "Enter board member's full name",
            rules: {
                required: "Full name is required",
                pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Only letters and spaces are allowed",
                },
            },
            bottomText: "Enter the board member's complete legal name"
        },
        {
            label: "Email Address",
            name: "email",
            type: "text",
            control,
            placeholder: "boardmember@example.com",
            rules: {
                required: "Email is required",
                pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                    message: "Invalid email address",
                },
            },
            bottomText: "Official email address for communication"
        },
        {
            label: "Title/Position",
            name: "title",
            type: "text",
            control,
            placeholder: "e.g., Chairman, Director, CEO",
            rules: {
                required: "Title is required",
            },
            bottomText: "The board member's official title or position"
        },
        {
            label: "Permission Level",
            name: "permissionLevel",
            type: "select",
            options: [
                { label: "Manager", value: "manager" },
            ],
            control,
            placeholder: "Select permission level",
            rules: {
                required: "Permission level is required",
            },
            bottomText: "Access level for company systems and records"
        },
        {
            label: "Status",
            name: "status",
            type: "select",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
            ],
            control,
            placeholder: "Select status",
            bottomText: "Current employment status"
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
            placeholder: "Select option",
            bottomText: "Digital Signature Certificate and Director Identification Number"
        },
        {
            label: "Relevant Document",
            name: "relevantDocument",
            type: "file",
            control,
            accept: ['image/*', '.pdf'],
            bottomText: "Upload identification or authorization documents"
        },
        {
            label: "Provides Customer Support?",
            name: "providesCustomerSupport",
            type: "select",
            options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
            ],
            control,
            placeholder: "Select option",
            bottomText: "Does this board member handle customer inquiries?"
        },
        {
            label: "WhatsApp Number",
            name: "whatsappNumber",
            type: "text",
            control,
            placeholder: "9876543210",
            rules: {
                pattern: {
                    value: /^[0-9]{10}$/i,
                    message: "Invalid phone number (10 digits required)",
                },
            },
            bottomText: "Optional: WhatsApp number for direct communication"
        },
        {
            label: "Admin Notes",
            name: "adminNotes",
            type: "textarea",
            control,
            placeholder: "Enter any additional notes about this board member",
            bottomText: "Internal notes for administrative purposes"
        }
    ]
}