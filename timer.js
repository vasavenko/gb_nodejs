import moment from "moment";
import EventEmitter from 'events';

const myEmitter = new EventEmitter;

const [ dateEnd ] = process.argv.slice(2);

const dateStr = (date) => {
  let dt = date.split('-');
  if (dt.length == 1) dt = ['00', '00', '00', '01', '01', ...dt];
  else if (dt.length == 2) dt = ['00', '00', '00', '01', ...dt];
  else if (dt.length == 3) dt = ['00', '00', '00', ...dt];
  else if (dt.length == 4) dt = ['00', '00', ...dt];
  else if (dt.length == 5) dt = ['00', ...dt];
  let str = dt.join('-');
return str
}

const endDate = moment(dateStr(dateEnd), 'ss-mm-hh-DD-MM-YYYY');

const timer = setInterval(() => {
  let ms_left = new Date(endDate) - new Date();
  if (isNaN(ms_left)) {
    myEmitter.emit('error');
  } else if (ms_left <= 0) {
    myEmitter.emit('end');
  } else {
    myEmitter.emit('time', ms_left);
  }
}, 1000);

myEmitter.on('error', () => {
    // console.clear();
    console.log('Дата введена не правильно!');
    clearInterval(timer);
    myEmitter.removeAllListeners();
})

myEmitter.on('end', () => {
    console.clear();
    console.log('Время вышло!');
    clearInterval(timer);
    myEmitter.removeAllListeners();
})

myEmitter.on('time', (payload) => {
  let res = new Date(payload);
  let str_timer = `${res.getUTCFullYear() - 1970}.${res.getUTCMonth()}.${res.getUTCDate() - 1} ${res.getUTCHours()}:${res.getUTCMinutes()}:${res.getUTCSeconds()}`;
    console.clear();
    console.log(str_timer);
})
