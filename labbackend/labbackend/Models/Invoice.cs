using labbackend.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("Invoice")]
    public class Invoice
    {
        public int InvoiceID { get; set; }
        public int ReservationID { get; set; }
        public decimal Amount { get; set; }

        // Relationships
        //public Reservation Reservation { get; set; }
       // public ICollection<Payment> Payments { get; set; }
    }

}