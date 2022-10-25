import { User } from '@Models/entities/User';
import { ChildEntity, JoinColumn, OneToMany } from 'typeorm';
import { ProjectDevelopers } from '@Models/entities/ProjectDevelopers';
import { DeveloperTechnologies } from '@Models/entities/DeveloperTechnologies';
@ChildEntity()
export class Developer extends User {
  @OneToMany(
    () => DeveloperTechnologies,
    (developerTechnologies) => developerTechnologies.developer,
    { cascade: true },
  )
  @JoinColumn({ referencedColumnName: 'developerId' })
  technologies: Array<DeveloperTechnologies>;

  @OneToMany(() => ProjectDevelopers, (projectDevelopers) => projectDevelopers.developer)
  projects: Array<ProjectDevelopers>;
}
