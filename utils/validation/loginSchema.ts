import { z } from "zod";

export const loginSchema = z.object({
email: z.string().email('email is not correct'),
password: z.string().min(6,'password should be atleast 6 characters')
})


export type loginFormData = z.infer<typeof loginSchema>
