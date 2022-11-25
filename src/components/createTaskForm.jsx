import React, { useEffect, useState } from "react";
import TextField from "./textField";
import validator from "../utils/validator"
import transformDate from "../utils/transformDate";

const CreateTaskForm = ({ createNewTask }) => {
    /**     Шаблон новой задачи с предустановленными полями id и completed. Все прочие поля устанавливаются пользователем      */
    const defaultData = {
        id: Date.now(),
        title: "",
        description: "",
        deadline: "",
        completed: false,
        inner: []
    };

    const [freshForm, setFreshForm] = useState(true);
    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const isValid = !Object.keys(errors).length;

    /**     Вызываем функцию валидации формы при каждом изменении объекта создаваемой задачи     */
    useEffect(() => {
        if (!freshForm) {
            validate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    /**     Принимаем объект изменившегося элемента формы и по полям name и value вносим изменения в объект создаваемой задачи      */
    const handleChange = (target) => {
        setFreshForm(false);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    /**     Объект, устанавливающий набор валидаторов на каждое из полей формы и связывающий атрибут name полей формы с сообщениями, которые должны выводится при провале валидации     */
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

    /**     Вызываем валидацию и, если она пройдена успешно, преобразуем дату в формат, требуемый dayJS, после чего передаем итоговый объект задачи в функцию создания новой задачи в Firebase и для отрисовки компонента        */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            data.deadline = transformDate(data.deadline)
            try {
                await createNewTask(data);
                setFreshForm(true);
                setData(defaultData);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
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
                Создать
            </button>
        </form>
    );
};

export default CreateTaskForm;