export default class Api {
  static async post(path, body) {
    const response = await fetch(`http://localhost:3000/${path}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = {
      status: response.status,
      bodyUsed: response.bodyUsed
    }
    if (!response.bodyUsed) return data
    data.body = await response.json()
    return data
  }

  static async get(path) {
    const response = await fetch(`http://localhost:3000/${path}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = {
      status: response.status
    }
    data.body = await response.json()
    return data
  }
}
