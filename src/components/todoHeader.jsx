import React from "react";

const TodoHeader = () => {
    return (
        <>
            <div className="title headerItem">Заголовок</div>
            <div className="description headerItem">Описание</div>
            <div className="deadline headerItem">Дата завершения</div>
            <div className="inner headerItem">Вложенные файлы</div>
            <div className="innerButton headerItem"></div>
            <div className="complete headerItem"></div>
            <div className="change headerItem"></div>
            <div className="delete headerItem"></div>
        </>
    );
};

export default TodoHeader;
