import React, { useCallback, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import show from "./show";
import Forms from "./AddTodo";
import Checkbox from "./TodoItem";

function Home() {
  const local_data =
    localStorage.getItem("list-items") || '{"doList": [], "doneList":[]}';
  const convert_data = JSON.parse(local_data);
  const [list, setList] = useState(convert_data);
  const [refreshing, setRefreshing] = useState(false);

  const do_object = useMemo(
    function () {
      const do_length = list.doList.length;
      let obj = {};
      for (let i = 0; i < do_length; i++) {
        obj = { ...obj, [i]: list.doList[i] };
      }
      return obj;
    },
    [list]
  );

  const done_object = useMemo(
    function () {
      const done_length = list.doneList.length;
      let obj = {};
      for (let i = 0; i < done_length; i++) {
        obj = { ...obj, [i]: list.doneList[i] };
      }
      return obj;
    },
    [list]
  );

  function saveData() {
    show();
    const dummy_list = { ...list };
    dummy_list.doList.push(new_todo.value);
    setList(dummy_list);
    localStorage.setItem("list-items", JSON.stringify(dummy_list));
  }

  function done_task(event) {
    const dummy_list = { ...list };
    dummy_list.doneList.push(do_object[event.target.id]);
    const dummy_do = { ...do_object };
    delete dummy_do[event.target.id];
    const dummy_do_array = Object.keys(dummy_do).map(function (value) {
      return dummy_do[value];
    });
    setList({ ...dummy_list, doList: dummy_do_array });
    localStorage.setItem(
      "list-items",
      JSON.stringify({ ...dummy_list, doList: dummy_do_array })
    );
  }

  function do_task(event) {
    const dummy_list = { ...list };
    dummy_list.doList.push(done_object[event.target.id]);
    const dummy_done = { ...done_object };
    delete dummy_done[event.target.id];
    const dummy_done_array = Object.keys(dummy_done).map(function (value) {
      return dummy_done[value];
    });
    setList({ ...dummy_list, doneList: dummy_done_array });
    localStorage.setItem(
      "list-items",
      JSON.stringify({ ...dummy_list, doneList: dummy_done_array })
    );
  }

  const do_keys = Object.keys(do_object);
  const done_keys = Object.keys(done_object);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const newTodo = `Todo added by another user`;
      const dummy_list = { ...list };
      dummy_list.doneList.push(newTodo);
      setList(dummy_list);
      localStorage.setItem("list-items", JSON.stringify(dummy_list));
      setRefreshing(false);
    }, 2000);
  };

  const schema = Yup.object().shape({
    todo: Yup.string().required("Please write some article!"),
  });

  function done() {
    new_todo.value = "";
    show();
  }

  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 max-w-[90vw] mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl sm:text-3xl">Things to get done</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`
            px-4 py-2 rounded-lg
            ${
              refreshing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }
            text-white font-semibold transition duration-300 ease-in-out
          `}
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <div className="space-y-4 py-8">
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-semibold">Things to do</h2>
          <ul>
            {list.doList.length > 0 &&
              do_keys.map((value) => (
                <Checkbox
                  key={value}
                  id={value}
                  name={do_object[value]}
                  done={done_task}
                  check={false}
                />
              ))}
          </ul>
        </div>
        <div>
          <button
            id="add_todo"
            onClick={done}
            className="border rounded-full bg-yellow-500 px-3 py-2 text-white font-semibold"
          >
            + Add to todo
          </button>
          <div id="form" className="hidden px-4 py-5 sm:p-6 shadow">
            <h3 className="text-gray-900 text-lg font-medium">Create a Todo</h3>
            <Formik
              initialValues={{
                todo: "",
              }}
              validationSchema={schema}
              onSubmit={saveData}
            >
              <Form className="mt-5">
                <Forms
                  id="new_todo"
                  label="new_todo"
                  name="todo"
                  placeholder="Write an article about XState"
                />
                <div className="flex pt-5 gap-3">
                  <button
                    type="submit"
                    className=" font-medium bg-yellow-500 px-4 py-2 border rounded-md text-white text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={done}
                    className="px-4 py-2 border rounded-md text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-semibold">Things done</h2>
          <ul>
            {list.doneList.length > 0 &&
              done_keys.map((value) => (
                <Checkbox
                  key={value}
                  id={value}
                  name={done_object[value]}
                  done={do_task}
                  check={true}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
