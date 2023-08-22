import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import current__Service from './thirdpartyservice_group__Service';
import { I_ThirdPartyServiceGroup } from '../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_ThirdPartyServiceGroup> {
  isLoading: boolean;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const thirdpartyservice_group__add = createAsyncThunk(
  'thirdpartyservice_group__add',
  async (dataObject: I_ThirdPartyServiceGroup, thunkAPI) => {
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

export const thirdpartyservice_group__update = createAsyncThunk(
  'thirdpartyservice_group__update',
  async (dataObject: I_ThirdPartyServiceGroup, thunkAPI) => {
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

export const thirdpartyservice_group__get_one = createAsyncThunk(
  'thirdpartyservice_group__get_one',
  async (dataObject: I_ThirdPartyServiceGroup, thunkAPI) => {
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

export const thirdpartyservice_group__delete_one = createAsyncThunk(
  'thirdpartyservice_group__delete_one',
  async (dataObject: I_ThirdPartyServiceGroup, thunkAPI) => {
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

export const thirdpartyservice_group__get_all = createAsyncThunk(
  'thirdpartyservice_group__get_all',
  async (dataObject: I_ThirdPartyServiceGroup, thunkAPI) => {
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

export const thirdpartyservice_group__Slice = createSlice({
  name: 'thirdpartyservice_group__',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thirdpartyservice_group__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thirdpartyservice_group__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(thirdpartyservice_group__add.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(thirdpartyservice_group__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thirdpartyservice_group__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(thirdpartyservice_group__update.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(thirdpartyservice_group__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thirdpartyservice_group__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(thirdpartyservice_group__get_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(thirdpartyservice_group__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        thirdpartyservice_group__delete_one.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.items = state.items?.filter(
            (item) => item._id !== action.payload?._id
          );
        }
      )
      .addCase(
        thirdpartyservice_group__delete_one.rejected,
        (state, action) => {
          state.isLoading = false;
        }
      )

      .addCase(thirdpartyservice_group__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thirdpartyservice_group__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(thirdpartyservice_group__get_all.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = thirdpartyservice_group__Slice.actions;
export default thirdpartyservice_group__Slice.reducer;
