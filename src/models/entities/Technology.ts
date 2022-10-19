import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeveloperTechnologies } from '@Models/entities/DeveloperTechnologies';
import { ProjectTechnologies } from '@Models/entities/ProjectTechnologies';

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
  developers: Array<DeveloperTechnologies>;

  @OneToMany(() => ProjectTechnologies, (projectTechnologies) => projectTechnologies.technology)
  projects: Array<ProjectTechnologies>;
}
