function InitModule(ct:nkruntime.Context,logger:nkruntime.Logger,nk:nkruntime.Nakama,initializer:nkruntime.Initializer){
    logger.debug("start registering rpc");
    initializer.registerRpc("userEmailAuth" , emailAuthRpc);
    initializer.registerRpc("storagerpc" , storageRpc);
    initializer.registerRpc("matchendrpc" , matchEndRpc);
    initializer.registerRpc("getLeaderBoardRpc" , getLeaderBoardRpc);
    initializer.registerRpc("createGroupRpc" , createGroupRpc);
    initializer.registerRpc("getConfigurationsRpc" , getConfigRpc);
    try{
        new LeaderboardModule().createGlobalLeaderBoard(nk);
    }catch(error:any){
        logger.error("error while creating global leaderboard");
        logger.debug(error.message);
    }

    try{
        new ConfigurationModule().saveConfigurations(nk);
    }catch(error:any){
        logger.error("error while creating global configurations");
        logger.debug(error.message);
    }
    logger.debug("rpc registered 3rd time");
}
