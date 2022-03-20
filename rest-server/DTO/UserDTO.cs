using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using rest_server.Database.Models;

namespace rest_server.DTO
{
    public class UserDTO
    {

        public UserDTO(User user,string jwtSecret){
            this.Username = user.Username;
            this.Token = createToken(user.Username,jwtSecret);
        }

        private string createToken(string username,string jwtSecret)
        {
			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenKey = Encoding.ASCII.GetBytes(jwtSecret);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[] { new Claim("username", username) }),
				Expires = DateTime.UtcNow.AddDays(7),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);        }

        public string Username { get; set; } 
        public string Token { get; set; } 

    }
}