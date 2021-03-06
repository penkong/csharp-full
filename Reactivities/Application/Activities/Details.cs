using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            // cancellation Token help aborted request or buggy request clean from server to not consume more pawer
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {

                Domain.Activity activity = await _context.Activites.FindAsync(request.Id);
                if(activity == null) throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found!" });

                return activity;
            }
        }
    }
}