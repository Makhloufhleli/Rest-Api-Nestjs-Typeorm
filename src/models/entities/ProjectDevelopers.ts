import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Developer } from '@Models/entities/Developer';
import { Project } from '@Models/entities/Project';

@Entity()
export class ProjectDevelopers {
  @PrimaryColumn()
  projectId: number;

  @PrimaryColumn()
  developerId: number;

  @ManyToOne(() => Project, (project) => project.developers)
  @JoinColumn()
  project!: Project;

  @ManyToOne(() => Developer, (developer) => developer.projects)
  @JoinColumn()
  developer!: Developer;

  @Column()
  joinDate!: Date;

  @Column()
  departureDate!: Date;
}
