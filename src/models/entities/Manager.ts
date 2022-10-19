import { User } from '@Models/entities/User';
import { ChildEntity, Column, OneToMany } from 'typeorm';
import { ProjectManagers } from '@Models/entities/ProjectManagers';

@ChildEntity()
export class Manager extends User {
  @Column()
  position: string;

  @OneToMany(() => ProjectManagers, (projectManagers) => projectManagers.project)
  projects: Array<ProjectManagers>;
}
