export const cognitoConfig = {
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_REGION as string,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
      userPoolClientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
    },
    loginWith: {} 
  }
};