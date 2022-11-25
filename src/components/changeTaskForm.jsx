import React, { useEffect, useState } from "react";
import TextField from "./textField";
import validator from "../utils/validator"
import transformDate from "../utils/transformDate";
import dayjs from "dayjs";

const ChangeTaskForm = ({ changeTask, todoItem }) => {

    /**     Для первичной отрисовке принимаем текущие значения задачи из базы данных, а также преобразуем дату формата dayjs в привычный     */
    const [data, setData] = useState({
        ...todoItem,
        deadline: dayjs(todoItem.deadline).format("DD.MM.YYYY")
    });
    const [errors, setErrors] = useState({});
    const isValid = !Object.keys(errors).length;

    /**     Вызываем функцию валидации формы при каждом изменении объекта изменяемой задачи     */
    useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    /**     Принимаем объект изменившегося элемента формы и по полям name и value вносим изменения в объект изменяемой задачи      */
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    /**     Объект, связывающий атрибут name полей формы с сообщениями, которые должны выводится при провале валидации     */
    const validatorConfig = {
        title: {
            isRequired: {
                message: "Введите заголовок задачи"
            }
        },
        description: {
            isRequired: {
                message: "Введите описание задачи"
            }
        },
        deadline: {
            isRequired: {
                message: "Введите срок завершения"
            },
            isDate: {
                message: "Дата должна быть записана в формате дд.мм.гггг"
            },
            isCorrectDate: {
                message: "День месяца указан неверно"
            }
        }
    };

    /**     Вызываем функцию-валидатор и устанавливаем в переменную errors результат её выполнения - либо сообщение об ошибке либо пустое значение       */
    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return !Object.keys(errors).length;
    };

    /**     Вызываем валидацию и, если она пройдена успешно, преобразуем дату в формат, требуемый dayJS, после чего передаем итоговый объект задачи в функцию изменения существующей задачи в Firebase и для повторной отрисовки компонента        */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            data.deadline = transformDate(data.deadline)
            try {
                await changeTask(data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (<>
        <form className="form" onSubmit={handleSubmit}>
            <TextField
                label="Заголовок задачи"
                name="title"
                value={data.title}
                onChange={handleChange}
                error={errors.title}
            />
            <TextField
                label="Описание задачи"
                name="description"
                value={data.description}
                onChange={handleChange}
                error={errors.description}
            />
            <TextField
                label="Срок завершения"
                name="deadline"
                value={data.deadline}
                onChange={handleChange}
                error={errors.deadline}
            />
            <button
                type="submit"
                className="button popapButton"
                disabled={!isValid}
            >
                Изменить
            </button>
        </form>
    </>
    );
};

export default ChangeTaskForm;