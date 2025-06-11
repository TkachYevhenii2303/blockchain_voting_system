import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1749605167279 implements MigrationInterface {
    name = 'UpdateTables1749605167279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "toAddress" TO "transactionId"`);
        await queryRunner.query(`CREATE TABLE "elections" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "totalVotes" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_21abca6e4191b830d1eb8379cf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "candidates" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "position" character varying(255) NOT NULL, "biography" text, "avatar" character varying(255), CONSTRAINT "UQ_c0de76a18c2a505ceb016746822" UNIQUE ("email"), CONSTRAINT "PK_140681296bf033ab1eb95288abb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_37eceaa06e9bb8832f7d3d7985" ON "candidates" ("email", "name") `);
        await queryRunner.query(`CREATE TABLE "voting" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "options" jsonb NOT NULL, "endDate" date NOT NULL, CONSTRAINT "PK_2dff1e5c53fa2cc610bea30476c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "votes" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionHash" character varying(255) NOT NULL, "electionId" uuid NOT NULL, "candidateId" uuid NOT NULL, "votingId" uuid NOT NULL, "userId" uuid NOT NULL, "transactionId" uuid, CONSTRAINT "UQ_2b608314f3d0a674b41c1b88df7" UNIQUE ("transactionHash"), CONSTRAINT "REL_229927f8a32a8ca2e9e865538f" UNIQUE ("transactionId"), CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2b608314f3d0a674b41c1b88df" ON "votes" ("transactionHash") `);
        await queryRunner.query(`CREATE TABLE "candidate_votings" ("candidateId" uuid NOT NULL, "votingId" uuid NOT NULL, CONSTRAINT "PK_5840e614ece1df7ad9fa81fcd97" PRIMARY KEY ("candidateId", "votingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7a8a74d057648f256d5e6ac0d5" ON "candidate_votings" ("candidateId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1a7fc3e40c1cf54babb86c0bb3" ON "candidate_votings" ("votingId") `);
        await queryRunner.query(`CREATE TABLE "election_votes" ("electionId" uuid NOT NULL, "voteId" uuid NOT NULL, CONSTRAINT "PK_afdb20fb938322444f3f930f02a" PRIMARY KEY ("electionId", "voteId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4bc2bbd352ae7ef2d11d7e1267" ON "election_votes" ("electionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1d5d52426ce4068a6d52867afb" ON "election_votes" ("voteId") `);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "REL_c68a6c53e95a7dc357f4ebce8f"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "UQ_c68a6c53e95a7dc357f4ebce8f0" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e59cfb4ce9deac3c9411eaa0e0"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP CONSTRAINT "FK_55fa4db8406ed66bc7044328427"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36cbbaa23a16cc814fc39f1a7e"`);
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "deletedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "transactionId" uuid`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "UQ_bdcf2c929b61c0935576652d9b0" UNIQUE ("transactionId")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "deletedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "error" ALTER COLUMN "deletedAt" DROP DEFAULT`);
        await queryRunner.query(`CREATE INDEX "IDX_e59cfb4ce9deac3c9411eaa0e0" ON "refresh_tokens" ("userId", "isRevoked") `);
        await queryRunner.query(`CREATE INDEX "IDX_36cbbaa23a16cc814fc39f1a7e" ON "user_sessions" ("userId", "isActive") `);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD CONSTRAINT "FK_55fa4db8406ed66bc7044328427" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_bdcf2c929b61c0935576652d9b0" FOREIGN KEY ("transactionId") REFERENCES "votes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_8c67071cc4f07819b59426799c6" FOREIGN KEY ("votingId") REFERENCES "voting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_229927f8a32a8ca2e9e865538ff" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_5169384e31d0989699a318f3ca4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate_votings" ADD CONSTRAINT "FK_7a8a74d057648f256d5e6ac0d57" FOREIGN KEY ("candidateId") REFERENCES "voting"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_votings" ADD CONSTRAINT "FK_1a7fc3e40c1cf54babb86c0bb3c" FOREIGN KEY ("votingId") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "election_votes" ADD CONSTRAINT "FK_4bc2bbd352ae7ef2d11d7e12671" FOREIGN KEY ("electionId") REFERENCES "votes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "election_votes" ADD CONSTRAINT "FK_1d5d52426ce4068a6d52867afb1" FOREIGN KEY ("voteId") REFERENCES "elections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "election_votes" DROP CONSTRAINT "FK_1d5d52426ce4068a6d52867afb1"`);
        await queryRunner.query(`ALTER TABLE "election_votes" DROP CONSTRAINT "FK_4bc2bbd352ae7ef2d11d7e12671"`);
        await queryRunner.query(`ALTER TABLE "candidate_votings" DROP CONSTRAINT "FK_1a7fc3e40c1cf54babb86c0bb3c"`);
        await queryRunner.query(`ALTER TABLE "candidate_votings" DROP CONSTRAINT "FK_7a8a74d057648f256d5e6ac0d57"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_5169384e31d0989699a318f3ca4"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_229927f8a32a8ca2e9e865538ff"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_8c67071cc4f07819b59426799c6"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_bdcf2c929b61c0935576652d9b0"`);
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP CONSTRAINT "FK_55fa4db8406ed66bc7044328427"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36cbbaa23a16cc814fc39f1a7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e59cfb4ce9deac3c9411eaa0e0"`);
        await queryRunner.query(`ALTER TABLE "error" ALTER COLUMN "deletedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "deletedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "UQ_bdcf2c929b61c0935576652d9b0"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "transactionId" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "deletedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_36cbbaa23a16cc814fc39f1a7e" ON "user_sessions" ("isActive", "userId") `);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD CONSTRAINT "FK_55fa4db8406ed66bc7044328427" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_e59cfb4ce9deac3c9411eaa0e0" ON "refresh_tokens" ("isRevoked", "userId") `);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "UQ_c68a6c53e95a7dc357f4ebce8f0"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "REL_c68a6c53e95a7dc357f4ebce8f" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "isActive" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1d5d52426ce4068a6d52867afb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4bc2bbd352ae7ef2d11d7e1267"`);
        await queryRunner.query(`DROP TABLE "election_votes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1a7fc3e40c1cf54babb86c0bb3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a8a74d057648f256d5e6ac0d5"`);
        await queryRunner.query(`DROP TABLE "candidate_votings"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b608314f3d0a674b41c1b88df"`);
        await queryRunner.query(`DROP TABLE "votes"`);
        await queryRunner.query(`DROP TABLE "voting"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37eceaa06e9bb8832f7d3d7985"`);
        await queryRunner.query(`DROP TABLE "candidates"`);
        await queryRunner.query(`DROP TABLE "elections"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "transactionId" TO "toAddress"`);
    }

}
