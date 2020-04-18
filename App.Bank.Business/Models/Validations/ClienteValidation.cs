using FluentValidation;

namespace App.Bank.Business.Models.Validations
{
    public class ClienteValidation : AbstractValidator<Cliente>
    {

        public ClienteValidation()
        {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("O campo {PropertyName} é de preenchimento obrigatório.")
                .Length(5, 60)
                .WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(f => f.Documento.Length).Equal(CpfValidacao.TamanhoCpf)
                .WithMessage("O campo Documento precisa ter {ComparisonValue} caracteres e foi fornecido {PropertyValue}.");
            RuleFor(f => CpfValidacao.Validar(f.Documento)).Equal(true)
                .WithMessage("O documento fornecido é inválido.");

            RuleFor(c => c.Email)
                .NotEmpty().WithMessage("O campo {PropertyName} é de preenchimento obrigatório.");

            RuleFor(c => c.Telefone)
                .NotEmpty().WithMessage("O campo {PropertyName} é de preenchimento obrigatório.");

            RuleFor(c => c.Endereco)
                .NotEmpty().WithMessage("O campo {PropertyName} é de preenchimento obrigatório.");

        }
    }
}