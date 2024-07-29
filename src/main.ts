function InitModule(ct:nkruntime.Context,logger:nkruntime.Logger,nk:nkruntime.Nakama,initializer:nkruntime.Initializer){
    logger.debug("start registering rpc");
    initializer.registerRpc("userEmailAuth" , emailAuthRpc);
    initializer.registerRpc("storagerpc" , storageRpc);
    initializer.registerRpc("matchendrpc" , matchEndRpc);
    initializer.registerRpc("getLeaderBoardRpc" , getLeaderBoardRpc);
    try{
    new LeaderboardModule().createGlobalLeaderBoard(nk);
    }catch(error:any){
        logger.error("error while creating global leaderboard");
        logger.debug(error.message);
    }
    logger.debug("rpc registered 3rd time");
}
