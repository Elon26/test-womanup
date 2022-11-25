import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoHeader from "./todoHeader";
import TodoItem from "./todoItem";
import CreateTaskPopap from "./createTaskPopap";
import { firebaseConfig } from "../firebase";
import Loader from "./loader";


const TodoList = () => {
    const firebaseUrl = firebaseConfig.databaseURL + "/tasks/";
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateTaskPopapOpen, setCreateTaskPopapOpen] = useState(false);

    /**     Запрашиваем задачу из Firebase и устанавливаем в переменную tasks     */
    async function getTasksFromFirebase() {
        try {
            const response = await axios.get(firebaseUrl + ".json");
            setTasks(Object.values(response.data));
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    };

    /**     Вызываем функцию запроса задач из Firebase при первичной отрисовке компонента     */
    useEffect(() => {
        getTasksFromFirebase();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**     Создаем новой задачи в Firebase и устанавливаем её в переменную tasks, для её текущей отрисовки      */
    const createNewTask = async (data) => {
        setCreateTaskPopapOpen(false)
        try {
            setIsLoading(true);
            await axios.put(firebaseUrl + data.id + ".json", data);
            setTasks(prevState => [...prevState, data])
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    };

    /**     Обновляем существующую задачу и устанавливаем обновленные данные в переменную tasks, для её текущей отрисовки       */
    const changeTask = async (data) => {
        try {
            setIsLoading(true);
            await axios.put(firebaseUrl + data.id + ".json", data);
            setTasks(prevState => prevState.map(task => {
                if (task.id === data.id) {
                    return data;
                }
                return task;
            }))
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    /**     Удаляем задачу из базы данных и из отрисованного компонента       */
    const deleteTask = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(firebaseUrl + id + ".json");
            setTasks(prevState => prevState.filter(task => task.id !== id))
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    /**     Закрываем попап создания новой задачи       */
    const closeCreateTaskPopap = () => {
        setCreateTaskPopapOpen(false);
    };

    return (
        <>
            <button
                className="create button"
                onClick={() => setCreateTaskPopapOpen(true)}
            >
                Создать задачу
            </button>
            {tasks && tasks.length > 0 &&
                <div className="header flex">
                    <TodoHeader />
                </div>}
            <div className="body">
                {isLoading && <Loader />}
                {!isLoading && tasks && tasks.map(todoItem =>
                    <TodoItem
                        key={todoItem.id}
                        todoItem={todoItem}
                        handleDelete={deleteTask}
                        handleChangeTask={changeTask}
                    />
                )}
            </div>
            <CreateTaskPopap
                isPopapOpen={isCreateTaskPopapOpen}
                handleClose={closeCreateTaskPopap}
                createNewTask={createNewTask}
            />
        </>
    );
};

export default TodoList;
