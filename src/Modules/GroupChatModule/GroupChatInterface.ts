interface IGroupChatRequest{
    groupName:string
    groupDescription:string
    open?:boolean
    avatarURL?:string
}

interface IGroupChatResponse extends IResponse{
    groupId:string | null
}