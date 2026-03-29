import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Human-to-Agent"

interface ToolResultsProps {
  toolName?: string
  processName?: string
  resultLabel?: string
  resultDescription?: string
  whyText?: string
  nextStep?: string
}

const ToolResultsEmail = ({
  toolName = 'Työkalu',
  processName,
  resultLabel = 'Tulos',
  resultDescription,
  whyText,
  nextStep,
}: ToolResultsProps) => (
  <Html lang="fi" dir="ltr">
    <Head />
    <Preview>Tuloksesi: {toolName}{processName ? ` — ${processName}` : ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{SITE_NAME}</Heading>
        <Text style={subtitle}>{toolName}{processName ? ` · ${processName}` : ''}</Text>
        <Hr style={hr} />

        <Section style={resultBox}>
          <Heading as="h2" style={h2}>{resultLabel}</Heading>
          {resultDescription && <Text style={text}>{resultDescription}</Text>}
        </Section>

        {whyText && (
          <Section style={section}>
            <Heading as="h3" style={h3}>Miksi tämä malli</Heading>
            <Text style={text}>{whyText}</Text>
          </Section>
        )}

        {nextStep && (
          <Section style={section}>
            <Heading as="h3" style={h3}>Seuraava askel</Heading>
            <Text style={text}>{nextStep}</Text>
          </Section>
        )}

        <Hr style={hr} />
        <Text style={footer}>
          Tämä viesti on lähetetty {SITE_NAME} -arviointityökalusta osoitteesta h2a.fi.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ToolResultsEmail,
  subject: (data: Record<string, any>) =>
    `${data.toolName || 'Työkalu'} — tuloksesi${data.processName ? `: ${data.processName}` : ''}`,
  displayName: 'Työkalun tulokset',
  previewData: {
    toolName: 'Valvontakompassi',
    processName: 'Laskujen käsittely',
    resultLabel: 'Approve',
    resultDescription: 'Agentti tekee, ihminen hyväksyy kriittisissä kohdissa.',
    whyText: 'Koska virheillä on merkittävä vaikutus ja prosessiin kohdistuu sääntelyä.',
    nextStep: 'Määrittele hyväksyntäpisteet ja eskalointilogiikka.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: '800' as const, color: '#1e2a4a', margin: '0 0 4px' }
const subtitle = { fontSize: '14px', color: '#6b7280', margin: '0 0 24px' }
const h2 = { fontSize: '20px', fontWeight: '700' as const, color: '#1e2a4a', margin: '0 0 8px' }
const h3 = { fontSize: '15px', fontWeight: '600' as const, color: '#1e2a4a', margin: '0 0 6px' }
const text = { fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: '0 0 16px' }
const hr = { borderColor: '#e5e7eb', margin: '24px 0' }
const resultBox = { padding: '16px 20px', backgroundColor: '#f9fafb', borderRadius: '12px', marginBottom: '16px' }
const section = { marginBottom: '16px' }
const footer = { fontSize: '12px', color: '#9ca3af', margin: '0' }
