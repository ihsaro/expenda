using AutoMapper;
using Expenda.Application.Architecture;
using Expenda.Application.Architecture.Localization;
using Expenda.Application.Architecture.Security;
using MediatR;

namespace Expenda.Application.Features.ExpenseManager.Queries;

public class ListMonthlyTotalExpensesQuery : IRequest<TransactionResult<ListMonthlyTotalExpensesQueryResponse>>
{
}

public class ListMonthlyTotalExpensesQueryResponse
{
}

public class ListMonthlyTotalExpensesQueryHandler : IRequestHandler<ListMonthlyTotalExpensesQuery, TransactionResult<ListMonthlyTotalExpensesQueryResponse>>
{
    private readonly IMapper _mapper;
    private readonly IApplicationUserManager _userManager;
    private readonly IAuthenticationLocalizationMessenger _messenger;

    public ListMonthlyTotalExpensesQueryHandler(IMapper mapper, IApplicationUserManager userManager, IAuthenticationLocalizationMessenger messenger)
    {
        _mapper = mapper;
        _userManager = userManager;
        _messenger = messenger;
    }

    public Task<TransactionResult<ListMonthlyTotalExpensesQueryResponse>> Handle(ListMonthlyTotalExpensesQuery request, CancellationToken token)
    {
        throw new NotImplementedException();
    }
}