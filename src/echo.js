// echo.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: '924727f7ea8fdec16fab',         // from your .env
  cluster: 'ap1', // e.g., 'ap1', 'mt1'
  forceTLS: true,
});

export default echo;
