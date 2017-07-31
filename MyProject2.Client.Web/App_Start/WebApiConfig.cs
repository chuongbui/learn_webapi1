using System;
using System.Web.Http;

namespace MyProject2.Client.Web
{
    static class WebApiConfig
    {
        /// <summary>
        /// Initializes Web API configuration.
        /// </summary>
        public static void Init()
        {
            HttpConfiguration config = GlobalConfiguration.Configuration;
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.EnsureInitialized();
        }
    }
}