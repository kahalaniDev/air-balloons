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
builder.Services.AddEndpointsApiExplorer();

//database config
builder.Services.Configure<AirBalloonsDatabaseSettings>(
builder.Configuration.GetSection("AirBalloonsDatabase"));
builder.Services.AddSingleton<UsersService>();
builder.Services.AddSingleton<BalloonsService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors(corsPolicyName);

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();
