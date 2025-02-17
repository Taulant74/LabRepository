using labbackend.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("Menu")]
    public class Menu
    {
        public int MenuID { get; set; }              // Auto-incremented primary key
        public string ItemName { get; set; }         // Name of the menu item
        public string Description { get; set; }      // Description of the menu item
        public decimal Price { get; set; }           // Price of the menu item
    }
}
