let matchEndRpc:nkruntime.RpcFunction = function(ctx:nkruntime.Context , logger:nkruntime.Logger , nk:nkruntime.Nakama , payload:string):string{
    let request:IMatchEndRequest = JSON.parse(payload);
    const finalScore = new LeaderboardModule().scoreCalculation(request.score,request.finalHealth);
    
    let response:IMatchEndResponse;

    // now store the final score in leaderboard
    try{
        const leaderBoardId:string = GLOBAL_LEADERBOARD;
        let  metaData = {
            "username":ctx.username
        }

        logger.debug("start writing");

        const resp:nkruntime.LeaderboardRecord =  nk.leaderboardRecordWrite(leaderBoardId,ctx.userId , ctx.username , finalScore ,0 , metaData);
        
        response = {
            success:true,
            record:resp,
            successMessage:"score is updated successfully",
            errorMessage:""
        }
    }catch(error:any){
        logger.debug(error.message);
        response = {
            success:false,
            record:null,
            successMessage:"",
            errorMessage:error
        }
    }

    return JSON.stringify(response);
}