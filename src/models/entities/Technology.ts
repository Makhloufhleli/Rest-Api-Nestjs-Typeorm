import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeveloperTechnologies } from '@Models/entities/DeveloperTechnologies';
import { ProjectTechnologies } from '@Models/entities/ProjectTechnologies';
import { Exclude } from 'class-transformer';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => DeveloperTechnologies,
    (developerTechnologies) => developerTechnologies.technology,
  )
  @JoinColumn({ referencedColumnName: 'technologyId' })
  developers: Array<DeveloperTechnologies>;

  @OneToMany(() => ProjectTechnologies, (projectTechnologies) => projectTechnologies.technology)
  projects: Array<ProjectTechnologies>;

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

  @DeleteDateColumn()
  deletedAt!: Date;
}
