class StateModule{

    // set user current state
    public setUserState(nk:nkruntime.Nakama , userId:string , userState:IUserState):void{
        if(!userState.coins){
            userState.coins = DEFAULT_COINS;
        }

        if(!userState.games){
            userState.games = DEFAULT_GAMES;
        }

        if(!userState.health){
            userState.health = DEFAULT_HEALTH;
        }

        if(!userState.xp){
            userState.xp = DEFAULT_XP;
        }

        if(!userState.levels){
            userState.levels = DEFAULT_LEVEL;
        }

        try{
            new StorageUtils().WriteObject(nk,PLAYER_COLLECTION,PLAYER_STATE_KEY,userId,userState);

        }catch(error){
            throw error
        }
    }
}