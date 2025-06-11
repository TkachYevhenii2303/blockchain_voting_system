import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWallet1749605337632 implements MigrationInterface {
    name = 'UpdateWallet1749605337632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "UQ_35472b1fe48b6330cd349709564" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "UQ_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "userId"`);
    }

}
