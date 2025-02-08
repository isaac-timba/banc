import {DBConfig} from "ngx-indexed-db";

export const dbConfig: DBConfig = {
  name: 'BancDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'user',
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {name: 'email', keypath: 'username', options: {unique: true}},
        {name: 'accessToken', keypath: 'accessToken', options: {unique: true}},
        {name: 'tokenExpiration', keypath: 'tokenExpiration', options: {unique: false}},
      ]
    }
  ]
}
