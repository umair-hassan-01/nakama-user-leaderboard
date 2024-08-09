interface IGetLeaderBoardRequest{
    leaderBoardId:string
    ownerIds?:string[]
}

interface IGetLeaderBoardResponse extends IResponse{
    data:nkruntime.LeaderboardRecordList
}