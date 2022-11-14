import { UserRepository } from '@src/repositories/UserRepository';
import { DeveloperRepository } from '@src/repositories/DeveloperRepository';
import { ManagerRepository } from '@src/repositories/ManagerRepository';
import { TechnologyRepository } from '@src/repositories/TechnologyRepository';
import { SessionRepository } from '@src/repositories/SessionRepository';

export const Repositories = [
  UserRepository,
  DeveloperRepository,
  ManagerRepository,
  TechnologyRepository,
  SessionRepository,
];
