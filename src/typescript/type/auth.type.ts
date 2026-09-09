export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  profile_image?: File | null | undefined;
};

export type verifyEmailType = {
  email: string;
  otp: string;
};

export type ForgotPasswordLinkType = {
  email: string;
};

export type ForgotPasswordType = {
  newPassword: string;
  confirmPassword: string;
};

export type RegisterPayloadData = {
  name: string;
  email: string;
  password: string;
  profile_image?: FileList | undefined;
};

export type LoginPayloadData = {
  email: string;
  password: string;
};

export type VerifyEmailData = {
  otp: string;
  email: string;
};

export type RegisterResponseType = {
  status: boolean;
  message: string;
};

export type LoginResponseType = {
  status: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken: string;
  secretKey: string;
  refreshToken: string;
};

export type AuthStoreType = {
  loading: boolean;
  error: string | null;
  role: string | null;
  user: {
    email: string;
    name: string;
    _id: string;
    role: string;
  } | null;
  secretKey: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  registerUser: ({ data }: { data: FormData }) => Promise<RegisterResponseType>;
  loginUser: (data: LoginPayloadData) => Promise<LoginResponseType>;
  verifyUserEmail: (data: VerifyEmailData) => Promise<RegisterResponseType>;
  forgotUserPasswordLink: (
    data: ForgotPasswordLinkType,
  ) => Promise<RegisterResponseType>;
  forgotPassword: ({
    data,
    id,
    token,
  }: {
    data: ForgotPasswordType;
    id: string;
    token: string;
  }) => Promise<RegisterResponseType>;
  logout: () => Promise<RegisterResponseType>;
};

export type UserOutPutType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profile_image: string;
  role: string;
};
