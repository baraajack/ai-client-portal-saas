export type ActionState<T = null> = {
  success: boolean;
  message: string;
  data?: T;
};