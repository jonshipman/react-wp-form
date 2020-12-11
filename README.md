# react-wp-form

> Form rendering intended to be used alongside react-w-gql and WP-GraphQL.

![GitHub](https://img.shields.io/github/license/jonshipman/react-wp-form) ![GitHub last commit](https://img.shields.io/github/last-commit/jonshipman/react-wp-form)

## Install

```bash
yarn add https://github.com/jonshipman/react-wp-form
```

## Usage

```jsx
import React, { useState } from "react";
import { LeadForm, Valid, LeadFormGroup } from "react-wp-form";
import { gqlUrl } from "../config";

export const ContactForm = (props) => {
  return (
    <div>
      <LeadForm {...props}>
        <LeadFormGroup
          id="yourName"
          placeholder="Your Name"
          valid={Valid.NotEmptyString}
          error="You must include a name."
        />
        <LeadFormGroup
          id="email"
          placeholder="Your Email"
          type="email"
          valid={Valid.Email}
          error="You must include a email."
          className={`w-50-l fl-l pr2-l`}
        />
        <LeadFormGroup
          id="phone"
          placeholder="Your Phone"
          type="tel"
          error="Invalid phone."
          valid={Valid.Phone}
          className={`w-50-l fl-l pl2-l`}
        />
        <LeadFormGroup id="message" placeholder="Message" type="textarea" />
      </LeadForm>
    </div>
  );
};
```

## License

Apache 2.0 © [jonshipman](https://github.com/jonshipman)
