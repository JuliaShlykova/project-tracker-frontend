const removeTokenCookie = () => {
  document.cookie="refresh_token_s=;path=/auth;expires=Thu, 01 Jan 1970 00:00:00 UTC"
}

export default removeTokenCookie;