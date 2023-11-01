import io from 'socket.io-client';

export const base_URL = 'http://localhost:4000'
export const socket = io(`${base_URL}`)
