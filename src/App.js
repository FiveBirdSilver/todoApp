import { useEffect, useState, Component } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faCheckSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons"
import styles from "./App.module.css"
import Edit from "./Edit.js"

function App() {
  const [Todo, setTodo] = useState('');
  const [ListTodo, setListTodo] = useState([]);
  let Now = new Date();
  let Day = Now.getDate();
  let GetMonth = Now.getMonth();
  let MonthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let Month = MonthArr[GetMonth];
  let Year = Now.getFullYear();

  const List = {
    text: Todo,
    id: Date.now(),
    checked: false,
    edit: false
  };
  const InEdit = (event) => {
    const Edit = event.target.name;
    setListTodo(ListTodo.map((i) => i.id == Edit ? { ...i, edit: !i.edit } : i))
  }

  const ChangeInput = (event) => {
    const { value } = event.target;
    setTodo(value);
  }

  const SubmitAdd = (event) => {
    event.preventDefault();
    if (Todo == "") {
      return;
    }
    setListTodo([List, ...ListTodo]);
    setTodo('');
  }

  useEffect(() => {
    setListTodo(JSON.parse(localStorage.getItem('key')))
  }, [])

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(ListTodo))
  }) // dependency가 비어 있는 이유는, todo가 입력될 때마다 저장되어야 하기 때문에

  return (
      <div className={styles.contain}>
        <div className={styles.title}>
          <h1>TODO LIST</h1>
          <div className={styles.date}>
            <div className={styles.day}>
              <p>{Day}</p>
            </div>
            <div className={styles.MonthNYear}>
              <p>{Month}</p>
              <p>{Year}</p>
            </div>
          </div>
        </div>
        <form onSubmit={SubmitAdd} className={styles.listinput}>
          <input type="text"
            onChange={ChangeInput}
            placeholder="오늘 할 일을 입력하세요"
            value={Todo} />
          <button type="submit"><FontAwesomeIcon icon={faPlus}
            style={{ fontSize: '16px' }} /></button>
        </form>
        <>
          {ListTodo.map((i) => <div key={i.id}>
            <div className={styles.listTodo}>
              <div>

                <button
                  onClick={() => {
                    setListTodo(ListTodo.map((e) =>
                      e.id == i.id ?
                        { ...e, checked: !e.checked } : e)) // 체크한 항목에 대한 boolean의 값을 바꾼 후 갱신
                  }}>
                  {i.checked ? <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '10px', color:'rosybrown' }} />
                    : <FontAwesomeIcon icon={faSquare} style={{ marginRight: '10px' }} />}
                </button>

                {i.checked ? <span style={{ textDecoration: 'line-through', color: 'gray' }}>{i.text}</span> : <span>{i.text}</span>}
              </div>

              <div className={styles.editndelete}>
                {i.checked ? null : <button onClick={InEdit} name={i.id}>🖊️</button>}
                {i.checked ?
                  <FontAwesomeIcon icon={faMinus}
                    style={{ color: 'tomato' }}
                    onClick={() => { setListTodo(ListTodo.filter((e) => e.id != i.id)) }} /> : null}
              </div>

            </div>
            <div className={styles.editinput} >
              {i.edit ? <Edit Obj={i} ListTodo={ListTodo} setListTodo={setListTodo} editing={i.edit} /> : null}
            </div>

          </div>)}
        </>
      </div>
    
  );
}



export default App;
