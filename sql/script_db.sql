IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Clientes] (
    [Id] uniqueidentifier NOT NULL,
    [Nome] varchar(250) NOT NULL,
    [Email] varchar(200) NOT NULL,
    [Endereco] varchar(250) NOT NULL,
    [DataCadastro] datetime2 NOT NULL,
    [Documento] varchar(11) NOT NULL,
    [Telefone] varchar(11) NOT NULL,
    CONSTRAINT [PK_Clientes] PRIMARY KEY ([Id])
);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200417140354_InitalMigrations', N'2.2.6-servicing-10079');

GO

