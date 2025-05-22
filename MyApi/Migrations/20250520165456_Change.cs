using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApi.Migrations
{
    /// <inheritdoc />
    public partial class Change : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Users_userId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Users_userId",
                table: "Tags");

            migrationBuilder.DropForeignKey(
                name: "FK_TagTodo_Tags_tagsid",
                table: "TagTodo");

            migrationBuilder.DropForeignKey(
                name: "FK_TagTodo_Todos_todosid",
                table: "TagTodo");

            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Users_userId",
                table: "Todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Todos",
                table: "Todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tags",
                table: "Tags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "Todos",
                newName: "todos");

            migrationBuilder.RenameTable(
                name: "Tags",
                newName: "tags");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "categories");

            migrationBuilder.RenameIndex(
                name: "IX_Todos_userId",
                table: "todos",
                newName: "IX_todos_userId");

            migrationBuilder.RenameIndex(
                name: "IX_Tags_userId",
                table: "tags",
                newName: "IX_tags_userId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_userId",
                table: "categories",
                newName: "IX_categories_userId");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "users",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext");

            migrationBuilder.AddColumn<int>(
                name: "categoryId",
                table: "todos",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_todos",
                table: "todos",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tags",
                table: "tags",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_categories",
                table: "categories",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_users_email",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_todos_categoryId",
                table: "todos",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tags_name",
                table: "tags",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_categories_name",
                table: "categories",
                column: "name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_categories_users_userId",
                table: "categories",
                column: "userId",
                principalTable: "users",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_tags_users_userId",
                table: "tags",
                column: "userId",
                principalTable: "users",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_TagTodo_tags_tagsid",
                table: "TagTodo",
                column: "tagsid",
                principalTable: "tags",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TagTodo_todos_todosid",
                table: "TagTodo",
                column: "todosid",
                principalTable: "todos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_todos_categories_categoryId",
                table: "todos",
                column: "categoryId",
                principalTable: "categories",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_todos_users_userId",
                table: "todos",
                column: "userId",
                principalTable: "users",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_categories_users_userId",
                table: "categories");

            migrationBuilder.DropForeignKey(
                name: "FK_tags_users_userId",
                table: "tags");

            migrationBuilder.DropForeignKey(
                name: "FK_TagTodo_tags_tagsid",
                table: "TagTodo");

            migrationBuilder.DropForeignKey(
                name: "FK_TagTodo_todos_todosid",
                table: "TagTodo");

            migrationBuilder.DropForeignKey(
                name: "FK_todos_categories_categoryId",
                table: "todos");

            migrationBuilder.DropForeignKey(
                name: "FK_todos_users_userId",
                table: "todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropIndex(
                name: "IX_users_email",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_todos",
                table: "todos");

            migrationBuilder.DropIndex(
                name: "IX_todos_categoryId",
                table: "todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tags",
                table: "tags");

            migrationBuilder.DropIndex(
                name: "IX_tags_name",
                table: "tags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_categories",
                table: "categories");

            migrationBuilder.DropIndex(
                name: "IX_categories_name",
                table: "categories");

            migrationBuilder.DropColumn(
                name: "categoryId",
                table: "todos");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "todos",
                newName: "Todos");

            migrationBuilder.RenameTable(
                name: "tags",
                newName: "Tags");

            migrationBuilder.RenameTable(
                name: "categories",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_todos_userId",
                table: "Todos",
                newName: "IX_Todos_userId");

            migrationBuilder.RenameIndex(
                name: "IX_tags_userId",
                table: "Tags",
                newName: "IX_Tags_userId");

            migrationBuilder.RenameIndex(
                name: "IX_categories_userId",
                table: "Categories",
                newName: "IX_Categories_userId");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Users",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Todos",
                table: "Todos",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tags",
                table: "Tags",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Users_userId",
                table: "Categories",
                column: "userId",
                principalTable: "Users",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Users_userId",
                table: "Tags",
                column: "userId",
                principalTable: "Users",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_TagTodo_Tags_tagsid",
                table: "TagTodo",
                column: "tagsid",
                principalTable: "Tags",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TagTodo_Todos_todosid",
                table: "TagTodo",
                column: "todosid",
                principalTable: "Todos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Users_userId",
                table: "Todos",
                column: "userId",
                principalTable: "Users",
                principalColumn: "id");
        }
    }
}
