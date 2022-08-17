using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace RetailPosApi.CustomValidation
{
    public class CustomRemoteAttribute : RemoteAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            // Get the controller using reflection
            Type controller = Assembly.GetExecutingAssembly().GetTypes()
                .FirstOrDefault(type => type.Name.ToLower() == string.Format("{0}Controller",
                    this.RouteData["controller"].ToString()).ToLower());
            if (controller != null)
            {
                // Get the action method that has validation logic
                MethodInfo action = controller.GetMethods()
                    .FirstOrDefault(method => method.Name.ToLower() ==
                        this.RouteData["action"].ToString().ToLower());
                if (action != null)
                {
                    // Create an instance of the controller class
                    object instance = TryCreateController(validationContext, controller);



                    // Invoke the action method that has validation logic
                    object response = action.Invoke(instance, new object[]
                                        { value});
                    if (response is JsonResult)
                    {
                        object jsonData = ((JsonResult)response).Value;
                        if (jsonData is bool)
                        {
                            return (bool)jsonData ? ValidationResult.Success :
                                new ValidationResult(this.ErrorMessage);
                        }
                    }
                }
            }

            return new ValidationResult(base.ErrorMessageString);
        }

        private object TryCreateController(ValidationContext context, Type controllerName)
        {
            Type controllerType = controllerName;
            if (controllerType == null)
            {
                return null;
            }
            foreach (var constructor in controllerType.GetConstructors())
            {
                var parameters = constructor.GetParameters();
                var args = new dynamic[parameters.Length];
                for (int i = 0; i < parameters.Length; i++)
                {
                    args[i] = context.GetService(parameters[i].ParameterType);
                }

                try
                {
                    var instance = Activator.CreateInstance(controllerType, args);
                    if (instance != null)
                    {
                        return instance;
                    }
                }
                catch
                {
                    continue;
                }

            }

            return null;
        }

        public CustomRemoteAttribute(string routeName)
            : base(routeName)
        {
        }

        public CustomRemoteAttribute(string action, string controller)
            : base(action, controller)
        {
        }

        public CustomRemoteAttribute(string action, string controller,
            string areaName) : base(action, controller, areaName)
        {
        }
    }
}
