import { z } from 'zod';

const companyinfoValidation = (isCreate: boolean) =>
  z.object({
    name: z.string().min(1, { message: 'Company name is required' }),
    industry: z.string().min(1, { message: 'Industry is required' }),
    instrument: z.string().min(1, { message: 'Instrument is required' }),
    incorporation_type: z
      .string()
      .min(1, { message: 'Incorporation type is required' }),
    llp_agreement_copy: z.string().optional(),
    moa: z
      .string()
      .optional(),
    aoi: z
      .string()
      .optional(),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    phone: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .regex(/^[0-9]{10}$/, {
        message: 'Invalid phone number (10 digits required)'
      }),
    state: z.string().min(1, { message: 'State is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    pincode: z
      .string()
      .min(1, { message: 'Pincode is required' })
      .regex(/^[0-9]{6}$/, {
        message: 'Invalid pincode (6 digits required)'
      }),
    address: z.string().min(1, { message: 'Address is required' }),
    llp_agreement_copy_file: z.string().optional(),
  })

export default companyinfoValidation;