using App.Bank.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DevIO.App.Controllers
{
    public abstract class BaseController : Controller
    {
        private readonly INotificador _notificador;

        protected BaseController(INotificador notificador)
        {
            _notificador = notificador;
        }

        protected bool OperacaoValida()
        {
            return !_notificador.TemNotificacao();
        }

        protected object Notificacoes()
        {
            return new { errors = _notificador.ObterNotificacoes().ToArray() };
        }

        protected new BadRequestObjectResult BadRequest()
        {
            return new BadRequestObjectResult(new { errors = _notificador.ObterNotificacoes() });
        }

    }
}