import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk(`user/login`, async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/login`, data);
    // const res = {
    //   data: {
    //     data: {
    //       success: true,
    //       token:
    //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2ZmYWI3YjFiYTgyYzY2MTM0MTIyNyIsImlhdCI6MTcwMjQ4NzU3NiwiZXhwIjoxNzAyNzQ2Nzc2fQ.8PcxSeji3qlGD2pCTzU0L_5eLfpFV0BT1fNZ7ykH4d0',
    //       id: '63cffab7b1ba82c661341227',
    //     },
    //   },
    // };
    localStorage.setItem(`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`, res.data.data.token);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
