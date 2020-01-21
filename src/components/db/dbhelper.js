import Dexie from "dexie";
var DATABASE_NAME = "VILLA_PWA_DB";
var DATABASE_VERSION = 1.0;
const IndexDB = new Dexie(DATABASE_NAME);

IndexDB.version(DATABASE_VERSION).stores({
    "home_api": "ID,data,timestamp"
});
export{
    IndexDB
}