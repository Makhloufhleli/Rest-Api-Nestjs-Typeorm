import { UserRepository } from '@src/repositories/UserRepository';
import { SessionRepository } from '@src/repositories/SessionRepository';
import { ManagerRepository } from '@src/repositories/ManagerRepository';
import { DeveloperRepository } from '@src/repositories/DeveloperRepository';

export const Repositories = [
  UserRepository,
  SessionRepository,
  ManagerRepository,
  DeveloperRepository,
];
