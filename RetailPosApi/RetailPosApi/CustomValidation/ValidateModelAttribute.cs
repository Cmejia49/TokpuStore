using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;


namespace RetailPosApi.CustomValidation
{
    public class ValidateModelAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Do something before the action executes.
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(
                                                    context.ModelState);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Do something after the action executes.

        }
    }
}
