using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Bank.Business.Models
{
    public class Entity
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        public Entity()
        {
            this.Id = new Guid();
        }
    }
}