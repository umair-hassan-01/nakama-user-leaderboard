let createGroupRpc = function(ctx:nkruntime.Context , logger:nkruntime.Logger , nk:nkruntime.Nakama , payload:string):string{
    let response:IGroupChatResponse;
    
    try{
        const createGroupPayload:IGroupChatRequest = JSON.parse(payload);

        let userId:string = ctx.userId;
        let creatorId:string = ctx.userId;
        let name:string = createGroupPayload.groupName;
        let description:string = createGroupPayload.groupDescription;
        let lang = 'en';
        let open = true;
        let avatarURL = 'https://avatar.iran.liara.run/public/15';
        let metadata = { custom_field: 'some_value' };
        let maxCount = 100;

        let group = {} as nkruntime.Group;
        
        group = nk.groupCreate(userId, name, creatorId, lang, description, avatarURL, open, metadata, maxCount);

        response = {
            success:true,
            message:"Group created successfuly",
            groupId:group.id
        }
    }catch(error:any){
        logger.debug("error in createGroupRpc " + error.message);
        response = {
            success:false,
            message:"Error in group creation",
            groupId:null
        }
    }

    return JSON.stringify(response);
}