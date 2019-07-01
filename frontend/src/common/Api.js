export default class Api {
  static post(path, data) {
    return fetch(`http://localhost:3000/${path}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  static get(path, data) {
    return fetch(`http://localhost:3000/${path}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
