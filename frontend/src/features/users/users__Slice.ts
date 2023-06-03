import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import current__Service from './users__Service';
import { I_AuthRequest, I_AuthResponse } from '../../interfaces/UserInterfaces';
import { I_ServerResponse } from '../../interfaces/CommonInterfaces';

export interface I_State__User extends I_ServerResponse<I_AuthResponse> {
  isLoading: boolean;
}

const initialState: I_State__User = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const user__add = createAsyncThunk(
  'user__add',
  async (dataObject: I_AuthRequest, thunkAPI) => {
    try {
      const { navigate } = dataObject;
      delete dataObject.navigate;
      const newItem = await current__Service.item__add(dataObject);

      // toast.success('Добавлено успешно');

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

export const user__update = createAsyncThunk(
  'user__update',
  async (dataObject: I_AuthRequest, thunkAPI) => {
    try {
      const { navigate } = dataObject;
      delete dataObject.navigate;
      const updatedItem = await current__Service.item__update(dataObject);

      // toast.success('Изменено успешно');

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

export const user__get_all = createAsyncThunk(
  'user__get_all',
  async (dataObject: I_AuthRequest, thunkAPI) => {
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

export const user__get_one = createAsyncThunk(
  'user__get_one',
  async (dataObject: I_AuthRequest, thunkAPI) => {
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

export const user__delete_one = createAsyncThunk(
  'user__delete_one',
  async (dataObject: I_AuthRequest, thunkAPI) => {
    try {
      return await current__Service.item__delete_one(dataObject);
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

export const user__Slice = createSlice({
  name: 'user__',
  initialState,

  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(user__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(user__add.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(user__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(user__update.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(user__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(user__get_all.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(user__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(user__get_one.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(user__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(user__delete_one.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = user__Slice.actions;
export default user__Slice.reducer;
