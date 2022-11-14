import { User } from '@Models/entities/User';
import { ChildEntity } from 'typeorm';
@ChildEntity()
export class Developer extends User {}
