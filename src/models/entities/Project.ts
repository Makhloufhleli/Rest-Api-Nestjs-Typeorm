import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectManagers } from '@Models/entities/ProjectManagers';
import { ProjectDevelopers } from '@Models/entities/ProjectDevelopers';
import { ProjectTechnologies } from '@Models/entities/ProjectTechnologies';

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
}
