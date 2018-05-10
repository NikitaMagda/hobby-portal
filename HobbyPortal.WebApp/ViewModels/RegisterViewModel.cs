using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace HobbyPortal.WebApp.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [JsonProperty("email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
