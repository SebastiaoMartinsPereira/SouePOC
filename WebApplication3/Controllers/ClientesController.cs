using App.Bank.Business.Interfaces;
using App.Bank.Business.Models;
using App.Bank.Data.Context;
using App.Bank.UI._AppData;
using App.Bank.UI.ViewModels;
using DevIO.App.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace App.Bank.UI.Controllers
{
    [Authorize("Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : BaseController
    {
        private readonly IClienteService _clienteService;
        private readonly MainContext _context;

        public ClientesController(IClienteService clienteService, MainContext context, INotificador notificador) : base(notificador)
        {
            this._clienteService = clienteService;
            this._context = context;
        }

        // GET: api/Clientes/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(Guid id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return cliente;
        }

        // GET: api/Clientes/08343270401
        [AllowAnonymous]
        [HttpGet("cpf/{cpf}")]
        [Produces("application/json")]
        public async Task<ActionResult<object>> GetCliente(string cpf,
            [FromServices]SigningConfigurations signingConfigurations,
            [FromServices]TokenConfigurations tokenConfigurations)
        {

            var cliente = await _clienteService.BuscarPorDocumento(cpf);
            if (cliente == null)
            {
                return NotFound(this.Notificacoes());
            }

            return CreateToken(signingConfigurations, tokenConfigurations, cliente);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<object>> PostCliente(Cliente cliente,
            [FromServices]SigningConfigurations signingConfigurations,
            [FromServices]TokenConfigurations tokenConfigurations)
        {
            if (!ModelState.IsValid) return BadRequest(cliente);

            await _clienteService.Adicionar(cliente);

            if (!OperacaoValida()) return this.BadRequest();

            return CreateToken(signingConfigurations, tokenConfigurations, cliente);

        }

        [HttpPut]
        [AllowAnonymous]
        public async Task<ActionResult<object>> PutCliente(Cliente cliente,
            [FromServices]SigningConfigurations signingConfigurations,
            [FromServices]TokenConfigurations tokenConfigurations)
        {
            if (!ModelState.IsValid) return BadRequest(cliente);

            await _clienteService.Editar(cliente);
            if (!OperacaoValida()) return this.BadRequest();

            return CreateToken(signingConfigurations, tokenConfigurations, cliente);
        }



        private ActionResult<object> CreateToken(SigningConfigurations signingConfigurations,
            TokenConfigurations tokenConfigurations, Cliente cliente)
        {
            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(cliente.Id.ToString(), "Login"),
                new[]
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                    new Claim(JwtRegisteredClaimNames.UniqueName, cliente.Id.ToString())
                }
            );

            DateTime dataCriacao = DateTime.Now;
            DateTime dataExpiracao = dataCriacao.AddSeconds(tokenConfigurations.Seconds);

            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = tokenConfigurations.Issuer,
                Audience = tokenConfigurations.Audience,
                SigningCredentials = signingConfigurations.SigningCredentials,
                Subject = identity,
                NotBefore = dataCriacao,
                Expires = dataExpiracao
            });
            var token = handler.WriteToken(securityToken);

            return new OkObjectResult(new
            {
                data = new
                {
                    authenticated = true,
                    created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                    expiration = dataExpiracao.ToString("yyyy-MM-dd HH:mm:ss"),
                    accessToken = token,
                    message = "OK",
                    cliente

                }
            });

        }

    }
}
