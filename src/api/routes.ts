import { apiClient } from "./client";

export const api = {
  checkHealth: () => {
    return apiClient.get("").json<{ success: boolean; ping: string }>();
  },
};
