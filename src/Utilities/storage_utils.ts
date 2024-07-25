class StorageUtils{

    static readonly PLAYER_COLLECTION = "players";
    static readonly PLAYER_STATE_KEY = "user states"

    public WriteObject(nk:nkruntime.Nakama,_collection:string , _key:string , _userId:string , _value:any):nkruntime.StorageWriteAck[]{
        const writer:nkruntime.StorageWriteRequest = {
            collection :_collection,
            key:_key,
            userId:_userId,
            value:_value
        }

        return nk.storageWrite([writer])
    }

    public readObject(nk:nkruntime.Nakama , _collection:string , _key:string , _userId:string):nkruntime.StorageObject[]{
        let readers:nkruntime.StorageReadRequest = {
            collection:_collection,
            key:_key,
            userId:_userId
        }

        return nk.storageRead([readers]);
    }
}