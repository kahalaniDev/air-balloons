using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace rest_server.Middlewares
{
	[AttributeUsage(AttributeTargets.Method)]
	public class AllowAnonymousAttribute : Attribute
	{ }
}