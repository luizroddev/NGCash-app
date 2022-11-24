// Back-End.TO-DO 3
export const isValidPasswordRequirements = (password: string): boolean => {
  // A senha precisa ser composta por pelo menos 8 caracteres, um número e uma letra maiúscula.
  const passwordRequirements = new RegExp(
    "^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{8,}$"
  );
  return passwordRequirements.test(password);
};
