using kisledca_backend.Models;
using kisledca_backend.Services;
using kisledca_backend.Data;
using Microsoft.EntityFrameworkCore;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
// configuring DI
{

// Add services to the container.
builder.Services.Configure<BookStoreDatabaseSettings>(
    builder.Configuration.GetSection("BookStoreDatabase")
);
// builder.Services.AddDbContext<SchoolContext>(options =>
//                 options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// DbInitializer.Initialize();
builder.Services.AddCors(options=>{
    options.AddPolicy(MyAllowSpecificOrigins,policy=>{
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddSingleton<BooksService>();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
// add all ApiController decorated class
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
}

var app = builder.Build();
// configure app
{

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(MyAllowSpecificOrigins);
}

app.Run();
