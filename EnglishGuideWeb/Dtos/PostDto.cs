namespace EnglishGuide.Dtos
{
    public class PostsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Language { get; set; }
        public int IdUser { get; set; }
        public string Login { get; set; }
    }

    public class AddPostDto
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public string Language { get; set; }
        public int IdUser { get; set; }
    }
}
