using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EnglishGuide.Models
{
    public class User
    {
		[Key]
		public int Id { get; set; }
		public string Login { get; set; }

		[EmailAddress]
		public string Email { get; set; }
		public bool IsAdmin { get; set; }
		[JsonIgnore]
		public string Password { get; set; }
	}
}
