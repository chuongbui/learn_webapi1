using MyProject2.Services;

namespace MyProject2.Entities
{
    /// <summary>
    /// DI configuration for service implementations.
    /// </summary>
    public static class ServiceRegistry
    {
        /// <summary>
        /// Registers service types with the DI container.
        /// </summary>
        public static void RegisterTypes()
        {
            DI.RegisterType<ICarsService, Services.CarsService>();
            // GENPOINT - generated code will be inserted here. DO NOT REMOVE this line!
        }
    }
}
