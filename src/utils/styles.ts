export const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 1, 1, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  content: {
    padding: "1rem",
    width: "800px",
    margin: "auto",
  },
};

export const dropdownStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #ccc",
    borderRadius: "4px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#f4f4f4",
  }),
  option: (provided) => ({
    ...provided,
    color: "#333",
  }),
};
