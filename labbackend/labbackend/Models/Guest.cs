using System.ComponentModel.DataAnnotations.Schema;

namespace labbackend.Models
{

    [Table("Feedback")]
    public class Guest
    {
        public int GuestID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Passi { get; set; }


    }

}
