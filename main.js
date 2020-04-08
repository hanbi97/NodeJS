const Promise = require('./Promise');

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), ms);
  });
}

wait(100)
  .then(() => {
    console.log('first then');

    return wait(100);
  })
  .then(() => {
    console.log('second then');

    return wait(100);
  })
  .then(() => {
    console.log('third then');

    throw new Error('go to error handler');
  })
  .then(() => {
    console.log('this is last then handler!');
  })
  .catch((err) => {
    console.log('this is error handler');
    console.log(err.message);
  });