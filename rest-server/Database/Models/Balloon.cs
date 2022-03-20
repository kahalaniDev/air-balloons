using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using rest_server.Core;

namespace rest_server.Database.Models
{
    public  class Balloon
    { 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }


        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("description")]
        public string Description { get; set; }        
        [BsonElement("color")]
        public string Color { get; set; }
        [BsonElement("type")]
        public string Type { get; set; }
        [BsonElement("position")]
        public Position Position { get; set; }  
    }

    
}