using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace rest_server.Core
{
    public static class ErrorMessages
    {
        public const string INCORRECT_CREDENTIALS = "Incorrect username or password";
        public const string DUPLICATE_NAME = "Name already exists";
        public const string INTERNAL_ERROR = "Server internal problem";
    }
}