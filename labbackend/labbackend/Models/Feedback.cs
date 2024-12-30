using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{

    [Table("Feedback")]
    public class Feedback
    {
        public int FeedbackID { get; set; }
        public int GuestID { get; set; }
        public string FeedbackType { get; set; }
        public string Message { get; set; }
        public DateTime FeedbackDate { get; set; }
    }


}
