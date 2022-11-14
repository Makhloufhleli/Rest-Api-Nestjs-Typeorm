import { User } from '@Models/entities/User';
import { ChildEntity, Column } from 'typeorm';
@ChildEntity()
export class Manager extends User {
  @Column()
  position: string;
}
