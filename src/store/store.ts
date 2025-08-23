import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import authReducer from "./features/authSlice";
import projectsReducer from "./features/projectsSlice";
import feemanagmentSlice from "./features/feeManagementSlice";
import settingSlice from "./features/settingSlice";
import percentagesReducer from "./features/percentageSlice";
import partnerSlice from './features/partnerSlice'
import employeeSlice from './features/employeeSlice'
import companySlice from "./features/companySlice"
import rolesSlice from './features/rolesSlice'
import usersReducer from "./features/report/userSlice";
import propertiesReducer from "./features/report/propertySlice";
import ordersReducer from "./features/report/orderSlice";
import transactionsReducer from "./features/report/transactionsSlice";
import basicDetailsSlice from './features/project/basicDetailsSlice'
import investmentSlice from './features/project/investementForm';
import mediaUploadSlice from './features/project/mediaUploadSlice'
import videoSlice from "./features/videoSlice"
import popupTextReducer from "@/store/features/popUpSlice"
import orderDetailSlice from "@/store/features/orderDetailsSlice"
import countriesReducer from "./features/countrySlice";
import customerDetailsSlice from './features/customerDetailsSlice'
import SyncFee from  './features/SyncFeePercantageSlice';
import RiskSlice from './features/RiskSlice'
import feeCalculationSlice from './features/feeCalculationSlice';
import assetManagementSlice from './features/assetManagementSlice';
import notificationSlice from './features/notificationSlice';
// New slices
import userManagementSlice from './features/userManagementSlice';
import documentManagementSlice from './features/documentManagementSlice';
import themeSlice from './features/themeSlice';
import analyticsSlice from './features/analyticsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    projects: projectsReducer,
    percentages: percentagesReducer,
    users: usersReducer,
    properties: propertiesReducer,
    orders: ordersReducer,
    transactions: transactionsReducer,
    partners: partnerSlice,
    employee :employeeSlice,
    company : companySlice,
    roles : rolesSlice,
    setting :settingSlice,
    feemanagment :feemanagmentSlice,
    basicDetailsSlice: basicDetailsSlice,
    investmentSlice: investmentSlice,
    mediaUploadSlice: mediaUploadSlice,
    video: videoSlice,
    popupText: popupTextReducer,
    orderDetails : orderDetailSlice,
    // feedback : orderDetailSlice,
    countires: countriesReducer,
    customerDetails: customerDetailsSlice,
    syncFee : SyncFee,
    risk: RiskSlice,
    feeCalculation: feeCalculationSlice,
    assetManagement: assetManagementSlice,
    notifications: notificationSlice,
    // New slices
    userManagement: userManagementSlice,
    documentManagement: documentManagementSlice,
    theme: themeSlice,
    analytics: analyticsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;