using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore; 
using labbackend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register the GuestContext with dependency injection
builder.Services.AddDbContext<GuestContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Swagger for API documentation (useful for testing during development)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", // Name of the CORS policy
        builder =>
        {
            builder.AllowAnyOrigin() // Allows requests from any origin
                   .AllowAnyMethod() // Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
                   .AllowAnyHeader(); // Allows any HTTP headers
        });
});

var app = builder.Build();

// Use CORS policy in the application
app.UseCors("AllowAll"); // Applies the "AllowAll" CORS policy globally

// Configure the HTTP request pipeline for development
if (app.Environment.IsDevelopment())
{
    // Swagger is used for testing and exploring APIs easily during development
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); // Redirects HTTP requests to HTTPS

app.UseAuthorization(); // Applies authorization policies

// Map controllers for routing the API requests
app.MapControllers();

app.Run();
