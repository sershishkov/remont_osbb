import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import current__Service from './unit__Service';
import { I_Unit } from '../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_Unit> {
  isLoading: boolean;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const unit__add = createAsyncThunk(
  'unit__add',
  async (dataObject: I_Unit, thunkAPI) => {
    try {
      const { navigate } = dataObject;
      delete dataObject.navigate;
      const newItem = await current__Service.item__add(dataObject);

      setTimeout(() => {
        navigate!(-1);
      }, 2000);

      return newItem;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__update = createAsyncThunk(
  'unit__update',
  async (dataObject: I_Unit, thunkAPI) => {
    try {
      const { navigate } = dataObject;
      delete dataObject.navigate;
      const updatedItem = await current__Service.item__update(dataObject);

      setTimeout(() => {
        navigate!(-1);
      }, 2000);

      return updatedItem;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__get_one = createAsyncThunk(
  'unit__get_one',
  async (dataObject: I_Unit, thunkAPI) => {
    try {
      return await current__Service.item__get_one(dataObject);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__delete_one = createAsyncThunk(
  'unit__delete_one',
  async (dataObject: I_Unit, thunkAPI) => {
    try {
      const deletedItem = await current__Service.item__delete_one(dataObject);

      return deletedItem;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__get_all = createAsyncThunk(
  'unit__get_all',
  async (dataObject: I_Unit, thunkAPI) => {
    try {
      return await current__Service.item__get_all(dataObject);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__Slice = createSlice({
  name: 'unit__',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(unit__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(unit__add.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(unit__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(unit__update.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(unit__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(unit__get_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(unit__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(unit__delete_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(unit__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(unit__get_all.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = unit__Slice.actions;
export default unit__Slice.reducer;
