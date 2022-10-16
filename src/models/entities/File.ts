import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '@Models/entities/User';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  filePath!: string;
  @OneToOne(() => User, (user) => user.photo)
  @JoinColumn()
  userAvatar!: User;
  @OneToOne(() => User, (user) => user.cv)
  @JoinColumn()
  userBackground!: User;
}
