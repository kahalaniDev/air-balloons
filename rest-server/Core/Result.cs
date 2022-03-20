using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace rest_server.Core
{
    public class Result<T>
    {
        public T Value { get; set; }
        public string ErrorMessage { get; set; }
        public int StatusCode { get; set; }

        public static Result<T> Success(T value, int statusCode) => new Result<T> { StatusCode = statusCode, Value = value };
        public static Result<T> Failure(string errorMessage, int statusCode) => new Result<T> { StatusCode = statusCode, ErrorMessage = errorMessage };

    }
}