function InitModule(ct:nkruntime.Context,logger:nkruntime.Logger,nk:nkruntime.Nakama,initializer:nkruntime.Initializer){
    logger.debug("start registering rpc");
    initializer.registerRpc("userEmailAuth" , emailAuthRpc);
    initializer.registerRpc("storagerpc" , storageRpc);
    initializer.registerRpc("matchendrpc" , matchEndRpc);
    initializer.registerRpc("getLeaderBoardRpc" , getLeaderBoardRpc);
    new LeaderboardModule().createGlobalLeaderBoard(nk);
    logger.debug("rpc registered 3rd time");
}
