using App.Bank.Business.Interfaces;
using App.Bank.Business.Models;
using App.Bank.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace App.Bank.Data.Repository
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity, new()
    {
        protected readonly App.Bank.Data.Context.MainContext Db;
        protected readonly DbSet<TEntity> DbSet;

        protected Repository(MainContext db)
        {
            Db = db;
            DbSet = db.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> Buscar(Expression<Func<TEntity, bool>> predicate)
        {
            return await DbSet.AsNoTracking().Where(predicate).ToListAsync();
        }

        public async Task<TEntity> ObterPorId(Guid id)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task<List<TEntity>> ObterTodos()
        {
            return await DbSet.ToListAsync();
        }


        public async Task Adicionar(TEntity entity)
        {
            DbSet.Add(entity);
            await SaveChanges();
        }

        public async Task Atualizar(TEntity entity)
        {
            DbSet.Update(entity);
            await SaveChanges();
        }

        public async Task Remover(Guid id)
        {
            try
            {
                DetachLocal(_ => _.Id.Equals(id));
                DbSet.Remove(new TEntity { Id = id }).State = EntityState.Deleted;
                await SaveChanges();
            }
            catch (Exception d)
            {

                throw;
            }
        }

        public async Task<int> SaveChanges()
        {
            return await Db.SaveChangesAsync();
        }

        public void Dispose()
        {
            Db?.Dispose();
        }

        public virtual void DetachLocal(Func<TEntity, bool> predicate)
        {
            var local = DbSet.Local.Where(predicate).FirstOrDefault();
            if (!(local is null))
            {
                Db.Entry(local).State = EntityState.Detached;
            }
        }

    }
}