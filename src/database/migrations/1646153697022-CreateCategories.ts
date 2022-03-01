import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1646153697022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criando as tabelas/entidades no banco
    await queryRunner.createTable(
      new Table({
        // Nome da tabela
        name: "categories",
        // As colunas/atributos da tabela
        columns: [
          {
            // Nossa PK será o id
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            // Em vez de dar o new Date() pega o now() logo do banco
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }
}
