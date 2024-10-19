import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SlotType {
  start: null | string;
  end: null | string;
}

interface ChannelingType {
  userId: null | string;
  doctorId: null | string;
  date: null | string;
  slot: SlotType;
  status: "PENDING" | "CANCELLED" | "COMPLETED" | "SCHEDULED";
  type: "IN-HOUSE" | "VIDEOCONFERENCE";
}

const initialState: ChannelingType = {
  userId: null,
  doctorId: null,
  date: null,
  slot: {
    start: null,
    end: null,
  },
  status: "PENDING",
  type: "IN-HOUSE",
};

const ChannelingSlice = createSlice({
  name: "channeling",
  initialState,
  reducers: {
    setChannelingData: (state, action: PayloadAction<ChannelingType>) => {
      return { ...state, ...action.payload };
    },

    updateChannelingSlot: (state, action: PayloadAction<SlotType>) => {
      state.slot = action.payload;
    },

    updateChannelingStatus: (
      state,
      action: PayloadAction<"PENDING" | "CANCELLED" | "COMPLETED" | "SCHEDULED">
    ) => {
      state.status = action.payload;
    },

    updateChannelingType: (
      state,
      action: PayloadAction<"IN-HOUSE" | "VIDEOCONFERENCE">
    ) => {
      state.type = action.payload;
    },

    resetChanneling: () => initialState,
    getChanneling: (state) => state,
  },
});

export const {
  setChannelingData,
  updateChannelingSlot,
  updateChannelingStatus,
  updateChannelingType,
  resetChanneling,
  getChanneling
} = ChannelingSlice.actions;

export const selectedChannelinType = (state: { type: any; }) => state.type
export default ChannelingSlice.reducer;
