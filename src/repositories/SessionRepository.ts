import { Session } from '@Models/entities/Session';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionRepository extends Repository<Session> {
  constructor(private dataSource: DataSource) {
    super(Session, dataSource.createEntityManager());
  }
  async createSession(session: Session): Promise<Session> {
    return this.create(session);
  }
  async updateSession(session: Session): Promise<Session> {
    return this.save(session);
  }
  async deleteSession(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }

  async getSessionById(id: number): Promise<Session> {
    return this.createQueryBuilder('session').where('session.id = :id', { id }).getOne();
  }

  async getSessionByToken(token: string): Promise<Session> {
    return this.createQueryBuilder('session').where('session.token = :token', { token }).getOne();
  }
}
