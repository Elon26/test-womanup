/**     Функция-преобразователь даты из привычного формата в формат, требуемый dayJS       */

const transformDate = (date) => {
    const [day, month, year] = date.split(".")
    return year + "-" + month + "-" + day
}

export default transformDate;
