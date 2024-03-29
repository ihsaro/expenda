using System.Net;
using System.Security.Claims;
using Expenda.Application.Architecture.Security;
using Expenda.Domain.Entities;

namespace Expenda.API.Security;

internal class ApplicationSessionManager : IApplicationSessionManager
{
    public int CurrentUserId { get; }

    public ApplicationSessionManager(IHttpContextAccessor accessor)
    {
        var userIdIdentifier = accessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);

        if (userIdIdentifier is null || !int.TryParse(userIdIdentifier.Value, out var id))
            throw new HttpRequestException(null, null, HttpStatusCode.Forbidden);

        CurrentUserId = id;
    }
}
