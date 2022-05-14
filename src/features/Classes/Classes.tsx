import React from 'react'

interface Props {
  classname: string,
  students: any[]
}

function Classes(props: Props) {
  const { classname, students } = props

  return (
    <div className="card m-2 w-50">
      <div className="card-body">
        <h3 className="card-title">Class Name</h3>
        <p className="card-text">{classname}</p>
        <h3 className="card-title">Students</h3>
        <ol>
          {
            students.map((student, idx) =>
              <li key={idx} className="card-text">{student}</li>
            )
          }
        </ol>
      </div>
    </div>
  );
}

export default Classes
