

type SuccessResponse<T> = {
  status: 'success';
  data: T;
}

type FailResponse<T> = {
  status: 'error';
  message: T;
}

export function asSuccess<T>(data: T): SuccessResponse<T> {
  return {
    status: 'success',
    data,
  } as const;
}

export function asFail<T>(message: T): FailResponse<T> {
  return {
    status: 'error',
    message,
  } as const;
}