import { useEffect, useState } from "react";

window._recaptchaLoadingCB = () => {
  console.log("Recaptcha Loaded");
};

const RecaptchaUrl = "https://recaptcha.net/recaptcha/api.js";

export const useRecaptcha = ({ trigger, key, callback = () => {} }) => {
  const [grecaptcha, setGrecaptcha] = useState(window.grecaptcha);
  const [token, setToken] = useState();

  useEffect(() => {
    if (key && trigger) {
      const scripts = document.getElementsByTagName("script");
      let already_in_use = false;

      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes(RecaptchaUrl)) {
          already_in_use = true;
        }
      }

      if (!already_in_use) {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.defer = true;
        s.onload = () => setGrecaptcha(window.grecaptcha);
        s.src = `${RecaptchaUrl}?onload=_recaptchaLoadingCB&render=${key}`;
        document.getElementsByTagName("HEAD")[0].appendChild(s);
      }
    }
  }, [key, trigger]);

  useEffect(() => {
    if (grecaptcha && key && !token) {
      const ready = () => {
        grecaptcha
          .execute(key, { action: "leadform" })
          .then((t) => {
            callback(t);
            setToken(t);
          })
          .catch((e) => {
            console.error("Recaptcha error", e);
          });
      };

      grecaptcha.ready(ready);
    }
  }, [grecaptcha, key, token, callback]);

  return { grecaptcha, token, setToken };
};
