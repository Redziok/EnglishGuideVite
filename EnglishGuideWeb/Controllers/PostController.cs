using EnglishGuide.Data;
using EnglishGuide.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnglishGuide.Dtos;

namespace EnglishGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly DataContext _context;

        public PostController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Text
        [HttpGet]
        public async Task<ActionResult<List<PostsDto>>> GetTexts()
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }

            return await _context.Posts
                                       .Include(p => p.User)
                                       .Select(p =>
                                       new PostsDto
                                       {
                                           Id = p.Id,
                                           Title = p.Title,
                                           Text = p.Text,
                                           Language = p.Language,
                                           IdUser = p.IdUser,
                                           Login = p.User.Login ?? String.Empty
                                       }).OrderByDescending(p => p.Id).ToListAsync();
        }

        // GET: api/Text/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostsDto>> GetText(int id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            var text = await _context.Posts
                                    .Include(p => p.User)
                                    .Where(p => p.Id == id)
                                    .Select(p =>
                                    new PostsDto
                                    {
                                        Id = p.Id,
                                        Title = p.Title,
                                        Text = p.Text,
                                        Language = p.Language,
                                        IdUser = p.IdUser,
                                        Login = p.User.Login ?? String.Empty
                                    }).SingleOrDefaultAsync(p => p.Id == id);

            if (text == null)
            {
                return NotFound();
            }
            return text;
        }

        // GET: api/Text/5
        [HttpGet("user={id}")]
        public async Task<ActionResult<List<PostsDto>>> GetTextsByUserId(int id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            var text = await _context.Posts
                                    .Include(p => p.User)
                                    .Where(p => p.IdUser == id)
                                    .Select(p =>
                                    new PostsDto
                                    {
                                        Id = p.Id,
                                        Title = p.Title,
                                        Text = p.Text,
                                        Language = p.Language,
                                        IdUser = p.IdUser,
                                        Login = p.User.Login ?? String.Empty
                                    }).ToListAsync();

            if (text == null)
            {
                return NotFound();
            }
            return text;
        }

        // POST: api/Text
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> PostText(AddPostDto dto)
        {
            var Posts = new Post
            {
                Title = dto.Title,
                Text = dto.Text,
                Language = dto.Language,
                IdUser = dto.IdUser
            };

            if (_context.Posts == null)
            {
                return Problem("Entity set 'DataContext.Posts'  is null.");
            }
            _context.Posts.Add(Posts);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTexts", new { Posts.Id }, Posts);
        }

        // PUT: api/Text/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> EditText(int id, [FromForm] string title, [FromForm] string text, [FromForm] string textLanguage, [FromForm] int idUser)
        {
            var Posts = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (id != Posts.Id)
            {
                return BadRequest();
            }
            Posts.Id = id;
            Posts.Title = title;
            Posts.Text = text;
            Posts.IdUser = idUser;


            _context.Entry(Posts).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTexts", new { Posts.Id }, Posts);
        }

        // DELETE: api/Text/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteText(int id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }

            var text = await _context.Posts.FindAsync(id);

            if (text == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(text);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
