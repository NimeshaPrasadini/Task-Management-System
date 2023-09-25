using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaskAPI.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150), Column(TypeName = "nvarchar(150)")]
        public string Title { get; set; } = "Title";

        [MaxLength(400), Column(TypeName = "nvarchar(400)")]
        public string Description { get; set; } = "Description";

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime UpdatedDate { get; set; } = DateTime.Now;

        public DateTime DueDate { get; set; } = DateTime.Now;

        public bool Done { get; set; } = false;

        public bool Deleted { get; set; } = false;

        public byte LevelOfPriority { get; set; } = 2;

        public string Status { get; set; }
    }
}
