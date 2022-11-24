import { ButtonHTMLAttributes, Dispatch, SetStateAction } from "react";

interface IButtonTableOption
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  setCurrentTransactionsMode: Dispatch<
    SetStateAction<"all" | "cash_in" | "cash_out">
  >;
  currentTransactionsMode: "all" | "cash_in" | "cash_out";
}

import styles from "./ButtonTableOptions.module.scss";

const tableOptions = [
  { name: "all", label: "Todas" },
  { name: "cash_in", label: "Cash-In" },
  { name: "cash_out", label: "Cash-Out" },
];

export const ButtonTableOptions = ({
  setCurrentTransactionsMode,
  currentTransactionsMode,
  children,
  ...props
}: IButtonTableOption) => {
  return (
    <>
      {tableOptions.map((option) => {
        return (
          <button
            key={option.name}
            name={option.name}
            onClick={() => {
              if (
                option.name == "all" ||
                option.name == "cash_in" ||
                option.name == "cash_out"
              ) {
                setCurrentTransactionsMode(option.name);
              }
            }}
            {...props}
            className={
              option.name == currentTransactionsMode
                ? `${styles.table_option__selected} ${styles.table_option}`
                : styles.table_option
            }
          >
            {option.label}
          </button>
        );
      })}
    </>
  );
};

export default ButtonTableOptions;
