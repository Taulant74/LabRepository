using labbackend.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{
    [Table("Payment")]
    public class Payment
    {
        public int PaymentID { get; set; }
        public int InvoiceID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }

        // Relationships
        //public Invoice Invoice { get; set; }
    }

}