using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnglishGuide.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }
        [Range(-1, 1)]
        public int Score { get; set; }
        public int IdUser { get; set; }
        [ForeignKey("IdUser")]
        public User User { get; set; }
        public int IdTranslation { get; set; }
        [ForeignKey("IdTranslation")]
        public Translation Translation { get; set; }
    }
}
