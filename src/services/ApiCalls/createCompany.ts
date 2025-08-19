import api from "@/lib/httpClient"

export const createCompany = (body:any) => {
  return api.post('company/create', {
    ...body
  })
}