using MediatR;
using Microsoft.AspNetCore.Mvc;
using rest_server.Core;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            switch (result.StatusCode)
            {
                case 200:
                    return Ok(result.Value);
                case 401:
                    return Unauthorized(result.ErrorMessage);
                case 404:
                    return NotFound(result.ErrorMessage);
                case 409:
                    return Conflict(result.ErrorMessage);
                default:
                    return StatusCode(result.StatusCode, result.ErrorMessage);
            }
        }
    }
}