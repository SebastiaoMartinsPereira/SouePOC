using App.Bank.Business.Interfaces;
using App.Bank.Business.Models;
using App.Bank.Data.Context;

namespace App.Bank.Data.Repository
{
    public class ClienteRepository : Repository<Cliente>, IClienteRepository
    {
        public ClienteRepository(MainContext db) : base(db) { }
    }
}