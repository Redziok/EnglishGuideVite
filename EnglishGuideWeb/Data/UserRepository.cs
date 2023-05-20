using EnglishGuide.Models;

namespace EnglishGuide.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public User Create(User user)
        {
            _context.Users.Add(user);
            user.Id = _context.SaveChanges();

            return user;
        }

        public User GetByLogin(string login)
        {
            return _context.Users.FirstOrDefault(e => e.Login == login);
        }

        public User GetById(int idUser)
        {
            return _context.Users.FirstOrDefault(e => e.Id == idUser);
        }

        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }
    }
}
