using API.Middleware;
using Application.Activities;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistence;

namespace API {

    public class Startup {

        public IConfiguration Configuration { get; }

        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        // is our dependency injection container (the way utilize other classes in other part of our app)
        // and anything we add to services will be available in other part of our app.
        // This method gets called by the runtime. Use this method to add services to the container.
        // 
        public void ConfigureServices (IServiceCollection services) {

            services.AddDbContext<DataContext> (opt => {
                //. option action
                opt.UseSqlite (Configuration.GetConnectionString ("DefaultConnection"));
            });
            services.AddCors (opt => {
                // create specific cors policy here.
                // name it  and policy config
                opt.AddPolicy ("CorsPolicy", policy => {
                    policy.AllowAnyHeader ().AllowAnyMethod ().WithOrigins ("http://localhost:3000");
                });
                // after this we need to add  to configure as middleware
            });
            // we have lots of Handler but we need to tell it one
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddControllers ().AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Create>());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment ()) {
                // app.UseDeveloperExceptionPage ();
            } else {
                // app.UseExceptionHandler("/Error");
                // add middleware add transport security
                //  web server declare browser must be use https 
                // app.UseHsts();
            }

            // app.UseHttpsRedirection();
            app.UseCors ("CorsPolicy");
            app.UseRouting ();

            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
            });
        }
    }
}