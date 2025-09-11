type LSKey = "@forum/users" | "@forum/currentUser" | "@forum/threads" | "@forum/comments" | "@forum/tags";

class LocalStorageService {
  static setItem<T>(key: LSKey, value: T): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  static getItem<T>(key: LSKey, fallbackValue: T): T {
    const jsonData = localStorage.getItem(key);
    if (jsonData) {
      return JSON.parse(jsonData) as T;
    }
    return fallbackValue;
  }
}

export default LocalStorageService;