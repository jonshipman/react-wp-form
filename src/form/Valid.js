import phone from "phone";

export const Valid = {
  NotEmptyString: function (v) {
    return v !== "";
  },

  Email: function (v) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v);
  },

  Phone: function (v) {
    const check = phone(v, "", true);
    return check.length > 0;
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
