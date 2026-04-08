import { createSlice } from "@reduxjs/toolkit";

function readAdminFromStorage() {
  try {
    const raw = localStorage.getItem("admin");
    if (raw == null || raw === "") return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    admin: readAdminFromStorage(),
    logOut: "",
  },
  reducers: {
    setAdmin(state, { payload }) {
      state.admin = payload;
      localStorage.setItem("admin", JSON.stringify(payload));
    },
    setLogout(state) {
      state.admin = null;
      localStorage.removeItem("admin");
    },
  },
});

export const { setAdmin, setLogout } = adminSlice.actions;
export default adminSlice.reducer;
