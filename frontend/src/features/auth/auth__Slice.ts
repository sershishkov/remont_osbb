import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import authService from './auth__Service';
import { I_AuthRequest, I_AuthResponse } from '../../interfaces/UserInterfaces';

interface I_StateAuth {
  user: I_AuthResponse | null;
  isLoading: boolean;
  items?: any[];
  total?: number;
}

const initialState: I_StateAuth = {
  user: null,
  isLoading: false,
};

//Register user
export const register = createAsyncThunk(
  'auth/register',
  async (dataObject: I_AuthRequest, thunkAPI) => {
    try {
      const { navigate } = dataObject;
      delete dataObject.navigate;
      const newItem = await authService.register(dataObject);

      setTimeout(() => {
        navigate!('/');
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

export const login = createAsyncThunk(
  'auth/login',
  async (dataObject: I_AuthRequest, thunkAPI) => {
    try {
      const { navigate } = dataObject;
      delete dataObject.navigate;
      const newItem = await authService.login(dataObject);

      setTimeout(() => {
        navigate!('/');
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

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, thunkAPI) => {
    try {
      return await authService.getUserProfile();
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

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (dataObject: I_AuthRequest, thunkAPI) => {
    try {
      const { navigate } = dataObject;
      delete dataObject.navigate;
      await authService.updateUserProfile(dataObject);

      setTimeout(() => {
        navigate!('/auth/login');
      }, 2000);
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

export const auth__Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload ? action.payload : null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

// export const { reset } = auth__Slice.actions;
export default auth__Slice.reducer;
