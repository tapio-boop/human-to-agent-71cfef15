import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Human Agent Relationship"
const PDF_URL = "https://h2a.fi/har-portfoliokartta.pdf"

interface KunnatProps {
  firstName?: string
  organization?: string
}

const KunnatTyopohjaEmail = ({ firstName, organization }: KunnatProps) => (
  <Html lang="fi" dir="ltr">
    <Head />
    <Preview>Päätöskartta-työpohja</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Päätöskartta</Heading>
        <Text style={subtitle}>Työpohja yhden prosessin päätösten listaamiseen</Text>
        <Hr style={hr} />

        <Text style={text}>
          {firstName ? `Hei ${firstName},` : 'Hei,'} tässä on työpohja, josta puhuimme
          Tekoälyagenttivalmius kunnissa -tilaisuudessa.
        </Text>

        <Text style={text}>
          <Link href={PDF_URL} style={link}>Lataa työpohja (PDF)</Link>
        </Text>

        <Text style={text}>
          Ottakaa yksi prosessi ja listatkaa sen päätökset. Ei tehtäviä eikä järjestelmiä —
          päätöksiä. Varatkaa 45 minuuttia ja tehkää se ryhmässä. Nimetkää jokaiselle
          päätökselle ihminen: nimi, ei rooli.
        </Text>

        <Text style={text}>
          Jos teette sen ryhmässä{organization ? ` ${organization}ssa` : ''}, kuulisin
          mielelläni miten meni. Voit vastata suoraan tähän viestiin tai kirjoittaa
          osoitteeseen tapio@h2a.fi.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>
          {SITE_NAME} · h2a.fi · Kirja "Ihmisten ja agenttien organisaatio" ilmestyi 6.11.2026.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: KunnatTyopohjaEmail,
  subject: 'Päätöskartta-työpohja',
  displayName: 'Päätöskartta-työpohja (kunnat)',
  previewData: { firstName: 'Anna', organization: 'Esimerkin kaupunki' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: '800' as const, color: '#1e2b4d', margin: '0 0 4px' }
const subtitle = { fontSize: '14px', color: '#6b7280', margin: '0 0 24px' }
const text = { fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: '0 0 16px' }
const link = { color: '#5b6bbf', fontWeight: '600' as const }
const hr = { borderColor: '#e5e7eb', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#9ca3af', margin: '0' }
