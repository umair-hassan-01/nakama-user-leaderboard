enum GameConsts{
    GLOBAL_LEADERBOARD = "hexa_b457"
}

class LeaderBoardUtils{
    static readonly GLOBAL_LEADERBOARD = "hexa_b457";

    public createGlobalLeaderBoard(nk:nkruntime.Nakama){
        let id = GameConsts.GLOBAL_LEADERBOARD;
        let order = nkruntime.SortOrder.DESCENDING;
        let operator = nkruntime.Operator.BEST;
        let authoritative = false;
        let resetSchedule = null;
        let metaData = {};
        try{
        nk.leaderboardCreate(id , authoritative , order , operator , resetSchedule , metaData);
        }catch(error:any){
            throw error
        }
    }

    public scoreCalculation(score:number , health:number):number{
        return Math.max(10 , (Math.ceil((score - 100 + health)*1.24))%100);
    }
}