using EnglishGuide.Data;
using EnglishGuide.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnglishGuide.Dtos;

namespace EnglishGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly DataContext _context;

        public RatingController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("TranslationScore")]
        public async Task<ActionResult<int>> GetTranslationsScore(int idTranslation)
        {
            var rating = await _context.Ratings
                .Where(p => p.IdTranslation == idTranslation)
                .GroupBy(p => p.IdTranslation)
                .Select(p =>
                new TranslationRatingDto
                {
                    IdTranslation = p.Key,
                    Score = p.Sum(i => i.Score),
                }).SingleOrDefaultAsync();

            return rating != null ? rating.Score : 0;
        }

        [HttpGet("UserScore")]
        public async Task<ActionResult<int>> GetRatingsByUser(int idTranslation, int idUser)
        {
            var rating = await _context.Ratings
                .SingleOrDefaultAsync(r => r.IdTranslation == idTranslation && r.IdUser == idUser);

            return rating != null ? rating.Score : 0;                                          
        }

        // POST: api/Rating
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<int>> PostOrUpdateScore(UserRatingDto dto)
        {
            var existingRating = await _context.Ratings.FirstOrDefaultAsync(r => r.IdUser == dto.IdUser && r.IdTranslation == dto.IdTranslation);

            if (existingRating == null)
            {
                existingRating = new Rating
                {
                    Score = dto.Score,
                    IdUser = dto.IdUser,
                    IdTranslation = dto.IdTranslation,
                };

                _context.Ratings.Add(existingRating);
            }
            else
            {
                existingRating.Score = dto.Score;
                _context.Update(existingRating);
            }
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetRatingsByUser", new { existingRating.Id }, existingRating.Score);
        }
    }
}
