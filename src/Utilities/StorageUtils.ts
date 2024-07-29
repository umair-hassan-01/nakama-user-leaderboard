class StorageUtils{
    public writeObject(nk:nkruntime.Nakama,collection:string , key:string , userId:string , value:any):nkruntime.StorageWriteAck[]{
        const writer:nkruntime.StorageWriteRequest = {
            collection :collection,
            key:key,
            userId:userId,
            value:value
        }

        return nk.storageWrite([writer])
    }

    public readObject(nk:nkruntime.Nakama , collection:string , key:string , userId:string):nkruntime.StorageObject[]{
        let readers:nkruntime.StorageReadRequest = {
            collection:collection,
            key:key,
            userId:userId
        }

        return nk.storageRead([readers]);
    }
}