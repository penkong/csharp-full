using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {

        // query class, irequest is mediator interface
        public class Query : IRequest<List<Activity>> { }


        // IRequestHandler take query return acitiviy and need implelment.
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            // any props added to query class will be available
            // in Handler we need access to datacontext
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activites = await _context.Activites.ToListAsync();
                return activites;
            }
        }

    }
}