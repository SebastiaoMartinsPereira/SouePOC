using App.Bank.Business.Interfaces;
using App.Bank.Business.Models;
using System;
using System.Threading.Tasks;

namespace App.Bank.Business.Services
{
    public class ClienteService : BaseService, IClienteService
    {
        private readonly IClienteRepository _clienteRepository;

        public ClienteService(IClienteRepository produtoRepository, INotificador notificador) : base(notificador)
        {
            _clienteRepository = produtoRepository;
        }

        public async Task Adicionar(Cliente cliente)
        {
            //if (!ExecutarValidacao(new ClienteValidation(), produto)) return;

            await _clienteRepository.Adicionar(cliente);
        }

        public async Task Atualizar(Cliente cliente)
        {
            //if (!ExecutarValidacao(new ProdutoValidation(), produto)) return;

            await _clienteRepository.Atualizar(cliente);
        }

        public async Task Remover(Guid id)
        {
            await _clienteRepository.Remover(id);
        }

        public void Dispose()
        {
            _clienteRepository?.Dispose();
        }
    }
}