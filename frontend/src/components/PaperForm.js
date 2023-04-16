import { useState} from "react"
import { usePapersContext } from "../hooks/usePapersContext"
import { useAuthContext } from "../hooks/useAuthContext"
const PaperForm = () => {
  const { dispatch } = usePapersContext()
  const {user} = useAuthContext()
  const [papertitle, setPapertitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [keywords, setKeywords] = useState('')
  const [abstract, setAbstract] = useState('')
  const [pdf_attachment, setPdf_attachment] = useState('')
  // const [isFilePicked, setIsFilePicked] = useState(false);
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
      e.preventDefault()
      if(!user){
        setError('you must be logged in ')
        return 
      }
      const paper = {papertitle, authors, keywords , abstract, pdf_attachment }
  
      const response = await fetch('/api/papers', {
        method: 'POST',
        body: JSON.stringify(paper),
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
      if (response.ok) {
        setPapertitle('')
        setAuthors('')
        setKeywords('')
        setAbstract('')
        setPdf_attachment('')
        // setIsFilePicked(null)
        setError(null)
        setEmptyFields([])
        console.log('new paper added', json)
        dispatch({type: 'CREATE_PAPER', payload: json})
      }
    }
  

  return (
    <form className="create" method="post" onSubmit={handleSubmit}>
      <h3>Add a New paper</h3>

      <label>papertitle:</label>
      <input 
        type="text"
        onChange={(e) => setPapertitle(e.target.value)}
        value={papertitle}
        className={emptyFields.includes('papertitle') ? 'error' : ''}
      />

      <label>authors:</label>
      <input 
        type="text"
        onChange={(e) => setAuthors(e.target.value)}
        value={authors}
        className={emptyFields.includes('authors') ? 'error' : ''}
      />

      <label>keywords:</label>
      <input 
        type="text"
        onChange={(e) => setKeywords(e.target.value)}
        value={keywords}
        className={emptyFields.includes('keywords') ? 'error' : ''}
      />
      <label>abstract:</label>
      <input 
        type="text"
        onChange={(e) => setAbstract(e.target.value)}
        value={abstract}
        className={emptyFields.includes('abstract') ? 'error' : ''}
      />
      <label>Pdf Attachment:</label>
      <input 
        type="text"
        onChange={(e) => {setPdf_attachment(e.target.value) }}
        value={pdf_attachment}
        className={emptyFields.includes('pdf_attachment') ? 'error' : ''}
      />
      <button>Add paper</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PaperForm