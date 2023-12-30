import { Entity } from 'typeorm';

@Entity('auths')
export class Auth {
  name: string;

  password: string;
}
