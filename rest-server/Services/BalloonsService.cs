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
using static rest_server.DTO.BalloonsDTO;

namespace rest_server.Services
{
    public class BalloonsService
    {
        private readonly IMongoCollection<Balloon> _balloonsCollection;

        public BalloonsService(
            IOptions<AirBalloonsDatabaseSettings> airBalloonsDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                airBalloonsDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                airBalloonsDatabaseSettings.Value.DatabaseName);

            _balloonsCollection = mongoDatabase.GetCollection<Balloon>(
                airBalloonsDatabaseSettings.Value.BalloonsCollectionName);
        }

        public async Task<Result<List<BalloonItemDTO>>> GetListAsync()
        {
            try
            {
                List<Balloon> balloons = await _balloonsCollection.Find(_ => true).ToListAsync();
                return Result<List<BalloonItemDTO>>.Success(new BalloonsDTO(balloons).balloons, 200);
            }
            catch
            {
                return Result<List<BalloonItemDTO>>.Failure(ErrorMessages.INTERNAL_ERROR, 500);
            }
        }
        public async Task<Result<BalloonDTO>> GetAsync(string balloonId)
        {
            try
            {
                Balloon balloon = await _balloonsCollection.Find(balloon => balloon.Id == balloonId).FirstOrDefaultAsync();
                if (balloon == null) return Result<BalloonDTO>.Failure(ErrorMessages.BALLOON_NOT_FOUND, 404);
                return Result<BalloonDTO>.Success(new BalloonDTO(balloon), 200);
            }
            catch
            {
                return Result<BalloonDTO>.Failure(ErrorMessages.INTERNAL_ERROR, 500);

            }
        }

        public async Task<Result<BalloonDTO>> AddAsync(Balloon balloon)
        {
            try
            {
                bool isExistBalloon = balloon.Id != "";
                bool isInputValid = await isNameUnique(balloon, isExistBalloon);
                if (!isInputValid) Result<Balloon>.Failure(ErrorMessages.DUPLICATE_NAME, 409);
                Balloon addedBalloon;
                if (isExistBalloon) addedBalloon = await UpdateAsync(balloon);
                else addedBalloon = await CreateAsync(balloon);
                return Result<BalloonDTO>.Success(new BalloonDTO(addedBalloon), 200);
            }
            catch
            {
                return Result<BalloonDTO>.Failure(ErrorMessages.INTERNAL_ERROR, 500);

            }
        }

        private async Task<bool> isNameUnique(Balloon balloon, bool isExistBalloon)
        {
            Balloon similarBalloon = await _balloonsCollection.Find(element => element.Name == balloon.Name).FirstOrDefaultAsync();
            if (isExistBalloon) return similarBalloon == null || (similarBalloon != null && similarBalloon.Id == balloon.Id);
            else return similarBalloon == null;
        }


        private async Task<Balloon> CreateAsync(Balloon newBalloon)
        {
            await _balloonsCollection.InsertOneAsync(newBalloon);

            return await _balloonsCollection.Find(balloon => balloon.Name == newBalloon.Name).FirstOrDefaultAsync();
        }

        private async Task<Balloon> UpdateAsync(Balloon updatedBalloon)
        {
            await _balloonsCollection.ReplaceOneAsync(balloon => balloon.Id == updatedBalloon.Id, updatedBalloon);
            return await _balloonsCollection.Find(balloon => balloon.Name == updatedBalloon.Name).FirstOrDefaultAsync();

        }
    }

}