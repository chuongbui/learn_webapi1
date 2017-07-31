
namespace MyProject2.Client.Web
{
    static class DependencyInjection
    {
        /// <summary>
        /// Initializes and configures depedency injection container.
        /// </summary>
        public static void Init()
        {
            MyProject2.Services.DI.Init();

            MyProject2.Entities.ServiceRegistry.RegisterTypes();

        }
    }
}
