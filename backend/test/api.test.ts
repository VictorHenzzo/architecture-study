import axios from "axios"

axios.defaults.validateStatus = function () {
    return true;
}

test.each([
    "97456321558",
    "71428793860",
    "87748248800"
])('Should create an account for the passenger', async function (cpf: string) {
    // given
    const inputSignup = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf,
        isPassenger: true,
        password: "123321"
    }

    // when
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);
    const outputSignup = responseSignup.data;
    const responseGetAccount = await axios.get(`http://localhost:3000/account/${outputSignup.accountId}`);
    const outputGetAccount = responseGetAccount.data;

    // then
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email)
})

test('Should create an account for the driver', async function () {
    // given
    const inputSignup = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "77484363049",
        isPassenger: false,
        isDriver: true,
        password: "123321",
        carPlate: "AAA9999",
    }

    // when
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);
    const outputSignup = responseSignup.data;
    const responseGetAccount = await axios.get(`http://localhost:3000/account/${outputSignup.accountId}`);
    const outputGetAccount = responseGetAccount.data;


    // then
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email)
})

test('Should not create an account on invalid name', async function () {
    // given
    const inputSignup = {
        name: "John",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "77484363049",
        isPassenger: true,
        password: "123321"
    }

    // when
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);

    // then
    const outputSignup = responseSignup.data;
    expect(responseSignup.status).toBe(422);
    expect(outputSignup.message).toBe('Invalid name');
})

test('Should not create an account on invalid email', async function () {
    // given
    const inputSignup = {
        name: "John Doe",
        email: `john.doegmail.com`,
        cpf: "77484363049",
        isPassenger: true,
        password: "123321"
    }

    // when
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);

    // then
    const outputSignup = responseSignup.data;
    expect(responseSignup.status).toBe(422);
    expect(outputSignup.message).toBe('Invalid email');
})

test.each([
    "",
    undefined,
    "123123123123213312",
    "11111111111",
    "3421321",
])('Should not create an account on invalid cpf', async function (cpf: any) {
    // given
    const inputSignup = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "7748436304",
        isPassenger: true,
        password: "123321"
    }

    // when
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);

    // then
    const outputSignup = responseSignup.data;
    expect(responseSignup.status).toBe(422);
    expect(outputSignup.message).toBe('Invalid cpf');
})

test('Should not create an account on duplicated email', async function () {
    // given
    const inputSignup = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "77484363049",
        isPassenger: true,
        password: "123321"
    }

    // when
    await axios.post("http://localhost:3000/signup", inputSignup);
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);

    // then
    const outputSignup = responseSignup.data;
    expect(responseSignup.status).toBe(422);
    expect(outputSignup.message).toBe('Duplicated account');
})

test('Should not create an account on invalid car plate', async function () {
    // given
    const inputSignup = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "77484363049",
        isPassenger: false,
        isDriver: true,
        password: "123321",
        carPlate: "AAA999",
    }

    // when
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);

    // then
    const outputSignup = responseSignup.data;
    expect(responseSignup.status).toBe(422);
    expect(outputSignup.message).toBe('Invalid carplate');
})