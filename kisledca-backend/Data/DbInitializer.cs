using kisledca_backend.Models;
using System;
using System.Linq;

namespace kisledca_backend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(SchoolContext context){
            context.Database.EnsureCreated();
        }
    }
}