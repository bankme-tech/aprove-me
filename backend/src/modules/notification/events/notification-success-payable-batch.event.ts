export class NotificationSuccessPayableBatchEvent {
  public completedJobs: number;
  public failedJobs: number;
  public assignorId: string;

  constructor(completedJobs: number, failedJobs: number, assignorId: string) {
    this.completedJobs = completedJobs;
    this.failedJobs = failedJobs;
    this.assignorId = assignorId;
  }
}
