import { useState } from "react"
import styles from "./App.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";


function Edit({ editing, setListTodo, ListTodo, Obj }) {
    const [Loading, setLoading] = useState(editing);
    const [Edit, setEdit] = useState(Obj.text);
    const EditInput = (event) => {
        const { value } = event.target;
        setEdit(value);
    }
    const EditSubmit = (event) => {
        event.preventDefault();
        const EditText = ListTodo.map((i) =>
            i.id === Obj.id ? { ...i, text: Edit } : i);
        setListTodo(EditText);
        setLoading(false);
    }

    return (
        <div >
            {Loading ?
                <div className={styles.editinput} >
                    <FontAwesomeIcon icon={faExchangeAlt} 
                    style={{marginRight:'10px', fontSize:'10px'}}/>
                    <form onSubmit={EditSubmit}>
                        <input
                            type="text"
                            value={Edit}
                            onChange={EditInput}
                            autoFocus
                            required
                        />
                    </form>
                </div>
                : null}
        </div>
    )
}
export default Edit