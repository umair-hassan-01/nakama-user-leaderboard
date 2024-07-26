interface GetLeaderBoardRequest{
    leaderBoardId:string,
    ownerIds?:string[]
}

interface GetLeaderBoardResponse{
    success:boolean
    leaderBoardData:nkruntime.LeaderboardRecordList
    successMessage:string
    errorMessage:string
}

let getLeaderBoardRpc:nkruntime.RpcFunction = function(ctx:nkruntime.Context , logger:nkruntime.Logger , nk:nkruntime.Nakama , payload:string):string{
    let request:GetLeaderBoardRequest = JSON.parse(payload);
    let response:GetLeaderBoardResponse;

    try{
        // fetch the leaderboards using provided ids
        let _leaderBoardData:nkruntime.LeaderboardRecordList = nk.leaderboardRecordsList(request.leaderBoardId,request.ownerIds,100);
        logger.debug(JSON.stringify(_leaderBoardData));
        response = {
            success:true,
            leaderBoardData:_leaderBoardData,
            successMessage:"leader boards fetched successfuly",
            errorMessage:""
        }

    }catch(error:any){
        logger.debug(error.message);
        response = {
            success:false,
            leaderBoardData:{},
            successMessage:"",
            errorMessage:error.message
        }
    }

    return JSON.stringify(response);
}