let matchEndRpc:nkruntime.RpcFunction = function(ctx:nkruntime.Context , logger:nkruntime.Logger , nk:nkruntime.Nakama , payload:string):string{
    let request:IMatchEndRequest = JSON.parse(payload);
    const finalScore = new LeaderboardModule().scoreCalculation(request.score,request.finalHealth);
    logger.debug("GOT THE REQUEST");
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
            message:"score is updated successfully"
        }
    }catch(error:any){
        logger.debug(error.message);
        response = {
            success:false,
            record:null,
            message:error
        }
    }

    return JSON.stringify(response);
}