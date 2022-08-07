type Props = {
  name: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export const Input = ({ name, label, onChange, value }: Props) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  }}>
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      style={{
        alignSelf: "start"
      }}
      type="text"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={value}
    />
  </div>
);
