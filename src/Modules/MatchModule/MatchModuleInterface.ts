interface IMatchEndRequest{
    score:number
    finalHealth:number
}

interface IMatchEndResponse extends IResponse{
    record:nkruntime.LeaderboardRecord | null
}
