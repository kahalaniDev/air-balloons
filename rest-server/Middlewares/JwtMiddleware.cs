using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using rest_server.Services;

namespace rest_server.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IConfiguration configuration)
        {
            string header = context.Request.Headers["Authorization"].FirstOrDefault();
            if(header != null)
            {
                string token = header.Split(" ").Last();   
                string username = ValidateToken(token, configuration["JWT_Secret"]);
                    if (username != null)
                    {
                        // attach user to context on successful jwt validation
                        context.Items["User"] = username;
                    }
            }
            await _next(context);
        }

        private string ValidateToken(string token, string secret)
        {
            if (token == null)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                string username = jwtToken.Claims.First(element => element.Type == "username").Value;
                // return user id from JWT token if validation successful
                return username;
            }
            catch
            {
                // return null if validation fails
                return null;
            }

        }

    }
}