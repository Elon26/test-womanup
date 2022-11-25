import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { storage } from "../firebase";

const PutFilePopap = ({ isPopapOpen, handleClose, handlePutFile }) => {
    const [progress, setProgress] = useState(0);

    /**     Отлавливаем клик на пустом месте и вызываем функцию закрытия попапа       */
    const handleClickToEmptySpace = (e) => {
        if (!e.target.closest(".popap__content")) {
            handleClose();
        }
    };

    /**     Помещаем вложенный файл в переменную и передаем её в функцию загрузки в Firebase Storage       */
    const handleAddFile = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    /**     Размещаем файл в Firebase Storage, обновляем прогресс бар, показывающий процент загрузки файла,а также формируем объект, который хранит данные о файле и передаем его в функцию handlePutFile        */
    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
        },
            (err) => console.log(err),
            async () => {
                const response = await getDownloadURL(uploadTask.snapshot.ref)
                handlePutFile({
                    name: file.name,
                    url: response
                });
            }
        );
    };


    return (
        <div className="popap" onClick={handleClickToEmptySpace}>
            <div className={"popap__body" + (isPopapOpen ? " active" : "")}>
                <div className="popap__content">
                    <form className="popap__fileForm" onSubmit={handleAddFile}>
                        <input type="file" />
                        <div className="popap__progressbar">Загрузка {progress}%</div>
                        <button className="button putButton" type="submit">Загрузить</button>
                    </form>
                    <div className="popap__closeIcon" onClick={handleClose}>
                        <BiX />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PutFilePopap;
