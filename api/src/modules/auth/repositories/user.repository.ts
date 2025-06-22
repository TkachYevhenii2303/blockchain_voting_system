import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email }, relations: ["credentials"] });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.findOne({
      where: { id },
      relations: ["credentials"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.find();
  }
}
