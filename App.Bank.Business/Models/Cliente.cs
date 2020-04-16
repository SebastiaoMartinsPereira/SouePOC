using System;

namespace App.Bank.Business.Models
{
    public class Cliente : Entity
    {
        public Cliente()
        {
            DataCadastro = new DateTime();
        }

        public string Nome { get; set; }
        public string Documento { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}