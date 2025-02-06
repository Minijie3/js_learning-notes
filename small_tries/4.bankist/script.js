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

const welcome = document.querySelector('.welcome');

const usrnames = [];

const computingUsername = function (data) {
    for (const key in data) {
        const account = data[`${key}`];
        account.username = account?.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('') + account.order;
        usrnames.push(account.username);
    };
};

const displayMovements = function (movementsArr) {
    containerMovements.innerHTML = '';
    for (var i = 0; i < movementsArr.length; i++) {
        (function (index) {
            const type = movementsArr[index] > 0 ? 'deposit' : 'withdrawal';
            const htmlAdd = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__date"></div>
          <div class="movements__value">${movementsArr[index]}€</div>
        </div>
      `;
            containerMovements.insertAdjacentHTML('afterbegin', htmlAdd);
        })(i);
    };
};// foreach method is also availabel

const displayBalanceAndDetail = function (account) {
    const crrBalance = account.movements.reduce((crrBalance, mov) => crrBalance + mov, 0);
    balanceValue.textContent = crrBalance + '€';
    const [valuein, valueout] = account.movements.reduce((sums, mov) => {
        mov >= 0 && (sums[0] += mov) || (sums[1] += mov);
        return sums;
    }, [0, 0]);
    const interest = account.movements
        .filter(mov => (mov >= 0))
        .map(mov => mov * account.interestRate / 100)
        .reduce((acc, cur) => acc + cur, 0);
    valueIn.textContent = valuein + '€';
    valueOut.textContent = Math.abs(valueout) + '€';
    valueInterest.textContent = interest + '€';
};

const usrLogin = function (data) {
    const accounts = Object.values(data);
    let accLogin = undefined;

    btnLogin.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('Someone is logining...');

        accLogin = accounts.find(acc => acc.username === usrLoginInput.value);
        if (accLogin?.pin === Number(usrLoginPin.value)) {
            console.log('Login Successful: ' + accLogin.owner);
            usrLoginInput.value = usrLoginPin.value = '';
            containerApp.style.opacity = 100;

            welcome.textContent = `Welcome back, ${accLogin.owner.split(' ')[0]}`;
            displayMovements(accLogin.movements);
            displayBalanceAndDetail(accLogin);
        } else alert('Wrong Credentials.');
    });

    btnTransfer.addEventListener('click', function (event) {
        event.preventDefault();
        if (accLogin) {
            console.log('Transfering...');
            const receiverAcc = accounts.find(acc => acc.username === usrTransferTo.value);
            const amount = Number(usrTransferAmount.value) || 0;
            const balance = Number(balanceValue.textContent.slice(0, -1));

            if (receiverAcc && balance >= amount && amount > 0) {
                receiverAcc.movements.push(amount);
                accLogin.movements.push(-amount);
                console.log(`${accLogin.owner} has transferred ${amount} to ${receiverAcc.owner}.`);
            }
            else if (receiverAcc && balance < amount) console.log('Not enough balance.');
            else if (receiverAcc && amount <= 0) console.log('Please enter a valid amount.');
        } else alert('Please login first.');
        displayMovements(accLogin.movements);
        displayBalanceAndDetail(accLogin);
    });

    btnLoan.addEventListener('click', function (event) {
        event.preventDefault();
        if (accLogin) {
            console.log('Loaning...');
            const amount = Number(usrLoanAmount.value) || 0;

            if (amount > 0) {
                accLogin.movements.push(amount);
                console.log('Loan Successful:' + accLogin.owner + 'has loaned' + amount + '€');
            } else alert('Please enter a valid amount.');
        } else alert('Please login first.');
        displayMovements(accLogin.movements);
        displayBalanceAndDetail(accLogin);
    });

    btnClose.addEventListener('click', function (event) {
        event.preventDefault();
        if (accLogin) {
            if (accLogin.username === usrCloseUsername.value && accLogin.pin === Number(usrClosePin.value)) {
                console.log(accLogin.owner + 'has closed the account.');
                containerApp.style.opacity = 0;
            };
        } else alert('Please login first.');
    });
};

// fetch is an asynchronous operation
fetch('./accountData.json')
    .then(response => response.json())
    .then(data => {
        computingUsername(data);
        console.log(usrnames);

        usrLogin(data);
    })
    .catch(error => console.error('Error loading JSON:', error)); 