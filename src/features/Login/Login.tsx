import React, { ChangeEvent, FormEvent } from "react";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { setName, inputValue } from '../../AppSlice';

type Props = {
  callback(): void
}

export const Login: React.FC<Props> = ({ callback }) => {
  const dispatch = useDispatch();
  const studentName = useSelector(inputValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    dispatch(setName(val[0].toUpperCase() + val.substring(1)))
  }

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (studentName.trim() !== '') {
      callback()
    } else {
      toast('Enter Student Name')
    }
  }

  return (
    <form className="card w-50 p-2 m-auto">
      <div className="mb-3">
        <label className="form-label">Log In</label>
        <input
          type="text"
          value={studentName}
          placeholder="Student Name"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
    </form>
  );
}