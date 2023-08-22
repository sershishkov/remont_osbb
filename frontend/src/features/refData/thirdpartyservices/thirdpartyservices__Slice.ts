import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import current__Service from './thirdpartyservices__Service';
import { I_ThirdPartyService } from '../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_ThirdPartyService> {
  isLoading: boolean;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const thirdpartyservices__add = createAsyncThunk(
  'thirdpartyservices__add',
  async (dataObject: I_ThirdPartyService, thunkAPI) => {
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

export const thirdpartyservices__update = createAsyncThunk(
  'thirdpartyservices__update',
  async (dataObject: I_ThirdPartyService, thunkAPI) => {
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

export const thirdpartyservices__get_one = createAsyncThunk(
  'thirdpartyservices__get_one',
  async (dataObject: I_ThirdPartyService, thunkAPI) => {
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

export const thirdpartyservices__delete_one = createAsyncThunk(
  'thirdpartyservices__delete_one',
  async (dataObject: I_ThirdPartyService, thunkAPI) => {
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

export const thirdpartyservices__get_all = createAsyncThunk(
  'thirdpartyservices__get_all',
  async (dataObject: I_ThirdPartyService, thunkAPI) => {
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

export const thirdpartyservices__Slice = createSlice({
  name: 'thirdpartyservices__',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thirdpartyservices__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thirdpartyservices__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(thirdpartyservices__add.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(thirdpartyservices__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thirdpartyservices__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(thirdpartyservices__update.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(thirdpartyservices__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thirdpartyservices__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(thirdpartyservices__get_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(thirdpartyservices__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thirdpartyservices__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(thirdpartyservices__delete_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(thirdpartyservices__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thirdpartyservices__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(thirdpartyservices__get_all.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = thirdpartyservices__Slice.actions;
export default thirdpartyservices__Slice.reducer;
