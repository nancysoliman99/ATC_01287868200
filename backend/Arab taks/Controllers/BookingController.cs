using Arab_taks.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Arab_taks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetUserBookings()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            return await _context.Bookings.Where(b => b.UserId == userId).ToListAsync();
        }

        //[HttpPost]
        //public async Task<ActionResult<Booking>> BookEvent([FromBody] Booking booking)
        //{
        //    booking.UserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        //    _context.Bookings.Add(booking);
        //    await _context.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetUserBookings), booking);
        //}
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Booking>> BookEvent([FromBody] Booking booking)
        {
            booking.UserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserBookings), booking);
        }
    }
}
