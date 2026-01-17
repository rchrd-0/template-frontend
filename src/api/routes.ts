import { apiClient } from "./client";

export const api = {
  ping: () => {
    return apiClient.get("").json<{ success: boolean; message: string }>();
  },
  checkHealth: () => {
    return apiClient.get("health").json<{
      success: string;
      data: {
        uptime: number;
      };
    }>();
  },
};
