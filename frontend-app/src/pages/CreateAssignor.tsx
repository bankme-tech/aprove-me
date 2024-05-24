function CreateAssignor() {
  return (
    <main>
      <h1>Cadastro de Cedentes</h1>
        <form action="submit">
          <label htmlFor="">
            Nome:
            <input type="text" />
          </label>
          <label htmlFor="">
            Documento:
            <input type="text" />
          </label>
          <label htmlFor="">
            Email:
            <input type="text" />
          </label>
          <label htmlFor="">
            Telefone:
            <input type="text" />
          </label>
          <button>Cadastrar</button>
        </form>
    </main>
  )
}

export default CreateAssignor;