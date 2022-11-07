import { Session } from '@Models/entities/Session';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionRepository extends Repository<Session> {
  constructor(private dataSource: DataSource) {
    super(Session, dataSource.createEntityManager());
  }
  async createSession(session: Session): Promise<Session> {
    return this.save(session);
  }
  async updateSession(id: number, session: Session): Promise<UpdateResult> {
    return this.update(id, session);
  }
  async deleteSession(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }
  async getSessionByToken(token: string): Promise<Session> {
    return this.createQueryBuilder('session').where('session.token = :token', { token }).getOne();
  }

  async getSessionByUserEmail(email: string): Promise<Session> {
    return await this.createQueryBuilder('session')
      .leftJoinAndSelect('session.user', 'user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
