using App.Bank.Business.Interfaces;
using App.Bank.Business.Models;
using App.Bank.Business.Models.Validations;
using System.Linq;
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
            if (!ExecutarValidacao(new ClienteValidation(), cliente)) return;

            if (_clienteRepository.Buscar(f => f.Documento == cliente.Documento).Result.Any())
            {
                Notificar($"Já existe um {cliente.GetType().Name} cadastrado para este documento.");
                return;
            }

            await _clienteRepository.Adicionar(cliente);
        }

        public async Task<Cliente> BuscarPorDocumento(string documento)
        {
            var cliente = (await _clienteRepository.Buscar(c => c.Documento.Equals(documento.OnlyNumbers()))).FirstOrDefault();

            if (!(cliente is null)) return cliente;

            Notificar($"Cliente com CPF:{documento} não possui cadastro no sistema.");
            return null;

        }



        public void Dispose()
        {
            _clienteRepository?.Dispose();
        }
    }
}