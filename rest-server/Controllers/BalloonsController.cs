using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using rest_server.Services;
using rest_server.Database.Models;
using rest_server.Middlewares;

namespace rest_server.Controllers
{
    [Authorize]
    public class BalloonsController:BaseApiController
    {
        private readonly BalloonsService _balloonsService;

        public BalloonsController(BalloonsService balloonsService) =>
            _balloonsService = balloonsService;
            

        [HttpGet]
        public async Task<IActionResult> GetBalloons()
        {
            return HandleResult(await _balloonsService.GetListAsync());
        }

        [HttpGet("{id:length(24)}")]
        public async Task<IActionResult> GetBalloon(string id)
        {
            return HandleResult(await _balloonsService.GetAsync(id));
        }

        [HttpPost]
		public async Task<IActionResult> AddBalloon(Balloon balloon)
		{
            return HandleResult(await _balloonsService.AddAsync(balloon));
		}
    }
}