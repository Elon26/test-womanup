/**     Функция, которая проводит валидацию по установленным в validatorConfig валидаторам       */

const validator = (data, config) => {
    const errors = {};

    function validate(validateMethod, data, config) {
        let statusValidate;

        /**     Проверка на непустое значение       */
        if (validateMethod === "isRequired") {
            statusValidate = data.trim() === "";
        }

        /**     Проверка на дату в формате ДД.ММ.ГГГГ. При этом день допускается любым числом, т.к. он проверяется далее, месяц от 01 до 12, а год от 2000 до 2099       */
        if (validateMethod === "isDate") {
            const dateRegExp =
                /^([0-9][0-9])[-/.]((0[1-9]|1[012])[-/.](20)[0-9][0-9])$/;
            statusValidate = !dateRegExp.test(data);
        }

        /**     Проверка на корректно введенный день месяца (учитывает в т.ч. и високосный год)       */
        if (validateMethod === "isCorrectDate") {
            const [day, month, year] = data.split(".")
            switch (month) {
                case "01": case "03": case "05": case "07": case "08": case "10": case "12":
                    if (Number(day) > 31) {
                        statusValidate = true
                    }
                    break;
                case "04": case "06": case "09": case "11":
                    if (Number(day) > 30) {
                        statusValidate = true
                    }
                    break;
                case "02":
                    if (
                        (Number(year) % 4 !== 0 && Number(day) > 28) ||
                        (Number(year) % 4 === 0 && Number(day) > 29)
                    ) {
                        statusValidate = true
                    }
                    break;
                default:
                    statusValidate = false
                    break;
            }
        }

        if (statusValidate) return config.message;
    }

    /**     Проходимся по всем, указанным в validatorConfig, методам валидации и вызываем их. На выходе получаем либо сообщение об ошибке, соответствующее вызванному и проваленному методу валидации, либо пустое значение         */
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );

            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
};

export default validator;
