// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import { usePapersContext } from '../hooks/usePapersContext'
// import { useAuthContext } from '../hooks/useAuthContext'
// function Dropdown({paper}) {
//   const [selectedOption, setSelectedOption] = useState('pending');
//   const { dispatch } = usePapersContext();
//   const {user} = useAuthContext();
//   // const handleChange = (event) => {
//   //   const value = event.target.value;

//   //   setSelectedOption(value);
//   //   console.log(value)
//   // };

//   const handleChange = async (e) => {
//     // e.preventDefault()
//     const value = e.target.value;
//     setSelectedOption(value);
//     console.log(selectedOption)
//     if(!user){
//       return
//     }
//     const response = await fetch('/api/papers/' + paper._id, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization':`Bearer ${user.token}`
//       },
//       body: JSON.stringify({
//         papertitle:paper.papertitle,
//         authors:paper.authors,
//         keywords:paper.keywords,
//         abstract:paper.abstract,
//         pdf_attachment:paper.pdf_attachment,
//         blog_status: selectedOption,
//         Date: paper.createdAt
//       }),
//     })
//     const json = await response.json()

//     if (response.ok) {
//       dispatch({type: 'UPDATE_PAPER', payload: json})
//     }
//   }


//   return (
//     <div>
//       <select value={paper.blog_status} onChange={handleChange}>
//         <option value="pending">pending</option>
//         <option value="accept">accept</option>
//         <option value="reject">reject</option>
//       </select>
//       <p>Selected option: {selectedOption}</p>
//     </div>
//   );
// }

// export default Dropdown;
