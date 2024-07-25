function storageRpc(ctx:nkruntime.Context , logger:nkruntime.Logger , nk:nkruntime.Nakama , payload:string):string{
    let rpcResponse:string = "";

    try{
        //store default state in 
        new StateUtils().setUserState(nk,ctx.userId,{coins:500});
        rpcResponse = JSON.stringify({
            "message":"user state reset successful"
        })
    }catch(error:any){
        rpcResponse = JSON.stringify({"error message":error.message})
    }
    return rpcResponse;
}