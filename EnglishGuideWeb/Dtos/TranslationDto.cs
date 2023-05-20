namespace EnglishGuide.Dtos
{
    public class TranslationDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Language { get; set; }
        public int SectionId { get; set; }
        public int IdPost { get; set; }
        public string PostLanguage { get; set; }
        public string Title { get; set; }
        public int IdUser { get; set; }
        public string Login { get; set; }
    }

    public class AddTranslationDto
    {
        public string Text { get; set; }
        public string Language { get; set; }
        public int SectionId { get; set; }
        public int IdPost { get; set; }
        public int IdUser { get; set; }
    }
}
