using System.Text.Json.Serialization;
using System.Collections.Generic;
using labbackend.Models;

public class Staff
{
    public int StaffID { get; set; }
    public int HotelID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Position { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }

}
