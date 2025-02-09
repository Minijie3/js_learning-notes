const containerMovements = document.querySelector('.movements');
const containerApp = document.querySelector('.app');

const balanceValue = document.querySelector('.balance__value');
const valueIn = document.querySelector('.summary__value--in');
const valueOut = document.querySelector('.summary__value--out');
const valueInterest = document.querySelector('.summary__value--interest');

const usrLoginInput = document.querySelector('.login__input--user');
const usrLoginPin = document.querySelector('.login__input--pin');
const usrTransferTo = document.querySelector('.form__input--to');
const usrTransferAmount = document.querySelector('.form__input--amount');
const usrLoanAmount = document.querySelector('.form__input--loan-amount');
const usrCloseUsername = document.querySelector('.form__input--user');
const usrClosePin = document.querySelector('.form__input--pin');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const welcome = document.querySelector('.welcome');
const loginDate = document.querySelector('.date');
const timer = document.querySelector('.timer');

const usrnames = [];
let accLogin = undefined;

const computingUsername = function (data) {
    for (const key in data) {
        const acc = data[`${key}`];
        acc.username = acc?.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('') + acc.order;
        usrnames.push(acc.username);
    };
};

const displayMovements = function (acc) {
    containerMovements.innerHTML = '';
    for (var i = 0; i < acc.movements.length; i++) {
        (function (index) {
            const type = acc.movements[index] > 0 ? 'deposit' : 'withdrawal';
            const date = new Date(acc.movementsDates[index]);
            const now = new Date();
            const calcDaysPassed = (date1, date2) =>
                Math.floor(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
            const daysDff = calcDaysPassed(date, now);
            const currencyFmt = new Intl.NumberFormat(acc.locale, {
                style: 'currency',
                currency: acc.currency,
            }).format(acc.movements[index].toFixed(2));
            let dateFmt;
            if (daysDff === 0) dateFmt = `Today`;
            else if (daysDff <= 7) dateFmt = `${daysDff} days ago`;
            else dateFmt = new Intl.DateTimeFormat(acc.locale).format(date);

            const htmlAdd = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__date">${dateFmt}</div>
          <div class="movements__value">${currencyFmt}</div>
        </div>
      `;
            containerMovements.insertAdjacentHTML('afterbegin', htmlAdd);
        })(i);
    };
};// foreach method is also availabel

const displayBalanceAndDetail = function (acc) {
    const crrBalance = acc.movements.reduce((crrBalance, mov) => crrBalance + mov, 0);
    const [valuein, valueout] = acc.movements.reduce((sums, mov) => {
        mov >= 0 && (sums[0] += mov) || (sums[1] += mov);
        return sums;
    }, [0, 0]);
    const interest = acc.movements
        .filter(mov => (mov >= 0))
        .map(mov => mov * acc.interestRate / 100)
        .reduce((acc, cur) => acc + cur, 0);
    const currs = [crrBalance, valuein, valueout, interest];
    const textContents = [balanceValue, valueIn, valueOut, valueInterest];
    acc.balanceValue = crrBalance;
    for (const [index, currency] of currs.entries()) {
        const currencyFmt = new Intl.NumberFormat(acc.locale, {
            style: 'currency',
            currency: acc.currency,
        }).format(currency.toFixed(2));
        textContents[index].textContent = currencyFmt;
    };
};

const logOut = function (acc) {
    containerApp.style.opacity = 0;
    welcome.textContent = 'Log in to get started';
    accLogin = undefined;
    console.log(`${acc.owner} logged out.`)
}

const timeOutClose = function (acc) {
    let time = 300;
    const timerClock = setInterval(() => {
        const mins = String(Math.trunc(time / 60)).padStart(2, 0);
        const secs = String(time % 60).padStart(2, 0);
        timer.textContent = `${mins}:${secs}`;
        time--;
        if (time == -1) {
            clearInterval(timerClock);
            logOut(acc);
        };
    }, 1000);
};
const usrLogin = function (data) {
    const accounts = Object.values(data);
    let sorted = false;

    btnLogin.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('Someone is logining...');

        accLogin = accounts.find(acc => acc.username === usrLoginInput.value);
        if (accLogin?.pin === + usrLoginPin.value) {
            console.log('Login Successful: ' + accLogin.owner);
            usrLoginInput.value = usrLoginPin.value = '';
            containerApp.style.opacity = 100;
            const now = new Date();
            loginDate.textContent = new Intl.DateTimeFormat(accLogin.locale).format(now);

            welcome.textContent = `Welcome back, ${accLogin.owner.split(' ')[0]}`;
            displayMovements(accLogin);
            displayBalanceAndDetail(accLogin);
            timeOutClose(accLogin);
        } else alert('The user name or password is incorrect');
    });

    btnTransfer.addEventListener('click', function (event) {
        event.preventDefault();
        if (accLogin) {
            console.log('Transfering...');
            const receiverAcc = accounts.find(acc => acc.username === usrTransferTo.value);
            const amount = + usrTransferAmount.value || 0;
            const balance = accLogin.balanceValue;

            if (receiverAcc && balance >= amount && amount > 0) {
                receiverAcc.movements.push(amount);
                receiverAcc.movementsDates.push(new Date().toISOString());
                accLogin.movements.push(-amount);
                accLogin.movementsDates.push(new Date().toISOString());
                console.log(`${accLogin.owner} has transferred ${amount} to ${receiverAcc.owner} (${accLogin.currency}).`);
            }
            else if (receiverAcc && balance < amount) alert('Not enough balance.');
            else if (receiverAcc && amount <= 0) alert('Please enter a valid amount.');
        } else;
        displayMovements(accLogin);
        displayBalanceAndDetail(accLogin);
    });

    btnLoan.addEventListener('click', function (event) {
        event.preventDefault();
        if (accLogin) {
            console.log('Loaning...');
            const amount = + usrLoanAmount.value || 0;

            if (amount > 0 && accLogin.movements.some(mov => mov >= amount * 0.1)) {
                setTimeout(() => {
                    accLogin.movements.push(Math.floor(amount));
                    accLogin.movementsDates.push(new Date().toISOString());
                    console.log('Loan Successful:' + accLogin.owner + 'has loaned ' + Math.floor(amount) + `(${accLogin.currency})`);
                    displayMovements(accLogin);
                    displayBalanceAndDetail(accLogin);
                }, 2500);
            }
            else if (!accLogin.movements.some(mov => mov >= amount * 0.1))
                alert('You need to deposit at least ten percent of the amount you need to borrow in a given deposit.');
            else alert('Please enter a valid amount.');
        } else;
    });

    btnSort.addEventListener('click', function (event) {
        event.preventDefault();
        if (accLogin && !sorted) {
            const accLoginCopy = { ...accLogin };
            const dataPairs = accLogin.movements.map((mov, index) => (
                {
                    mov,
                    date: accLogin.movementsDates[index]
                }
            ));
            dataPairs.sort((a, b) => a.mov - b.mov);// Closure
            dataPairs.forEach((dataPair, index) => {
                accLoginCopy.movements[index] = dataPair.mov;
                accLoginCopy.movementsDates[index] = dataPair.date;
            });
            displayMovements(accLoginCopy);
        } else;
    });

    btnClose.addEventListener('click', function (event) {
        event.preventDefault();
        if (accLogin) {
            if (accLogin.username === usrCloseUsername.value && accLogin.pin === + usrClosePin.value) {
                console.log(accLogin.owner + 'has closed the account.');
                logOut(accLogin);
            };
        } else;
    });
};

const main = function (data) {
    computingUsername(data);
    console.log(usrnames);
    usrLogin(data);
};

// fetch is an asynchronous operation
fetch('./accountData.json')
    .then(response => response.json())
    .then(data => {
        main(data);
    })
    .catch(error => console.error('Error loading JSON:', error)); 