class Utils{
    public generateResponse(success:boolean , successMessage:string , errorMessage:string):IResponse{
        let response:IResponse = {
            success:success,
            successMessage:successMessage,
            errorMessage:errorMessage
        }
        return response;
    }
}