import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoles } from '../enums/UserRoles';
import { Session } from '@Models/entities/Session';
import { File } from '@Models/entities/File';
import { Exclude } from 'class-transformer';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password!: string;

  @Column({ unique: true })
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

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt!: Date;
}
