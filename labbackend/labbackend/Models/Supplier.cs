using System.ComponentModel.DataAnnotations.Schema;
namespace labbackend.Models
{
    [Table("Inventory")]

    public class Supplier
    {
        public int SupplierID { get; set; }
        public string Name { get; set; }
        public string ContactName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

    }

}