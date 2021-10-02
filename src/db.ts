const CURRENT_DB_VERSION = 1;

export function connect(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("IndexedDBTest", CURRENT_DB_VERSION);
    request.onerror = (event) => {
      const error = (event.target as IDBOpenDBRequest).error?.name;
      reject(error);
    };
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      createOrMigrate(db, event.oldVersion);
    };
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
  });
}

function createOrMigrate(db: IDBDatabase, oldVersion: number) {
  if (oldVersion === 0) {
    createUsersStore(db);
  }
  // migration code
}

export interface User {
  loginId: string;
  email: string;
  name: string;
}

function createUsersStore(db: IDBDatabase) {
  const objStore = db.createObjectStore("users", { keyPath: "loginId" });
  objStore.createIndex("email", "email", { unique: true });
  // オブジェクトストアの作成完了を待ってからデータを投入する
  objStore.transaction.oncomplete = () => {
    addUser(db, {
      loginId: "sample-user",
      email: "sample@example.com",
      name: "サンプルユーザー",
    });
  };
}

export function getAllUsers(db: IDBDatabase): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users");
    const store = tx.objectStore("users");
    const req = store.getAll();
    req.onsuccess = (event) => {
      const users = (event.target as IDBRequest<User[]>).result;
      resolve(users);
    };
    req.onerror = (event) => {
      const error = (event.target as IDBRequest).error?.name;
      reject(error);
    };
  });
}

export function addUser(db: IDBDatabase, user: User): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const req = store.add(user);
    req.onsuccess = () => resolve();
    req.onerror = (event) => {
      const error = (event.target as IDBRequest).error?.name;
      console.log((event.target as IDBRequest).error);
      reject(error);
    };
  });
}
