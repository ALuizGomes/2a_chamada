import React from 'react'

import { useState, useEffect, useCallback } from 'react'
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

import { Header } from '../../components/Header'
import { Container } from './styles'
import { ListCard } from '../../components/ListCard';

import api from '../../services/api';

interface ListInvoiceProps {
  id: string,
  description: string,
  invoice_value: number,
  issue_date: Date,
  client: string,
}

export function ListInvoice() {
  const [invoice, setInvoice] = useState<ListInvoiceProps[]>([])

  async function loadInvoice() {
    try {
      const data = await api.get('/invoice').then(response => response.data)
      setInvoice(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Error Loading Invoice Data')
      return
    }
  }

  function handleDeleteInvoice(id: string) {
    Alert.alert('Exclusão', 'Tem certeza?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed')
      },
      {
        text: 'OK',
        onPress: async () => {
          await api.delete(`/invoice/${id}`)
          setInvoice(invoice => invoice.filter(invoice => invoice.id !== id))
        }
      }
    ])
  }

  useEffect(() => {
    loadInvoice()
  }, [])

  useFocusEffect(useCallback(() => {
    loadInvoice()
  }, []))

  return (
    <Container>
      <Header title='Histórico do Usuário' />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={invoice}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListCard
            item={item}
            onPress={() => handleDeleteInvoice(item.id)}
          />
        )}
      />
    </Container>
  )
}
