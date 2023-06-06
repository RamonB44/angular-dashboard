import { UserData } from "./UserData";

export class User {
  uuid: number;
  role: string;
  from: string;
  firstName: string;
  lastName: string;
  userData: UserData;

  constructor(
    uuid: number,
    role: string,
    from: string,
    firstName: string,
    lastName: string,
    userData : UserData
  ) {
    this.uuid = uuid;
    this.role = role;
    this.from = from;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userData = userData;
  }

  getUuid(): number {
    return this.uuid;
  }

  setUuid(uuid: number): void {
    this.uuid = uuid;
  }

  getRole(): string {
    return this.role;
  }

  setFrom(from: string): void{
    this.from = from;
  }

  getFrom(): string {
    return this.from;
  }

  setRole(role: string): void {
    this.role = role;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  getUserData(): UserData {
    return this.userData;
  }

  setUserData(userData: UserData): void {
    this.userData = userData;
  }
}
