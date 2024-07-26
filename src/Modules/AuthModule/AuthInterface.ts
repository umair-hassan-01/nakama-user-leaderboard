// interfaces for user authentication
interface IAuthResponse extends IResponse {
    userId:string
    userState:IUserState
}

interface IAuthRequest{
    email:string,
    password:string,
    username:string,
}