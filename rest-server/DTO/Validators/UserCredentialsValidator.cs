using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace rest_server.DTO.Validators
{
    public class UserCredentialsValidator : AbstractValidator<UserCredentialsDTO>
    {
        public UserCredentialsValidator()
		{
            RuleFor(userCred => userCred.Username).NotEmpty().Length(1,20);
            RuleFor(userCred => userCred.Password).NotEmpty().Length(8,12).Matches("^(?=.*[0-9])(?=.*[!@#$%^&*])");
		}
    }
}