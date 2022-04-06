// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class UserTable1649225307167 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'user',
//         columns: [
//           {
//             name: 'id',
//             type: 'int',
//             isPrimary: true,
//           },
//           {
//             name: 'name',
//             type: 'varchar',
//           },
//         ],
//       }),
//       true,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable('user');
//   }
// }
