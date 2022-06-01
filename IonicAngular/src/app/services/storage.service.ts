import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, username : string)
  {
    //const b64 = btoa(unescape(encodeURIComponent(`${login.username}:${login.password}`)));
    await Storage.set({
      key : storageKey,
      value : username
    });
  }

  async get(storageKey : string)
  {
    const ret = await Storage.get({key : storageKey});
    return ret.value ;
    //return decodeURIComponent(escape(atob( ret.value )));
  }

  async removeCurrentUser(storageKey: string, storageKeyPass: string) 
  {
    await Storage.remove({ key: storageKey });
    await Storage.remove({ key: storageKeyPass });
  }
    
  // Clear storage
  async clear() 
  {
  await Storage.clear();
  }
}
