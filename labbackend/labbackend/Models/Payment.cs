using labbackend.Models;

namespace labbackend.Models
{
    public class Payment
    {
        public int PaymentID { get; set; }
        public int InvoiceID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }

        // Relationships
        public Invoice Invoice { get; set; }
    }

}