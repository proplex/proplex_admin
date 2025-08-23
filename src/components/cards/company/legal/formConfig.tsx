import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";

export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Name",
            name: "name",
            type: "text",
            control,
            placeholder: "Enter legal advisor's name",
            rules: {
                required: "Name is required",
                pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Only letters and spaces are allowed",
                },
            },
            bottomText: "Legal advisor's professional name"
        },
        {
            label: "Full Name",
            name: "fullName",
            type: "text",
            control,
            placeholder: "Enter legal advisor's full legal name",
            bottomText: "Complete legal name for official documentation"
        },
        {
            label: "Firm",
            name: "firm",
            type: "text",
            control,
            placeholder: "Enter the name of the legal firm",
            bottomText: "Name of the law firm they represent"
        },
        {
            label: "Firm Name",
            name: "firmName",
            type: "text",
            control,
            placeholder: "Enter the full name of the legal firm",
            bottomText: "Complete name of the law firm for official records"
        },
        {
            label: "Email Address",
            name: "email",
            type: "text",
            control,
            placeholder: "legaladvisor@example.com",
            rules: {
                required: "Email is required",
                pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                    message: "Invalid email address",
                },
            },
            bottomText: "Official email for legal correspondence"
        },
        {
            label: "Phone Number",
            name: "phone",
            type: "text",
            control,
            placeholder: "9876543210",
            rules: {
                required: "Phone number is required",
                pattern: {
                    value: /^[0-9]{10}$/i,
                    message: "Invalid phone number (10 digits required)",
                },
            },
            bottomText: "Primary contact number for the legal advisor"
        },
        {
            label: "Area of Expertise",
            name: "areaOfExpertise",
            type: "text",
            control,
            placeholder: "e.g., Corporate Law, Intellectual Property",
            rules: {
                required: "Area of expertise is required",
            },
            bottomText: "Primary legal specialization or practice area"
        },
        {
            label: "Type",
            name: "type",
            type: "select",
            options: [
                { label: "Adviser", value: "adviser" }
            ],
            control,
            placeholder: "Select advisor type",
            rules: {
                required: "Advisor type is required",
            },
            bottomText: "Role or capacity of the legal advisor"
        },
        {
            label: "Admin Notes",
            name: "adminNotes",
            type: "textarea",
            control,
            placeholder: "Enter any additional notes about this legal advisor",
            bottomText: "Internal notes for administrative purposes"
        }
    ]
}