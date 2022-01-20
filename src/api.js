import axios from 'axios'

let api = axios.create({
  headers: {
    'Client-ID': '1rgne4rwytzjvknmpna3bzniq996t9',
    Authorization: 'Bearer 1jii8oo4b0p0b82hvixfokjepyrlav',
  },
})

/*
    CLIENT_ID = '1rgne4rwytzjvknmpna3bzniq996t9';
    REDIRECT = 'http://127.0.0.1/';
    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id=1rgne4rwytzjvknmpna3bzniq996t9&redirect_uri=http://localhost&response_type=token
*/

export default api
