using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API.Controllers {

	[ApiController]
	[Route ("api/[controller]")]
	public class WeatherForecastController : ControllerBase {

		#region props
		private static readonly string[] Summaries = new [] {
			"Freezing",
			"Bracing",
			"Chilly",
			"Cool",
			"Mild",
			"Warm",
			"Balmy",
			"Hot",
			"Sweltering",
			"Scorching"
		};

		private readonly ILogger<WeatherForecastController> _logger;
		private readonly DataContext _context;
		#endregion

		#region ctor
		// public WeatherForecastController (ILogger<WeatherForecastController> logger) {
		// 	_logger = logger;
		// }
		public WeatherForecastController (DataContext context) {
			_context = context;
		}

		#endregion

		#region  APIController
		// get api/WeatherForecast
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Value>>> Get () {
			// public IEnumerable<WeatherForecast> Get () {

			// var rng = new Random ();

			// return Enumerable.Range (1, 5).Select (index => new WeatherForecast {
			//         Date = DateTime.Now.AddDays (index),
			//             TemperatureC = rng.Next (-20, 55),
			//             Summary = Summaries[rng.Next (Summaries.Length)]
			//     })
			//     .ToArray ();
			// toListAsync and many other come from ef;
			var values = await _context.Values.ToListAsync ();
			if(values == null) return NotFound();
            return Ok (values);
		}

		[HttpGet ("{id:int}")]
		// public ActionResult<string> Get (int id)
		public async Task<ActionResult<Value>> Get (int id) {

			// return "values";
			var values = await _context.Values.FindAsync (id);
			return Ok (values);
		}

		#endregion
	}
}