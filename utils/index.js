export const validateEmail = (email) => {
  // eslint-disable-next-line
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email.toLowerCase()
  );
};

export const validatePhoneNumber = (phone) => {
  return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone);
};

export const handleInputChange = (e, setValues, values) => {
  const { name, value } = e.target;
  setValues({
    ...values,
    [name]: value,
  });
};

export const showToast = (message, variant, toast) => {
  toast({
    title: message,
    status: variant,
    isClosable: true,
    duration: 3500,
  });
};
