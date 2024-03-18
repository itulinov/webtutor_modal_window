import React from 'react';
import styles from  './Spinner.module.css';

//import ClassesGlobal from "@Components/Style.module.css"
//<div className={ClassesGlobal.container_without_shadow}>

const Spinner = () => {
    return (
        <div>
            <div className={styles.container}>
                <div className="lds-spinner">
                    <div className={`${styles.lds_double_ring}  mx-auto`}>
                        <div></div>
                        <div></div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
