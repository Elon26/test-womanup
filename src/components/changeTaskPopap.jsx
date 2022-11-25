import React from "react";
import { BiX } from "react-icons/bi";
import ChangeTaskForm from "./changeTaskForm";

const ChangeTaskPopap = ({ isPopapOpen, handleClose, changeTask, todoItem }) => {

    /**     Отлавливаем клик на пустом месте и вызываем функцию закрытия попапа       */
    const handleClickToEmptySpace = (e) => {
        if (!e.target.closest(".popap__content")) {
            handleClose();
        }
    };

    return (
        <div className="popap" onClick={handleClickToEmptySpace}>
            <div className={"popap__body" + (isPopapOpen ? " active" : "")}>
                <div className="popap__content">
                    <div className="popap__form">
                        <ChangeTaskForm
                            changeTask={changeTask}
                            todoItem={todoItem}
                        />
                    </div>
                    <div className="popap__closeIcon" onClick={handleClose}>
                        <BiX />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ChangeTaskPopap;
