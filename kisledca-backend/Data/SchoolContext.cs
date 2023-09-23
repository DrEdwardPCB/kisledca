using kisledca_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace kisledca_backend.Data{
    public class SchoolContext: DbContext{
        protected readonly IConfiguration Configuration;

        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        {
        }
        public DbSet <Course> Courses {get;set;}
        public DbSet<Enrollment> Enrollments {get; set;} // can be omit since interrelelated
        public DbSet<Student> Students {get; set;} // can be omit since interrelated

        // since DbSet entity name is plural form, but we want database to be in single form we need overriding  
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Course>().ToTable("Course");
            modelBuilder.Entity<Enrollment>().ToTable("Enrollment");
            modelBuilder.Entity<Student>().ToTable("Student");
        }
    }
}