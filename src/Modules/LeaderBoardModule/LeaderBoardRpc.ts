let getLeaderBoardRpc:nkruntime.RpcFunction = function(ctx:nkruntime.Context , logger:nkruntime.Logger , nk:nkruntime.Nakama , payload:string):string{
    let request:IGetLeaderBoardRequest = JSON.parse(payload);
    let response:IGetLeaderBoardResponse;
    
    try{
        // fetch the leaderboards using provided ids
        let leaderBoardData:nkruntime.LeaderboardRecordList = nk.leaderboardRecordsList(request.leaderBoardId,request.ownerIds,100);
        logger.debug(JSON.stringify(leaderBoardData));
        response = {
            success:true,
            data:leaderBoardData,
            message:"leader boards fetched successfuly"
        }

    }catch(error:any){
        logger.debug(error.message);
        response = {
            success:false,
            data:{},
            message:error.message
        }
    }

    return JSON.stringify(response);
}