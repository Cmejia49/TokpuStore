using Microsoft.EntityFrameworkCore;
using RetailPosApi.Model;
using RetailPosApi.Model.V1;
using System;

namespace RetailPosApi.DataAccess
{
    public class ItemContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
                    /*    optionsBuilder.UseSqlServer("Server=.,1433;Initial Catalog=RetailPosApiDB;User ID=as; Password=624545123;MultipleActiveResultSets=true;Integrated Security=false;TrustServerCertificate=true")
                         .LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);*/
        }
        public DbSet<Items> Item { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Damage> Damages { get; set; }
        public DbSet<Expenses> Expenses { get; set; }
        public DbSet<Variants> Variants { get; set; }
        public DbSet<Options> Options { get; set; }
        public DbSet<Images> Images { get; set; }
        public ItemContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Items>()
                .HasOne<Category>(p => p.Category)
                .WithMany(b => b.ItemList)
                .HasForeignKey(s => s.CatFId)
                .IsRequired();

            modelBuilder.Entity<Items>()
                 .HasMany(s => s.VariantList)
                 .WithOne(s => s.Item)
                 .HasForeignKey(fk => fk.ItemFid).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Items>()
                .HasMany(s=>s.ImageList)
                .WithOne(s=>s.Item)
                .HasForeignKey(fk => fk.ItemFid).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Items>()
                .HasMany(s => s.StockList)
                .WithOne(i => i.Item)
                .HasForeignKey(f => f.ItemFid).OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Store>()
                .HasMany(t => t.DamageList)
                .WithOne(p => p.Store)
                .HasForeignKey(fk => fk.StoreFid)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Store>()
                .HasMany(t => t.SaleList)
                .WithOne(p => p.Store)
                .HasForeignKey(fk => fk.StoreFid)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Store>()
               .HasMany(i => i.StockList)
               .WithOne(i => i.Store)
               .HasForeignKey(f => f.StoreFid)
               .OnDelete(DeleteBehavior.Cascade);


            //User
            modelBuilder.Entity<User>()
                .HasOne(t => t.Store)
                .WithOne(p => p.User)
                .HasForeignKey<Store>(fk => fk.UserFid);

            //sale
            modelBuilder.Entity<Sale>()
                .HasOne(t => t.Store)
                .WithMany(p => p.SaleList)
                .HasForeignKey(fk => fk.StoreFid);

            //damage
            modelBuilder.Entity<Damage>()
                .HasOne(t => t.Store)
                .WithMany(p => p.DamageList)
                .HasForeignKey(fk => fk.StoreFid);

            //Expenses
            modelBuilder.Entity<Expenses>()
                .HasOne(t => t.store)
                .WithMany(t => t.ExpensesList)
                .HasForeignKey(fk => fk.StoreFid);



        }
    }
}
