using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using rest_server.Database.Models;

namespace rest_server.DTO
{
    public class BalloonsDTO
    {
        public BalloonsDTO(List<Balloon> balloons){
            this.balloons = balloons.Select(balloon => new BalloonItemDTO(balloon)).ToList();
        }

        public List<BalloonItemDTO> balloons { get; set; }

        public class BalloonItemDTO
        {

            public BalloonItemDTO(Balloon balloon){
                this.Id = balloon.Id;
                this.Name = balloon.Name;
                this.Color = balloon.Color;
                this.Type = balloon.Type;
                this.position = balloon.Position;
            }

            public string Id { get; set; } 
            public string Name { get; set; }  
            public string Color { get; set; } 
            public string Type { get; set; }
            public Position position { get; set; }
        }
    }
}