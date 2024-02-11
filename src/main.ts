import { _switch, Etl, fromCsv, fromOai, Source, toTriplyDb } from '@triplyetl/etl/generic'
import { map } from '@triplyetl/etl/rml'
import { validate } from '@triplyetl/etl/shacl'

import { account, dataset, prefixes } from './declaration.js'

export default async function (): Promise<Etl> {
  const etl = new Etl({ prefixes })
  etl.use(
    fromCsv(Source.file([
      'static/data/episodes.csv',
      'static/data/people.csv',
    ])),
    _switch('$fileName',
      ['static/data/episodes.csv', [
        map(Source.file('static/mapping/episodes-2-episode.trig')),
        validate(Source.file('static/model/episode.trig')),
      ]],
      ['static/data/people.csv', [
        map(Source.file('static/mapping/people-2-person.trig')),
        validate(Source.file('static/model/person.trig')),
      ]],
    ),
    toTriplyDb({ account, dataset })
  )
  return etl
}
