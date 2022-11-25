import dayjs from "dayjs";
import React, { useState } from "react";
import ChangeTaskPopap from "./changeTaskPopap";
import PutFilePopap from "./putFilePopap";

const TodoItem = ({ todoItem, handleDelete, handleChangeTask }) => {
    const [isChangeTaskPopapOpen, setChangeTaskPopapOpen] = useState(false);
    const [isPutFilePopapOpen, setPutFilePopapOpen] = useState(false);

    /**     Закрываем попап изменения задачи и вызываем функцию обновления базы данных     */
    const changeTask = async (data) => {
        setChangeTaskPopapOpen(false)
        handleChangeTask(data);
    };

    /**     Закрываем попап изменения задачи     */
    const closeChangeTaskPopap = () => {
        setChangeTaskPopapOpen(false);
    };

    /**     Берем существующий объект задачи, меняем поле completed с false на true и передаем этот объект в функцию обновления базы данных     */
    const handleCompleteTask = (todoItem) => {
        const data = {
            ...todoItem,
            completed: true
        }
        handleChangeTask(data);
    }

    /**     В зависимости от булевого значения поля completed либо добавляем либо не добавляем дополнительный класс для визуальной демонстрации того, что задача выполнена     */
    const hasCompleteClass = () => todoItem.completed ? " completed" : ""

    /**     В зависимости от того просрочена задача или нет либо добавляем либо не добавляем дополнительный класс для визуальной демонстрации того, что задача просрочена     */
    const isOverdue = () => {
        if (
            !todoItem.completed &&
            dayjs(todoItem.deadline).isBefore(dayjs())
        ) return " overdue"
        return ""
    }

    /**     Закрываем попап вложения файла     */
    const closePutFilePopap = () => {
        setPutFilePopapOpen(false);
    };

    /**     Помещаем объект с данными о вложенном файле в соответствующий элемент базы данных     */
    const handlePutFile = (linkObj) => {
        const data = { ...todoItem }
        if (data.inner) {
            data.inner.push(linkObj)
        } else {
            data.inner = [linkObj]
        }
        handleChangeTask(data);
    }

    return (
        <>
            <div className="flex taskItem">
                <div className={"title todoItem" + hasCompleteClass() + isOverdue()}>
                    {todoItem.title}
                </div>
                <div className={"description todoItem" + hasCompleteClass() + isOverdue()}>
                    {todoItem.description}
                </div>
                <div className={"deadline todoItem" + hasCompleteClass() + isOverdue()}>
                    {dayjs(todoItem.deadline).format("DD.MM.YYYY")}
                </div>
                {(!todoItem.inner || todoItem.inner.length === 0) && <div className="inner todoItem">Вложения отсутствуют</div>}
                {todoItem.inner && todoItem.inner.length !== 0 &&
                    <div className="inner todoItem">
                        {todoItem.inner.map(inner =>
                            <a
                                key={inner.url}
                                href={inner.url}
                                className="innerItem"
                                target="blank"
                            >
                                {inner.name}
                            </a>
                        )}
                    </div>}
                <button
                    className="button fileButton todoItem"
                    onClick={() => setPutFilePopapOpen(true)}
                >
                    Вложить
                </button>
                {!todoItem.completed &&
                    <button
                        className="complete button todoItem"
                        onClick={() => handleCompleteTask(todoItem)}
                    >
                        Завершить
                    </button>
                }
                {todoItem.completed &&
                    <button
                        disabled
                        className="complete button todoItem"
                        onClick={() => handleCompleteTask(todoItem)}
                    >
                        Завершено
                    </button>
                }
                <button
                    disabled={todoItem.completed}
                    className="change button todoItem"
                    onClick={() => setChangeTaskPopapOpen(true)}
                >
                    Изменить
                </button>
                <button
                    className="delete button todoItem"
                    onClick={() => handleDelete(todoItem.id)}
                >
                    Удалить
                </button>
            </div>
            <ChangeTaskPopap
                isPopapOpen={isChangeTaskPopapOpen}
                handleClose={closeChangeTaskPopap}
                changeTask={changeTask}
                todoItem={todoItem}
            />
            <PutFilePopap
                isPopapOpen={isPutFilePopapOpen}
                handleClose={closePutFilePopap}
                handlePutFile={handlePutFile}
            />
        </>
    );
};

export default TodoItem;
