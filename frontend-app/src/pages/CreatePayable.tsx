function CreatePayable() {
  return (
    <main>
      <h1>Cadastro de Recebíveis</h1>
      <form action="submit">
        <label htmlFor="assignor">
          Cedente:
          <select name="assignor" id="assignor-select">
            {/* TO DO carregar cedentes do banco */}
          </select>
        </label>
        <input type="number" name="value" id="payable-value-input" />
        <button>Cadastrar</button>
      </form>
    </main>
  )
}

export default CreatePayable;