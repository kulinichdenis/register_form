const validateFiels = (values, ...arg) => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = "Required";
  } else if (values.firstname.length < 2) {
    errors.firstname = "Incorrect min 2 letters";
  } else if (!/^[A-Z]{1}[a-z]*$/.test(values.firstname)) {
    errors.firstname = "Incorrect value";
  }
  if (!values.lastname) {
    errors.lastname = "Required";
  } else if (!/^[A-Z]{1}[a-z]*$/.test(values.lastname)) {
    errors.lastname = "Incorrect value";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/[^@]+@[^@.]+\.[^@.]+/.test(values.email)) {
    errors.email = "Incorrect email";
  }
  if (!values.iBan) {
    errors.iBan = "Required";
  }
  return errors;
}

let controller = new AbortController();
const validIBAN = async (value) => {
  if (controller !== undefined) {
    controller.abort();
  }
  controller = new AbortController();
  let signal = controller.signal;
  try {
    const result = await fetch("http://localhost:3050", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ iban: value }),
      signal,
    });
    if (result.ok) {
      return result.json();
    } else {
      return null;
    }
  } catch(e) {
    throw new Error(e);
  }
};

const ibanValidate = async(value) => {
  if (!value) {
    return "Required";
  }
  let count = 0;
  try {
    while(count < 3) {
      count++;
      const result = await validIBAN(value);
      if(result === null) {
        continue;
      }
      return result.valid ? undefiend : "Incorrect";
    }
    return "Service is not available, try agian later";
  } catch(e) {
    console.log("Some problems!!!");
  }
}

export { validateFiels, ibanValidate }
