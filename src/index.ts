function InitModule(ct:nkruntime.Context,logger:nkruntime.Logger,nk:nkruntime.Nakama,initializer:nkruntime.Initializer){
    logger.debug("start registering rpc");
    initializer.registerRpc("userEmailAuth" , emailAuthRpc);
    initializer.registerRpc("storagerpc" , storageRpc);
    logger.debug("rpc registered");
}

