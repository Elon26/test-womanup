import React from "react";
import "../loader.css";

/**     Компонент, добавляющий при помощи стилей визуальную динамику на время взаимодействия приложения с базой данных       */

const Loader = () => {
    return (
        <div className="loaderBody">
            <span className="loader"></span>
        </div>
    );
};

export default Loader;