import { Endpoints } from "constants/endpoints";
import { ExpenseResponse } from "models/ExpenseResponse";
import { TransactionResult } from "models/TransactionResult";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TransactionResult<Array<ExpenseResponse>>>
) => {
    if (req.method === "GET") {
        const response = await fetch(
            `${process.env.REST_HOST}/${Endpoints.EXPENSES}`,
            {
                method: "GET"
            }
        );

        const data: TransactionResult<Array<ExpenseResponse>> = await response.json();
        res.json(data);
    }
};
