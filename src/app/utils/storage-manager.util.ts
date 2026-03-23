export class StorageManager {
  static getItem(key: string) {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  }
  static setItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }
  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
