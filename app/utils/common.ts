export const generateResponse = (data: any, error = "") => ({
  error: error === "" ? null : error,
  data
});
export enum TableAction {
  Register,
  Sit,
  SitAndLeave
}