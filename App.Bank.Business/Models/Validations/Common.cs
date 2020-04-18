using System;
using System.Linq;

namespace App.Bank.Business.Models.Validations
{
    public static class Common
    {

        public static string OnlyNumbers(this string value)
        {
            return string.Join("", value.ToCharArray().Where(Char.IsDigit));
        }


    }
}
