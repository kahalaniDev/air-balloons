using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace rest_server.Core
{
    public static class ErrorCodes
    {
        public const string INCORRECT_CREDENTIALS_403 = "Incorrect username or password";
        public const string DUPLICATE_NAME_409 = "Name already exists";
        public const string INTERNAL_ERROR_500 = "Server internal problem";
    }
}