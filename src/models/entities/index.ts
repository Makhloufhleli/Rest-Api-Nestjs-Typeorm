import { User } from './User';
import { File } from './File';
import { Session } from './Session';
import { Developer } from '@Models/entities/Developer';
import { DeveloperTechnologies } from '@Models/entities/DeveloperTechnologies';
import { Technology } from '@Models/entities/Technology';
import { Manager } from '@Models/entities/Manager';
import { Project } from '@Models/entities/Project';
import { ProjectDevelopers } from '@Models/entities/ProjectDevelopers';
import { ProjectManagers } from '@Models/entities/ProjectManagers';
import { ProjectTechnologies } from '@Models/entities/ProjectTechnologies';

export const Entities = [
  Developer,
  DeveloperTechnologies,
  File,
  Manager,
  Project,
  ProjectDevelopers,
  ProjectManagers,
  ProjectTechnologies,
  Session,
  Technology,
  User,
];
