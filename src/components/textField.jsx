import React from "react";

const TextField = ({
    label,
    name,
    value,
    onChange,
    error
}) => {
    /**     Вызываем функцию изменения поля формы и передаем в неё объект имененем и значением поля      */
    const handleChange = ({ target }) => {
        onChange({
            name: target.name,
            value: target.value
        });
    };

    return (
        <div className="inputItem">
            <label className="inputLabel" htmlFor={name}>
                {label}
            </label>
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className={
                    "input" +
                    (error ? " input_error" : "")
                }
            />
            {error && <div className="inputError">{error}</div>}
        </div>
    );
};

export default TextField;