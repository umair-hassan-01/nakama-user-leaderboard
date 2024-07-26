let emailAuthRpc = function(ctx:nkruntime.Context , logger:nkruntime.Logger , nk:nkruntime.Nakama , payload:string):string{
    try{
        //logger.debug(payload);
        let jsonPayload:IAuthRequest = JSON.parse(payload);
        let auth = new AuthModule();

        let customErrorMessage:string = "";
        let response:IAuthResponse;

        if(!auth.validatePassword(jsonPayload.password)){
            customErrorMessage = "password should be at least 8 characters"
        }
        
        if(!auth.validateUserName(jsonPayload.username)){
            customErrorMessage = "user name must be at least 6 characters"
        }

        // validate the email
        if(!auth.validateEmail(jsonPayload.email)){
            customErrorMessage = "invalid email"
        }

        if(customErrorMessage.length > 0){
            return JSON.stringify({
                success:false,
                userId:"",
                successMessage:"",
                errorMessage:customErrorMessage
            })
        }

        // try to authenticate the user
        const newUser:nkruntime.AuthResult = nk.authenticateEmail(jsonPayload.email,jsonPayload.password,jsonPayload.username);
        
        //see if user already has a state
        const storageObjects:nkruntime.StorageObject[] = new StorageUtils().readObject(nk,PLAYER_COLLECTION,PLAYER_STATE_KEY,newUser.userId);
        if(storageObjects.length <= 0){
            // set default user state [1000 bonus coins for new comers]
            new StateModule().setUserState(nk,newUser.userId,{coins:1000});
        }

        return JSON.stringify({
            success:true,
            userId:newUser.userId,
            successMessage:"User authentication successful",
            errorMessage:""
        })

    }catch(error:any){
        logger.debug(error.message);
        return JSON.stringify({
            success:false,
            userId:"",
            successMessage:"",
            errorMessage:error.message
        })
    }
}