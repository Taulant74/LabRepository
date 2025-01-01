 namespace labbackend.Models
{
    public class Amenity
    {
        public int AmenityID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        // Relationships
        // public ICollection<HotelAmenity> HotelAmenities { get; set; }
    }

}
