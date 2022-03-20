using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using rest_server.DTO;
using rest_server.Services;

namespace rest_server.Controllers
{
    public class UsersController:BaseApiController
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService) =>
            _usersService = usersService;

        [Route("login")]
		[HttpPost]   
        public async Task<IActionResult> Login([FromBody] UserCredentialsDTO userCred)
		{
            return HandleResult(await _usersService.Login(userCred));
		}
    }
}