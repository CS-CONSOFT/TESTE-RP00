import { useEffect, useState } from "react";
import api from "./axios";
import './App.css';

function App() {
  const [noteTyped, setNoteTyped] = useState("20240100000000108");
  const [products, setProducts] = useState([]);
  const [noteInfo, setNoteInfo] = useState(null);
  const [messageList, setMessageList] = useState('');
  const [userId, setUserId] = useState('');
  const [loadingProducts, setLoadingList] = useState(false);

  useEffect(() => {
    // Simulando a função getObjectDataVc(DataKey.LoginResponse)
    // Como você não forneceu essa implementação, estou apenas definindo um valor para userId para simular o resultado esperado.
    // Você precisa substituir esta parte com a lógica real.
    setUserId("exampleUserID");
  }, []);

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
        setNoteInfo(response.info_Nota);

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
    const dd40id = noteInfo?.dd040_id;
    // Simulando a função getUserProperties
    // Como você não forneceu essa implementação, estou apenas definindo um valor para tenant para simular o resultado esperado.
    // Você precisa substituir esta parte com a lógica real.
    const tenant = "exampleTenantID";
    const userIdentifier = userId;

    // Simulando a função setEntrNotaVc
    // Como você não forneceu essa implementação, estou apenas definindo um valor booleano aleatório para simular o resultado esperado.
    // Você precisa substituir esta parte com a lógica real.
    setTimeout(() => {
      const ok = Math.random() < 0.5; // Simulando um resultado verdadeiro ou falso aleatório
      if (ok) {
        searchNote();
      }
    }, 1000);
  }

  return (
    <div className="App">

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
