using labbackend.Models;

namespace labbackend.Models
{
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