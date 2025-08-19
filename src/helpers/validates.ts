export const personal_email_regex = /^[^\s@]+@gmail\.com$/
export const work_email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const country_code_regex = /^\+\d{1,3}$/
export const contact_number_regex = /^\d{6,15}$/
export const whatsapp_number_regex = /^[0-9]{10}$/
export const meeting_link_regex = /\b(?:https?:\/\/)?(?:[\w-]+\.)?(zoom\.us\/j\/\d+|meet\.google\.com\/[\w-]+|teams\.microsoft\.com\/l\/meetup-join\/[\w-]+|webex\.com\/meet\/[\w-]+|gotomeeting\.com\/join\/\d+|bluejeans\.com\/\d+|whereby\.com\/[\w-]+|skype\.com\/[\w-]+)\b/