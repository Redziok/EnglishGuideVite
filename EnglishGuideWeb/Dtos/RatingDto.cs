namespace EnglishGuide.Dtos
{
    public class TranslationRatingDto
    {
        public int Score { get; set; }
        public int IdTranslation { get; set; }
    }

    public class UserRatingDto
    {
        public int Score { get; set; }
        public int IdUser { get; set; }
        public int IdTranslation { get; set; }
    }
}
