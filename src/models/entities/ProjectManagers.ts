import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Project } from '@Models/entities/Project';
import { Manager } from '@Models/entities/Manager';

@Entity()
export class ProjectManagers {
  @PrimaryColumn()
  managerId: number;

  @PrimaryColumn()
  projectId: number;

  @ManyToOne(() => Manager, (manager) => manager.projects)
  @JoinColumn()
  manager!: Manager;

  @ManyToOne(() => Project, (project) => project.managers)
  @JoinColumn()
  project!: Project;

  @Column()
  joinDate!: Date;

  @Column()
  departureDate!: Date;
}
