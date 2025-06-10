import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializationBaseEntities1749419603509 implements MigrationInterface {
    name = 'InitializationBaseEntities1749419603509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionHash" character varying(255) NOT NULL, "blockNumber" character varying(255) NOT NULL, "transactionType" character varying(255) NOT NULL, "transactionStatus" character varying(255) NOT NULL, "fromAddress" character varying(255) NOT NULL, "toAddress" character varying(255) NOT NULL, "error" character varying(255) NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "error" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "error" character varying(255), "errorCode" character varying(255), "errorMessage" character varying(255), "errorStack" character varying(255), "transactionId" uuid NOT NULL, CONSTRAINT "REL_9abb9e926cdc0873a79df913fe" UNIQUE ("transactionId"), CONSTRAINT "PK_cd77c9331f0ee047b819a7abad1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(255) NOT NULL, "publicKey" character varying(255) NOT NULL, "balance" numeric(18,8) NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_1dcc9f5fd49e3dc52c6d2393c53" UNIQUE ("address"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "error" ADD CONSTRAINT "FK_9abb9e926cdc0873a79df913fe3" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "error" DROP CONSTRAINT "FK_9abb9e926cdc0873a79df913fe3"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "error"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
