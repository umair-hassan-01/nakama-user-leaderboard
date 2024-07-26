interface authResponse {
    success:boolean,
    userId:string,
    successMessage:string,
    errorMessage:string,
}

interface authPayload{
    email:string,
    password:string,
    username:string,
}


let emailAuthRpc = function(ctx:nkruntime.Context , logger:nkruntime.Logger , nk:nkruntime.Nakama , payload:string):string{
    try{
        logger.debug(payload);
        let jsonPayload:authPayload = JSON.parse(payload);
        let customErrorMessage:string = "";
        let authUtil = new AuthUtils()

        if(!authUtil.validatePassword(jsonPayload.password)){
            customErrorMessage = "password should be at least 8 characters"
        }
        
        if(!authUtil.validateUserName(jsonPayload.username)){
            customErrorMessage = "user name must be at least 6 characters"
        }

        // validate the email
        if(!authUtil.validateEmail(jsonPayload.email)){
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

        // try to authrnticate the user
        const response = nk.authenticateEmail(jsonPayload.email,jsonPayload.password,jsonPayload.username);
        
        //see if user already has a state
        const storageObjects:nkruntime.StorageObject[] = new StorageUtils().readObject(nk,StorageUtils.PLAYER_COLLECTION,StorageUtils.PLAYER_STATE_KEY,response.userId);
        if(storageObjects.length <= 0){
            // set default user state [1000 bonus coins for new comers]
            new StateUtils().setUserState(nk,response.userId,{coins:1000});
        }

        return JSON.stringify({
            success:true,
            userId:response.userId,
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