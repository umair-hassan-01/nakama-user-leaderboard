class AuthModule{
    public validateEmail(userEmail:string):boolean{
        let emailRegex:RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(userEmail);
    }

    public validateUserName(userName:string):boolean{
        if(userName && userName.length >= 6){
            return true;
        }

        return false;
    }

    public validatePassword(password:string):boolean{
        if(password && password.length >= 8){
            return true;
        }
        return false;
    }

    public generteResponse(success:boolean,successMessage:string,errorMessage:string,userState:IUserState,userId:string):IAuthResponse{
        let response:IAuthResponse = {
            success:success,
            successMessage:successMessage,
            errorMessage:errorMessage,
            userState:userState,
            userId:userId
        }
        return response;
    }
}
