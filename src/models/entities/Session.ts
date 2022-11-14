import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@Models/entities/User';

@Entity()
export class Session {
  constructor(userAgent: string, ipAddress: string, user: User, token: string) {
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
    this.user = user;
    this.token = token;
  }
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userAgent: string;
  @Column()
  ipAddress: string;
  @Column({ type: 'text', nullable: true })
  token: string;
  @Column({ default: false })
  isExpired: boolean;
  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
