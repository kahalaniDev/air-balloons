using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using rest_server.Core;
using rest_server.Database;
using rest_server.Database.Models;
using rest_server.DTO;

namespace rest_server.Services
{
    public class UsersService
    {
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IConfiguration _configuration;


        public UsersService(
            IOptions<AirBalloonsDatabaseSettings> airBalloonsDatabaseSettings, IConfiguration configuration)
        {
            _configuration = configuration;

            var mongoClient = new MongoClient(
                airBalloonsDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                airBalloonsDatabaseSettings.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<User>(
                airBalloonsDatabaseSettings.Value.UsersCollectionName);
        }

        public async Task<Result<UserDTO>> Login(UserCredentialsDTO userCred)
        {
            try
            {
                User foundUser = await _usersCollection.Find(user => user.Username == userCred.Username).FirstOrDefaultAsync();
                if (foundUser == null || !BCrypt.Net.BCrypt.Verify(userCred.Password, foundUser.Password))
                    return Result<UserDTO>.Failure(ErrorMessages.INCORRECT_CREDENTIALS, 401);
                return Result<UserDTO>.Success(new UserDTO(foundUser, _configuration["JWT_Secret"]), 200);
            }
            catch
            {
                return Result<UserDTO>.Failure(ErrorMessages.INTERNAL_ERROR, 500);

            }
        }
    }
}