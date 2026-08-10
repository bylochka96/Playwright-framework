export const invalidLoginData = [
    {
        caseName: 'empty username',
        username: '',
        password: 'secret_sauce',
        expectedError: 'Epic sadface: Username is required',
    },
    {   

    caseName: 'empty password',
        username: 'standard_user',
        password: '',
        expectedError: 'Epic sadface: Password is required',
    },
    {
        caseName: 'invalid password',
        username: 'standard_user',
        password: 'wrong_password',
        expectedError: 'Epic sadface: Username and password do not match any user in this service',
    },  
    {
        caseName: 'blocked user',
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    },
];

export const validLoginData = {
    username: 'standard_user',
    password: 'secret_sauce'
};