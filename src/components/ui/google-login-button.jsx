import { GoogleLogin } from "@react-oauth/google";
import SocialLoginButton from "./social-login-button";
import googleIcon from "../../assets/google.svg";

export default function GoogleLoginButton({ onSuccess, onError }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      useOneTap={false}
      render={renderProps => (
        <SocialLoginButton
          onClick={renderProps.onClick}
          iconSrc={googleIcon}
        >
          Google
        </SocialLoginButton>
      )}
    />
  );
}