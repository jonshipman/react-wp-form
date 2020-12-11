import phone from "phone";

export const isPhone = (str) => {
  const check = phone(str, "", true);
  return check.length > 0;
};

export const isEmail = (str) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(str);
};

export const Valid = {
  NotEmptyString: function (v) {
    return v !== "";
  },

  Email: function (v) {
    return isEmail(v);
  },

  Phone: function (v) {
    return isPhone(v);
  },

  LessThan: function (amount) {
    return function (v) {
      return (v || "").length < amount;
    };
  },

  GreaterThan: function (amount) {
    return function (v) {
      return (v || "").length > amount;
    };
  },
};
