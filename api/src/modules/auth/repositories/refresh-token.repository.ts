import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
    constructor(private dataSource: DataSource) {
        super(RefreshToken, dataSource.createEntityManager());
      }

    async findByUserId(userId: string): Promise<RefreshToken| null> {
       return await this.findOne({ where: { userId } });
    }
}
