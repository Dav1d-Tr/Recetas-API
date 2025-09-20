using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MiApiRecetas.Models;

namespace MiApiRecetas.Data;

public partial class BdrecetasContext : DbContext
{
    public BdrecetasContext()
    {
    }

    public BdrecetasContext(DbContextOptions<BdrecetasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categoria> Categorias { get; set; }

    public virtual DbSet<Ingrediente> Ingredientes { get; set; }

    public virtual DbSet<Receta> Recetas { get; set; }

    public virtual DbSet<RecetaIngrediente> RecetaIngredientes { get; set; }

    public virtual DbSet<Resena> Resenas { get; set; }

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
      //  => optionsBuilder.UseSqlServer("Server=LAPTOP-SM3F8PEO;Database=BDRECETAS;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__categori__3213E83FB4568FE4");

            entity.ToTable("categorias");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Ingrediente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ingredie__3213E83FA106A4DE");

            entity.ToTable("ingredientes");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Receta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__recetas__3213E83FB1D86598");

            entity.ToTable("recetas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoriaId).HasColumnName("categoria_id");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Dificultad)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("dificultad");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.ImagenUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("imagen_url");
            entity.Property(e => e.TiempoPreparacion).HasColumnName("tiempo_preparacion");
            entity.Property(e => e.Titulo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("titulo");

            entity.HasOne(d => d.Categoria).WithMany(p => p.Receta)
                .HasForeignKey(d => d.CategoriaId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__recetas__categor__3B75D760");
        });

        modelBuilder.Entity<RecetaIngrediente>(entity =>
        {
            entity.HasKey(e => new { e.RecetaId, e.IngredienteId }).HasName("PK__receta_i__78240447462CE8B2");

            entity.ToTable("receta_ingredientes");

            entity.Property(e => e.RecetaId).HasColumnName("receta_id");
            entity.Property(e => e.IngredienteId).HasColumnName("ingrediente_id");
            entity.Property(e => e.Cantidad)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cantidad");

            entity.HasOne(d => d.Ingrediente).WithMany(p => p.RecetaIngredientes)
                .HasForeignKey(d => d.IngredienteId)
                .HasConstraintName("FK__receta_in__ingre__403A8C7D");

            entity.HasOne(d => d.Receta).WithMany(p => p.RecetaIngredientes)
                .HasForeignKey(d => d.RecetaId)
                .HasConstraintName("FK__receta_in__recet__3F466844");
        });

        modelBuilder.Entity<Resena>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__resenas__3213E83F1079C85C");

            entity.ToTable("resenas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Calificacion)
                .HasColumnType("decimal(3, 1)")
                .HasColumnName("calificacion");
            entity.Property(e => e.Comentario)
                .HasColumnType("text")
                .HasColumnName("comentario");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.RecetaId).HasColumnName("receta_id");
            entity.Property(e => e.Usuario)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("usuario");

            entity.HasOne(d => d.Receta).WithMany(p => p.Resenas)
                .HasForeignKey(d => d.RecetaId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__resenas__receta___4316F928");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
