export const getPasswordsVariants = (password: string) => {
  const res: string[] = [];

  res.push(
    password
      .slice(0, 20)
      .split("")
      .map((el, i) => el + (i % 2 === 0 ? "" : "_"))
      .join("") + ".$12GneIog"
  );

  res.push(password.slice(0, 14) + ".$12GneIog");

  res.push(password.slice(0, 14) + "$G");

  return res;
};
