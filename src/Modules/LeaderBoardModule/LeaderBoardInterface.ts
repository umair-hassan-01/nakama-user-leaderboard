interface IGetLeaderBoardRequest{
    leaderBoardId:string,
    ownerIds?:string[]
}

interface IGetLeaderBoardResponse{
    success:boolean
    leaderBoardData:nkruntime.LeaderboardRecordList
    successMessage:string
    errorMessage:string
}