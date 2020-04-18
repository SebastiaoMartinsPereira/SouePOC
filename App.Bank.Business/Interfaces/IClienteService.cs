using App.Bank.Business.Models;
using System;
using System.Threading.Tasks;

namespace App.Bank.Business.Interfaces
{
    public interface IClienteService : IDisposable
    {
        Task Adicionar(Cliente model);
        Task Editar(Cliente model);
        Task <Cliente> Delete(Guid id);
        Task<Cliente> BuscarPorDocumento(string documento);
    }
}