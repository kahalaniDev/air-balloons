using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using rest_server.Database.Models;

namespace rest_server.DTO
{
    public class BalloonDTO
    {
        public BalloonDTO(Balloon balloon){
            this.Id = balloon.Id;
            this.Name = balloon.Name;
            this.Description = balloon.Description;
            this.Color = balloon.Color;
            this.Type = balloon.Type;
        }

        public string Id { get; set; } 
        public string Name { get; set; } 
        public string Description { get; set; } 
        public string Color { get; set; } 
        public string Type { get; set; }
    }
}