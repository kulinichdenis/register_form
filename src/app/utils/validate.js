const validIBAN = async (value) => {
  try {
    const result = await fetch("http://localhost:3050", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ iban: value }),
    });
    return result.json();
  } catch(e) {
    throw new Error(e);
  }
};

const validation = (name, value) => {
  switch(name) {
      case "name":
          return /^[A-Z]{1}[a-z]+$/.test(value) ? false : "Error";
      case "lastname":
          return /^[A-Z]{1}[a-z]+$/.test(value) ? false : "Error";
      case "email":
          return /[^@]+@[^@.]+\.[^@.]+/.test(value) ? false : "Incorrect format";
      default:
          return false;
  }
}


export { validation, validIBAN }
