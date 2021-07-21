import { createAsyncThunk } from '@reduxjs/toolkit';
/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../network/ApiClient';
/* types */
import { TSetting } from '../../types/Setting';

const { SETTINGS } = END_POINT;

export const fetchSettingAndUser = createAsyncThunk('setting/fetchSetting', async (_, thunkAPI) => {
  try {
    const response: any = await ApiClient.getRequest(SETTINGS.INDEX);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});

export const updateSetting = createAsyncThunk(
  'setting/update',
  async (settingForm: TSetting, thunkAPI) => {
    try {
      const response: any = await ApiClient.patchRequest(
        `${SETTINGS.UPDATE}/dummy_id`,
        settingForm,
      ); // NOTE API側ではdeviseのcurrent_userからidを指定しているため『dummy_id』で対応している。
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);