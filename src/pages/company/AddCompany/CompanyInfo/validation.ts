

import { z } from 'zod';

const companyinfoValidation = (isCreate: boolean) =>
  z.object({
    name: z.string().min(1, { message: 'Company name is required' }),
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
      .optional()
      .nullable()
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          val === '' ||
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        {
          message: 'Invalid email format',
        }
      ),
    phone: z
      .string()
      .regex(/^\+?[0-9]*$/, {
        message: 'Invalid phone number',
      })
      .nullable()
      .optional(),
    state: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    pincode: z.string().nullable().optional(),
    address: z.string().optional(),
    llp_agreement_copy_file: z.string().optional(),
  })

export default companyinfoValidation;
