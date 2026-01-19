import { timeline } from "../../observability/timeline";

export type UserDTO = {
  id: string;
  name: string;
  role: "guest" | "member" | "admin";
  requestId: number;
};

type Params = {
  requestId: number;
  shouldFail: boolean;
  delayMs?: number;
};

export function fetchUser({ requestId, shouldFail, delayMs = 600 }: Params): Promise<UserDTO> {
  timeline.push("note", "Lab2: fetchUser() created", { requestId, shouldFail, delayMs });

  return new Promise<UserDTO>((resolve, reject) => {
    const t = window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Simulated failure (requestId=${requestId})`));
        return;
      }

      const roles: UserDTO["role"][] = ["guest", "member", "admin"];
      const role = roles[requestId % roles.length];

      resolve({
        id: `u_${1000 + requestId}`,
        name: requestId % 2 === 0 ? "Ayla" : "Deniz",
        role,
        requestId,
      });
    }, delayMs);

    // In a real API you would wire AbortSignal here.
    // We keep it deterministic for the lab.
    void t;
  });
}
