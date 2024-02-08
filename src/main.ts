// Import middlewares and other required libraries.
import { declarePrefix, Etl, fromCsv, Source, toTriplyDb } from '@triplyetl/etl/generic'
import { concat, pairs, iri, literal, split } from '@triplyetl/etl/ratt'
import { validate } from '@triplyetl/etl/shacl'

// Import vocabularies.
import { a, foaf, owl, xsd } from '@triplyetl/etl/vocab'

// Declare the base for all Iri's:
const baseIri = declarePrefix('https://example.org/')

// Define the metadata for the Dataset:
const datasetMetadata = {
  // the required name of the dataset, must be less than 40 characters, no special characters allowed
  name: 'ld-tutorial',
  // a more human friendly name of the dataset
  displayname: 'Triply ETL for ld-tutorial',

  // uncomment one or more of the following optional parameters to describe your dataset:
  // description: '', // an optional description for your dataset, can include Markdown code
  // license: '', // the license under which your dataset is avaliable
  // accessLevel: 'public' // chouse one of 'public' | 'internal' | 'private'
}

export default async function (): Promise<Etl> {
  // Create an extract-transform-load (ETL) process.
  const etl = new Etl({ baseIri })
  etl.use(

    // Connect to one or more data sources.
    fromCsv(Source.file('static/people.csv')),

    // Transformations change data in the Record.
    concat({
      content: ['firstName', 'lastName'],
      separator: ' ',
      key: 'fullName'
    }),

    split({
      content: 'firstName',
      key: 'names',
      separator: ' '
    }),

    // Assertions add linked data to the RDF store.
    pairs(iri(etl.standardPrefixes.id, '$recordId'),
      [a, foaf.Person],
      [foaf.firstName, 'names'],
      [foaf.lastName, 'lastName'],
      [foaf.name, 'fullName'],
      [foaf.birthday, literal('birthday', xsd.date)],
      [owl.sameAs, iri('WikiPage')],
      [foaf.depiction, iri('image')]
    ),

    // Validation ensures that your instance data follows the data model.
    validate(Source.file('static/model.trig')),

    // Publish your data in TriplyDB.
    toTriplyDb({ dataset: datasetMetadata })
  )
  return etl
}
