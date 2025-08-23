import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { Control } from "react-hook-form";

export const formConfig = (control: Control<any>): FormFieldConfig[] => {
    return [
        {
            label: "Account Holder Name",
            name: "accountHolderName",
            type: "text",
            control,
            placeholder: "Enter full name as it appears on bank account",
            rules: {
                required: "Account holder name is required",
                pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Only letters and spaces are allowed",
                },
            },
            bottomText: "This should match the name on your bank account"
        },
        {
            label: "Account Number",
            name: "accountNumber",
            type: "text",
            control,
            placeholder: "Enter your bank account number",
            rules: {
                required: "Account number is required",
                pattern: {
                    value: /^[0-9]+$/i,
                    message: "Account number should contain only digits",
                },
                minLength: {
                    value: 9,
                    message: "Account number must be at least 9 digits",
                },
                maxLength: {
                    value: 18,
                    message: "Account number must be less than 18 digits",
                },
            },
            bottomText: "Your bank account number (9-18 digits)"
        },
        {
            label: "IFSC Code",
            name: "ifscCode",
            type: "text",
            control,
            placeholder: "e.g., SBIN0002499, HDFC0001234",
            rules: {
                required: "IFSC code is required",
                pattern: {
                    value: /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/i,
                    message: "Invalid IFSC code format (e.g., SBIN0002499)",
                },
                maxLength: {
                    value: 11,
                    message: "IFSC code must be exactly 11 characters",
                },
            },
            bottomText: "11-character bank identifier code"
        },
        {
            label: "Category",
            name: "category",
            type: "select",
            options: [
                { label: "Brokerage", value: "brokerage" },
                { label: "Legal", value: "legal" },
            ],
            control,
            placeholder: "Select account category",
            bottomText: "Select the appropriate category for this account"
        },
        {
            label: "Additional Information",
            name: "additionalInformation",
            type: "textarea",
            control,
            placeholder: "Enter any additional information about this account",
            bottomText: "Optional: Provide any relevant details about this account"
        },
    ]
}