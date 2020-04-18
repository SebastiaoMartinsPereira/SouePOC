using App.Bank.Business.Models.Validations;
using System;

namespace App.Bank.Business.Models
{
    public class Cliente : Entity
    {
        public Cliente()
        {
            DataCadastro = DateTime.Now;
        }

        public Cliente(string nome, string documento, string email, string telefone, string endereco)
        {
            Nome = nome;
            Documento = documento.OnlyNumbers();
            Email = email;
            Telefone = telefone.OnlyNumbers();
            Endereco = endereco;
            DataCadastro = DateTime.Now;
        }

        public string Nome { get; set; }
        public string Email { get; set; }
        public string Endereco { get; set; }
        public DateTime DataCadastro { get; set; }

        private string _documento;
        private string _telefone;
        public string Documento
        {
            get => this._documento;
            set => this._documento = value.OnlyNumbers();
        }

        public string Telefone
        {
            get => this._telefone;
            set => this._telefone = value.OnlyNumbers();
        }


    }
}