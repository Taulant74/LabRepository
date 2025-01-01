using System.ComponentModel.DataAnnotations.Schema;
namespace labbackend.Models
{
    [Table("Inventory")] 

    public class Inventory
    {
        public int InventoryID { get; set; }
        public int HotelID { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int SupplierID { get; set; }

       
    }

}
