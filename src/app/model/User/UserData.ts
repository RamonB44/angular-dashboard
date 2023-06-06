import { UserSettings } from "./UserSettings";

export class UserData {
  displayName: string;
  photoUrl: string;
  email: string;
  settings: UserSettings;
  shortcuts: Array<string>;

  constructor(displayName: string, photoUrl: string, email: string, settings: UserSettings, shortcuts: Array<string>) {
    this.displayName = displayName;
    this.photoUrl = photoUrl;
    this.email = email;
    this.settings = settings;
    this.shortcuts = shortcuts;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  setDisplayName(displayName: string): void {
    this.displayName = displayName;
  }

  getPhotoUrl(): string {
    return this.photoUrl;
  }

  setPhotoUrl(photoUrl: string): void {
    this.photoUrl = photoUrl;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getSettings(): UserSettings {
    return this.settings;
  }

  setSettings(settings: UserSettings): void {
    this.settings = settings;
  }

  getShortcuts(): Array<string> {
    return this.shortcuts;
  }

  setShortcuts(shortcuts: Array<string>): void {
    this.shortcuts = shortcuts;
  }
}
