import { ENV } from './common'

let host
// export const defaultUrl = 'ws://192.168.12.135:9944'

if (ENV === 'production') {
  host = 'https://xxx/client/v1/'
} else if (ENV === 'beta') {
  host = 'http://xxx/client/v1/'
}

const api = {
  featured: 'game/cat/id/all',
}

const http = {
  api,
  get: (url, params = {}) => {
    let finalUrl = host + url

    Object.keys(params).forEach((key, index) => {
      finalUrl += `${index === 0 ? '?' : '&'}${key}=${encodeURIComponent(
        params[key]
      )}`
    })
    const headers = {}

    return fetch(finalUrl, {
      headers,
    })
      .then(res => res.json())
      .then(res => res.json())
      .catch(err => {
        $toast.show(JSON.stringify(err))
      })
  },

  post: (url, params = {}) => {
    const opt = {}
    opt.method = 'post'
    opt.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    opt.body = JSON.stringify(params)
    return fetch(host + url, opt)
      .then(res => res.json())
      .catch(err => {
        $toast.show(JSON.stringify(err))
      })
  },
}

export default http
