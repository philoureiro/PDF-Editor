export const BrowserDetect = () => {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) return "chrome";

  if (userAgent.match(/firefox|fxios/i)) return "firefox";

  if (userAgent.match(/safari/i)) return "safari";

  if (userAgent.match(/opr\//i)) return "opera";

  if (userAgent.match(/edg/i)) return "edge";

  return browserName;
};
