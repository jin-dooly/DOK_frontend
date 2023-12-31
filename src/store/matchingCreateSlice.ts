import { createSlice } from "@reduxjs/toolkit";
import { DogType } from "../types";
import dayjs from "dayjs";

type type = {
  dogSelect: DogType | undefined;
  errorDogSelect: boolean;
  dateSelect: string | undefined;
  errorDateSelect: boolean;
  durationSelect: 0.5 | 1 | 1.5 | 2;
  paySelect: number;
  errorPaySelect: boolean;
  requestText: string;
  location: string | undefined;
  locationDetail: string;
};

const initialState: type = {
  dogSelect: undefined,
  errorDogSelect: true,
  dateSelect: undefined,
  errorDateSelect: true,
  durationSelect: 0.5,
  paySelect: 0.5 * 9860,
  errorPaySelect: true,
  requestText: "",
  location: "",
  locationDetail: "",
};

const matchingCreateSlice = createSlice({
  name: "matchingCreate", //이름
  initialState, //초기값
  reducers: {
    setDogSelect: (state, action) => {
      state.dogSelect = action.payload;
    },
    setErrorDogSelect: (state, action) => {
      state.errorDogSelect = action.payload;
    },
    setDateSelect: (state, action: { payload: string | undefined }) => {
      //유효성 검사
      if (dayjs(action.payload).format() !== "Invalid Date") {
        state.dateSelect = action.payload;
      }
    },
    setErrorDateSelect: (state, action) => {
      state.errorDateSelect = action.payload;
    },
    setDurationSelect: (state, action) => {
      state.durationSelect = action.payload;
    },
    setPaySelect: (state, action) => {
      state.paySelect = action.payload;
    },
    setErrorPaySelect: (state, action) => {
      state.errorPaySelect = action.payload;
    },
    setRequestText: (state, action) => {
      state.requestText = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setLocationDetail: (state, action) => {
      state.locationDetail = action.payload;
    },
  },
});

export const {
  setDogSelect,
  setErrorDogSelect,
  setDateSelect,
  setErrorDateSelect,
  setDurationSelect,
  setPaySelect,
  setErrorPaySelect,
  setRequestText,
  setLocation,
  setLocationDetail,
} = matchingCreateSlice.actions;
export default matchingCreateSlice;
