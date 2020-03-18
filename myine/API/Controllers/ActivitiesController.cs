using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    [Route ("api/[controller]")]
    // ApiController binding it fix frombody or from route and many other things auto.
    // auto give us 400 error;
    [ApiController]

    // ControllerBase does not support view
    // Controller does support view
    public class ActivitiesController : ControllerBase {
        private readonly IMediator _mediator;
        public ActivitiesController (IMediator mediator) {
            _mediator = mediator;
        }

        // use cancellationToken for abort request to let server know stop process.
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List (CancellationToken ct) {
            return await _mediator.Send (new List.Query (), ct);
            // mediator go and get data need to response.
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<Activity>> Details ([FromRoute] Guid id) {
            var item = await _mediator.Send (new Details.Query { Id = id });
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create ([FromBody] Create.Command command) {
            return await _mediator.Send (command);
        }

        [HttpPut ("{id}")]
        public async Task<ActionResult<Unit>> Edit (Guid id, Edit.Command command) {
            command.Id = id;
            return await _mediator.Send (command);
        }

        [HttpDelete ("{id}")]
        public async Task<ActionResult<Unit>> Delete (Guid id) {
            return await _mediator.Send (new Delete.Command { Id = id });
        }
    }
}