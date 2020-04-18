using App.Bank.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace App.Bank.Data.Mapping
{
    public class ClienteMapping : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Documento)
                .IsRequired()
                .HasColumnType("varchar(11)");

            builder.Property(c => c.Nome)
                .IsRequired()
                .HasColumnType("varchar(250)");

            builder.Property(c => c.Telefone)
                .IsRequired()
                .HasColumnType("varchar(11)");

            builder.Property(c => c.Email)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(c => c.Endereco)
                .IsRequired()
                .HasColumnType("varchar(250)");

            builder.ToTable("Clientes");

        }
    }
}