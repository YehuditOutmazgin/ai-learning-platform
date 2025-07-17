import React from 'react';

type Option = {
  _id: string;
  name: string;
};

type Props = {
  label: string;
  value: string;
  options?: Option[];
  onChange: (value: string) => void;
};

const Select: React.FC<Props> = ({ label, value, options = [], onChange }) => (
  <div className="select-container">
    <label className="select-label">{label}</label>
    <select
      className="select-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      dir="rtl"
    >
      <option value="">בחר {label}</option>
      {options.length === 0 ? (
        <option disabled>לא קיימות אפשרויות</option>
      ) : (
        options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.name}
          </option>
        ))
      )}
    </select>
  </div>
);

export default Select;
