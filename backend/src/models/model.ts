interface BudgetItemSummary {
    id: number;
    itemName: string;
    amount: number;
    date: string,
    category: string,
};


type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

function createApiResponse<T>(message: string , data: T): ApiResponse<T> {
    return {
        success: true,
        message,
        data
    };
}

export { BudgetItemSummary, createApiResponse }