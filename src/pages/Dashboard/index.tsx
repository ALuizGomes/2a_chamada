import React from 'react'

import { useState } from 'react'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container, Scroll } from './styles'
import { InputMaskInvoiceValue } from '../../components/InputMaskInvoiceValue'
import { InputMaskIssueDate } from '../../components/InputMaskIssueDate'

import api from '../../services/api'

export function Dashboard() {
  const [client, setClient] = useState('')
  const [description, setDescription] = useState('')
  const [invoiceValue, setInvoiceValue] = useState('')
  const [issueDate, setIssueDate] = useState('')

  async function handleAddInvoice() {
    const invoice = {
      id: new Date().getTime(),
      description,
      invoice_value: parseFloat(invoiceValue.slice(2, invoiceValue.length).replace('.', '').replace(',', '.')),
      issue_date: issueDate,
      client,
    }

    try{
      await api.post('invoice', invoice)
    } catch (error) {
      console.log(error);
    }

    setClient('')
    setDescription('')
    setInvoiceValue('')
    setIssueDate('')
  }

  return (
    <Container>
      <Header title='Cadastro da Nota Fiscal' />

      <Scroll>
          <Input
            placeholder='Nome'
            placeholderTextColor='#363F5F'
            value={client}
            onChangeText={value => setClient(value)}
          />

          <Input
            placeholder='Descrição de Serviço'
            placeholderTextColor='#363F5F'
            value={description}
            onChangeText={value => setDescription(value)}
          />

          <InputMaskInvoiceValue
            placeholder='Valor da Nota Fiscal'
            placeholderTextColor='#363F5F'
            value={invoiceValue}
            onChangeText={value => setInvoiceValue(value)}
          />

          <InputMaskIssueDate
            placeholder='Data de Registro'
            placeholderTextColor='#363F5F'
            value={issueDate}
            onChangeText={value => setIssueDate(value)}
          />
      </Scroll>
      
      <Button title='Adicionar' handleUser={handleAddInvoice} />
    </Container>
  )
}