import { UserRepository } from '@src/repositories/UserRepository';
import { SessionRepository } from '@src/repositories/SessionRepository';
import { DeveloperRepository } from '@src/repositories/DeveloperRepository';
import { ManagerRepository } from '@src/repositories/ManagerRepository';
import { TechnologyRepository } from '@src/repositories/TechnologyRepository';
import { DeveloperTechnologiesRepository } from '@src/repositories/DeveloperTechnologiesRepository';

export const Repositories = [
  UserRepository,
  SessionRepository,
  DeveloperRepository,
  ManagerRepository,
  TechnologyRepository,
  DeveloperTechnologiesRepository,
];
