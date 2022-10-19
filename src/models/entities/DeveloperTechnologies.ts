import { Technology } from '@Models/entities/Technology';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Developer } from '@Models/entities/Developer';

@Entity()
export class DeveloperTechnologies {
  @PrimaryColumn()
  technologyId: number;

  @PrimaryColumn()
  developerId: number;

  @ManyToOne(() => Technology, (technology) => technology.developers)
  @JoinColumn()
  technology!: Technology;

  @ManyToOne(() => Developer, (developer) => developer.technologies)
  @JoinColumn()
  developer!: Developer;

  @Column()
  yearsOfExperience: number;
}
