import AWS = require("aws-sdk");

export function signIn(token: string) {
    AWS.config.region = "us-east-1";

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "IDENTITY_POOL_ID",
        Logins: { "accounts.google.com": token },
    });
}
