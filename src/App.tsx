import React from 'react';
import Airtable from 'airtable';
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { Login } from './features/Login/Login';
import { data, loadingState, loginState, setData, setLoading, setLogin, setName, inputValue } from './AppSlice';
import './App.css';
import Classes from './features/Classes/Classes';
// const apiKey = process.env.API_KEY
const base = new Airtable({ apiKey: 'keyTrjlo9qTzY4wc9' }).base("app8ZbcPx7dkpOnP0");

function App() {
  const dispatch = useDispatch();
  const response = useSelector(data);
  const studentName = useSelector(inputValue);
  const loading = useSelector(loadingState);
  const login = useSelector(loginState);

  const fetchData = async () => {
    dispatch(setLoading(true));

    let newarr: any = []
    let output: any = {};

    base("Students").select({
      view: "Grid view",
      filterByFormula: `{Name} = '${studentName}'`
    }).eachPage(async function page(records = [], fetchNextPage) {
      if (records.length === 0) {
        dispatch(setName(""))
        dispatch(setLoading(false))
        toast(`${studentName} does not go here or dropped out :).`)
      }
      else {
        const classFilter = (classIds: string[]) => `OR(${classIds.map(id => { return `RECORD_ID()="${id}"` })})`

        await base("Classes").select({
          filterByFormula: classFilter(records[0].get("Classes") as string[])
        }).eachPage(async function page(records, fetchNextPage) {
          if (records.length === 0) {
            dispatch(setName(""))
            dispatch(setLoading(false))
            toast(`${studentName} has yet to sign up for classes. Login again :)`)
          }
          else {
            await Promise.all(records.map(async (record) => {
              const Name = record.fields.Name;
              const Students: any = [];

              const studentFilter = (studentIds: string[]) => `OR(${studentIds.map(id => { return `RECORD_ID()="${id}"` })})`;

              await base("Students").select({
                view: "Grid view",
                filterByFormula: studentFilter(record.get("Students") as string[])
              }).eachPage((records, fetchNextPage) => {

                records.forEach(record => {
                  try {
                    let studentname = record.fields.Name;
                    Students.push(studentname)
                  } catch (e) { console.log('error inside eachPage => ', e) }
                })

                try {
                  fetchNextPage();
                } catch { return; }
              });

              output = { Name, Students }
              newarr.push(output)
            }));
            dispatch(setData(newarr));
            dispatch(setLogin(true))
            dispatch(setLoading(false));
          };
          fetchNextPage()
        });
      }
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    })
  }

  const logout = (): void => {
    dispatch(setName(''));
    dispatch(setLogin(false));
    dispatch(setData([]));
  }

  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          {login === true ? (
            <div>
              <nav className="nav d-flex justify-content-end">
                <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
              </nav>
              <div className="row">
                <div className="col-sm-6">
                  {response.map(res =>
                    <Classes classname={res.Name} students={res.Students} />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Login callback={fetchData} />
          )
          }
        </div>
      )

      }

    </div>
  );
}

export default App;
