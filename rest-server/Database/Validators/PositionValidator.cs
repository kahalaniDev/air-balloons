using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using rest_server.Database.Models;

namespace rest_server.Database.Validators
{
    public class PositionValidator : AbstractValidator<Position>
    {

        public PositionValidator()
        {
            RuleFor(position => position.Longitude).NotNull().GreaterThanOrEqualTo(-180).LessThanOrEqualTo(180);
            RuleFor(position => position.Latitude).NotNull().GreaterThanOrEqualTo(-90).LessThanOrEqualTo(90);
            RuleFor(position => position.Altitude).NotNull().GreaterThanOrEqualTo(0);
        }
    }
}