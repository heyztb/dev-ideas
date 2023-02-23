import { HCAPTCHA_SECRET } from '$env/static/private'

export const verifyToken = async (token: string): Promise<boolean> => {
  if (token === '') {
    return false
  }

  const data = { secret: HCAPTCHA_SECRET, response: token }
  const body = new URLSearchParams(data)

  const res = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    body,
  })

  const responseBody = await res.json()

  // nullish coallescing so if there is for some reason an invalid json response, or the success field is not present, we default to false. breaks things but also prevents things from being broken more in case hcaptcha stops working for whatever reason
  return responseBody['success'] ?? false
}