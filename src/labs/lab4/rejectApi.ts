import { timeline } from "../../observability/timeline";

export type ReportDTO = {
  requestId: number;
  title: string;
  status: "ok";
};

export function fetchReport(requestId: number, shouldFail: boolean): Promise<ReportDTO> {
  timeline.push("note", "Lab4: fetchReport() created", { requestId, shouldFail });

  return new Promise<ReportDTO>((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Report failed (requestId=${requestId})`));
        return;
      }
      resolve({ requestId, title: "Weekly report", status: "ok" });
    }, 600);
  });
}
