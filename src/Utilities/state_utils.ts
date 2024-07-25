interface IUserState{
    xp?:number,
    games?:number,
    coins?:number,
    health?:number
}

class StateUtils{
    // some variables for user default state
    static readonly USER_DEFAULT_HEALTH:number = 100;
    static readonly USER_DEFAULT_XP:number = 0;
    static readonly USER_DEFAULT_COINS:number = 0;
    static readonly USER_DEFAULT_GAMES:number = 0;

    constructor(){

    }
    // set user current state
    public setUserState(nk:nkruntime.Nakama , userId:string , userState:IUserState):void{
        if(!userState.coins){
            userState.coins = StateUtils.USER_DEFAULT_COINS;
        }

        if(!userState.games){
            userState.games = StateUtils.USER_DEFAULT_GAMES;
        }

        if(!userState.health){
            userState.health = StateUtils.USER_DEFAULT_HEALTH;
        }

        if(!userState.xp){
            userState.xp = StateUtils.USER_DEFAULT_XP;
        }

        try{
            new StorageUtils().WriteObject(nk,StorageUtils.PLAYER_COLLECTION,StorageUtils.PLAYER_STATE_KEY,userId,userState);
            
        }catch(error){
            throw error
        }
    }
}