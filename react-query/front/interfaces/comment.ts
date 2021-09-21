import User from './user';

export default interface Comment {
  id: number;
  content: string;
  createdAt: string;
  User: Partial<User>;
}
