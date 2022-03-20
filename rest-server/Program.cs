using FluentValidation.AspNetCore;
using rest_server.Database;
using rest_server.Middlewares;
using rest_server.Services;

var builder = WebApplication.CreateBuilder(args);
string corsPolicyName = "CorsPolicy";

// Add services to the container.
builder.Services.AddCors(opt =>
    opt.AddPolicy(corsPolicyName, policy =>
        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000")
    )
);

builder.Services.AddControllers().AddFluentValidation(s =>
    s.RegisterValidatorsFromAssemblyContaining<Program>()
);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//databes confi
builder.Services.Configure<AirBalloonsDatabaseSettings>(
builder.Configuration.GetSection("AirBalloonsDatabase"));
builder.Services.AddSingleton<UsersService>();
builder.Services.AddSingleton<BalloonsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(corsPolicyName);

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();
