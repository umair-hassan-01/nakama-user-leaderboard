let emailAuthRpc = function(ctx:nkruntime.Context , logger:nkruntime.Logger , nk:nkruntime.Nakama , payload:string):string{
    let response:IAuthResponse;
    let auth = new AuthModule();

    try{
        //logger.debug(payload);
        let jsonPayload:IAuthRequest = JSON.parse(payload);
        let storage = new StorageUtils();

        let customErrorMessage:string = "";

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
            return JSON.stringify(auth.generteResponse(false,"",customErrorMessage,{},""));
        }

        // try to authenticate the user
        const newUser:nkruntime.AuthResult = nk.authenticateEmail(jsonPayload.email,jsonPayload.password,jsonPayload.username);
        
        let newStateAck:nkruntime.StorageWriteAck[] = [];
        let newState:IUserState = {};

        //see if user already has a state
        const storageObjects:nkruntime.StorageObject[] = storage.readObject(nk,PLAYER_COLLECTION,PLAYER_STATE_KEY,newUser.userId);
        if(storageObjects.length <= 0){
            // set default user state [1000 bonus coins for new comers]
            newStateAck = new StateModule().setUserState(nk,newUser.userId,{coins:1000});

            // get new state of user .. fetch it from storage using collection data in newStateAck[]
            for(let i = 0;i < Math.min(1,newStateAck.length);i++){
                const storedObjects:nkruntime.StorageObject[] = storage.readObject(nk,newStateAck[i].collection , newStateAck[i].key , newStateAck[i].userId);
                newState = storedObjects[0].value;
            }

        }else{
            logger.debug(JSON.stringify(storageObjects));
            // send the previous state
            newState = storageObjects[0].value;
        }

        let successMessage = "User authentication successful";
        return JSON.stringify(auth.generteResponse(true,successMessage,"",newState,newUser.userId));

    }catch(error:any){
        logger.debug(error.message);
        return JSON.stringify(auth.generteResponse(false,"",error.message,{},""));
    }
}