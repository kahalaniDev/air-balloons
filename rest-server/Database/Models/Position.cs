using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace rest_server.Database.Models
{
    public class Position
    {
        [BsonElement("longitude")]
        public double Longitude { get; set; }
        [BsonElement("latitude")]
        public double Latitude { get; set; }
        [BsonElement("altitude")]
        public double Altitude { get; set; }
     
    }
}