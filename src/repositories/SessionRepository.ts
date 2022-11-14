import { Session } from '@Models/entities/Session';
import { DataSource, Repository, UpdateQueryBuilder, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionRepository extends Repository<Session> {
  constructor(private dataSource: DataSource) {
    super(Session, dataSource.createEntityManager());
  }
  async createSession(session: Session): Promise<Session> {
    return this.save(session);
  }
  async updateSession(id: number, refreshToken: string): Promise<UpdateResult> {
    return await this.createQueryBuilder('session')
      .update()
      .set({
        token: refreshToken,
        isExpired: false,
      })
      .where('session.id = :id', { id })
      .execute();
  }
  async getSesstionByUserIdAndUserAgent(userId: number, userAgent: string): Promise<Session> {
    return await this.createQueryBuilder('session')
      .leftJoinAndSelect('session.user', 'user')
      .where('user.id = :id', { id: userId })
      .andWhere('session.userAgent = :userAgent', { userAgent })
      .getOne();
  }

  async expireSession(id: number): Promise<UpdateQueryBuilder<Session>> {
    return this.createQueryBuilder('session')
      .update()
      .set({ isExpired: true })
      .where('session.id = :id', { id });
  }
  async isAlreadyHaveSession(userId: number, userAgent: string): Promise<boolean> {
    return (
      (await this.createQueryBuilder('session')
        .leftJoinAndSelect('session.user', 'user')
        .where('user.id = :id', { id: userId })
        .andWhere('session.userAgent = :userAgent', { userAgent })
        .getCount()) > 0
    );
  }

  async isValidSession(userId: number, userAgent: string): Promise<boolean> {
    return (
      (await this.createQueryBuilder('session')
        .leftJoinAndSelect('session.user', 'user')
        .where('user.id = :id', { id: userId })
        .andWhere('session.userAgent = :userAgent', { userAgent })
        .andWhere('session.isExpired = :isExpired', { isExpired: false })
        .getCount()) > 0
    );
  }

  async expireSessionByUserAgent(userId: number, userAgent: string): Promise<UpdateResult> {
    return await this.createQueryBuilder('session')
      .leftJoinAndSelect('session.user', 'user')
      .where('user.id = :id', { id: userId })
      .andWhere('session.userAgent = :userAgent', { userAgent })
      .update()
      .set({ token: null, isExpired: true })
      .execute();
  }

  async expireSessionById(idSession: number): Promise<boolean> {
    return (
      (
        await this.createQueryBuilder('session')
          .delete()
          .where('session.id = :id', { id: idSession })
          .execute()
      ).affected > 0
    );
  }
}
