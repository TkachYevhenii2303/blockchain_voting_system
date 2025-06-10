import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthEntities1749506579068 implements MigrationInterface {
    name = 'CreateAuthEntities1749506579068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credentials" ("id" SERIAL NOT NULL, "password" character varying(255), "isVerified" boolean NOT NULL DEFAULT false, "user_id" integer, CONSTRAINT "REL_c68a6c53e95a7dc357f4ebce8f" UNIQUE ("user_id"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "token" character varying(500) NOT NULL, "userId" integer NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "isRevoked" boolean NOT NULL DEFAULT false, "revokedReason" character varying(255), "revokedAt" TIMESTAMP, "deviceInfo" character varying(255), "ipAddress" character varying(255), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e59cfb4ce9deac3c9411eaa0e0" ON "refresh_tokens" ("userId", "isRevoked") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_4542dd2f38a61354a040ba9fd5" ON "refresh_tokens" ("token") `);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'candidate')`);
        await queryRunner.query(`CREATE TYPE "public"."users_accountstatus_enum" AS ENUM('active', 'inactive', 'pending', 'blocked')`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "firstName" character varying(255), "lastName" character varying(255), "email" character varying(255), "phoneNumber" character varying(255), "emailVerificationToken" character varying(255), "emailVerificationTokenExpiresAt" TIMESTAMP, "passwordResetToken" character varying(255), "passwordResetTokenExpiresAt" TIMESTAMP, "role" "public"."users_role_enum" DEFAULT 'candidate', "accountStatus" "public"."users_accountstatus_enum" DEFAULT 'pending', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_65cbf5fcb331619593ee334c7c" ON "users" ("email") WHERE email IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "user_sessions" ("id" SERIAL NOT NULL, "sessionToken" character varying(500) NOT NULL, "userId" integer NOT NULL, "ipAddress" character varying(255), "userAgent" character varying(500), "deviceInfo" character varying(255), "expiresAt" TIMESTAMP NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "lastAccessedAt" TIMESTAMP, CONSTRAINT "PK_e93e031a5fed190d4789b6bfd83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cd183bcb9ffe40bd858ed6b6b8" ON "user_sessions" ("sessionToken") `);
        await queryRunner.query(`CREATE INDEX "IDX_36cbbaa23a16cc814fc39f1a7e" ON "user_sessions" ("userId", "isActive") `);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD CONSTRAINT "FK_55fa4db8406ed66bc7044328427" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP CONSTRAINT "FK_55fa4db8406ed66bc7044328427"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36cbbaa23a16cc814fc39f1a7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd183bcb9ffe40bd858ed6b6b8"`);
        await queryRunner.query(`DROP TABLE "user_sessions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65cbf5fcb331619593ee334c7c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_accountstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4542dd2f38a61354a040ba9fd5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e59cfb4ce9deac3c9411eaa0e0"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "credentials"`);
    }

}
