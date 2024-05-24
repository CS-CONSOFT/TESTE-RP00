import { useState } from "react";
import './App.css';
import api from "./axios";
import Header from "../submodulos/COMPONENTES_GERAIS/src/Componente_Header";

function App() {
  const [noteTyped, setNoteTyped] = useState("20240100000000108");
  const [products, setProducts] = useState([]);

  const [messageList, setMessageList] = useState('');

  const [loadingProducts, setLoadingList] = useState(false);



  async function searchNote() {
    const note = noteTyped;
    // Simulando a função getUserProperties
    // Como você não forneceu essa implementação, estou apenas definindo um valor para tenant para simular o resultado esperado.
    // Você precisa substituir esta parte com a lógica real.
    const tenant = 135;

    try {
      // Chama a função getEtrgNota com os parâmetros adequados
      const response = await getEtrgNota({ note, tenant });
      setLoadingList(false);
      setProducts(response.Produtos);


      // Define a mensagem quando a nota já foi entregue
      setMessageWhenNoteIsAlreadyDelivered(response.info_Nota.result);
    } catch (error) {
      console.error('Erro ao buscar nota:', error);
      setLoadingList(false);
    }
  }

  function setMessageWhenNoteIsAlreadyDelivered(result) {
    switch (result) {
      case '-1':
        setMessageList("Todos os produtos desta nota foram entregues.");
        break;
      case '-2':
        setMessageList("Nota ainda não foi faturada.");
        break;
      case '-3':
        setMessageList("Esta Nota está Cancelada.");
        break;
      case '-4':
        setMessageList("Nota não encontrada.");
        break;
      default:
        break;
    }
  }

  async function getEtrgNota(entregaGet) {
    try {
      const params = {
        prm_chave: entregaGet.note,
        prm_Tenant_ID: entregaGet.tenant
      };

      const response = await api.get('Csws_Apps/rest/CS_WS_Entrega_Balcao/Get_Etrg_Nota', { params });
      return response.data;
    } catch (err) {
      console.log('==============ERROR========');
      console.log(err);
      console.log('===========================');
      throw err;
    }
  }



  async function confirmDelivery() {
    console.log("teste");
  }

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>
        <input type="text" value={noteTyped} onChange={(e) => setNoteTyped(e.target.value)} />
        <button onClick={searchNote}>Search Note</button>
      </div>
      {loadingProducts && <p>Carregando produtos...</p>}
      {loadingProducts === false && products && products.length > 0 && (
        <div>
          <button onClick={confirmDelivery}>Confirmar Entrega</button>
          <ul>
            {products.map((product, index) => (
              <li key={index}>{product.DD060_Descricao}</li>
            ))}
          </ul>
        </div>
      )}
      {loadingProducts === false && messageList !== '0' && (
        <p>{messageList}</p>
      )}
    </div>
  );
}

export default App;
