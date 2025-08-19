import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InvestmentForm = {
  percentageOfIP: string;
  rights: string;
  percentageForPandora: string;
  natureOfIP: string;
  duration: string;
  costOfAcquisition: string;
  totalExpectedInvestment: string;
  tokenAmount: string;
  expectedMonetisation: string;
  proposedIRR: string;
  proposedMoneyMultiple: string;
  expectedDuration: string;
  otherTerms?: string;
};

interface InvestmentState {
  forms: InvestmentForm[];
}

const initialState: InvestmentState = {
  forms: [
    {
      percentageOfIP: "",
      rights: "",
      percentageForPandora: "",
      natureOfIP: "",
      duration: "",
      costOfAcquisition: "",
      totalExpectedInvestment: "",
      tokenAmount: "",
      expectedMonetisation: "",
      proposedIRR: "",
      proposedMoneyMultiple: "",
      expectedDuration: "",
      otherTerms: "",
    },
  ],
};

const investmentSlice = createSlice({
  name: "investment",
  initialState,
  reducers: {
    addForm(state) {
      state.forms.push({ ...initialState.forms[0] });
    },
    deleteForm(state, action: PayloadAction<number>) {
      state.forms.splice(action.payload, 1);
    },
    updateForm(state, action: PayloadAction<{ index: number; data: Partial<InvestmentForm> }>) {
      const { index, data } = action.payload;
      state.forms[index] = { ...state.forms[index], ...data };
    },
    resetForms(state) {
      state.forms = [{ ...initialState.forms[0] }];
    },
  },
});

export const { addForm, deleteForm, updateForm, resetForms } = investmentSlice.actions;
export default investmentSlice.reducer;
