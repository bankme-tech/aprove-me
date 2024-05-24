import { useState } from "react";

function CreateAssignor() {
  const [formData, setFormData] = useState({
    name: '',
    document: '',
    email: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    
    setFormData({...formData, [name]: value})
  }
  return (
    <main>
      <h1>Cadastro de Cedentes</h1>
        <form action="submit">
          <input
            type="text"
            placeholder="Nome do cedente"
            name="name"
            value={ formData.name }
            onChange={handleChange}
            />
          <input
            type="text"
            placeholder="Número do documento"
            name="document"
            value={ formData.document }
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={ formData.email }
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={ formData.phone }
            onChange={handleChange}
          />
          <button>Cadastrar</button>
        </form>
    </main>
  )
}

export default CreateAssignor;