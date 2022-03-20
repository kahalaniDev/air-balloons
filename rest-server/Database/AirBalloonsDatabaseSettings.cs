using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace rest_server.Database
{
    public class AirBalloonsDatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; } 
        public string DatabaseName { get; set; } 
        public string BalloonsCollectionName { get; set; } 
        public string UsersCollectionName { get; set; } 

    }
}