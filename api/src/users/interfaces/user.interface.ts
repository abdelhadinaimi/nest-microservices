export interface User {
  readonly username: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly avatarURL: string;
  readonly profilBio: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}