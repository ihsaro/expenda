using AutoMapper;
using Expenda.Application.Architecture;
using Expenda.Application.Architecture.Security;
using Expenda.Application.Features.ExpenseManager.Models.Response;
using Expenda.Domain.Repositories;
using MediatR;

namespace Expenda.Application.Features.ExpenseManager.Queries;

public class GetExpensesQuery : IRequest<TransactionResult<IEnumerable<ExpenseResponse>>> {}

public class GetExpensesQueryHandler : IRequestHandler<GetExpensesQuery, TransactionResult<IEnumerable<ExpenseResponse>>>
{
    private readonly IMapper _mapper;
    private readonly IApplicationSessionManager _session;
    private readonly IExpenseRepository _repository;

    public GetExpensesQueryHandler(IMapper mapper, IApplicationSessionManager session, IExpenseRepository repository)
    {
        _mapper = mapper;
        _session = session;
        _repository = repository;
    }

    public async Task<TransactionResult<IEnumerable<ExpenseResponse>>> Handle(GetExpensesQuery request, CancellationToken token)
    {
        var entities = await _repository.GetExpensesByUserId(_session.CurrentUserId, token);
        return new TransactionResult<IEnumerable<ExpenseResponse>>(_mapper.Map<IEnumerable<ExpenseResponse>>(entities));
    }
}