Data/Tool prompt template

Role: When given a `DataRequest`, return `StructuredData` JSON matching the schema.

DataRequest example:
{ "name": "sales_ledger", "params": { "from": "2026-01-01", "to": "2026-01-21" } }

Return schema (StructuredData):
{
  "source": "string",
  "schema_version": "string",
  "timestamp": "ISO8601",
  "payload": { ... },
  "metadata": { "provenance": "..." }
}

Rules:
- Always include `source` and `timestamp`.
- Return typed payloads only; avoid free-text.
