import { TouchableOpacityProps } from 'react-native'
import React from 'react'

import {
    Container,
    TextTitle,
    TextCard
} from './styles'

interface ListInvoiceProps {
    id: string,
    description: string,
    invoice_value: number,
    issue_date: Date,
    client: string,
}

interface ListCardProps extends TouchableOpacityProps {
    item: ListInvoiceProps;
}

function pis(invoice: number): number {
    return parseFloat((invoice * 0.65 / 100).toFixed(2))
}

function cofins(invoice: number): number {
    return parseFloat((invoice * 3 / 100).toFixed(2))
}

function csll(invoice: number): number {
    return parseFloat((invoice * 1 / 100).toFixed(2));
}

function iss(invoice: number): number {
    return parseFloat((invoice * 4 / 100).toFixed(2));
}

function liquid(invoice: number): Number {
    return invoice - pis(invoice) - cofins(invoice) - iss(invoice);
}



export function ListCard({ item, ...rest }: ListCardProps) {
    return (
        <Container
            {...rest}
            key={item.id}>
            <TextTitle>Dados da Nota Fiscal</TextTitle>
            <TextCard>Descrição do Serviço: {item.description}</TextCard>
            <TextCard>Valor da NF: R$ {item.invoice_value}</TextCard>
            <TextCard>Pis: R$ {pis(item.invoice_value)} </TextCard>
            <TextCard>Cofins: R$ {cofins(item.invoice_value)} </TextCard>
            <TextCard>Csll: R$ {csll(item.invoice_value)}</TextCard>
            <TextCard>Iss: R$ {iss(item.invoice_value)}</TextCard>
            <TextCard>
                Data da NF: {new Date(item.issue_date).toLocaleDateString()}
            </TextCard>
            <TextCard>Cliente: {item.client}</TextCard>
            <TextCard>
                Valor Líquido: R$ {liquid(Number(item.invoice_value))}
            </TextCard>

        </Container>
    )
}


