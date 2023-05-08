const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button[type=submit]'),
};


refs.form.addEventListener('submit', onSubmitForm);


function createPromise(position, delay) {
  let isActive = false;

  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    

    if (isActive) {
      refs.button.removeAttribute('disabled');
      return;
    }
    isActive = true;
      refs.button.setAttribute('disabled', '');
      setInterval(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        };
      }, delay);
    

  });
};

function onSubmitForm (e) {
e.preventDefault();


  const delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = delay + i * step;
    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};
