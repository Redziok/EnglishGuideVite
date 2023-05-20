using EnglishGuide.Data;
using EnglishGuide.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnglishGuide.Dtos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EnglishGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslationController : ControllerBase
    {
        private readonly DataContext _context;

        public TranslationController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Translation
        [HttpGet]
        public async Task<ActionResult<List<TranslationDto>>> GetTranslations(int idPost, string language)
        {
            if (_context.Translations == null)
            {
                return NotFound();
            }

            var translations = await _context.Translations
                                                          .Include(p => p.User)
                                                          .Include(p => p.Post)
                                                          .Where(p => p.IdPost == idPost && p.Language == language)
                                                          .Select(p =>
                                                          new TranslationDto
                                                          {
                                                              Id = p.Id,
                                                              Text = p.Text,
                                                              Language = p.Language,
                                                              SectionId = p.SectionId,
                                                              IdPost = p.IdPost,
                                                              Title = p.Post.Title ?? String.Empty,
                                                              PostLanguage = p.Post.Language ?? String.Empty,
                                                              IdUser = p.IdUser,
                                                              Login = p.User.Login ?? String.Empty
                                                          }).ToListAsync();

            return translations;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TranslationDto>> GetTranslation(int id)
        {
            if (_context.Translations == null)
                return NotFound();

            var translation = await _context.Translations
                .Include(p => p.User)
                .Include(p => p.Post)
                .SingleOrDefaultAsync(t => t.Id == id);

            if (translation != null)
            {
                var translationDto = new TranslationDto
                {
                    Id = translation.Id,
                    Text = translation.Text,
                    Language = translation.Language,
                    SectionId = translation.SectionId,
                    IdPost = translation.IdPost,
                    Title = translation.Post.Title ?? String.Empty,
                    PostLanguage = translation.Post.Language ?? String.Empty,
                    IdUser = translation.IdUser,
                    Login = translation.User.Login ?? String.Empty
                };

                return Ok(translationDto);

            }
            else return NotFound();
        }

        // GET: api/Translation/user=5
        [HttpGet("user={id}")]
        public async Task<ActionResult<List<TranslationDto>>> GetTranslationByUserId(int id)
        {
            if (_context.Translations == null)
            {
                return NotFound();
            }
            var translation = await _context.Translations
                                                         .Where(p => p.IdUser == id)
                                                         .Include(p => p.User)
                                                         .Include(p => p.Post)
                                                         .Select(p =>
                                                         new TranslationDto
                                                         {
                                                             Id = p.Id,
                                                             Text = p.Text,
                                                             Language = p.Language,
                                                             SectionId = p.SectionId,
                                                             IdPost = p.IdPost,
                                                             Title = p.Post.Title ?? String.Empty,
                                                             PostLanguage = p.Post.Language ?? String.Empty,
                                                             IdUser = p.IdUser
                                                         })
                                                         .ToListAsync();

            if (translation == null)
            {
                return NotFound();
            }
            return translation;
        }

        // POST: api/Translation
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TranslationDto>> PostTranslation(AddTranslationDto dto)
        {
            var translations = new Translation
            {
                Text = dto.Text,
                Language = dto.Language,
                SectionId = dto.SectionId,
                IdPost = dto.IdPost,
                IdUser = dto.IdUser
            };

            _context.Translations.Add(translations);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTranslation), new { translations.Id }, translations);
        }

        // PUT: api/Translation/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTranslation(int id, [FromForm] string text, [FromForm] string language, [FromForm] int idPost, [FromForm] int idUser, [FromForm] int sectionId)
        {
            var translations = _context.Translations.FirstOrDefault(p => p.Id == id);
            if (id != translations.Id)
            {
                return BadRequest();
            }
            translations.Text = text;
            translations.Language = language;
            translations.IdPost = idPost;
            translations.IdUser = idUser;
            translations.SectionId = sectionId;


            _context.Entry(translations).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Translation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTranslation(int id)
        {
            if (_context.Translations == null)
            {
                return NotFound();
            }
            var translation = await _context.Translations.FindAsync(id);

            if (translation == null)
            {
                return NotFound();
            }

            _context.Translations.Remove(translation);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
