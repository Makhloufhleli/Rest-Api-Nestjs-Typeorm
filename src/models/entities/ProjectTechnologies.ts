import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Technology } from '@Models/entities/Technology';
import { Project } from '@Models/entities/Project';
import { TechnologiesStacks } from '@Models/enums/TechnologiesStacks';

@Entity()
export class ProjectTechnologies {
  @PrimaryColumn()
  technologyId: number;

  @PrimaryColumn()
  projectId: number;

  @ManyToOne(() => Technology, (technology) => technology.projects)
  @JoinColumn()
  technology!: Technology;

  @ManyToOne(() => Project, (project) => project.technologies)
  @JoinColumn()
  project!: Project;

  @Column({
    default: TechnologiesStacks.BACKEND,
    enum: TechnologiesStacks,
    type: 'enum',
  })
  stack: TechnologiesStacks;
}
