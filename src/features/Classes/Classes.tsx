import React from 'react'

interface Props {
  classname: string,
  students: any[]
}

function Classes(props: Props) {
  const { classname, students } = props

  return (
    <div className="card w-10 m-2">
      <h3 className="">Class Name</h3>
      <p className="">{classname}</p>
      <h3 className="">Students</h3>
      {
        students.map((student, idx) =>
          <p key={idx} className="">{student}</p>
        )
      }

    </div>
  );
}

export default Classes
