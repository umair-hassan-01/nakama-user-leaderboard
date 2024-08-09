class Utils{
    public generateResponse(success:boolean , message:string):IResponse{
        let response:IResponse = {
            success:success,
            message:message
        }
        return response;
    }
}