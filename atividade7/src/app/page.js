'use client'

import Pagina from './componets/Pagina'
import { Formik } from 'formik'
import { useState } from 'react'
import { Button, CardImg, Form, Modal } from 'react-bootstrap'
import { FaCheck, FaTrashAlt, FaDollarSign, FaEuroSign, FaBitcoin } from 'react-icons/fa'

export default function Page() {
  const [showModal, setShowModal] = useState(false)
  const [resultadoConversao, setResultadoConversao] = useState(0)
  const [moedaEscolhida, setMoedaEscolhida] = useState('')
  const [imagemMoeda, setImagemMoeda] = useState('/dolar.png'); 

  const conversaoValores = {
    dolar: 0.20,    
    euro: 0.18,     
    bitcoin: 0.000003 
  }

  function converter(dados) {
    const valorEmReais = parseFloat(dados.valor);
    const moeda = dados.moeda;
    const valorConvertido = (valorEmReais * conversaoValores[moeda]).toFixed(6);
    
    setResultadoConversao(valorConvertido);
    setMoedaEscolhida(moeda);
    setShowModal(true);
    
    switch (moeda) {
      case 'dolar':
        setImagemMoeda('./moedas/dollar.jpeg');
        break;
      case 'euro':
        setImagemMoeda('./moedas/euro.jpeg');
        break;
      case 'bitcoin':
        setImagemMoeda('./moedas/bitcoin.jpeg');
        break;
      default:
        setImagemMoeda('./moedas/dollar.jpeg');
    }
  }

  return (
    <Pagina titulo="Conversor de Moedas - Formik">
      <div className="text-center my-4">
        <CardImg src={imagemMoeda} style={{ width: '150px', height: 'auto' }} alt={`Imagem de ${moedaEscolhida}`} />
      </div>

      <Formik
        initialValues={{
          valor: '',
          moeda: 'dolar'
        }}
        onSubmit={values => converter(values)}
      >
        {({ values, handleChange, handleSubmit, handleReset }) => (
          <Form>
            <Form.Group className='mb-2'>
              <Form.Label>Valor em R$:</Form.Label>
              <Form.Control
                type='number'
                name='valor'
                min={0}
                value={values.valor}
                onChange={handleChange}
              />
              <Form.Text>Insira o valor em reais. Ex: 100</Form.Text>
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Selecione a Moeda:</Form.Label>
              <div className="d-flex align-items-center mb-2">
                <Form.Select
                  name='moeda'
                  value={values.moeda}
                  onChange={handleChange}
                >
                  <option value="dolar">Dólar</option>
                  <option value="euro">Euro</option>
                  <option value="bitcoin">Bitcoin</option>
                </Form.Select>
                <span className="ms-2">
                  {values.moeda === 'dolar' && <FaDollarSign />}
                  {values.moeda === 'euro' && <FaEuroSign />}
                  {values.moeda === 'bitcoin' && <FaBitcoin />}
                </span>
              </div>
            </Form.Group>

            <Form.Group className='mb-2 text-center'>
              <Button
                onClick={handleSubmit}
                className='me-2'
              >
                <FaCheck /> Converter
              </Button>
              <Button
                onClick={handleReset}
              >
                <FaTrashAlt /> Limpar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado da Conversão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>O valor convertido é {resultadoConversao} {moedaEscolhida === 'dolar' ? 'dólares' : moedaEscolhida === 'euro' ? 'euros' : 'bitcoins'}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Pagina>
  )
}
