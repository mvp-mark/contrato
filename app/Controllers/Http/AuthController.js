'use strict'

const User = use("App/Models/User");

class AuthController {
    async cadastrar({request, response}){
        const data = request.only(["username", "email", "password", ]);

        // const validation = await validateAll(data, {
        //     username: 'required|unique:users',
        //     email: 'required|email|unique:users',
        //     password: 'required',
        //     password_confirmation: 'required_if:password|same:password',
        //   })

          const user = await User.create(data)
          
          return user;
    
}
async login({request, auth}){
    const { username, password } = request.all();

  const token =  await auth.attempt(username,password )

  return token
}
}

module.exports = AuthController
