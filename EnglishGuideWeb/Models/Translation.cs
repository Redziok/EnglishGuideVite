using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishGuide.Models
{
    public class Translation
    {
        [Key]
        public int Id { get; set; }
        public int SectionId { get; set; }
        public string Text { get; set; }
        public string Language { get; set; }
        public int IdPost { get; set; }
        [ForeignKey("IdPost")]
        public Post Post { get; set; }
        public int IdUser { get; set; }
        [ForeignKey("IdUser")]
        public User User { get; set; }
    }
}
