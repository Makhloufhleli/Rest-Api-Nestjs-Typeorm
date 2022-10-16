import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoles } from '../enums/UserRoles';
import { Session } from '@Models/entities/Session';
import { File } from '@Models/entities/File';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  firstName!: string;
  @Column()
  lastName!: string;
  @Column()
  username: string;
  @Column()
  password!: string;
  @Column()
  email!: string;
  @Column({
    default: UserRoles.ROLE_USER,
    enum: UserRoles,
    type: 'enum',
  })
  role!: UserRoles;
  @OneToOne(() => File, (file) => file.userAvatar, {
    cascade: true,
    nullable: true,
  })
  photo!: File;
  @OneToOne(() => File, (file) => file.userBackground, {
    cascade: true,
    nullable: true,
  })
  cv!: File;
  @OneToMany(() => Session, (session) => session.user)
  sessions: Array<Session>;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
