﻿using Expenda.Application.Features.ExpenseManager.Commands;
using Expenda.Application.Features.ExpenseManager.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Expenda.API.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/expenses")]
public class ExpensesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ExpensesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetExpenses(CancellationToken token = default)
    {
        return Ok(await _mediator.Send(new GetExpensesQuery(), token));
    }

    [HttpPost("")]
    public async Task<IActionResult> CreateExpense([FromBody] CreateExpenseCommand command, CancellationToken token = default)
    {
        var result = await _mediator.Send(command, token);
        return result is { Success: true, ResultObject: not null } ? Created($"api/v1/expenses/{result.ResultObject.Id}", result.ResultObject) : BadRequest(result.ErrorMessages);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetExpense([FromRoute] int id, CancellationToken token = default)
    {
        var result = await _mediator.Send(new GetExpenseQuery { Id = id }, token);
        return result is { Success: true, ResultObject: not null } ? Ok(result.ResultObject) : NotFound(result.ErrorMessages);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExpense([FromRoute] int id, [FromBody] UpdateExpenseCommand command, CancellationToken token = default)
    {
        command.Id = id;
        var result = await _mediator.Send(command, token);
        return result is { Success: true, ResultObject: not null } ? Ok(result.ResultObject) : NotFound(result.ErrorMessages);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExpense([FromRoute] int id, CancellationToken token = default)
    {
        var result = await _mediator.Send(new DeleteExpenseCommand { Id = id }, token);
        return result is { Success: true, ResultObject: true } ? NoContent() : NotFound(result.ErrorMessages);
    }

    [HttpDelete("")]
    public async Task<IActionResult> DeleteExpenses([FromBody] IEnumerable<int> ids, CancellationToken token = default)
    {
        var result = await _mediator.Send(new DeleteExpensesCommand { Ids = ids }, token);
        return result is { Success: true, ResultObject: true } ? NoContent() : NotFound(result.ErrorMessages);
    }

    [HttpGet("monthly-total")]
    public Task<IActionResult> ListMonthlyExpensesTotal(CancellationToken token = default)
    {
        throw new NotImplementedException();
    }
}
