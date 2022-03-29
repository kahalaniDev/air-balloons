using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using FluentValidation;
using rest_server.Database.Models;

namespace rest_server.Database.Validators
{
    public class BalloonValidator : AbstractValidator<Balloon>
    {

       private List<String> _ColorsList = new List<String>(){"black","red","white","blue"};
       private List<String> _TypesList = new List<String>(){"small","medium","big","double"};

        private bool validateId(string id){
            if(id == "") return true;
            if(id.Length == 24 && Regex.IsMatch(id, @"^[a-zA-Z0-9]+$")) return true;
            return false;
        } 

		public BalloonValidator()
		{
            RuleFor(balloon => balloon.Id).Must(id=> validateId(id));
            RuleFor(balloon => balloon.Name).NotEmpty();
			RuleFor(balloon => balloon.Description).NotEmpty();
			RuleFor(balloon => balloon.Type).NotEmpty().Must(type => _TypesList.Contains(type));
			RuleFor(balloon => balloon.Color).NotEmpty().Must(color => _ColorsList.Contains(color));
			RuleFor(balloon => balloon.Position).InjectValidator();
		}
    }
}