import api from "@/lib/httpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


type BudgetItem = {
    id: number;
    expecte_expense_head: string;
    expense: string;
    property_id: number;
  };

interface BudgetState{
    budgetItems: BudgetItem[];
    loading: boolean;
    error: string | null;
}

const initialState: BudgetState = {
    budgetItems: [],
    loading: false,
    error: null,
}

export const postBudget = createAsyncThunk(
  "budget/createBudget",
  async ({ budgetName, expenses }: { budgetName: string; expenses: number }) => {
    try {
      const response = await api.post("/project", { budgetName, expenses });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

// const 