import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectManagers } from '@Models/entities/ProjectManagers';
import { ProjectDevelopers } from '@Models/entities/ProjectDevelopers';
import { ProjectTechnologies } from '@Models/entities/ProjectTechnologies';
import { Exclude } from 'class-transformer';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(() => ProjectTechnologies, (projectTechnologies) => projectTechnologies.project)
  technologies: Array<ProjectTechnologies>;

  @OneToMany(() => ProjectDevelopers, (projectDevelopers) => projectDevelopers.project)
  developers: Array<ProjectDevelopers>;

  @OneToMany(() => ProjectManagers, (projectManagers) => projectManagers.project)
  managers: Array<ProjectManagers>;

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
